# NOTX — Academic Project Development & Management Platform

A complete, production-grade, full-stack academic project development and lifecycle management platform connecting students, vetted senior developers, and platform administrators.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Firebase Authentication**, **Cloud Firestore**, **Firebase Admin SDK**, **Backblaze B2 (S3-Compatible Object Storage)**, and **Lucide React**.

---

## 🌟 Key Features

### 1. Public Landing Website
- **Hero Section**: *"YOUR IDEA. OUR EXPERTISE. A REAL PROJECT."*
- **6 Core Disciplines**: AI/ML, Full Stack Development, Web Development, Mobile Applications, IoT (Hardware & Embedded), and Software Development.
- **Workflow & Process**: 4-stage "How NOTX Works" and 5-phase "Engineering Lifecycle".
- **Interactive FAQs & Contact**: Consultation inquiry submission with direct responses.
- **Role Routing**: Instant redirect to assigned portals based on verified credentials.

### 2. Student Portal (`/student`) — *Mobile-First App Layout*
- **Mobile Bottom Navigation**: Bottom bar for rapid switching between Overview, Projects, Requirements, Kanban, and Messages.
- **Submit Requirement**: Structured academic problem statement submission with tech stack tags, budget estimation, deadline picker, and document upload.
- **Quotation Management**: Review itemized scope of work, deliverables, and payment milestones. Accept or reject with faculty revision notes.
- **Sprint Kanban**: Visual task progress across *Backlog*, *To Do*, *In Progress*, *Review*, and *Completed*.
- **Backblaze B2 Deliverables**: Direct pre-signed download of source code ZIPs, IEEE reports, and model weights.
- **Real-Time Developer Chat**: Direct communication channel with assigned senior developers.
- **Academic Notes**: Private study memos and shared project specifications.
- **Milestone Verification**: Inspect deliverables and grant official milestone signoff or request revisions.
- **Payment Invoices**: Milestone receipts and university reimbursement documentation.

### 3. Developer Console (`/developer`)
- **Strict Role Isolation**: Developers only have access to projects they are officially assigned to by administrators.
- **Sprint Kanban & Task Backlog**: Create, assign, prioritize (*urgent*, *high*, *medium*, *low*), and drag-and-drop tasks.
- **Backblaze B2 Vault Management**:
  - Folder & subfolder directory tree creation.
  - Direct browser-to-B2 uploads via short-lived pre-signed S3 URLs (no server memory bottlenecks).
  - Multi-file and ZIP archive support.
  - Granular visibility permissions: *Developer Only*, *Student and Developer*, *Admin Only*, *Authorized Members*.
  - Version history bumping (v1 → v2 → v3) and soft deletion.
- **Milestone Submission**: Package milestone deliverables, provide verification instructions, and submit for student client approval.
- **Progress Tracking**: Real-time progress percentage slider directly updating student dashboards.

### 4. Administrator Console (`/admin`)
- **Platform Analytics & Velocity**: Real-time tracking of project valuation ($ USD), active students, developer capacity, and category distribution.
- **Developer Clearance & Approvals**: Review developer applications, inspect technical competencies, and grant administrative clearance.
- **Official Quotation Formulation**: Draft itemized quotations with milestone schedules and binding deliverables.
- **Project Assignments**: Assign or reassign senior developers based on workload and technology stack.
- **Master Backblaze B2 Vault**: Platform-wide deliverable inspection and audit.
- **Supervisory Chat Monitor**: Audit client-developer communication threads.
- **Financial Ledger & Invoices**: Track all student payments and transaction references.
- **Live Audit Activity Logs**: Immutable event stream recording every quotation, upload, milestone approval, and assignment.

### 5. Dedicated Project Workspace (`/workspace/[id]`)
Every project features its own isolated 9-tab workspace:
1. **Overview**: Abstract, problem statement, budget, deadline, tech stack.
2. **Tasks**: Comprehensive task backlog with priority filtering.
3. **Kanban**: Touch-friendly drag-and-drop board.
4. **Files (B2)**: Cloud vault directory tree with pre-signed download and upload.
5. **Chat**: Project-specific real-time messaging.
6. **Notes**: Personal drafts and shared technical specifications.
7. **Milestones**: Formal approval and revision request workflow.
8. **Activity**: Timestamped project audit trail.
9. **Team**: Student owner and assigned developer contacts.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Unified frontend UI and backend API routes in TypeScript |
| **Styling** | Tailwind CSS | Strict white SaaS theme, crisp borders, professional typography |
| **Authentication** | Firebase Auth | Registration, login, password reset, session verification |
| **Database** | Cloud Firestore | 15 relational collections with strict `firestore.rules` |
| **Backend SDK** | Firebase Admin SDK | Server-side bearer token verification on protected APIs |
| **File Storage** | Backblaze B2 (AWS SDK S3) | Pre-signed PUT/GET URLs for direct browser-to-vault file transfer |
| **Icons** | Lucide React | Clean, consistent icons across all viewports |

---

## 🔒 Security & Authorization

- **Client-to-B2 Direct Upload**: Deliverables upload directly to Backblaze B2 via pre-signed S3 URLs, never passing through or consuming Next.js / Vercel server bandwidth.
- **Server-Side Token Verification**: API routes (`/api/...`) extract and verify Firebase Bearer tokens via `verifyAuthToken`.
- **Default Student Role**: All new self-registrations default to **Student**. Developer permissions require explicit administrative approval.
- **Strict Firestore Security Rules**: Fully authored in `firestore.rules` covering all 15 collections.

---

## 🔑 Environment Configuration (`.env.local`)

Copy `.env.example` to `.env.local` and provide your credentials:

```bash
# Firebase Client (Frontend)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Backend)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Backblaze B2 (S3-Compatible Storage)
B2_ENDPOINT=https://s3.us-east-005.backblazeb2.com
B2_REGION=us-east-005
B2_BUCKET_NAME=notx-deliverables
B2_KEY_ID=your_b2_key_id
B2_APPLICATION_KEY=your_b2_application_key
```

*Note: NOTX includes a built-in reactive fallback simulation so all three role dashboards, file uploads, chats, quotations, and Kanban boards work smoothly out-of-the-box even before cloud credentials are provisioned!*

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## ⚡ Instant Reviewer Accounts

For immediate evaluation, the platform includes a floating **Role Preview** switcher in the bottom-right corner and **One-Click Quick Login** buttons on the `/login` page:

| Role | Name | Email | Direct Dashboard |
|---|---|---|---|
| **Student** | Alex Rivera | `student@notx.dev` | [`/student`](http://localhost:3000/student) |
| **Developer** | Marcus Vance | `dev@notx.dev` | [`/developer`](http://localhost:3000/developer) |
| **Admin** | Elena Rostova | `admin@notx.dev` | [`/admin`](http://localhost:3000/admin) |
