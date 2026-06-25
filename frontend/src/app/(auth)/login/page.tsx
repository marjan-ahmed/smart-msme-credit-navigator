"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight, Info } from "lucide-react";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-teal rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-ink" />
            </div>
            <span className="font-display font-bold text-xl text-ink tracking-tight">Smart Credit</span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-teal/10 border border-teal/20 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-ink mb-1">Demo Credentials</p>
              <p className="text-sm text-muted"><span className="font-medium text-ink">Email:</span> <span className="font-mono">segademo@gmail.com</span></p>
              <p className="text-sm text-muted"><span className="font-medium text-ink">Password:</span> <span className="font-mono">masasu</span></p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-surface rounded-2xl border border-slate-dark p-8">
          <h1 className="font-display font-bold text-2xl text-ink mb-2">Welcome back</h1>
          <p className="text-sm text-muted mb-6">Sign in to access your credit dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate border border-slate-dark text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate border border-slate-dark text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-coral font-medium">{error}</p>}

            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-teal text-ink font-semibold text-sm rounded-lg hover:bg-teal-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-dark text-center">
            <p className="text-sm text-muted">Don&apos;t have an account?{" "}<Link href="/signup" className="text-teal font-semibold hover:text-teal-hover transition-colors">Sign up</Link></p>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center mt-6 text-sm text-muted">
          <Link href="/" className="text-ink font-medium hover:text-teal transition-colors">← Back to home</Link>
        </motion.p>
      </div>
    </div>
  );
}
