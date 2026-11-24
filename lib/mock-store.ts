import {
  UserProfile,
  Project,
  ProjectPlanTier,
  Quotation,
  Task,
  Milestone,
  ProjectFolder,
  ProjectFile,
  ChatConversation,
  ChatMessage,
  Note,
  NotificationItem,
  ActivityLog,
  PaymentRecord,
  PaymentType,
  PaymentStatus,
  TaskStatus,
  FileVisibility,
} from "@/types";
import {
  initialUsers,
  initialProjects,
  initialQuotations,
  initialTasks,
  initialMilestones,
  initialFolders,
  initialFiles,
  initialChats,
  initialMessages,
  initialNotes,
  initialNotifications,
  initialActivityLogs,
  initialPayments,
} from "./mock-data";

class MockStore {
  private users: UserProfile[] = [...initialUsers];
  private projects: Project[] = [...initialProjects];
  private quotations: Quotation[] = [...initialQuotations];
  private tasks: Task[] = [...initialTasks];
  private milestones: Milestone[] = [...initialMilestones];
  private folders: ProjectFolder[] = [...initialFolders];
  private files: ProjectFile[] = [...initialFiles];
  private chats: ChatConversation[] = [...initialChats];
  private messages: ChatMessage[] = [...initialMessages];
  private notes: Note[] = [...initialNotes];
  private notifications: NotificationItem[] = [...initialNotifications];
  private activityLogs: ActivityLog[] = [...initialActivityLogs];
  private payments: PaymentRecord[] = [...initialPayments];

  private listeners: Set<() => void> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromLocalStorage();

      // Setup BroadcastChannel for instantaneous cross-tab live synchronization
      try {
        if ("BroadcastChannel" in window) {
          this.broadcastChannel = new BroadcastChannel("notx_sync_channel");
          this.broadcastChannel.onmessage = () => {
            this.loadFromLocalStorage();
            this.emitLocalChange();
          };
        }
      } catch (e) {
        console.warn("BroadcastChannel not supported", e);
      }

