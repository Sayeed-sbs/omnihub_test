"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, Send, Terminal, Mail, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface ContactFormData {
  email: string;
  message: string;
}

export default function ContactPage() {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

const onSubmitTransmission = async (formData: ContactFormData) => {
  setSending(true);
  try {
    // 🛠️ Hardcoded to your local Node.js Express server to completely bypass route proxies
    const response = await fetch("http://localhost:5000/api/contact/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await response.json();

    if (data.success) {
      toast.success("Signal broadcasted successfully!", {
        style: { background: "#050816", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.2)" }
      });
      setSuccess(true);
      reset();
    } else {
      throw new Error(data.message || "Routing collision.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Transmission failed. Re-routing link required.", {
      style: { background: "#050816", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.2)" }
    });
  } finally {
    setSending(false);
  }
};


  return (
    <main className="bg-[#050816] text-white min-h-screen flex flex-col pt-24 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Toaster position="top-right" />
      <Navbar />

      <div className="flex-grow py-20 relative overflow-hidden flex items-center">
        {/* Animated Cyberpunk Layout Matrix Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

        <Container className="max-w-md relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-cyan-500/10 transition-all duration-500"
          >
            {/* Top Glossy Corner Line accents */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            {success ? (
              // Success Panel Output Structure
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-wider text-white">Signal Transmitted</h2>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Your core communication packet has bypassed security grids and successfully logged into our cloud storage matrix vaults.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 underline cursor-pointer select-none"
                >
                  // Establish Another Link Connection
                </button>
              </motion.div>
            ) : (
              // Base Input Form Layout Structures
              <>
                <div className="space-y-2 text-center mb-8 select-none">
                  <h1 className="text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    Establish Link
                  </h1>
                  <p className="text-[11px] text-cyan-400/80 font-mono tracking-wider uppercase flex items-center justify-center gap-1.5">
                    <Terminal size={12} /> Open Cryptographic Support Pipeline
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmitTransmission)}>
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2 flex items-center gap-1 select-none">
                      <Mail size={10} className="text-cyan-500" /> Comms Channel (Email)
                    </label>
                    <input
                      type="email"
                      placeholder="operator@domain.com"
                      {...register("email", { 
                        required: "Communication channel mapping path is required.",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email packet mapping string." }
                      })}
                      className={`w-full bg-white/[0.02] border rounded-xl py-3.5 px-4 text-xs text-white focus:outline-none focus:bg-white/[0.04] transition-all duration-300 font-medium ${
                        errors.email ? 'border-rose-500/40 focus:border-rose-500' : 'border-white/10 focus:border-cyan-500/40 focus:shadow-[0_0_15px_rgba(6,182,212,0.05)]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-rose-400 font-mono mt-1.5 pl-1">⚠ {errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2 flex items-center gap-1 select-none">
                      <Terminal size={10} className="text-cyan-500" /> Transmission Load (Message)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Input data package payload stream description..."
                      {...register("message", { required: "Transmission load weight payload cannot remain empty." })}
                      className={`w-full bg-white/[0.02] border rounded-xl py-3.5 px-4 text-xs text-white focus:outline-none focus:bg-white/[0.04] transition-all duration-300 resize-none font-medium ${
                        errors.message ? 'border-rose-500/40 focus:border-rose-500' : 'border-white/10 focus:border-cyan-500/40 focus:shadow-[0_0_15px_rgba(6,182,212,0.05)]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[10px] text-rose-400 font-mono mt-1.5 pl-1">⚠ {errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs uppercase tracking-widest text-white shadow-[0_4px_25px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.4)] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none active:scale-[0.98]"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Routing Packet...
                      </>
                    ) : (
                      <>
                        <Send size={12} /> Broadcast Signal
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </Container>
      </div>

      <Footer />
    </main>
  );
}
