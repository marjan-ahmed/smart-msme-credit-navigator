"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  formatter?: (value: number) => string;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  formatter,
  label,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    if (formatter) {
      return formatter(latest);
    }
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, to, duration]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="font-mono text-2xl md:text-3xl font-bold text-teal mb-1">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="text-muted text-xs">{label}</p>
    </div>
  );
}
