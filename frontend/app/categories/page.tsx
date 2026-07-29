"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { ArrowUpRight, Cpu, Radio, LayoutGrid, ToggleLeft, Activity, Server, Activity as PulseIcon } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function CategoriesPage() {
  const departments = [
    { name: "Storage Arrays", slug: "storage", load: "42%", status: "OPTIMIZED", speed: "12 GB/s", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: <LayoutGrid size={20} />, desc: "Solid-state crystalline memory configurations utilizing high-speed atomic block encryption logic." },
    { name: "Wearables & Syncs", slug: "wearables", load: "78%", status: "HIGH LOAD", speed: "0.04ms", color: "text-amber-400", bg: "bg-amber-500/10", icon: <Radio size={20} />, desc: "High-fidelity biometric signal transmitters optimized for localized neural automated synchronizations." },
    { name: "Volumetric Displays", slug: "displays", load: "19%", status: "STABLE", speed: "240Hz", color: "text-cyan-400", bg: "bg-cyan-500/10", icon: <ToggleLeft size={20} />, desc: "True-3D lightfield projection deck nodes emitting zero localized or polarized tracking radiation." },
    { name: "Robotics Cores", slug: "robotics", load: "55%", status: "ONLINE", speed: "840 TFLOPS", color: "text-purple-400", bg: "bg-purple-500/10", icon: <Cpu size={20} />, desc: "Autonomous environmental mapping processor grids running rapid sub-millisecond route calculations." },
    { name: "Quantum Processors", slug: "processors", load: "91%", status: "CRITICAL", speed: "4.2K Qubits", color: "text-rose-400", bg: "bg-rose-500/10", icon: <Activity size={20} />, desc: "Parallel multi-node logical gate compute arrays trained to safely process encrypted market algorithms." }
  ];

  return (
    <main className="bg-[#050816] text-white min-h-screen flex flex-col pt-24 selection:bg-cyan-500/30">
      <Navbar />
      <div className="flex-grow py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <Container>
          <div className="space-y-2 border-l-2 border-cyan-500/50 pl-6 select-none">
            <h1 className="text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">System Infrastructure</h1>
            <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">// Infrastructure Operational Sub-Department Matrix</p>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {departments.map((dept) => (
              <motion.div key={dept.slug} variants={itemVariants} whileHover={{ y: -5, scale: 1.01 }} className="h-full">
                <Link 
                  href={`/products?category=${dept.slug}`}
                  className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between h-[290px] relative overflow-hidden group cursor-pointer block select-none shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-300">
                        {dept.icon}
                      </div>
                      <div className={`flex items-center gap-1.5 text-[9px] font-mono font-black px-2.5 py-1 rounded-md border border-white/5 ${dept.bg} ${dept.color}`}>
                        <Server size={10} /> {dept.status}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300">{dept.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-medium">{dept.desc}</p>
                    </div>
                  </div>

                  {/* Enhanced Metric Feed Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-4 my-2 border-t border-white/5 text-[10px] font-mono text-slate-500 font-bold">
                    <div className="flex items-center gap-1"><PulseIcon size={10} className="text-slate-600" /> Core Load: <span className="text-slate-300">{dept.load}</span></div>
                    <div className="flex items-center gap-1"><Cpu size={10} className="text-slate-600" /> Clock Sync: <span className="text-slate-300">{dept.speed}</span></div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-slate-500 group-hover:text-slate-400 transition-colors text-[10px] font-mono font-black uppercase tracking-wider">
                    <span>// Allocate Department Assets</span>
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}