      // Fallback cross-tab storage listener
      window.addEventListener("storage", (e) => {
        if (e.key?.startsWith("notx_")) {
          this.loadFromLocalStorage();
          this.emitLocalChange();
        }
      });
    }
  }

  private saveToLocalStorage() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("notx_users", JSON.stringify(this.users));
      localStorage.setItem("notx_projects", JSON.stringify(this.projects));
      localStorage.setItem("notx_quotations", JSON.stringify(this.quotations));
      localStorage.setItem("notx_tasks", JSON.stringify(this.tasks));
      localStorage.setItem("notx_milestones", JSON.stringify(this.milestones));
      localStorage.setItem("notx_folders", JSON.stringify(this.folders));
      localStorage.setItem("notx_files", JSON.stringify(this.files));
      localStorage.setItem("notx_chats", JSON.stringify(this.chats));
      localStorage.setItem("notx_messages", JSON.stringify(this.messages));
      localStorage.setItem("notx_notes", JSON.stringify(this.notes));
      localStorage.setItem("notx_notifications", JSON.stringify(this.notifications));
      localStorage.setItem("notx_activity_logs", JSON.stringify(this.activityLogs));
      localStorage.setItem("notx_payments", JSON.stringify(this.payments));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }

  private loadFromLocalStorage() {
    if (typeof window === "undefined") return;
    try {
      const u = localStorage.getItem("notx_users");
      if (u) this.users = JSON.parse(u);
      const p = localStorage.getItem("notx_projects");
      if (p) this.projects = JSON.parse(p);
      const q = localStorage.getItem("notx_quotations");
      if (q) this.quotations = JSON.parse(q);
      const t = localStorage.getItem("notx_tasks");
      if (t) this.tasks = JSON.parse(t);
      const m = localStorage.getItem("notx_milestones");
      if (m) this.milestones = JSON.parse(m);
      const fo = localStorage.getItem("notx_folders");
      if (fo) this.folders = JSON.parse(fo);
      const fi = localStorage.getItem("notx_files");
      if (fi) this.files = JSON.parse(fi);
      const ch = localStorage.getItem("notx_chats");
      if (ch) this.chats = JSON.parse(ch);
      const msg = localStorage.getItem("notx_messages");
      if (msg) this.messages = JSON.parse(msg);
      const n = localStorage.getItem("notx_notes");
      if (n) this.notes = JSON.parse(n);
      const notif = localStorage.getItem("notx_notifications");
      if (notif) this.notifications = JSON.parse(notif);
      const logs = localStorage.getItem("notx_activity_logs");
      if (logs) this.activityLogs = JSON.parse(logs);
      const pay = localStorage.getItem("notx_payments");
      if (pay) this.payments = JSON.parse(pay);
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emitLocalChange() {
    this.listeners.forEach((listener) => listener());
  }

  private notify() {
    this.saveToLocalStorage();
    this.emitLocalChange();
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ timestamp: Date.now() });
      } catch (e) {
        // Ignore channel post errors
      }
    }
  }

  // ==========================================
  // USERS CRUD (Students, Developers, Admin)
  // ==========================================
  public getUsers() {
    return this.users;
  }
  public getUserById(uid: string) {
    return this.users.find((u) => u.uid === uid);
  }
  public createDeveloper(data: {
    displayName: string;
    email: string;
    skills: string[];
    bio?: string;
    phoneNumber?: string;
  }) {
    const newDev: UserProfile = {
      uid: `dev-${Date.now().toString().slice(-4)}`,
      displayName: data.displayName,
      email: data.email,
      role: "developer",
      skills: data.skills,
      bio: data.bio || "Senior Academic Project Engineer.",
      phoneNumber: data.phoneNumber || "+1 (555) 000-0000",
      isApproved: true,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.users.push(newDev);
    this.logActivity({
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "Developer Created & Cleared",
      details: `Added new senior developer ${newDev.displayName} (${newDev.skills?.join(", ")})`,
    });
    this.notify();
    return newDev;
  }
  public updateUser(uid: string, updates: Partial<UserProfile>) {
    const idx = this.users.findIndex((u) => u.uid === uid);
    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], ...updates, updatedAt: new Date().toISOString() };
      this.logActivity({
        userId: "admin-1",
        userName: "Elena Rostova",
        userRole: "admin",
        action: "User Updated",
        details: `Updated ${this.users[idx].displayName} (${this.users[idx].role}): ${Object.keys(updates).join(", ")}`,
      });
      this.notify();
      return this.users[idx];
    }
    return null;
  }
  public deleteUser(uid: string) {
    const user = this.getUserById(uid);
    if (!user) return;
    this.users = this.users.filter((u) => u.uid !== uid);
    this.logActivity({
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "User Removed",
      details: `Removed user ${user.displayName} (${user.email}) from directory.`,
    });
    this.notify();
  }

  public verifyTaskByDev(taskId: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return null;
    task.devApproved = true;
    task.devApprovedAt = new Date().toISOString();
    task.revisionNotes = undefined;
    task.status = "review";
    task.updatedAt = new Date().toISOString();

    const project = this.getProjectById(task.projectId);
    if (project) {
      this.createNotification({
        userId: project.studentId,
        projectId: task.projectId,
        title: "Task Tested by Developer",
        message: `Task "${task.title}" has been tested and verified by developer. Please review and verify.`,
        type: "milestone_submitted",
        link: `/workspace/${task.projectId}`,
      });
    }

    this.logActivity({
      projectId: task.projectId,
      userId: "developer-1",
      userName: "Marcus Vance",
      userRole: "developer",
      action: "Task Verified by Dev",
      details: `Developer tested and completed "${task.title}" [Step 1/2 Verified]`,
    });

    this.notify();
    return task;
  }


  public verifyTaskByStudent(taskId: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return null;
    task.studentApproved = true;
    task.studentApprovedAt = new Date().toISOString();
    task.revisionNotes = undefined;
    if (task.devApproved) {
      task.status = "completed";
    }
    task.updatedAt = new Date().toISOString();

    const project = this.getProjectById(task.projectId);
    if (project && project.developerId) {
      this.createNotification({
        userId: project.developerId,
        projectId: task.projectId,
        title: "Task Approved by Student",
        message: `Student verified and approved "${task.title}"! [Step 2/2 Complete]`,
        type: "milestone_approved",
        link: `/workspace/${task.projectId}`,
      });
    }

    this.logActivity({
      projectId: task.projectId,
      userId: project?.studentId || "student-1",
      userName: project?.studentName || "Alex Rivera",
      userRole: "student",
      action: "Task Approved by Student",
      details: `Student verified "${task.title}". Fully approved (2/2).`,
    });

    this.notify();
    return task;
  }


  public requestTaskRevision(taskId: string, notes: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return null;
    task.devApproved = false;
    task.studentApproved = false;
    task.revisionNotes = notes;
    task.status = "in_progress";
    task.updatedAt = new Date().toISOString();

    const project = this.getProjectById(task.projectId);
    if (project && project.developerId) {
      this.createNotification({
        userId: project.developerId,
        projectId: task.projectId,
        title: "Task Revision Requested",
        message: `Student requested revisions on "${task.title}": ${notes}`,
        type: "milestone_revision",
        link: `/workspace/${task.projectId}`,
      });
    }

    this.notify();
    return task;
  }

  // ==========================================
  // PROJECTS CRUD & WORKSPACE PROVISIONING
  // ==========================================
  public getProjects() {
    return this.projects;
  }
  public getProjectById(id: string) {
    return this.projects.find((p) => p.id === id);
  }
  public createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">) {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.projects.unshift(newProject);

    // 1. Auto-create dedicated Chat Channel
    const newChat: ChatConversation = {
      id: `chat-${newProject.id}`,
      projectId: newProject.id,
      projectTitle: newProject.title,
      participants: [newProject.studentId, "admin-1"],
      participantDetails: {
        [newProject.studentId]: {
          displayName: newProject.studentName,
          role: "student",
        },
        "admin-1": {
          displayName: "Elena Rostova",
          role: "admin",
        },
      },
      lastMessage: {
        text: `Workspace channel provisioned for ${newProject.title}.`,
        senderId: "admin-1",
        senderName: "Elena Rostova",
        timestamp: new Date().toISOString(),
      },
      unreadCounts: { [newProject.studentId]: 0, "admin-1": 1 },
      updatedAt: new Date().toISOString(),
    };
    this.chats.unshift(newChat);

    // 2. Auto-create initial Welcome message
    this.messages.push({
      id: `msg-${Date.now().toString().slice(-5)}`,
      chatId: newChat.id,
      projectId: newProject.id,
      senderId: "admin-1",
      senderName: "Elena Rostova",
      senderRole: "admin",
      text: `Hello ${newProject.studentName}! Your requirement "${newProject.title}" has been received. Our technical team is reviewing the scope and formulating an official quotation.`,
      readBy: ["admin-1"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 3. Auto-create Standard Deliverable Folders
    this.folders.push(
      {
        id: `f-${newProject.id}-1`,
        projectId: newProject.id,
        parentId: null,
        name: "Source Code & Deliverables",
        createdBy: "admin-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: `f-${newProject.id}-2`,
        projectId: newProject.id,
        parentId: null,
        name: "Research & IEEE Documentation",
        createdBy: "admin-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: `f-${newProject.id}-3`,
        projectId: newProject.id,
        parentId: null,
        name: "Datasets & Neural Weights",
        createdBy: "admin-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );

    // 4. Auto-create Standard 7 Academic Milestones
    const standardMilestones = [
      { title: "Requirements & Problem Formulation", desc: "Mathematical state space formulation, research literature survey, dataset schema." },
      { title: "UI/UX & Architecture Design", desc: "Component hierarchy diagrams, database normalization, wireframes, and API contracts." },
      { title: "Development Sprint 1: Core Engine", desc: "Foundational algorithms, model backbones, and backend data ingestion services." },
      { title: "Development Sprint 2: Integration", desc: "Frontend-backend integration, model inference pipeline, and real-time visualization." },
      { title: "Testing & Accuracy Verification", desc: "Unit testing, ablation studies, latency stress tests, and benchmark graphs." },
      { title: "Academic Documentation & Report", desc: "Complete 40+ page IEEE/ACM format manuscript, citations, and plagiarism clearance." },
      { title: "Final Deliverable Handoff & Video", desc: "Docker Compose package, code walkthrough video, and oral defense preparation." },
    ];

    standardMilestones.forEach((sm, idx) => {
      this.milestones.push({
        id: `ms-${newProject.id}-${idx + 1}`,
        projectId: newProject.id,
        title: sm.title,
        description: sm.desc,
        order: idx + 1,
        status: idx === 0 ? "in_progress" : "pending",
        dueDate: newProject.deadline || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });

    // 5. Notify Admin
    this.createNotification({
      userId: "admin-1",
      projectId: newProject.id,
      title: "New Project Requirement Submitted",
      message: `${newProject.studentName} submitted "${newProject.title}" (â‚¹${(newProject.budget || 0).toLocaleString("en-IN")}).`,
      type: "project_assigned",
      link: `/admin/quotations`,
    });

    // 6. Log Activity
    this.logActivity({
      projectId: newProject.id,
      userId: newProject.studentId,
      userName: newProject.studentName,
      userRole: "student",
      action: "Project Submitted",
      details: `Submitted requirement: ${newProject.title} (${newProject.category})`,
    });

    this.notify();
    return newProject;
  }
  public updateProject(id: string, updates: Partial<Project>) {
    const idx = this.projects.findIndex((p) => p.id === id);
    if (idx !== -1) {
      this.projects[idx] = { ...this.projects[idx], ...updates, updatedAt: new Date().toISOString() };
      this.notify();
      return this.projects[idx];
    }
    return null;
  }
  public deleteProject(id: string) {
    const p = this.getProjectById(id);
    if (!p) return;
    this.projects = this.projects.filter((proj) => proj.id !== id);
    this.tasks = this.tasks.filter((t) => t.projectId !== id);
    this.milestones = this.milestones.filter((m) => m.projectId !== id);
    this.files = this.files.filter((f) => f.projectId !== id);
    this.logActivity({
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "Project Deleted",
      details: `Deleted project ${p.title} (#${id}) and associated sprints.`,
    });
    this.notify();
  }

  // ==========================================
  // DEVELOPER ASSIGNMENT ENGINE
  // ==========================================
  public assignDeveloper(projectId: string, developerId: string, notes?: string) {
    const project = this.getProjectById(projectId);
    const developer = this.getUserById(developerId);
    if (!project || !developer) return null;

    project.developerId = developer.uid;
    project.developerName = developer.displayName;
    project.developerEmail = developer.email;
    project.assignmentStatus = "pending_acceptance";
    if (project.status === "quotation_accepted" || project.status === "requirement_submitted") {
      project.status = "assigned";
    }
    project.updatedAt = new Date().toISOString();

    // Add developer to ChatConversation participants
    const chat = this.chats.find((c) => c.projectId === projectId);
    if (chat) {
      if (!chat.participants.includes(developer.uid)) {
        chat.participants.push(developer.uid);
      }
      chat.participantDetails[developer.uid] = {
        displayName: developer.displayName,
        role: "developer",
      };
      chat.updatedAt = new Date().toISOString();

      // Post system announcement in chat
      this.messages.push({
        id: `msg-${Date.now().toString().slice(-5)}`,
        chatId: chat.id,
        projectId,
        senderId: "admin-1",
        senderName: "Elena Rostova",
        senderRole: "admin",
        text: `Engineer ${developer.displayName} has been officially assigned as lead developer for this project.`,
        readBy: ["admin-1"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    // Notify Developer
    this.createNotification({
      userId: developer.uid,
      projectId,
      title: "Project Assignment Granted",
      message: `You have been assigned to develop "${project.title}".`,
      type: "project_assigned",
      link: `/developer/projects`,
    });

    // Notify Student
    this.createNotification({
      userId: project.studentId,
      projectId,
      title: "Developer Assigned",
      message: `Senior Engineer ${developer.displayName} has been assigned to your project!`,
      type: "project_assigned",
      link: `/workspace/${projectId}?tab=team`,
    });

    // Log Activity
    this.logActivity({
      projectId,
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "Developer Assigned",
      details: `Assigned ${developer.displayName} to "${project.title}". ${notes ? `Notes: ${notes}` : ""}`,
    });

    this.notify();
    return project;
  }

  public acceptProjectAssignment(projectId: string, developerId: string) {
    const project = this.getProjectById(projectId);
    const developer = this.getUserById(developerId);
    if (!project || !developer) return null;

    project.assignmentStatus = "accepted";
    project.status = "in_progress";
    project.updatedAt = new Date().toISOString();

    const chat = this.chats.find((c) => c.projectId === projectId);
    if (chat) {
      this.messages.push({
        id: `msg-${Date.now().toString().slice(-5)}`,
        chatId: chat.id,
        projectId,
        senderId: developer.uid,
        senderName: developer.displayName,
        senderRole: "developer",
        text: `Hello! I have reviewed the technical requirements and accepted this project assignment. I am commencing work now.`,
        readBy: [developer.uid],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    this.createNotification({
      userId: project.studentId,
      projectId,
      title: "Developer Accepted Project",
      message: `${developer.displayName} accepted your project assignment and started work!`,
      type: "project_assigned",
      link: `/workspace/${projectId}`,
    });

    this.createNotification({
      userId: "admin-1",
      projectId,
      title: "Assignment Accepted",
      message: `${developer.displayName} accepted project "${project.title}".`,
      type: "project_assigned",
      link: `/admin/projects`,
    });

    this.logActivity({
      projectId,
      userId: developer.uid,
      userName: developer.displayName,
      userRole: "developer",
      action: "Project Assignment Accepted",
      details: `Accepted project assignment and commenced development for ${project.title}`,
    });

    this.notify();
    return project;
  }

  public declineProjectAssignment(projectId: string, developerId: string, reason?: string) {
    const project = this.getProjectById(projectId);
    const developer = this.getUserById(developerId);
    if (!project || !developer) return null;

    project.assignmentStatus = "declined";
    project.developerId = undefined;
    project.developerName = undefined;
    project.developerEmail = undefined;
    project.updatedAt = new Date().toISOString();

    this.createNotification({
      userId: "admin-1",
      projectId,
      title: "Assignment Declined by Developer",
      message: `${developer.displayName} declined assignment for "${project.title}". Reason: ${reason || "Schedule conflict"}`,
      type: "project_assigned",
      link: `/admin/assignments`,
    });

    this.logActivity({
      projectId,
      userId: developer.uid,
      userName: developer.displayName,
      userRole: "developer",
      action: "Project Assignment Declined",
      details: `Declined assignment for ${project.title}. Reason: ${reason || "Unavailable"}`,
    });

    this.notify();
    return project;
  }

  public updateProjectProgress(projectId: string, progress: number) {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    const clamped = Math.max(0, Math.min(100, Math.round(progress)));
    project.progressPercent = clamped;
    project.updatedAt = new Date().toISOString();

    this.logActivity({
      projectId,
      userId: project.developerId || "developer-1",
      userName: project.developerName || "Developer",
      userRole: "developer",
      action: "Project Progress Updated",
      details: `Updated project completion to ${clamped}%`,
    });

    this.notify();
    return project;
  }

  public submitProjectForAdminApproval(projectId: string, notes?: string) {
    const project = this.getProjectById(projectId);
    if (!project) return null;
    project.submissionStatus = "submitted_for_admin_approval";
    project.finalSubmissionNotes = notes || "All deliverables, code repository, and documentation uploaded to vault.";
    project.updatedAt = new Date().toISOString();

    this.createNotification({
      userId: "admin-1",
      projectId,
      title: "Project Submitted for Final Sign-Off",
      message: `Developer submitted "${project.title}" for final admin verification and release.`,
      type: "milestone_submitted",
      link: `/admin/projects`,
    });

    this.logActivity({
      projectId,
      userId: project.developerId || "developer-1",
      userName: project.developerName || "Developer",
      userRole: "developer",
      action: "Project Submitted to Admin",
      details: `Submitted completed capstone for final review: ${notes || "All checks complete"}`,
    });

    this.notify();
    return project;
  }

  public approveProjectFinalSubmission(projectId: string) {
    const project = this.getProjectById(projectId);
    if (!project) return null;
    project.submissionStatus = "approved";
    project.status = "completed";
    project.progressPercent = 100;
    project.updatedAt = new Date().toISOString();

    this.createNotification({
      userId: project.studentId,
      projectId,
      title: "Project Officially Completed & Approved!",
      message: `Admin Elena Rostova approved all final deliverables for "${project.title}". Congratulations!`,
      type: "milestone_approved",
      link: `/workspace/${projectId}`,
    });

    if (project.developerId) {
      this.createNotification({
        userId: project.developerId,
        projectId,
        title: "Final Submission Approved",
        message: `Admin approved your delivery for "${project.title}". Project marked completed.`,
        type: "milestone_approved",
        link: `/workspace/${projectId}`,
      });
    }

    this.logActivity({
      projectId,
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "Final Project Approved",
      details: `Approved all deliverables and completed academic project: ${project.title}`,
    });

    this.notify();
    return project;
  }

  // ==========================================
  // QUOTATIONS LIFECYCLE
  // ==========================================
  public getQuotations() {
    return this.quotations;
  }
  public getQuotationById(id: string) {
    return this.quotations.find((q) => q.id === id);
  }
  public createQuotation(quotation: Omit<Quotation, "id" | "createdAt" | "updatedAt">) {
    const newQuote: Quotation = {
      ...quotation,
      id: `quote-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.quotations.unshift(newQuote);

    // Update project status to quotation_sent
    this.updateProject(newQuote.projectId, { status: "quotation_sent" });

    // Notify Student
    this.createNotification({
      userId: newQuote.studentId,
      projectId: newQuote.projectId,
      title: "Official Quotation Issued",
      message: `Admin Elena Rostova formulated a quote of â‚¹${newQuote.amount.toLocaleString("en-IN")} for "${newQuote.projectTitle}".`,
      type: "quotation_received",
      link: `/student/quotations`,
    });

    // Log Activity
    this.logActivity({
      projectId: newQuote.projectId,
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "Quotation Generated",
      details: `Issued quotation #${newQuote.id} for â‚¹${newQuote.amount.toLocaleString("en-IN")} to ${newQuote.studentEmail}.`,
    });

    this.notify();
    return newQuote;
  }

  public counterOfferQuotation(id: string, counterAmount: number, note: string) {
    const quote = this.quotations.find((q) => q.id === id);
    if (!quote) return null;

    quote.status = "negotiating";
    quote.counterOfferAmount = counterAmount;
    quote.counterOfferNote = note;
    quote.updatedAt = new Date().toISOString();

    // Notify Admin of student's counter-offer
    this.createNotification({
      userId: "admin-1",
      projectId: quote.projectId,
      title: "Student Price Counter-Offer",
      message: `Student proposed counter-budget of â‚¹${counterAmount.toLocaleString("en-IN")} for "${quote.projectTitle}".`,
      type: "quotation_received",
      link: `/admin/quotations`,
    });

    this.logActivity({
      projectId: quote.projectId,
      userId: quote.studentId,
      userName: "Alex Rivera",
      userRole: "student",
      action: "Price Counter-Offer Submitted",
      details: `Student proposed counter-budget of â‚¹${counterAmount.toLocaleString("en-IN")}. Note: "${note}"`,
    });

    this.notify();
    return quote;
  }

  public acceptCounterOfferAndFixPrice(
    id: string,
    finalAmount: number,
    options?: {
      discountAmount?: number;
      discountReason?: string;
      planTier?: ProjectPlanTier;
      baseAmount?: number;
    }
  ) {
    const quote = this.quotations.find((q) => q.id === id);
    if (!quote) return null;

    quote.amount = finalAmount;
    if (options?.baseAmount !== undefined) quote.baseAmount = options.baseAmount;
    if (options?.discountAmount !== undefined) quote.discountAmount = options.discountAmount;
    if (options?.discountReason !== undefined) quote.discountReason = options.discountReason;
    if (options?.planTier !== undefined) quote.planTier = options.planTier;
    quote.status = "sent";
    quote.counterOfferAmount = undefined;
    quote.counterOfferNote = undefined;
    quote.updatedAt = new Date().toISOString();

    // Recalculate payment milestones
    quote.paymentMilestones = [
      { description: "Advance Payment (50%) & Architecture Setup", percentage: 50, amount: Math.round(finalAmount * 0.5) },
      { description: "Final Delivery & Deliverables Signoff", percentage: 50, amount: Math.round(finalAmount * 0.5) },
    ];

    this.updateProject(quote.projectId, {
      budget: finalAmount,
      finalPrice: finalAmount,
      originalPrice: quote.baseAmount || quote.amount,
      discountAmount: quote.discountAmount,
      discountReason: quote.discountReason,
      planTier: quote.planTier,
      status: "quotation_sent",
    });

    const discountMsg = quote.discountAmount && quote.discountAmount > 0
      ? ` (â‚¹${quote.discountAmount.toLocaleString("en-IN")} discount applied: ${quote.discountReason || "Special Concession"})`
      : "";

    // Notify student of price adjustment
    this.createNotification({
      userId: quote.studentId,
      projectId: quote.projectId,
      title: "Quotation Price Adjusted by Admin",
      message: `Admin finalized your project fee at â‚¹${finalAmount.toLocaleString("en-IN")}${discountMsg}! You can now review and accept to start development.`,
      type: "quotation_received",
      link: `/student/quotations`,
    });

    this.logActivity({
      projectId: quote.projectId,
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "Quotation Price Finalized",
      details: `Admin locked price at â‚¹${finalAmount.toLocaleString("en-IN")}${discountMsg} for #${quote.id}.`,
    });

    this.notify();
    return quote;
  }

  public updateQuotationStatus(id: string, status: Quotation["status"], rejectionReason?: string) {
    const quote = this.quotations.find((q) => q.id === id);
    if (!quote) return null;

    quote.status = status;
    if (rejectionReason) quote.rejectionReason = rejectionReason;
    quote.updatedAt = new Date().toISOString();

    if (status === "accepted") {
      this.updateProject(quote.projectId, {
        status: "quotation_accepted",
        finalPrice: quote.amount,
      });

      // Automatically create Deposit Payment Invoice in INR
      const depositAmount = Math.round(quote.amount * 0.5);
      this.createPayment({
        projectId: quote.projectId,
        projectTitle: quote.projectTitle,
        studentId: quote.studentId,
        studentName: "Alex Rivera",
        quotationId: quote.id,
        amount: depositAmount,
        currency: "INR",
        milestoneTitle: "Advance Deposit (50%) & Architecture Confirmation",
        paymentType: "advance",
        paymentMethod: "UPI (Google Pay / PhonePe)",
        transactionRef: `UPI/${Date.now().toString().slice(-8)}`,
        status: "payment_under_review",
        notes: "Student accepted quotation. Awaiting admin payment review & verification.",
        paidAt: new Date().toISOString(),
      });

      // Notify Admin
      this.createNotification({
        userId: "admin-1",
        projectId: quote.projectId,
        title: "Quotation Accepted by Student",
        message: `Student accepted quote #${quote.id} (â‚¹${quote.amount.toLocaleString("en-IN")}) for "${quote.projectTitle}". Ready for payment verification & developer assignment!`,
        type: "quotation_accepted",
        link: `/admin/payments`,
      });

      this.logActivity({
        projectId: quote.projectId,
        userId: quote.studentId,
        userName: "Alex Rivera",
        userRole: "student",
        action: "Quotation Accepted",
        details: `Student accepted quotation #${quote.id} (â‚¹${quote.amount.toLocaleString("en-IN")}). Advance payment invoice issued for verification.`,
      });
    } else if (status === "rejected") {
      this.updateProject(quote.projectId, { status: "requirement_submitted" });
      this.createNotification({
        userId: "admin-1",
        projectId: quote.projectId,
        title: "Quotation Revision Requested",
        message: `Student rejected quote #${quote.id}. Reason: ${rejectionReason || "Price or scope adjustment"}`,
        type: "quotation_rejected",
        link: `/admin/quotations`,
      });
      this.logActivity({
        projectId: quote.projectId,
        userId: quote.studentId,
        userName: "Alex Rivera",
        userRole: "student",
        action: "Quotation Rejected",
        details: `Student rejected quotation #${quote.id}: ${rejectionReason || "Scope revision requested"}`,
      });
    }

    this.notify();
    return quote;
  }

  // ==========================================
  // SPRINT TASKS & KANBAN CRUD
  // ==========================================
  public getTasks(projectId?: string) {
    if (projectId) return this.tasks.filter((t) => t.projectId === projectId);
    return this.tasks;
  }
  public createTask(task: Omit<Task, "id" | "createdAt" | "updatedAt">) {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    this.logActivity({
      projectId: newTask.projectId,
      userId: newTask.createdBy,
      userName: newTask.createdByName,
      userRole: "developer",
      action: "Task Created",
      details: `Added task "${newTask.title}" [${newTask.priority.toUpperCase()}]`,
    });
    this.notify();
    return newTask;
  }
  public updateTask(id: string, updates: Partial<Task>) {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx !== -1) {
      this.tasks[idx] = { ...this.tasks[idx], ...updates, updatedAt: new Date().toISOString() };
      this.notify();
      return this.tasks[idx];
    }
    return null;
  }
  public moveTask(taskId: string, targetStatus: TaskStatus) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return null;
    const oldStatus = task.status;
    task.status = targetStatus;
    task.updatedAt = new Date().toISOString();

    this.logActivity({
      projectId: task.projectId,
      userId: "developer-1",
      userName: "Marcus Vance",
      userRole: "developer",
      action: "Kanban Task Moved",
      details: `Moved "${task.title}" from ${oldStatus.toUpperCase()} to ${targetStatus.toUpperCase()}`,
    });

    this.notify();
    return task;
  }
  public deleteTask(id: string) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.logActivity({
      projectId: task.projectId,
      userId: "developer-1",
      userName: "Marcus Vance",
      userRole: "developer",
      action: "Task Deleted",
      details: `Deleted task "${task.title}".`,
    });
    this.notify();
  }

  // ==========================================
  // MILESTONES LIFECYCLE (Submit & Approve)
  // ==========================================
  public getMilestones(projectId?: string) {
    if (projectId) return this.milestones.filter((m) => m.projectId === projectId);
    return this.milestones;
  }
  public createMilestone(milestone: Omit<Milestone, "id" | "createdAt" | "updatedAt">) {
    const newM: Milestone = {
      ...milestone,
      id: `ms-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.milestones.push(newM);
    this.notify();
    return newM;
  }
  public updateMilestone(id: string, updates: Partial<Milestone>) {
    const idx = this.milestones.findIndex((m) => m.id === id);
    if (idx !== -1) {
      this.milestones[idx] = { ...this.milestones[idx], ...updates, updatedAt: new Date().toISOString() };
      this.notify();
      return this.milestones[idx];
    }
    return null;
  }
  public submitMilestone(milestoneId: string, submissionNotes: string) {
    const m = this.milestones.find((ms) => ms.id === milestoneId);
    if (!m) return null;
    m.status = "submitted_for_review";
    m.submissionNotes = submissionNotes;
    m.submittedAt = new Date().toISOString();
    m.updatedAt = new Date().toISOString();

    const proj = this.getProjectById(m.projectId);

    // Notify Student
    if (proj) {
      this.createNotification({
        userId: proj.studentId,
        projectId: m.projectId,
        title: "Milestone Deliverables Submitted",
        message: `Developer submitted "${m.title}" for your approval!`,
        type: "milestone_submitted",
        link: `/workspace/${m.projectId}?tab=milestones`,
      });
    }

    this.logActivity({
      projectId: m.projectId,
      userId: "developer-1",
      userName: "Marcus Vance",
      userRole: "developer",
      action: "Milestone Submitted",
      details: `Submitted milestone "${m.title}" with verification instructions.`,
    });

    this.notify();
    return m;
  }
  public approveMilestone(milestoneId: string) {
    const m = this.milestones.find((ms) => ms.id === milestoneId);
    if (!m) return null;
    m.status = "approved";
    m.approvedAt = new Date().toISOString();
    m.updatedAt = new Date().toISOString();

    // Recalculate progress percent on project
    const projectMilestones = this.milestones.filter((ms) => ms.projectId === m.projectId);
    const approvedCount = projectMilestones.filter((ms) => ms.status === "approved").length;
    const progressPercent = Math.min(100, Math.round((approvedCount / projectMilestones.length) * 100));

    this.updateProject(m.projectId, { progressPercent });

    const proj = this.getProjectById(m.projectId);
    if (proj?.developerId) {
      this.createNotification({
        userId: proj.developerId,
        projectId: m.projectId,
        title: "Milestone Approved by Student!",
        message: `Student approved "${m.title}". Progress reached ${progressPercent}%.`,
        type: "milestone_approved",
        link: `/developer/milestones`,
      });
    }

    this.logActivity({
      projectId: m.projectId,
      userId: "student-1",
      userName: "Alex Rivera",
      userRole: "student",
      action: "Milestone Approved",
      details: `Approved "${m.title}". Project progress advanced to ${progressPercent}%.`,
    });

    this.notify();
    return m;
  }
  public requestMilestoneRevision(milestoneId: string, revisionNotes: string) {
    const m = this.milestones.find((ms) => ms.id === milestoneId);
    if (!m) return null;
    m.status = "revision_requested";
    m.revisionNotes = revisionNotes;
    m.updatedAt = new Date().toISOString();

    const proj = this.getProjectById(m.projectId);
    if (proj?.developerId) {
      this.createNotification({
        userId: proj.developerId,
        projectId: m.projectId,
        title: "Milestone Revision Requested",
        message: `Student requested revisions on "${m.title}": ${revisionNotes}`,
        type: "milestone_revision",
        link: `/developer/milestones`,
      });
    }

    this.logActivity({
      projectId: m.projectId,
      userId: "student-1",
      userName: "Alex Rivera",
      userRole: "student",
      action: "Revision Requested",
      details: `Revision requested on "${m.title}": ${revisionNotes}`,
    });

    this.notify();
    return m;
  }

  // ==========================================
  // BACKBLAZE B2 FILE VAULT & FOLDER CRUD
  // ==========================================
  public getFolders(projectId: string) {
    return this.folders.filter((f) => f.projectId === projectId);
  }
  public createFolder(folder: Omit<ProjectFolder, "id" | "createdAt" | "updatedAt">) {
    const newF: ProjectFolder = {
      ...folder,
      id: `f-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.folders.push(newF);
    this.notify();
    return newF;
  }
  public deleteFolder(folderId: string) {
    this.folders = this.folders.filter((f) => f.id !== folderId);
    // Move contained files to root
    this.files.forEach((file) => {
      if (file.folderId === folderId) file.folderId = null;
    });
    this.notify();
  }
  public getFiles(projectId?: string, includeDeleted = false) {
    let list = this.files;
    if (projectId) list = list.filter((f) => f.projectId === projectId);
    if (!includeDeleted) list = list.filter((f) => !f.isDeleted);
    return list;
  }
  public createFile(file: Omit<ProjectFile, "id" | "createdAt" | "updatedAt">) {
    const newFile: ProjectFile = {
      ...file,
      id: `file-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.files.unshift(newFile);
    this.logActivity({
      projectId: file.projectId,
      userId: file.uploadedBy,
      userName: file.uploadedByName,
      userRole: file.uploadedByRole,
      action: "File Uploaded to B2",
      details: `Uploaded ${file.fileName} [v1] (${file.visibility.replace(/_/g, " ")})`,
    });
    this.notify();
    return newFile;
  }
  public replaceFileVersion(fileId: string, newMetadata?: Partial<ProjectFile>) {
    const file = this.files.find((f) => f.id === fileId);
    if (!file) return null;

    if (!file.previousVersions) file.previousVersions = [];
    file.previousVersions.push({
      version: file.version,
      s3Key: file.s3Key,
      fileSize: file.fileSize,
      uploadedAt: file.updatedAt,
    });

    file.version += 1;
    if (newMetadata?.fileSize) file.fileSize = newMetadata.fileSize;
    if (newMetadata?.description) file.description = newMetadata.description;
    file.updatedAt = new Date().toISOString();

    this.logActivity({
      projectId: file.projectId,
      userId: file.uploadedBy,
      userName: file.uploadedByName,
      userRole: file.uploadedByRole,
      action: "File Version Replaced",
      details: `Bumped ${file.fileName} to v${file.version}`,
    });

    this.notify();
    return file;
  }
  public updateFileVisibility(fileId: string, visibility: FileVisibility) {
    const file = this.files.find((f) => f.id === fileId);
    if (!file) return null;
    file.visibility = visibility;
    file.updatedAt = new Date().toISOString();
    this.notify();
    return file;
  }
  public softDeleteFile(fileId: string) {
    const file = this.files.find((f) => f.id === fileId);
    if (!file) return;
    file.isDeleted = true;
    file.deletedAt = new Date().toISOString();
    this.logActivity({
      projectId: file.projectId,
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "File Soft-Deleted",
      details: `Soft-deleted ${file.fileName} from active view.`,
    });
    this.notify();
  }
  public restoreFile(fileId: string) {
    const file = this.files.find((f) => f.id === fileId);
    if (!file) return;
    file.isDeleted = false;
    file.deletedAt = undefined;
    this.logActivity({
      projectId: file.projectId,
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "File Restored",
      details: `Restored ${file.fileName} back to active vault.`,
    });
    this.notify();
  }

  // ==========================================
  // REAL-TIME CHAT & MESSAGING
  // ==========================================
  public getChats() {
    return this.chats;
  }
  public getMessages(chatId: string) {
    return this.messages.filter((m) => m.chatId === chatId);
  }
  public sendMessage(msg: Omit<ChatMessage, "id" | "createdAt" | "updatedAt">) {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.messages.push(newMsg);

    // Update conversation lastMessage
    let chat = this.chats.find((c) => c.id === msg.chatId);
    if (!chat) {
      chat = {
        id: msg.chatId,
        projectId: msg.projectId,
        projectTitle: "Project Discussion",
        participants: [msg.senderId],
        participantDetails: {
          [msg.senderId]: { displayName: msg.senderName, role: msg.senderRole },
        },
        unreadCounts: {},
        updatedAt: newMsg.createdAt,
      };
      this.chats.push(chat);
    }

    chat.lastMessage = {
      text: msg.text,
      senderId: msg.senderId,
      senderName: msg.senderName,
      timestamp: newMsg.createdAt,
    };
    chat.updatedAt = newMsg.createdAt;

    this.notify();
    return newMsg;
  }

  // ==========================================
  // NOTES CRUD
  // ==========================================
  public getNotes(authorId?: string, projectId?: string) {
    return this.notes.filter((n) => {
      if (projectId && n.projectId === projectId) return true;
      if (authorId && n.authorId === authorId) return true;
      return false;
    });
  }
  public createNote(note: Omit<Note, "id" | "createdAt" | "updatedAt">) {
    const newNote: Note = {
      ...note,
      id: `note-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.notes.unshift(newNote);
    this.notify();
    return newNote;
  }
  public updateNote(id: string, updates: Partial<Note>) {
    const idx = this.notes.findIndex((n) => n.id === id);
    if (idx !== -1) {
      this.notes[idx] = { ...this.notes[idx], ...updates, updatedAt: new Date().toISOString() };
      this.notify();
      return this.notes[idx];
    }
    return null;
  }
  public deleteNote(id: string) {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.notify();
  }

  // ==========================================
  // NOTIFICATIONS
  // ==========================================
  public getNotifications(userId: string) {
    return this.notifications.filter((n) => n.userId === userId || n.userId === "all");
  }
  public createNotification(notif: Omit<NotificationItem, "id" | "isRead" | "createdAt">) {
    const item: NotificationItem = {
      ...notif,
      id: `notif-${Date.now().toString().slice(-4)}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    this.notifications.unshift(item);
    this.notify();
    return item;
  }
  public markNotificationAsRead(id: string) {
    const n = this.notifications.find((notif) => notif.id === id);
    if (n) {
      n.isRead = true;
      this.notify();
    }
  }
  public markAllNotificationsAsRead(userId: string) {
    this.notifications.forEach((n) => {
      if (n.userId === userId || n.userId === "all") n.isRead = true;
    });
    this.notify();
  }

  // ==========================================
  // ACTIVITY AUDIT LOGS
  // ==========================================
  public getActivityLogs(projectId?: string) {
    if (projectId) return this.activityLogs.filter((l) => l.projectId === projectId);
    return this.activityLogs;
  }
  public logActivity(log: Omit<ActivityLog, "id" | "createdAt">) {
    const newLog: ActivityLog = {
      ...log,
      id: `log-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };
    this.activityLogs.unshift(newLog);
    this.notify();
    return newLog;
  }

  // ==========================================
  // PAYMENTS & INVOICES
  // ==========================================
  public getPayments(studentId?: string, projectId?: string) {
    let list = this.payments;
    if (studentId) list = list.filter((p) => p.studentId === studentId);
    if (projectId) list = list.filter((p) => p.projectId === projectId);
    return list;
  }

  public createPayment(payment: Omit<PaymentRecord, "id" | "createdAt">) {
    const newP: PaymentRecord = {
      ...payment,
      id: `pay-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };
    this.payments.unshift(newP);

    // Update project paidAmount if payment is completed / successful
    if (newP.status === "payment_success" || newP.status === "completed") {
      const proj = this.getProjectById(newP.projectId);
      if (proj) {
        proj.paidAmount = (proj.paidAmount || 0) + newP.amount;
        proj.updatedAt = new Date().toISOString();
      }
    }

    this.notify();
    return newP;
  }

  public recordProjectPayment(data: {
    projectId: string;
    studentId?: string;
    studentName?: string;
    amount: number;
    paymentType: PaymentType;
    paymentMethod: string;
    transactionRef: string;
    status: PaymentStatus;
    milestoneTitle?: string;
    notes?: string;
  }) {
    const project = this.getProjectById(data.projectId);
    const newPayment: PaymentRecord = {
      id: `pay-${Date.now().toString().slice(-4)}`,
      projectId: data.projectId,
      projectTitle: project?.title || "Academic Capstone",
      studentId: data.studentId || project?.studentId || "student-1",
      studentName: data.studentName || project?.studentName || "Alex Rivera",
      amount: data.amount,
      currency: "INR",
      paymentType: data.paymentType,
      paymentMethod: data.paymentMethod,
      transactionRef: data.transactionRef,
      status: data.status,
      milestoneTitle: data.milestoneTitle || `${data.paymentType.toUpperCase()} Payment`,
      notes: data.notes,
      paidAt: data.status === "payment_success" ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
    };

    this.payments.unshift(newPayment);

    // Update project verified paidAmount
    if (project && (data.status === "payment_success" || data.status === "completed")) {
      project.paidAmount = (project.paidAmount || 0) + data.amount;
      project.updatedAt = new Date().toISOString();
    }

    // Send notification to student
    const statusLabel = data.status === "payment_success"
      ? "verified successfully"
      : data.status === "payment_under_review"
      ? "placed under review"
      : "marked as failed";

    this.createNotification({
      userId: newPayment.studentId,
      projectId: data.projectId,
      title: `Payment ${data.status === "payment_success" ? "Receipt Verified" : "Status Update"}`,
      message: `A payment of â‚¹${data.amount.toLocaleString("en-IN")} has been ${statusLabel} for "${project?.title}".`,
      type: "payment_received",
      link: `/student/payments`,
    });

    this.logActivity({
      projectId: data.projectId,
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "Payment Logged",
      details: `Recorded â‚¹${data.amount.toLocaleString("en-IN")} [${data.status.toUpperCase()}] via ${data.paymentMethod}. Ref: ${data.transactionRef}`,
    });

    this.notify();
    return newPayment;
  }

  public updatePaymentStatus(paymentId: string, status: PaymentStatus) {
    const p = this.payments.find((pay) => pay.id === paymentId);
    if (!p) return null;

    const oldStatus = p.status;
    p.status = status;
    if (status === "payment_success" && !p.paidAt) {
      p.paidAt = new Date().toISOString();
    }

    // Recalculate project total paid
    const project = this.getProjectById(p.projectId);
    if (project) {
      const allSuccess = this.payments.filter(
        (pay) => pay.projectId === p.projectId && (pay.status === "payment_success" || pay.status === "completed")
      );
      project.paidAmount = allSuccess.reduce((sum, item) => sum + item.amount, 0);
      project.updatedAt = new Date().toISOString();
    }

    // Notify Student
    this.createNotification({
      userId: p.studentId,
      projectId: p.projectId,
      title: "Payment Verification Update",
      message: `Payment of â‚¹${p.amount.toLocaleString("en-IN")} (${p.transactionRef}) updated to ${status.replace(/_/g, " ").toUpperCase()}.`,
      type: "payment_received",
      link: `/student/payments`,
    });

    this.logActivity({
      projectId: p.projectId,
      userId: "admin-1",
      userName: "Elena Rostova",
      userRole: "admin",
      action: "Payment Status Updated",
      details: `Changed transaction ${p.transactionRef} status from ${oldStatus} to ${status}.`,
    });

    this.notify();
    return p;
  }
}

export const mockStore = new MockStore();
