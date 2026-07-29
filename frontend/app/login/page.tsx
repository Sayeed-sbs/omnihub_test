"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { Mail, Lock, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password });
      
      if (response.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event("omnihub_auth_state_changed"));
        router.push("/products");
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "CLEARANCE PARAMETERS VALIDATION FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#050816] text-white min-h-screen flex flex-col justify-between selection:bg-cyan-500/30">
      <Navbar />

      {/* 🚀 Fixed: Added pt-36 and pb-20 to push the card comfortably down below your sticky Navbar */}
      <div className="flex-grow flex items-center justify-center pt-36 pb-20 relative overflow-hidden">
        {/* Background Network Matrix Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <Container className="max-w-md w-full relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-cyan-500/20 transition-all duration-500"
          >
            {/* Header Branded Icon */}
            <div className="flex flex-col items-center text-center space-y-4 select-none">
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-transparent border border-white/10 flex items-center justify-center p-3 shadow-[0_0_30px_rgba(6,182,212,0.1)] group"
              >
                <img 
                  src="/omnihub_logo.png" 
                  alt="OMNIHUB Security Node Core" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                />
              </motion.div>
              
              <div>
                <h1 className="text-2xl font-black uppercase tracking-wide text-white">Welcome Back</h1>
                <p className="text-xs font-mono font-medium text-slate-400 mt-1 uppercase tracking-wider">Access your quantum encrypted ecosystem</p>
              </div>
            </div>

            {/* Error Notification */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="mt-6 flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl font-mono text-[11px] font-black uppercase tracking-wider text-rose-400 select-none"
                >
                  <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Pipelines */}
            <form onSubmit={handleLogin} className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono font-black tracking-widest text-slate-400 select-none">Email Address</label>
                <div className="relative group/input">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter identification gateway node..."
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/40 focus:bg-white/[0.04] transition-all cursor-pointer font-sans"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center select-none">
                  <label className="text-[10px] uppercase font-mono font-black tracking-widest text-slate-400">Password</label>
                  <Link href="#" className="text-[10px] font-mono font-bold text-cyan-500 hover:text-cyan-400 cursor-pointer">Forgot password?</Link>
                </div>
                <div className="relative group/input">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-sm font-mono tracking-widest text-white placeholder:text-slate-700 outline-none focus:border-cyan-500/40 focus:bg-white/[0.04] transition-all cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 font-bold text-xs uppercase tracking-widest text-white cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(6,182,212,0.2)] hover:shadow-[0_4px_35px_rgba(6,182,212,0.45)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Authorizing Token Linkage...
                  </>
                ) : (
                  "Authorize Connection"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs font-mono font-medium text-slate-400 select-none">
              New to the architecture?{" "}
              <Link href="/register" className="text-cyan-400 font-bold hover:text-cyan-300 cursor-pointer underline underline-offset-4">
                Create an Identity
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-1.5 text-[9px] font-mono text-slate-500 font-black uppercase tracking-widest select-none">
              <ShieldCheck size={12} className="text-emerald-500/70" /> End-to-end decentralized auth
            </div>
          </motion.div>
        </Container>
      </div>

      <Footer />
    </main>
  );
}
