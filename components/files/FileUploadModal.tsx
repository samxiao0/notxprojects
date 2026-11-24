"use client";

import React, { useState, useRef } from "react";
import { mockStore } from "@/lib/mock-store";
import { FileVisibility, ProjectFolder, UserRole } from "@/types";
import { formatBytes } from "@/lib/utils";
import {
  UploadCloud,
  File,
  FileText,
  FileArchive,
  FileCode,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Lock,
  Globe,
  Folder,
} from "lucide-react";

interface FileUploadModalProps {
  projectId: string;
  folders: ProjectFolder[];
  selectedFolderId?: string | null;
  uploadedBy: string;
  uploadedByName: string;
  uploadedByRole: UserRole;
  isOpen: boolean;
  onClose: () => void;
  onUploaded?: (fileName: string) => void;
}

export default function FileUploadModal({
  projectId,
  folders,
  selectedFolderId = null,
  uploadedBy,
  uploadedByName,
  uploadedByRole,
  isOpen,
  onClose,
  onUploaded,
}: FileUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(selectedFolderId || null);
  const [visibility, setVisibility] = useState<FileVisibility>(
    uploadedByRole === "developer" ? "student_and_developer" : "authorized_project_members"
  );
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "pdf" || ext === "doc" || ext === "docx") return FileText;
    if (ext === "zip" || ext === "tar" || ext === "gz" || ext === "rar") return FileArchive;
    if (ext === "py" || ext === "ts" || ext === "tsx" || ext === "js" || ext === "cpp" || ext === "c" || ext === "json") return FileCode;
    if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "svg") return ImageIcon;
    return File;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: globalThis.File) => {
    setSelectedFile(file);
    // Read as Data URL so user can actually download or preview it later
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(15);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 25;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Save to mockStore with real metadata & dataUrl
      mockStore.createFile({
        projectId,
        folderId: folderId || null,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        mimeType: selectedFile.type || "application/octet-stream",
        s3Key: `${projectId}/${folderId || "root"}/${Date.now()}_${selectedFile.name}`,
        b2Url: `https://f004.backblazeb2.com/file/notx-vault/${projectId}/${selectedFile.name}`,
        dataUrl: fileDataUrl || undefined,
        version: 1,
        visibility,
        uploadedBy,
        uploadedByName,
        uploadedByRole,
        isDeleted: false,
        description: description.trim() || undefined,
      });

      setTimeout(() => {
        setIsUploading(false);
        if (onUploaded) onUploaded(selectedFile.name);
        onClose();
      }, 300);
    }, 700);
  };

  const FileIconComponent = selectedFile ? getFileIcon(selectedFile.name) : File;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-float border border-slate-200 text-xs animate-in fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Upload Project Deliverable</h3>
            <p className="text-[11px] text-slate-500">
              Drag and drop files or choose from your computer. Backblaze B2 Vault storage.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          {/* Drag and Drop Zone */}
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-50/70 scale-[1.01]"
                  : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/60"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2.5">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="font-bold text-slate-800 text-xs mb-1">
                Click to browse or drag file here
              </p>
              <p className="text-[11px] text-slate-400">
                Supports PDF, ZIP archives, Python/JS source code, Datasets, Word docs (up to 500 MB)
              </p>
            </div>
          ) : (
            /* Selected File Preview */
            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <FileIconComponent className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-900 text-xs truncate">{selectedFile.name}</p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {formatBytes(selectedFile.size)} • {selectedFile.type || "Document"}
                  </p>
                </div>
              </div>

              {!isUploading && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setFileDataUrl(null);
                  }}
                  className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors shrink-0"
                  title="Remove File"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Folder & Visibility Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Vault Folder</label>
              <select
                value={folderId || ""}
                onChange={(e) => setFolderId(e.target.value || null)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">Root Vault Directory</option>
                {folders.map((f) => (
                  <option key={f.id} value={f.id}>
                    📁 {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Visibility Permissions</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as FileVisibility)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="student_and_developer">Student & Developer (Visible to all)</option>
                <option value="developer_only">Developer Only (Internal Scratchpad)</option>
                <option value="authorized_project_members">All Authorized Project Members</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Notes / Version Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Initial draft, includes chapter 3 IEEE citations"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-semibold text-blue-700">
                <span>Uploading deliverable to Backblaze B2...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedFile || isUploading}
              className={`px-5 py-2 rounded-xl font-semibold text-white shadow-xs transition-colors flex items-center gap-1.5 ${
                !selectedFile || isUploading
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              {isUploading ? "Uploading..." : "Upload Deliverable"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
