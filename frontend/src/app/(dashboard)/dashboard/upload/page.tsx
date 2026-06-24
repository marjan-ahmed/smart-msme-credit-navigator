"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Image,
  FileSpreadsheet,
  MessageSquare,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const fileTypes = [
  {
    id: "whatsapp",
    label: "WhatsApp Export",
    icon: MessageSquare,
    description: "Chat exports with invoices and receipts",
    accept: ".txt,.csv",
    color: "teal",
  },
  {
    id: "receipts",
    label: "Receipt Photos",
    icon: Image,
    description: "Photos of handwritten or printed receipts",
    accept: "image/*",
    color: "coral",
  },
  {
    id: "excel",
    label: "Excel Sheets",
    icon: FileSpreadsheet,
    description: "Business records and transaction logs",
    accept: ".xlsx,.xls,.csv",
    color: "amber",
  },
  {
    id: "bank",
    label: "Bank Statements",
    icon: FileText,
    description: "PDF or CSV bank statements",
    accept: ".pdf,.csv",
    color: "teal",
  },
];

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  status: "uploading" | "processing" | "complete" | "error";
  progress: number;
}

export default function UploadPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const simulateUpload = (fileName: string, type: string) => {
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: fileName,
      type,
      size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
      status: "uploading",
      progress: 0,
    };

    setUploadedFiles((prev) => [newFile, ...prev]);

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(uploadInterval);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === newFile.id ? { ...f, status: "processing", progress: 100 } : f
          )
        );
        // Simulate processing
        setTimeout(() => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === newFile.id ? { ...f, status: "complete" } : f
            )
          );
        }, 2000);
      } else {
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === newFile.id ? { ...f, progress } : f))
        );
      }
    }, 500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      simulateUpload(file.name, selectedType || "general");
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      simulateUpload(file.name, selectedType || "general");
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">
          Upload Data
        </h1>
        <p className="text-muted text-sm mt-1">
          Upload your informal business records for AI-powered credit scoring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Upload area */}
        <div className="lg:col-span-2 space-y-6">
          {/* File type selection */}
          <div className="bg-surface rounded-xl border border-slate-dark p-6">
            <h2 className="font-display font-semibold text-sm text-ink mb-4">
              Select Data Type
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fileTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedType === type.id
                      ? `border-${type.color} bg-${type.color}/5`
                      : "border-slate-dark hover:border-muted-light"
                  }`}
                >
                  <div className={`w-10 h-10 bg-${type.color}/10 rounded-lg flex items-center justify-center mb-3`}>
                    <type.icon className={`w-5 h-5 text-${type.color}`} />
                  </div>
                  <p className="font-medium text-sm text-ink">{type.label}</p>
                  <p className="text-[11px] text-muted mt-1">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`bg-surface rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
              isDragging
                ? "border-teal bg-teal/5"
                : "border-slate-dark hover:border-muted-light"
            }`}
          >
            <div className="w-16 h-16 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-muted" />
            </div>
            <h3 className="font-display font-semibold text-base text-ink mb-2">
              Drag & drop files here
            </h3>
            <p className="text-sm text-muted mb-4">
              or click to browse from your computer
            </p>
            <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-ink font-semibold text-sm rounded-lg cursor-pointer hover:bg-teal-hover transition-colors">
              <Upload className="w-4 h-4" />
              Choose Files
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileInput}
                accept={selectedType ? fileTypes.find((t) => t.id === selectedType)?.accept : "*"}
              />
            </label>
            <p className="text-xs text-muted-light mt-4">
              Supported: PDF, CSV, XLSX, TXT, JPG, PNG (Max 10MB per file)
            </p>
          </div>
        </div>

        {/* Right - Uploaded files */}
        <div className="bg-surface rounded-xl border border-slate-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-sm text-ink">
              Uploaded Files
            </h2>
            <span className="text-xs text-muted">{uploadedFiles.length} files</span>
          </div>

          {uploadedFiles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-10 h-10 text-muted-light mx-auto mb-3" />
              <p className="text-sm text-muted">No files uploaded yet</p>
              <p className="text-xs text-muted-light mt-1">
                Upload data to improve your credit score
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              <AnimatePresence>
                {uploadedFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-3 bg-slate rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-muted" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate">
                          {file.name}
                        </p>
                        <p className="text-[11px] text-muted mt-0.5">{file.size}</p>
                        {file.status === "uploading" && (
                          <div className="mt-2">
                            <div className="h-1.5 bg-slate-dark rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-teal rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${file.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {file.status === "processing" && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <Loader2 className="w-3 h-3 text-amber animate-spin" />
                            <span className="text-[11px] text-amber">Processing...</span>
                          </div>
                        )}
                        {file.status === "complete" && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <CheckCircle className="w-3 h-3 text-teal" />
                            <span className="text-[11px] text-teal">Processed</span>
                          </div>
                        )}
                        {file.status === "error" && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <AlertCircle className="w-3 h-3 text-coral" />
                            <span className="text-[11px] text-coral">Failed</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 hover:bg-surface rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-muted" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-dark">
              <a
                href="/dashboard/score"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal text-ink font-semibold text-sm rounded-lg hover:bg-teal-hover transition-colors"
              >
                View Credit Score
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
