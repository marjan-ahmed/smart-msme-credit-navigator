"use client";

import { motion } from "framer-motion";
import { Quote, TrendingUp, BookOpen, Users } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const testimonials = [
  {
    quote: "This platform could transform how we assess SME creditworthiness. The AI analysis of informal data is exactly what we need.",
    author: "Banking Executive",
    role: "Digital Transformation Lead",
    company: "Major Pakistani Bank",
  },
  {
    quote: "Finally, a solution that understands our business. We have records, just not the kind banks traditionally want.",
    author: "SME Owner",
    role: "Retail Business",
    company: "Karachi",
  },
  {
    quote: "The accuracy of alternative data scoring is impressive. Research shows 18% better prediction than traditional methods.",
    author: "Fintech Researcher",
    role: "Credit Scoring Specialist",
    company: "Pakistan Banking Association",
  },
];

const research = [
  {
    icon: TrendingUp,
    stat: "18%",
    description: "Better accuracy than traditional credit scoring using alternative data sources",
    source: "Pakistani Banking Research",
  },
  {
    icon: BookOpen,
    stat: "59%",
    description: "Of Pakistan's GDP operates in the informal economy, limiting credit access",
    source: "World Bank Data",
  },
  {
    icon: Users,
    stat: "5M+",
    description: "Micro and small enterprises in Pakistan lack formal credit access",
    source: "SBP Report",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 md:py-32 bg-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <span className="text-teal font-semibold text-xs uppercase tracking-widest font-display">
              Backed by Research
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mt-4 mb-5">
              Proven by Data,
              <br />
              Trusted by Experts
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Our approach is grounded in Pakistani banking research and
              international best practices.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {research.map((item, index) => (
            <ScrollReveal key={item.stat} delay={index * 0.08}>
              <div className="p-6 bg-surface rounded-xl border border-slate-dark hover:border-teal/30 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-teal" />
                </div>
                <div className="font-mono font-bold text-3xl text-teal mb-2">
                  {item.stat}
                </div>
                <p className="text-muted text-sm mb-2 leading-relaxed">{item.description}</p>
                <p className="text-xs text-muted-light italic">
                  Source: {item.source}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-5 bg-surface rounded-xl border border-slate-dark hover:shadow-md transition-all duration-300"
              >
                <Quote className="w-6 h-6 text-teal/30 mb-3" />
                <p className="text-muted text-sm italic mb-4 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="border-t border-slate-dark pt-3">
                  <p className="font-display font-semibold text-sm text-ink">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                  <p className="text-xs text-muted-light">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
