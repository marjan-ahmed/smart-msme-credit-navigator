"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Store, ArrowRight, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

const tabs = [
  { id: "banks", label: "For Banks", icon: Building2 },
  { id: "smes", label: "For SMEs", icon: Store },
];

const content = {
  banks: {
    title: "Smarter Lending Decisions",
    subtitle: "Reduce risk, increase SME portfolio",
    benefits: [
      "AI-powered credit scoring for better risk assessment",
      "Faster underwriting — decisions in hours, not weeks",
      "Access to 5M+ previously invisible SMEs",
      "Detailed cash flow analysis and trend forecasting",
      "API integration with existing banking systems",
      "SBP compliant alternative data usage",
    ],
    stats: [
      { value: "40%", label: "Lower default rates" },
      { value: "10x", label: "Faster processing" },
      { value: "5M+", label: "New market opportunity" },
    ],
  },
  smes: {
    title: "Get the Credit You Deserve",
    subtitle: "No collateral, no complicated forms",
    benefits: [
      "Upload informal records — WhatsApp, receipts, Excel",
      "Get instant credit score and recommendations",
      "No collateral required for small business loans",
      "Transparent process — know exactly what you need",
      "Documentation checklist for loan applications",
      "Connect with multiple banks at once",
    ],
    stats: [
      { value: "72hrs", label: "Average approval time" },
      { value: "3x", label: "Higher approval rate" },
      { value: "0", label: "Collateral required" },
    ],
  },
};

export default function DualAudience() {
  const [activeTab, setActiveTab] = useState("banks");

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <span className="text-teal font-semibold text-xs uppercase tracking-widest font-display">
              Built For Everyone
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mt-4 mb-5">
              One Platform, Two Solutions
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Whether you&apos;re a bank looking to expand SME lending or an SME
              seeking credit access, we&apos;ve got you covered.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex gap-2 mb-12 bg-slate p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-ink text-white shadow-md"
                    : "text-muted hover:text-ink"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="font-display font-bold text-2xl text-ink mb-3">
                  {content[activeTab as keyof typeof content].title}
                </h3>
                <p className="text-muted text-sm mb-6">
                  {content[activeTab as keyof typeof content].subtitle}
                </p>

                <ul className="space-y-3 mb-8">
                  {content[activeTab as keyof typeof content].benefits.map(
                    (benefit, index) => (
                      <motion.li
                        key={benefit}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted">{benefit}</span>
                      </motion.li>
                    )
                  )}
                </ul>

                <Button variant="primary" size="md" className="group">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {content[activeTab as keyof typeof content].stats.map(
                  (stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.08 }}
                      className="p-5 bg-slate rounded-xl border border-slate-dark hover:border-teal/30 transition-all duration-300"
                    >
                      <div className="font-mono font-bold text-2xl text-teal mb-1">
                        {stat.value}
                      </div>
                      <div className="text-muted text-sm">{stat.label}</div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
