"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { Shield, Cpu, Zap, Activity, ChevronDown, Loader2, ShoppingBag, Truck, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StatItem {
  label: string;
  value: string;
  sub: string;
}

interface SystemLayer {
  title: string;
  description: string;
}

export default function AboutPage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [layers, setLayers] = useState<SystemLayer[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchSystemData = async () => {
    try {
      // 🛠️ Hardcoded to your local Node.js Express server on port 5000 to completely bypass route proxies
      const response = await fetch("http://localhost:5000/api/system/status");
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        setLayers(data.systemLayers);
      }
    } catch (error) {
      console.error("Database tracking link failed, loading defaults...", error);
      // Fallback production e-commerce metrics data
      setStats([
        { label: "Tech Products Listed", value: "2,450+", sub: "Verified Inventory" },
        { label: "Hardware Nodes Active", value: "14,842", sub: "Global Network" },
        { label: "Order Delivery Latency", value: "0.02ms", sub: "Instant Allocation" },
      ]);
      setLayers([
        { 
          title: "01 // Premium Hardware Procurement Matrix", 
          description: "We source cutting-edge custom components, including high-performance GPUs, custom liquid cooling rigs, next-generation mechanical switches, and high-frequency storage arrays from verified global hardware manufacturers." 
        },
        { 
          title: "02 // Atomic Product Verification Engine", 
          description: "Every listing on our platform undergoes automated configuration checking. We verify serial keys, model metrics, and electronic benchmarks before hardware dispatching, guaranteeing absolute component safety." 
        },
        { 
          title: "03 // Distributed Shipping & Supply Infrastructure", 
          description: "Operating across global logistics nodes, our checkout architecture connects your cart demands directly with regional hardware fulfillment hubs, bringing delivery dispatch waiting intervals down to record lows." 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  fetchSystemData();
}, []);


  return (
    <main className="bg-[#050816] text-white min-h-screen flex flex-col pt-24 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      
      <div className="flex-grow py-20 relative overflow-hidden">
        {/* Background Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

        <Container className="max-w-4xl relative z-10 space-y-16">
          {/* Header */}
          <div className="space-y-4 border-l-2 border-cyan-500/50 pl-6">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
            >
              The Omnihub Architecture
            </motion.h1>
            <p className="text-cyan-400 text-xs sm:text-sm font-mono tracking-widest uppercase">
              // Premium E-Commerce Infrastructure for Tech & Hardware Components
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12 text-cyan-400 gap-2 font-mono text-xs">
              <Loader2 size={18} className="animate-spin" /> SYNCHRONIZING REALTIME TELEMETRY CORE...
            </div>
          ) : (
            <>
              {/* Telemetry Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md relative group hover:border-cyan-500/20 transition-all duration-300 select-none">
                    <div className="absolute top-0 right-0 p-3 opacity-20 text-cyan-400">
                      {i === 0 ? <ShoppingBag size={16} /> : i === 1 ? <Cpu size={16} /> : <Truck size={16} />}
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{stat.label}</p>
                    <p className="text-2xl font-black text-white mt-1 group-hover:text-cyan-300 transition-colors">{stat.value}</p>
                    <p className="text-[10px] text-cyan-500/70 font-mono mt-0.5">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Enhanced Tech Marketplace Context Info */}
              <div className="space-y-6 text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                <p>
                  Welcome to <strong className="text-white">OMNIHUB</strong>, the next-generation e-commerce ecosystem custom-engineered for enthusiasts, developers, and hardware architects. We bridge the gap between premium tech engineering and global retail accessibility, offering an uncompromised catalog of custom processing arrays, custom gaming setups, storage frames, and pristine interface devices.
                </p>
                <p>
                  Whether you are staging a powerful multi-threaded development workspace, tracking high-frequency network routers, or configuring responsive mechanical input decks, our hardware layers offer rapid inventory checks, continuous payment validations, and instant logistics handoffs.
                </p>
              </div>

              {/* Accordion Specs Grid Container */}
              <div className="space-y-3 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4 font-mono">
                  <Activity size={14} className="text-cyan-400" /> [ PLATFORM LOGISTICS CHANNELS ]
                </h3>
                
                {layers.map((layer, idx) => {
                  const isOpen = activeLayer === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                        isOpen ? 'bg-cyan-500/[0.03] border-cyan-500/30' : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                      }`}
                    >
                      {/* 🛠️ Fixed: Attached "cursor-pointer" to the accordion headers */}
                      <button
                        onClick={() => setActiveLayer(isOpen ? null : idx)}
                        className="w-full p-5 flex items-center justify-between text-left font-bold text-sm tracking-wide text-slate-200 hover:text-white cursor-pointer select-none"
                      >
                        <span className={isOpen ? "text-cyan-400 transition-colors" : ""}>{layer.title}</span>
                        {/* 🛠️ Fixed: Chevron transition now includes "cursor-pointer" attributes */}
                        <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 cursor-pointer ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="p-5 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal border-t border-white/[0.02]">
                              {layer.description}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Container>
      </div>

      <Footer />
    </main>
  );
}
