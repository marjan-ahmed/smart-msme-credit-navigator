"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Image, FileSpreadsheet, MessageSquare, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { uploadFile, getScore } from "@/lib/api";
import { useRouter } from "next/navigation";

const fileTypes = [
  { id: "whatsapp", label: "WhatsApp Export", icon: MessageSquare, description: "Chat exports with invoices", accept: ".txt,.csv", color: "teal" },
  { id: "receipts", label: "Receipt Photos", icon: Image, description: "Photos of receipts", accept: "image/*", color: "coral" },
  { id: "excel", label: "Excel Sheets", icon: FileSpreadsheet, description: "Transaction logs", accept: ".xlsx,.xls,.csv", color: "amber" },
  { id: "bank", label: "Bank Statements", icon: FileText, description: "PDF or CSV statements", accept: ".pdf,.csv", color: "teal" },
];

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  status: "uploading" | "processing" | "complete" | "error";
  fileId?: string;
}

export default function UploadPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (file: File) => {
    const tempId = Date.now().toString();
    setUploadedFiles((prev) => [...prev, { id: tempId, name: file.name, type: selectedType || "general", status: "uploading" }]);

    try {
      const data = await uploadFile(file);
      setUploadedFiles((prev) => prev.map((f) => f.id === tempId ? { ...f, status: "processing", fileId: data.fileId } : f));

      const score = await getScore(data.fileId);
      localStorage.setItem("lastScore", JSON.stringify(score));
      localStorage.setItem("lastFileId", data.fileId);

      setUploadedFiles((prev) => prev.map((f) => f.id === tempId ? { ...f, status: "complete" } : f));
    } catch (err) {
      setUploadedFiles((prev) => prev.map((f) => f.id === tempId ? { ...f, status: "error" } : f));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    Array.from(e.dataTransfer.files).forEach(handleUpload);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach(handleUpload);
  };

  const hasComplete = uploadedFiles.some((f) => f.status === "complete");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">Upload Data</h1>
        <p className="text-muted text-sm mt-1">Upload your business records for AI-powered credit scoring.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-slate-dark p-6">
            <h2 className="font-display font-semibold text-sm text-ink mb-4">Select Data Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fileTypes.map((type) => (
                <button key={type.id} onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${selectedType === type.id ? `border-${type.color} bg-${type.color}/5` : "border-slate-dark hover:border-muted-light"}`}>
                  <div className={`w-10 h-10 bg-${type.color}/10 rounded-lg flex items-center justify-center mb-3`}>
                    <type.icon className={`w-5 h-5 text-${type.color}`} />
                  </div>
                  <p className="font-medium text-sm text-ink">{type.label}</p>
                  <p className="text-[11px] text-muted mt-1">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop}
            className={`bg-surface rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ${isDragging ? "border-teal bg-teal/5" : "border-slate-dark hover:border-muted-light"}`}>
            <div className="w-16 h-16 bg-slate rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-muted" />
            </div>
            <h3 className="font-display font-semibold text-base text-ink mb-2">Drag & drop files here</h3>
            <p className="text-sm text-muted mb-4">or click to browse from your computer</p>
            <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-ink font-semibold text-sm rounded-lg cursor-pointer hover:bg-teal-hover transition-colors">
              <Upload className="w-4 h-4" />
              Choose Files
              <input type="file" multiple className="hidden" onChange={handleFileInput} accept={selectedType ? fileTypes.find((t) => t.id === selectedType)?.accept : "*"} />
            </label>
            <p className="text-xs text-muted-light mt-4">Supported: CSV, XLSX, TXT, JPG, PNG (Max 10MB)</p>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-slate-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-sm text-ink">Uploaded Files</h2>
            <span className="text-xs text-muted">{uploadedFiles.length} files</span>
          </div>

          {uploadedFiles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-10 h-10 text-muted-light mx-auto mb-3" />
              <p className="text-sm text-muted">No files uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              <AnimatePresence>
                {uploadedFiles.map((file) => (
                  <motion.div key={file.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="p-3 bg-slate rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-muted" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate">{file.name}</p>
                        {file.status === "uploading" && <div className="flex items-center gap-1.5 mt-2"><Loader2 className="w-3 h-3 text-teal animate-spin" /><span className="text-[11px] text-teal">Uploading...</span></div>}
                        {file.status === "processing" && <div className="flex items-center gap-1.5 mt-2"><Loader2 className="w-3 h-3 text-amber animate-spin" /><span className="text-[11px] text-amber">Processing...</span></div>}
                        {file.status === "complete" && <div className="flex items-center gap-1.5 mt-2"><CheckCircle className="w-3 h-3 text-teal" /><span className="text-[11px] text-teal">Scored!</span></div>}
                        {file.status === "error" && <div className="flex items-center gap-1.5 mt-2"><AlertCircle className="w-3 h-3 text-coral" /><span className="text-[11px] text-coral">Failed</span></div>}
                      </div>
                      <button onClick={() => setUploadedFiles((prev) => prev.filter((f) => f.id !== file.id))} className="p-1 hover:bg-surface rounded transition-colors">
                        <X className="w-4 h-4 text-muted" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {hasComplete && (
            <div className="mt-4 pt-4 border-t border-slate-dark">
              <button onClick={() => router.push("/dashboard/score")}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal text-ink font-semibold text-sm rounded-lg hover:bg-teal-hover transition-colors">
                View Credit Score
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
