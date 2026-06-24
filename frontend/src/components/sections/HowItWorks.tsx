"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Brain, FileCheck } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Data",
    description:
      "Bank CSVs, receipt images, Excel files, or WhatsApp exports. Our AI handles messy, informal data.",
    color: "teal",
    items: ["Bank Statements", "Receipt Photos", "Excel Sheets", "WhatsApp Chats"],
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analyzes",
    description:
      "Our AI engine extracts cash flow patterns, revenue trends, and expense management metrics.",
    color: "coral",
    items: ["Cash Flow Analysis", "Revenue Trends", "Expense Ratios", "Risk Assessment"],
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Get Your Score",
    description:
      "Receive a bank-ready credit score with detailed breakdown, recommendations, and documentation checklist.",
    color: "amber",
    items: ["Credit Score", "Risk Level", "Recommendations", "Documentation Guide"],
  },
];

const colorMap: Record<string, string> = {
  teal: "bg-teal",
  coral: "bg-coral",
  amber: "bg-amber",
};

export default function HowItWorks() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-surface"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <span className="text-teal font-semibold text-xs uppercase tracking-widest font-display">
              How It Works
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mt-4 mb-5">
              Three Steps to
              <br />
              Credit Access
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              No complex forms. No collateral. Just upload your data and let our
              AI do the rest.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.12}>
              <div className="relative">
                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`w-12 h-12 ${colorMap[step.color]} rounded-xl flex items-center justify-center mb-5 relative z-10`}
                >
                  <span className="text-white font-mono font-bold text-sm">
                    {step.number}
                  </span>
                </motion.div>

                {/* Card */}
                <div className="bg-slate rounded-xl p-6 border border-slate-dark hover:border-teal/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5 text-ink" />
                  </div>

                  <h3 className="font-display font-semibold text-base text-ink mb-2">
                    {step.title}
                  </h3>

                  <p className="text-muted text-sm leading-relaxed mb-4">{step.description}</p>

                  <ul className="space-y-1.5">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs">
                        <div className="w-1 h-1 bg-teal rounded-full" />
                        <span className="text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
