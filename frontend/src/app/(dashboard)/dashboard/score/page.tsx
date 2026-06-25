"use client";

import { useEffect, useState } from "react";
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
import { getUserProfile } from "@/lib/api";

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

export default function ScorePage() {
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const storedScore = localStorage.getItem("lastScore");
        if (storedScore) {
          setScoreData(JSON.parse(storedScore));
        } else {
          const profile = await getUserProfile();
          if (profile.score?.score > 0) {
            setScoreData(profile.score);
          }
        }
      } catch {
        const storedScore = localStorage.getItem("lastScore");
        if (storedScore) setScoreData(JSON.parse(storedScore));
      } finally {
        setLoading(false);
      }
    };
    fetchScore();
  }, []);

  const overallScore = scoreData?.score || 0;
  const factors = scoreData?.factors ? Object.values(scoreData.factors) : [];
  const recommendations = scoreData?.recommendations || [];
  const potentialScore = scoreData?.potential_score || 0;
  const risk = getRiskLevel(overallScore);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
      </div>
    );
  }

  if (overallScore === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink">Credit Score Report</h1>
          <p className="text-muted text-sm mt-1">Upload data to generate your credit score.</p>
        </div>
        <div className="bg-surface rounded-xl border border-slate-dark p-12 text-center">
          <CreditCard className="w-12 h-12 text-muted-light mx-auto mb-4" />
          <h2 className="font-display font-semibold text-lg text-ink mb-2">No Score Yet</h2>
          <p className="text-sm text-muted mb-6">Upload a CSV, Excel, or WhatsApp export file to generate your credit score.</p>
          <a href="/dashboard/upload" className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-ink font-semibold text-sm rounded-lg hover:bg-teal-hover transition-colors">
            Upload Data
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink">Credit Score Report</h1>
          <p className="text-muted text-sm mt-1">Detailed analysis of your creditworthiness based on uploaded data.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface rounded-xl border border-slate-dark p-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-40 h-40 mx-auto mb-6"
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - overallScore / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={getScoreColor(overallScore)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-4xl font-bold text-ink">{overallScore}</span>
              <span className="text-muted text-xs">/100</span>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <risk.icon className={`w-5 h-5 text-${risk.color}`} />
            <span className={`font-semibold text-${risk.color}`}>{risk.label}</span>
          </div>
          <p className="text-xs text-muted">Based on uploaded transaction data</p>
        </div>

        <div className="lg:col-span-2 bg-surface rounded-xl border border-slate-dark p-6">
          <h2 className="font-display font-semibold text-base text-ink mb-5">Score Factors</h2>
          <div className="space-y-4">
            {factors.map((factor, index) => (
              <motion.div
                key={factor.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-ink">{factor.name}</span>
                    <span className="text-[10px] text-muted">({Math.round(factor.weight * 100)}%)</span>
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
              </motion.div>
            ))}
            {factors.length === 0 && (
              <p className="text-sm text-muted">No factors calculated yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-slate-dark p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-base text-ink">Recommendations</h2>
        </div>
        {recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-slate rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                <p className="text-sm text-ink">{rec}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No recommendations yet. Upload data to get personalized tips.</p>
        )}
      </div>

      {potentialScore > overallScore && (
        <div className="bg-gradient-to-br from-ink to-ink/90 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-teal" />
            <h2 className="font-display font-semibold text-base">Score Potential</h2>
          </div>
          <p className="text-sm text-white/70 mb-4">
            By following the recommendations above, your score could improve from{" "}
            <span className="text-white font-semibold">{overallScore}</span> to{" "}
            <span className="text-teal font-semibold">{potentialScore}</span>.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-amber rounded-full"
              />
            </div>
            <span className="text-sm font-mono">{overallScore} → {potentialScore}</span>
            <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${potentialScore}%` }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-full bg-teal rounded-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CreditCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
