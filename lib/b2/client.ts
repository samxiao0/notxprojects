import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const endpoint = process.env.B2_ENDPOINT || "https://s3.us-east-005.backblazeb2.com";
const region = process.env.B2_REGION || "us-east-005";
const bucketName = process.env.B2_BUCKET_NAME || "notx-deliverables";
const keyId = process.env.B2_KEY_ID;
const applicationKey = process.env.B2_APPLICATION_KEY;

export const isB2Configured = Boolean(
  keyId &&
  applicationKey &&
  keyId !== "your_b2_key_id_here" &&
  applicationKey !== "your_b2_application_key_here"
);

export const s3Client = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId: keyId || "mock-key-id",
    secretAccessKey: applicationKey || "mock-app-key",
  },
  forcePathStyle: true, // Needed for many S3-compatible providers like Backblaze B2
});

/**
 * Generates a pre-signed PUT URL for uploading directly from the browser to Backblaze B2.
 * Files never transit through Next.js / Vercel servers!
 */
export async function getPresignedUploadUrl(params: {
  key: string;
  contentType: string;
  expiresInSeconds?: number;
}): Promise<{ uploadUrl: string; key: string }> {
  const expiresIn = params.expiresInSeconds || 300; // 5 minutes default

  if (!isB2Configured) {
    // Return a mocked/fallback direct upload endpoint in demo/dev mode
    return {
      uploadUrl: `/api/files/mock-upload?key=${encodeURIComponent(params.key)}`,
      key: params.key,
    };
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: params.key,
    ContentType: params.contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn });
  return { uploadUrl, key: params.key };
}

/**
 * Generates a pre-signed GET URL for securely downloading or previewing private files.
 */
export async function getPresignedDownloadUrl(params: {
  key: string;
  expiresInSeconds?: number;
  fileName?: string;
}): Promise<string> {
  const expiresIn = params.expiresInSeconds || 900; // 15 minutes default

  if (!isB2Configured) {
    return `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80`;
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: params.key,
    ResponseContentDisposition: params.fileName
      ? `inline; filename="${encodeURIComponent(params.fileName)}"`
      : undefined,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Deletes a file from Backblaze B2
 */
export async function deleteB2File(key: string): Promise<boolean> {
  if (!isB2Configured) return true;

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("B2 file deletion error:", error);
    return false;
  }
}
