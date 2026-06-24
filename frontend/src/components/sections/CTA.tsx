"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 md:py-32 bg-ink relative overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <ScrollReveal>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-5 leading-tight">
              Ready to Transform
              <br />
              SME Lending?
            </h2>
            <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed">
              Join the future of credit scoring. Whether you&apos;re a bank
              looking to expand or an SME seeking access, we&apos;re here to help.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mb-8">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal border border-white/10"
                />
              </div>
              <Link href="/signup">
                <Button variant="primary" size="md" className="whitespace-nowrap">
                  Request Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-white/40 text-xs">
              No credit card required · Free pilot program · SBP compliant
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="font-mono font-bold text-lg text-white">SBP</div>
                <p className="text-white/40 text-xs">Compliant</p>
              </div>
              <div>
                <div className="font-mono font-bold text-lg text-white">256-bit</div>
                <p className="text-white/40 text-xs">Encryption</p>
              </div>
              <div>
                <div className="font-mono font-bold text-lg text-white">99.9%</div>
                <p className="text-white/40 text-xs">Uptime</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
