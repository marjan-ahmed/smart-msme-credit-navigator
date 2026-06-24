"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const scoreFactors = [
  { name: "Cash Flow Regularity", score: 85, weight: "35%" },
  { name: "Revenue Trend", score: 72, weight: "25%" },
  { name: "Expense Management", score: 68, weight: "20%" },
  { name: "Business Longevity", score: 90, weight: "10%" },
  { name: "Digital Footprint", score: 65, weight: "10%" },
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
  if (score >= 80) return { label: "Low Risk", icon: CheckCircle, color: "text-teal" };
  if (score >= 60) return { label: "Medium Risk", icon: AlertCircle, color: "text-amber" };
  return { label: "High Risk", icon: XCircle, color: "text-coral" };
};

export default function Demo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animatedScore, setAnimatedScore] = useState(0);
  const overallScore = 76;

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = overallScore / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= overallScore) {
          setAnimatedScore(overallScore);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  const risk = getRiskLevel(overallScore);

  return (
    <section className="py-24 md:py-32 bg-slate" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <span className="text-teal font-semibold text-xs uppercase tracking-widest font-display">
              Live Demo
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mt-4 mb-5">
              See It In Action
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Watch how our AI analyzes business data and generates a
              comprehensive credit score.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="bg-surface rounded-2xl shadow-xl border border-slate-dark overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-dark bg-slate/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-base text-ink">
                    Karachi Trading Co.
                  </h3>
                  <p className="text-muted text-xs">Retail Business · 3 Years Active</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">Last Updated</p>
                  <p className="text-xs font-medium text-ink">Just Now</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score Display */}
                <div className="lg:col-span-1">
                  <div className="text-center p-6 bg-slate rounded-xl">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#E2E8F0"
                          strokeWidth="6"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                          animate={
                            isInView
                              ? {
                                  strokeDashoffset:
                                    2 * Math.PI * 42 * (1 - animatedScore / 100),
                                }
                              : {}
                          }
                          transition={{ duration: 2, ease: "easeOut" }}
                          className={getScoreColor(overallScore)}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-mono font-bold text-3xl text-ink">
                          {animatedScore}
                        </span>
                        <span className="text-muted text-xs">/100</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-1.5">
                      <risk.icon className={`w-4 h-4 ${risk.color}`} />
                      <span className={`font-semibold text-sm ${risk.color}`}>
                        {risk.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="lg:col-span-2">
                  <h4 className="font-display font-semibold text-sm text-ink mb-4">
                    Score Breakdown
                  </h4>
                  <div className="space-y-3">
                    {scoreFactors.map((factor, index) => (
                      <motion.div
                        key={factor.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-ink">
                              {factor.name}
                            </span>
                            <span className="text-[10px] text-muted">({factor.weight})</span>
                          </div>
                          <span className={`font-mono font-semibold text-xs ${getScoreColor(factor.score)}`}>
                            {factor.score}/100
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-dark rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${factor.score}%` } : {}}
                            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                            className={`h-full ${getScoreBg(factor.score)} rounded-full`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-teal/5 rounded-xl border border-teal/20">
                    <h5 className="font-semibold text-xs text-ink mb-2">
                      Key Recommendations
                    </h5>
                    <ul className="space-y-1.5 text-xs text-muted">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Maintain consistent monthly cash flow above PKR 400,000</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Provide 6+ months of bank statements for better scoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Reduce expense ratio below 65% for higher score</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
