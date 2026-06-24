"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    label: "Credit Score",
    value: "76",
    change: "+4",
    trend: "up",
    icon: CreditCard,
    color: "teal",
  },
  {
    label: "Documents Uploaded",
    value: "24",
    change: "+8",
    trend: "up",
    icon: FileText,
    color: "coral",
  },
  {
    label: "Processing Time",
    value: "2.4s",
    change: "-0.3s",
    trend: "up",
    icon: Clock,
    color: "amber",
  },
  {
    label: "Approval Rate",
    value: "92%",
    change: "+5%",
    trend: "up",
    icon: CheckCircle,
    color: "teal",
  },
];

const recentActivity = [
  {
    title: "WhatsApp Chat Export uploaded",
    time: "2 hours ago",
    type: "upload",
  },
  {
    title: "Credit score updated: 76 (+4)",
    time: "3 hours ago",
    type: "score",
  },
  {
    title: "Bank statement analyzed",
    time: "5 hours ago",
    type: "analysis",
  },
  {
    title: "Receipt batch processed (12 files)",
    time: "Yesterday",
    type: "upload",
  },
  {
    title: "Monthly report generated",
    time: "Yesterday",
    type: "report",
  },
];

const scoreFactors = [
  { name: "Cash Flow Regularity", score: 85, weight: "35%" },
  { name: "Revenue Trend", score: 72, weight: "25%" },
  { name: "Expense Management", score: 68, weight: "20%" },
  { name: "Business Longevity", score: 90, weight: "10%" },
  { name: "Digital Footprint", score: 65, weight: "10%" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-ink">
          Good morning, Ahmed
        </h1>
        <p className="text-muted text-sm mt-1">
          Here&apos;s an overview of your credit profile and recent activity.
        </p>
      </div>

      {/* Stats grid */}
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
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up" ? "text-teal" : "text-coral"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="font-mono text-2xl font-bold text-ink">{stat.value}</div>
            <div className="text-xs text-muted mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score breakdown */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-slate-dark p-6">
          <h2 className="font-display font-semibold text-base text-ink mb-5">
            Score Breakdown
          </h2>
          <div className="space-y-4">
            {scoreFactors.map((factor, index) => (
              <motion.div
                key={factor.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-ink">{factor.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted">({factor.weight})</span>
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
                      factor.score >= 80
                        ? "bg-teal"
                        : factor.score >= 60
                        ? "bg-amber"
                        : "bg-coral"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-surface rounded-xl border border-slate-dark p-6">
          <h2 className="font-display font-semibold text-base text-ink mb-5">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink truncate">{activity.title}</p>
                  <p className="text-xs text-muted mt-0.5">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="/dashboard/upload"
          className="bg-surface rounded-xl border border-slate-dark p-5 hover:border-teal/30 hover:shadow-md transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-teal/20 transition-colors">
            <FileText className="w-5 h-5 text-teal" />
          </div>
          <h3 className="font-display font-semibold text-sm text-ink mb-1">
            Upload New Data
          </h3>
          <p className="text-xs text-muted">
            Add WhatsApp exports, receipts, or Excel files
          </p>
        </a>

        <a
          href="/dashboard/score"
          className="bg-surface rounded-xl border border-slate-dark p-5 hover:border-teal/30 hover:shadow-md transition-all duration-200 group"
        >
          <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-coral/20 transition-colors">
            <TrendingUp className="w-5 h-5 text-coral" />
          </div>
          <h3 className="font-display font-semibold text-sm text-ink mb-1">
            View Full Report
          </h3>
          <p className="text-xs text-muted">
            Detailed credit score analysis and recommendations
          </p>
        </a>

        <div className="bg-gradient-to-br from-ink to-ink/90 rounded-xl p-5 text-white">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3">
            <CreditCard className="w-5 h-5 text-teal" />
          </div>
          <h3 className="font-display font-semibold text-sm mb-1">
            Share with Banks
          </h3>
          <p className="text-xs text-white/60">
            Send your score report to partner banks
          </p>
        </div>
      </div>
    </div>
  );
}
