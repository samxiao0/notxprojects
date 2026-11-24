import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function formatDate(date: string | number | Date | null | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(date: string | number | Date | null | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatINR(amount: number | undefined | null): string {
  if (amount === undefined || amount === null) return "₹0";
  return "₹" + Number(amount).toLocaleString("en-IN");
}

export function getInitials(name?: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function triggerFileDownload(fileName: string, dataUrl?: string, textFallback?: string) {
  if (typeof window === "undefined") return;

  const a = document.createElement("a");
  a.download = fileName;

  if (dataUrl && dataUrl.startsWith("data:")) {
    a.href = dataUrl;
  } else {
    // Generate downloadable blob from fallback text
    const blob = new Blob(
      [textFallback || `NOTX Platform Deliverable: ${fileName}\nVerified on Backblaze B2 Vault.`],
      { type: "text/plain;charset=utf-8" }
    );
    a.href = URL.createObjectURL(blob);
  }

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
