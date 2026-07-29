"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail, ShieldCheck, User, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  
  // ⚙️ State trackers parsing user interface characters
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✍️ Input change handler updating memory fields dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📡 Form Submit Handler: Broadcast package straight to our API loop
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", formData);
      
      if (response.data.status === "success") {
        // Cache our session token key safely inside browser context memory registers
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Success redirect directly back to our landing dashboard view matrix
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Protocol identity creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#050816] text-white min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px] -top-40 -left-40 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[150px] -bottom-40 -right-40 pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to platform
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center font-black text-white text-lg mx-auto shadow-[0_0_20px_rgba(6,182,212,0.4)]">Ω</div>
          <h2 className="text-2xl font-bold mt-4 text-white">Create Identity</h2>
          <p className="text-xs text-slate-400 mt-1">Register your multi-node credential account</p>
        </div>

        {/* Dynamic Error Status Banner Alert */}
        {error && (
          <div className="p-3 mb-5 text-xs rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-semibold uppercase tracking-wider text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Alex Mercer" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="name@ecosystem.com" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all" />
            </div>
          </div>

          <button disabled={loading} className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-sm cursor-pointer hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Initialize Protocols"}
          </button>
        </form>

        <p className="text-xs text-center text-slate-400 mt-6">
          Already possess credentials? <Link href="/login" className="text-cyan-400 font-medium hover:underline">Authorize Log In</Link>
        </p>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-500">
          <ShieldCheck size={12} className="text-emerald-500" /> AES-256 BIT KEY GENERATION
        </div>
      </motion.div>
    </main>
  );
}
