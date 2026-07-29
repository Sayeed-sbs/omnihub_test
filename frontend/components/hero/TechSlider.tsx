"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Cpu, Layers, ShieldCheck, Zap, Radio, Database } from "lucide-react";

const techItems = [
  { icon: <Cpu size={20} />, label: "Next-Gen Tech", text: "Direct consumer deployment matrix interfaces." },
  { icon: <Layers size={20} />, label: "Seamless Sync", text: "Global cross-node ecosystem clustering data syncs." },
  { icon: <ShieldCheck size={20} />, label: "Secured Nodes", text: "Decentralized end-to-end cryptographic layer validation." },
  { icon: <Zap size={20} />, label: "Quantum Speed", text: "Sub-millisecond data stream relay routing speeds." },
  { icon: <Radio size={20} />, label: "AI Automation", text: "Neural training models active on edge nodes." },
  { icon: <Database size={20} />, label: "Crystalline Drive", text: "Atomic spin encryption memory storage tables." },
];

export default function TechSlider() {
  const [page, setPage] = useState(0);

  // Group items into pages of 3 items each
  const totalPages = Math.ceil(techItems.length / 3);
  
  const nextPage = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // ⏱️ Auto-advance slide deck tracker every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextPage, 5000);
    return () => clearInterval(timer);
  }, []);

  // Determine which 3 items are currently visible on screen
  const startIndex = page * 3;
  const visibleItems = techItems.slice(startIndex, startIndex + 3);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-12 mt-12 select-none group">
      
      {/* ⬅️ Left Navigation Arrow Button */}
      <button 
        onClick={prevPage}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-200 cursor-pointer z-20 opacity-60 group-hover:opacity-100"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Center Display Grid Panel */}
      <div className="overflow-hidden min-h-[110px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={page}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {visibleItems.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">{item.label}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{item.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ➡️ Right Navigation Arrow Button */}
      <button 
        onClick={nextPage}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-200 cursor-pointer z-20 opacity-60 group-hover:opacity-100"
      >
        <ChevronRight size={20} />
      </button>

      {/* Optional: Small structural dot page path index trackers */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-300 ${i === page ? "w-6 bg-cyan-400" : "w-1.5 bg-white/15"}`}
          />
        ))}
      </div>

    </div>
  );
}
