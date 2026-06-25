"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight, User, Store, Building } from "lucide-react";
import { signupUser } from "@/lib/api";

const accountTypes = [
  { id: "sme", label: "SME Owner", icon: Store, description: "Upload data and get your credit score" },
  { id: "bank", label: "Bank / Lender", icon: Building, description: "Assess SME creditworthiness" },
];

export default function SignupPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState("sme");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = await signupUser(name, email, password, accountType);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      setError("Signup failed. Email may already be registered.");
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

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface rounded-2xl border border-slate-dark p-8">
          <h1 className="font-display font-bold text-2xl text-ink mb-2">Create account</h1>
          <p className="text-sm text-muted mb-6">Start your AI-powered credit scoring journey.</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {accountTypes.map((type) => (
              <button key={type.id} type="button" onClick={() => setAccountType(type.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${accountType === type.id ? "border-teal bg-teal/5" : "border-slate-dark hover:border-muted-light"}`}>
                <type.icon className={`w-5 h-5 mb-2 ${accountType === type.id ? "text-teal" : "text-muted"}`} />
                <p className="font-medium text-sm text-ink">{type.label}</p>
                <p className="text-[11px] text-muted mt-0.5">{type.description}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ahmed Khan" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate border border-slate-dark text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" required />
              </div>
            </div>

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
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate border border-slate-dark text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-coral font-medium">{error}</p>}

            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-teal text-ink font-semibold text-sm rounded-lg hover:bg-teal-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" /> : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-dark text-center">
            <p className="text-sm text-muted">Already have an account?{" "}<Link href="/login" className="text-teal font-semibold hover:text-teal-hover transition-colors">Sign in</Link></p>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mt-6 text-sm text-muted">
          <Link href="/" className="text-ink font-medium hover:text-teal transition-colors">← Back to home</Link>
        </motion.p>
      </div>
    </div>
  );
}
