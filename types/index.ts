export type UserRole = "student" | "developer" | "admin";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  phoneNumber?: string;
  bio?: string;
  institution?: string;
  skills?: string[];
  isApproved?: boolean; // For developers requiring admin approval
  status: "active" | "pending" | "suspended";
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus =
  | "requirement_submitted"
  | "quotation_sent"
  | "quotation_accepted"
  | "assigned"
  | "in_progress"
  | "review"
  | "completed"
  | "cancelled";

export type ProjectCategory =
  | "AI/ML"
  | "Full Stack Development"
  | "Web Development"
  | "Mobile Applications"
  | "IoT"
  | "Software Development";

export type ProjectPlanTier = "standard_4000" | "premium_5000";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  planTier?: ProjectPlanTier;
  studentId: string;
  studentName: string;
  studentEmail: string;
  developerId?: string | null;
  developerName?: string | null;
  developerEmail?: string | null;
  assignmentStatus?: "unassigned" | "pending_acceptance" | "accepted" | "declined";
  submissionStatus?: "in_progress" | "submitted_for_admin_approval" | "approved";
  finalSubmissionNotes?: string;
  status: ProjectStatus;
  budget?: number; // In INR (₹)
  originalPrice?: number; // In INR (₹) before discount
  discountAmount?: number; // In INR (₹)
  discountReason?: string;
  finalPrice?: number; // In INR (₹) net payable
  paidAmount?: number; // In INR (₹) verified total
  deadline?: string;
  techStack: string[];
  requirementsDocUrl?: string;
  githubRepoUrl?: string;
  liveDemoUrl?: string;
  progressPercent: number;
  createdAt: string;
  updatedAt: string;
}

export type QuotationStatus = "draft" | "sent" | "negotiating" | "accepted" | "rejected" | "expired";

export interface Quotation {
  id: string;
  projectId: string;
  projectTitle: string;
  planTier?: ProjectPlanTier;
  studentId: string;
  studentEmail: string;
  adminId: string;
  baseAmount?: number; // In INR (₹) before discount
  discountAmount?: number; // In INR (₹)
  discountReason?: string;
  amount: number; // In INR (₹) net payable after discount
  currency: string;
  deliveryDays: number;
  scopeOfWork: string[];
  deliverables: string[];
  paymentMilestones: {
    description: string;
    percentage: number;
    amount: number;
  }[];
  termsAndConditions: string;
  status: QuotationStatus;
  counterOfferAmount?: number; // In INR (₹) proposed by student
  counterOfferNote?: string;
  rejectionReason?: string;
  chatId?: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string | null; // Developer UID or Admin UID
  assignedToName?: string | null;
  createdBy: string;
  createdByName: string;
  deadline?: string;
  tags?: string[];
  attachmentsCount?: number;
  commentsCount?: number;
  order: number;
  devApproved?: boolean;
  devApprovedAt?: string;
  studentApproved?: boolean;
  studentApprovedAt?: string;
  revisionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type MilestoneStatus =
  | "pending"
  | "in_progress"
  | "submitted_for_review"
  | "approved"
  | "revision_requested";

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  order: number;
  status: MilestoneStatus;
  deliverables?: string[];
  dueDate?: string;
  submittedAt?: string;
  submissionNotes?: string;
  devApproved?: boolean;
  studentApproved?: boolean;
  adminApproved?: boolean;
  approvedAt?: string;
  revisionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFolder {
  id: string;
  projectId: string;
  parentId: string | null; // null for root folder
  name: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type FileVisibility =
  | "developer_only"
  | "student_and_developer"
  | "admin_only"
  | "authorized_project_members";

export interface ProjectFile {
  id: string;
  projectId: string;
  folderId: string | null;
  fileName: string;
  fileSize: number;
  mimeType: string;
  s3Key: string;
  b2Url?: string; // Pre-signed or storage path
  dataUrl?: string; // Real file data URL for direct download
  version: number;
  visibility: FileVisibility;
  uploadedBy: string;
  uploadedByName: string;
  uploadedByRole: UserRole;
  isDeleted: boolean;
  deletedAt?: string;
  description?: string;
  previousVersions?: {
    version: number;
    s3Key: string;
    fileSize: number;
    uploadedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatConversation {
  id: string;
  projectId: string;
  projectTitle: string;
  participants: string[]; // UIDs
  participantDetails: {
    [uid: string]: {
      displayName: string;
      role: UserRole;
      avatarUrl?: string;
    };
  };
  lastMessage?: {
    text: string;
    senderId: string;
    senderName: string;
    timestamp: string;
  };
  unreadCounts: {
    [uid: string]: number;
  };
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  attachments?: {
    fileName: string;
    fileSize: number;
    fileType: string;
    fileUrl: string;
    s3Key?: string;
  }[];
  replyToMessageId?: string;
  replyToText?: string;
  replyToSenderName?: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  readBy: string[]; // Array of UIDs who read the message
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  projectId?: string | null;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  title: string;
  content: string;
  category: "personal" | "requirements" | "meeting" | "technical" | "general";
  isShared: boolean; // false = personal note, true = shared project note
  tags?: string[];
  attachments?: {
    fileName: string;
    url: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  taskId: string;
  projectId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type NotificationType =
  | "project_assigned"
  | "quotation_received"
  | "quotation_accepted"
  | "quotation_rejected"
  | "milestone_submitted"
  | "milestone_approved"
  | "milestone_revision"
  | "new_message"
  | "task_assigned"
  | "task_status_changed"
  | "file_uploaded"
  | "payment_received"
  | "deadline_approaching"
  | "system_alert";

export interface NotificationItem {
  id: string;
  userId: string;
  projectId?: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  projectId?: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export type PaymentStatus =
  | "payment_success"
  | "payment_under_review"
  | "payment_failed"
  | "completed"
  | "pending";

export type PaymentType = "advance" | "milestone" | "final" | "full";

export interface PaymentRecord {
  id: string;
  projectId: string;
  projectTitle: string;
  studentId: string;
  studentName: string;
  quotationId?: string;
  amount: number; // In INR (₹)
  currency: string;
  milestoneTitle?: string;
  paymentType?: PaymentType;
  paymentMethod: string; // "UPI (GPay / PhonePe / Paytm)", "Bank Transfer (NEFT/IMPS)", "Card", "Direct / Cash"
  transactionRef: string;
  status: PaymentStatus;
  notes?: string;
  paidAt?: string;
  createdAt: string;
}

export interface DeveloperAssignment {
  id: string;
  projectId: string;
  developerId: string;
  developerName: string;
  assignedByAdminId: string;
  assignedAt: string;
  status: "active" | "reassigned" | "completed";
  notes?: string;
}
