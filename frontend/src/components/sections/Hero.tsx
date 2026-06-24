"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Brain, Building2 } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

function ScoreGauge() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const score = useTransform(scrollYProgress, [0, 0.5], [0, 76]);
  const roundedScore = useTransform(score, (v) => Math.round(v));
  const strokeDashoffset = useTransform(score, [0, 100], [283, 283 * 0.24]);

  return (
    <div ref={ref} className="relative w-64 h-64 md:w-80 md:h-80">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="3"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="283"
          style={{ strokeDashoffset }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D4AA" />
            <stop offset="100%" stopColor="#06D6A0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">              <motion.span className="font-mono text-5xl md:text-6xl font-bold text-ink">
                {roundedScore}
              </motion.span>
        <span className="text-muted text-sm mt-1">/100 Credit Score</span>
        <div className="flex items-center gap-1.5 mt-3 px-3 py-1 bg-teal/10 rounded-full">
          <div className="w-1.5 h-1.5 bg-teal rounded-full" />
          <span className="text-teal text-xs font-semibold">Low Risk</span>
        </div>
      </div>

      {/* Floating particles */}
      {[
        { top: "20%", left: "30%", dur: 3, del: 0 },
        { top: "60%", left: "70%", dur: 4, del: 0.5 },
        { top: "40%", left: "50%", dur: 3.5, del: 1 },
        { top: "75%", left: "25%", dur: 4.5, del: 1.5 },
        { top: "30%", left: "80%", dur: 3.2, del: 0.8 },
        { top: "80%", left: "60%", dur: 3.8, del: 1.2 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-teal/20 rounded-full"
          style={{ top: p.top, left: p.left }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.del,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-surface">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-coral/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate rounded-full">
                <Shield className="w-3.5 h-3.5 text-teal" />
                <span className="text-xs font-medium text-muted">SBP Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate rounded-full">
                <Brain className="w-3.5 h-3.5 text-teal" />
                <span className="text-xs font-medium text-muted">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate rounded-full">
                <Building2 className="w-3.5 h-3.5 text-teal" />
                <span className="text-xs font-medium text-muted">Bank-Grade</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-ink mb-2 leading-[1.05]">
                Turn Informal Data
              </h1>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.05]">
                Into{" "}
                <span className="text-teal">Credit</span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted text-base md:text-lg max-w-lg mb-8 leading-relaxed"
            >
              Pakistan&apos;s first AI engine that reads WhatsApp invoices, receipt photos,
              and Excel sheets — then gives SMEs a bank-ready credit score.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/signup">
                <Button variant="primary" size="lg" className="group">
                  For Banks
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="group">
                  For SMEs
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-muted-light mt-6"
            >
              Built for UBL Hackathon 2026 · No collateral required
            </motion.p>
          </div>

          {/* Right - Score Gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <ScoreGauge />
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 border-t border-slate-dark"
        >
          {[
            { value: "5M+", label: "SMEs in Pakistan" },
            { value: "40%", label: "of GDP" },
            { value: "18%", label: "Better Accuracy" },
            { value: "244M", label: "Financial Accounts" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="font-mono text-2xl md:text-3xl font-bold text-ink">
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
