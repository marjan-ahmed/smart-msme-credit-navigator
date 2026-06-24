"use client";

import { motion } from "framer-motion";
import {
  Upload,
  Brain,
  BarChart3,
  Shield,
  FileText,
  Code,
  Zap,
  Lock,
  Globe,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const features = [
  {
    icon: Upload,
    title: "Multi-Format Upload",
    description: "Bank CSVs, receipts, Excel files, or WhatsApp exports.",
    color: "teal",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced algorithms extract cash flow patterns and revenue trends.",
    color: "coral",
  },
  {
    icon: BarChart3,
    title: "Credit Scoring",
    description: "Bank-ready credit scores with detailed factor breakdown.",
    color: "amber",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Comprehensive risk evaluation for informed lending decisions.",
    color: "teal",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Complete documentation with recommendations and checklists.",
    color: "coral",
  },
  {
    icon: Code,
    title: "API Integration",
    description: "Seamless integration with existing banking systems.",
    color: "amber",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Get credit scores in seconds, not weeks.",
    color: "teal",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "Enterprise-level data protection and compliance.",
    color: "coral",
  },
  {
    icon: Globe,
    title: "Urdu & English",
    description: "Support for both languages in OCR and documentation.",
    color: "amber",
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  teal: { bg: "bg-teal/10", text: "text-teal" },
  coral: { bg: "bg-coral/10", text: "text-coral" },
  amber: { bg: "bg-amber/10", text: "text-amber" },
};

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <span className="text-teal font-semibold text-xs uppercase tracking-widest font-display">
              Features
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mt-4 mb-5">
              Everything You Need for
              <br />
              Alternative Credit Scoring
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              A complete platform for transforming informal business data into
              bankable credit profiles.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -2 }}
                className="p-5 bg-slate rounded-xl border border-slate-dark hover:border-teal/30 hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-10 h-10 ${colorMap[feature.color].bg} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-5 h-5 ${colorMap[feature.color].text}`} />
                </div>
                <h3 className="font-display font-semibold text-sm text-ink mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed">{feature.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
