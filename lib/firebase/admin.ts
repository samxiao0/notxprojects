import * as admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (privateKey) {
  // Replace escaped newlines if passed as single-line string
  privateKey = privateKey.replace(/\\n/g, "\n");
}

export const isFirebaseAdminConfigured = Boolean(projectId && clientEmail && privateKey);

if (!admin.apps.length && isFirebaseAdminConfigured) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } catch (error) {
    console.warn("Failed to initialize Firebase Admin SDK:", error);
  }
}

export const adminAuth = isFirebaseAdminConfigured ? admin.auth() : null;
export const adminDb = isFirebaseAdminConfigured ? admin.firestore() : null;

export interface VerifiedAuthUser {
  uid: string;
  email?: string;
  role: "student" | "developer" | "admin";
}

/**
 * Verifies the Firebase Authorization Bearer token from the incoming Request.
 */
export async function verifyAuthToken(req: Request): Promise<VerifiedAuthUser | null> {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split("Bearer ")[1]?.trim();
  if (!token) return null;

  // In local test/demo simulation mode when admin SDK is not yet configured:
  if (!adminAuth) {
    // If client sent a demo token like "demo-token:student" or JWT
    if (token.startsWith("demo-token:")) {
      const parts = token.split(":");
      const role = (parts[1] as "student" | "developer" | "admin") || "student";
      const uid = parts[2] || `demo-${role}-user`;
      return { uid, email: `${role}@notx.dev`, role };
    }
    return null;
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    let role = (decodedToken.role as "student" | "developer" | "admin") || "student";

    // If role is not in custom claims, query the user document in firestore
    if (!decodedToken.role && adminDb) {
      const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData?.role) {
          role = userData.role;
        }
      }
    }

    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role,
    };
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}
