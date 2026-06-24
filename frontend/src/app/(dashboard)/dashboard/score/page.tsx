"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  Share2,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const scoreFactors = [
  {
    name: "Cash Flow Regularity",
    score: 85,
    weight: "35%",
    description: "Consistent monthly inflows indicate stable business operations",
    status: "good",
  },
  {
    name: "Revenue Trend",
    score: 72,
    weight: "25%",
    description: "Revenue growing steadily over the past 6 months",
    status: "good",
  },
  {
    name: "Expense Management",
    score: 68,
    weight: "20%",
    description: "Expense ratio slightly high, room for improvement",
    status: "warning",
  },
  {
    name: "Business Longevity",
    score: 90,
    weight: "10%",
    description: "3+ years of business history demonstrates stability",
    status: "good",
  },
  {
    name: "Digital Footprint",
    score: 65,
    weight: "10%",
    description: "Digital transaction records available and verified",
    status: "warning",
  },
];

const recommendations = [
  {
    priority: "high",
    title: "Reduce expense ratio below 65%",
    description:
      "Your current expense ratio is 72%. Reducing operational costs will significantly improve your score.",
    impact: "+8 points",
  },
  {
    priority: "medium",
    title: "Provide 6+ months of bank statements",
    description:
      "More historical data improves accuracy of cash flow analysis.",
    impact: "+5 points",
  },
  {
    priority: "low",
    title: "Add digital payment records",
    description:
      "Connect JazzCash or Easypaisa accounts to strengthen digital footprint score.",
    impact: "+3 points",
  },
];

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-teal";
  if (score >= 60) return "text-amber";
  return "text-coral";
};

const getScoreBg = (score: number) => {
  if (score >= 80) return "bg-teal";
  if (score >= 60) return "bg-amber";
  return "bg-coral";
};

const getRiskLevel = (score: number) => {
  if (score >= 80) return { label: "Low Risk", icon: CheckCircle, color: "teal" };
  if (score >= 60) return { label: "Medium Risk", icon: AlertCircle, color: "amber" };
  return { label: "High Risk", icon: XCircle, color: "coral" };
};

const overallScore = 76;
const risk = getRiskLevel(overallScore);

export default function ScorePage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink">
            Credit Score Report
          </h1>
          <p className="text-muted text-sm mt-1">
            Detailed analysis of your creditworthiness based on uploaded data.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-slate-dark rounded-lg text-sm font-medium text-ink hover:bg-slate transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal text-ink font-semibold text-sm rounded-lg hover:bg-teal-hover transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </div>

      {/* Score overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main score */}
        <div className="bg-surface rounded-xl border border-slate-dark p-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-40 h-40 mx-auto mb-6"
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 42 * (1 - overallScore / 100),
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={getScoreColor(overallScore)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-4xl font-bold text-ink">
                {overallScore}
              </span>
              <span className="text-muted text-xs">/100</span>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <risk.icon className={`w-5 h-5 text-${risk.color}`} />
            <span className={`font-semibold text-${risk.color}`}>{risk.label}</span>
          </div>
          <p className="text-xs text-muted">
            Updated 3 hours ago based on 24 documents
          </p>
        </div>

        {/* Factor breakdown */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-slate-dark p-6">
          <h2 className="font-display font-semibold text-base text-ink mb-5">
            Score Factors
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
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-ink">{factor.name}</span>
                    <span className="text-[10px] text-muted">({factor.weight})</span>
                  </div>
                  <span className={`font-mono text-sm font-semibold ${getScoreColor(factor.score)}`}>
                    {factor.score}/100
                  </span>
                </div>
                <div className="h-2 bg-slate rounded-full overflow-hidden mb-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.score}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className={`h-full ${getScoreBg(factor.score)} rounded-full`}
                  />
                </div>
                <p className="text-[11px] text-muted">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-surface rounded-xl border border-slate-dark p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-base text-ink">
            Recommendations
          </h2>
          <span className="text-xs text-muted">Potential impact on your score</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="p-4 bg-slate rounded-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                    rec.priority === "high"
                      ? "bg-coral/10 text-coral"
                      : rec.priority === "medium"
                      ? "bg-amber/10 text-amber"
                      : "bg-teal/10 text-teal"
                  }`}
                >
                  {rec.priority.toUpperCase()}
                </span>
                <span className="text-[11px] text-teal font-medium flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {rec.impact}
                </span>
              </div>
              <h3 className="font-medium text-sm text-ink mb-1">{rec.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{rec.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-gradient-to-br from-ink to-ink/90 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-teal" />
          <h2 className="font-display font-semibold text-base">
            Score Potential
          </h2>
        </div>
        <p className="text-sm text-white/70 mb-4">
          By following the recommendations above, your score could improve from{" "}
          <span className="text-white font-semibold">76</span> to{" "}
          <span className="text-teal font-semibold">92</span> within 3 months.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "76%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-amber rounded-full"
            />
          </div>
          <span className="text-sm font-mono">76 → 92</span>
          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-full bg-teal rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
