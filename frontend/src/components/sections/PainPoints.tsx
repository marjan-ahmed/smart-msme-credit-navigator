"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Clock, Ban } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Informal Records",
    description: "WhatsApp invoices, handwritten receipts, Excel sheets — banks can't verify them.",
    stat: "59%",
    statLabel: "informal economy",
    color: "coral",
  },
  {
    icon: Ban,
    title: "Collateral Required",
    description: "Banks insist on asset-backed lending, leaving viable businesses out.",
    stat: "Rs 50M",
    statLabel: "clean lending limit",
    color: "amber",
  },
  {
    icon: Clock,
    title: "Slow Underwriting",
    description: "Manual verification takes weeks, losing valuable business opportunities.",
    stat: "3-6",
    statLabel: "weeks to approve",
    color: "teal",
  },
  {
    icon: TrendingDown,
    title: "Credit Invisible",
    description: "Millions of creditworthy businesses rejected due to lack of formal documentation.",
    stat: "5M+",
    statLabel: "SMEs underserved",
    color: "coral",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  coral: { bg: "bg-coral/10", text: "text-coral", border: "border-coral/20" },
  amber: { bg: "bg-amber/10", text: "text-amber", border: "border-amber/20" },
  teal: { bg: "bg-teal/10", text: "text-teal", border: "border-teal/20" },
};

export default function PainPoints() {
  return (
    <section className="py-24 md:py-32 bg-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <span className="text-teal font-semibold text-xs uppercase tracking-widest font-display">
              The Problem
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mt-4 mb-5">
              5 Million SMEs.
              <br />
              40% of GDP.
              <br />
              <span className="text-coral">Still Credit-Starved.</span>
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Pakistan&apos;s banks rely on collateral and formal documentation,
              excluding thousands of potentially creditworthy businesses.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {painPoints.map((point, index) => (
            <ScrollReveal key={point.title} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -2 }}
                className={`relative p-6 bg-surface rounded-xl border ${colorMap[point.color].border} hover:shadow-lg transition-all duration-300 group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${colorMap[point.color].bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <point.icon className={`w-5 h-5 ${colorMap[point.color].text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-base text-ink mb-1">
                      {point.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-3">{point.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className={`font-mono font-bold text-xl ${colorMap[point.color].text}`}>
                        {point.stat}
                      </span>
                      <span className="text-xs text-muted">{point.statLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 p-6 bg-ink rounded-xl text-white">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-sm font-bold">PKR</span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-base mb-1">
                  Real Example: Shop Owner in Karachi
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3">
                  Earns PKR 500,000/month, has consistent customers, makes profit.
                  But records are stored in WhatsApp chats, receipt photos, and Excel files.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 bg-white/10 rounded-md">
                    <span className="text-white/50 text-xs">Result:</span>
                    <span className="text-white font-semibold text-xs ml-1.5">Loan Rejected</span>
                  </div>
                  <div className="px-3 py-1.5 bg-coral/20 rounded-md">
                    <span className="text-white/50 text-xs">Even though:</span>
                    <span className="text-white font-semibold text-xs ml-1.5">Business is Healthy</span>
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
