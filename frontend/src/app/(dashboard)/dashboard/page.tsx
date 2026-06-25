"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";
import { getUserProfile, getTransactions } from "@/lib/api";

interface ScoreFactor {
  score: number;
  weight: number;
  name: string;
}

interface ScoreData {
  score: number;
  factors: Record<string, ScoreFactor>;
  recommendations: string[];
  potential_score: number;
}

interface UserProfile {
  user: { id: string; name: string; email: string; type: string };
  score: ScoreData;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [transactions, setTransactions] = useState<{ id: string; description: string; amount: number; type: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, txRes] = await Promise.all([
          getUserProfile(),
          getTransactions().catch(() => ({ transactions: [] })),
        ]);
        setProfile(profileRes);
        setTransactions(txRes.transactions || []);

        const storedScore = localStorage.getItem("lastScore");
        if (storedScore) {
          setScoreData(JSON.parse(storedScore));
        } else if (profileRes.score?.score > 0) {
          setScoreData(profileRes.score);
        }
      } catch {
        const storedScore = localStorage.getItem("lastScore");
        if (storedScore) setScoreData(JSON.parse(storedScore));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const userName = profile?.user?.name?.split(" ")[0] || "User";
  const overallScore = scoreData?.score || 0;
  const factors = scoreData?.factors ? Object.values(scoreData.factors) : [];
  const uploadedFiles = transactions.length > 0 ? Math.ceil(transactions.length / 3) : 0;

  const stats = [
    { label: "Credit Score", value: overallScore.toString(), trend: "up" as const, icon: CreditCard, color: "teal" },
    { label: "Transactions Found", value: transactions.length.toString(), trend: "up" as const, icon: FileText, color: "coral" },
    { label: "Files Uploaded", value: uploadedFiles.toString(), trend: "up" as const, icon: Clock, color: "amber" },
    { label: "Potential Score", value: (scoreData?.potential_score || 0).toString(), trend: "up" as const, icon: CheckCircle, color: "teal" },
  ];

  const recentActivity = transactions.slice(0, 5).map((tx) => ({
    title: `${tx.description || "Transaction"} — PKR ${Number(tx.amount).toLocaleString()}`,
    type: tx.type,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">
          Good morning, {userName}
        </h1>
        <p className="text-muted text-sm mt-1">
          Here&apos;s an overview of your credit profile and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-surface rounded-xl p-5 border border-slate-dark hover:border-teal/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 bg-${stat.color}/10 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-teal">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="font-mono text-2xl font-bold text-ink">{stat.value}</div>
            <div className="text-xs text-muted mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-xl border border-slate-dark p-6">
          <h2 className="font-display font-semibold text-base text-ink mb-5">
            Score Breakdown
          </h2>
          {factors.length > 0 ? (
            <div className="space-y-4">
              {factors.map((factor, index) => (
                <motion.div
                  key={factor.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-ink">{factor.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted">({Math.round(factor.weight * 100)}%)</span>
                      <span className="font-mono text-sm font-semibold text-ink">
                        {factor.score}/100
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${factor.score}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className={`h-full rounded-full ${
                        factor.score >= 80 ? "bg-teal" : factor.score >= 60 ? "bg-amber" : "bg-coral"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">Upload data to see your score breakdown.</p>
          )}
        </div>

        <div className="bg-surface rounded-xl border border-slate-dark p-6">
          <h2 className="font-display font-semibold text-base text-ink mb-5">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${activity.type === "income" ? "bg-teal" : "bg-coral"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink truncate">{activity.title}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-muted">No activity yet. Upload data to get started.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/dashboard/upload" className="bg-surface rounded-xl border border-slate-dark p-5 hover:border-teal/30 hover:shadow-md transition-all duration-200 group">
          <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-teal/20 transition-colors">
            <FileText className="w-5 h-5 text-teal" />
          </div>
          <h3 className="font-display font-semibold text-sm text-ink mb-1">Upload New Data</h3>
          <p className="text-xs text-muted">Add WhatsApp exports, receipts, or Excel files</p>
        </a>

        <a href="/dashboard/score" className="bg-surface rounded-xl border border-slate-dark p-5 hover:border-teal/30 hover:shadow-md transition-all duration-200 group">
          <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-coral/20 transition-colors">
            <TrendingUp className="w-5 h-5 text-coral" />
          </div>
          <h3 className="font-display font-semibold text-sm text-ink mb-1">View Full Report</h3>
          <p className="text-xs text-muted">Detailed credit score analysis and recommendations</p>
        </a>

        <div className="bg-gradient-to-br from-ink to-ink/90 rounded-xl p-5 text-white">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
            <CreditCard className="w-5 h-5 text-teal" />
          </div>
          <h3 className="font-display font-semibold text-sm mb-1">Share with Banks</h3>
          <p className="text-xs text-white/60">Send your score report to partner banks</p>
        </div>
      </div>
    </div>
  );
}
