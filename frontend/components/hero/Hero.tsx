"use client";

import { ArrowRight, Cpu, ShieldCheck, Zap, Server, Watch, Tv, Bot } from "lucide-react";
import Container from "../ui/Container";
import TechSlider from "./TechSlider"; 
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// 📦 Core asset array matching database items and local webp vectors
const FEATURED_PRODUCTS = [
  {
    name: "Quantum Processor Unit",
    category: "AI Core v4.0",
    price: "$2,499",
    description: "Neural architecture designed for next-generation lightning-fast automation workflows.",
    icon: Cpu,
    imgSrc: "/p1.webp",
    gradient: "from-rose-500/15 to-red-500/15"
  },
  {
    name: "Aegis Quantum Drive",
    category: "Storage Arrays",
    price: "$899",
    description: "Solid-state crystalline memory arrays utilizing atomic spin encryption matrix grids.",
    icon: Server,
    imgSrc: "/s1.webp",
    gradient: "from-cyan-500/15 to-blue-500/15"
  },
  {
    name: "Neural Link Band V2",
    category: "Wearables & Syncs",
    price: "$1,249",
    description: "High-fidelity biometric signal transmitter optimized for localized cybernetic automation.",
    icon: Watch,
    imgSrc: "/w1.webp",
    gradient: "from-pink-500/15 to-purple-500/15"
  },
  {
    name: "Holodisplay Prism",
    category: "Volumetric Displays",
    price: "$1,850",
    description: "Volumetric true-3D lightfield projection deck emitting zero polarized ocular radiation.",
    icon: Tv,
    imgSrc: "/d1.webp",
    gradient: "from-blue-500/15 to-cyan-500/15"
  },
  {
    name: "Vector AI Drone Core",
    category: "Robotics Cores",
    price: "$1,999",
    description: "Autonomous environmental mapping processor running sub-millisecond route sequences.",
    icon: Bot,
    imgSrc: "/r1.webp",
    gradient: "from-purple-500/15 to-indigo-500/15"
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // 🔄 Cycles through featured array assets automatically every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % FEATURED_PRODUCTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentProduct = FEATURED_PRODUCTS[index];

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center bg-[#050816] pt-32 pb-8 box-border">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_75%,transparent_100%)] pointer-events-none" />
      <div className="absolute w-[700px] h-[700px] rounded-full bg-cyan-500/15 blur-[160px] -top-64 -left-48 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-[160px] bottom-0 right-0 pointer-events-none" />

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full flex-grow my-auto">
        
        {/* Left Side Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }} 
          className="flex flex-col items-start"
        >
          <span className="inline-flex items-center gap-2 border border-cyan-400/30 px-4 py-1.5 rounded-full bg-cyan-500/5 text-cyan-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Zap size={12} className="animate-pulse text-cyan-400" /> Future Of Smart Commerce
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-white">
            Shop The <br /> 
            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text drop-shadow-[0_4px_12px_rgba(6,182,212,0.15)]">
              Future
            </span>
          </h1>
          <p className="mt-6 text-slate-400 text-lg max-w-xl leading-relaxed">
            Discover premium AI devices, futuristic gadgets, next-generation electronics and innovative technology built for tomorrow.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap w-full sm:w-auto">
            <Link href="/products" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-[0_4px_25px_rgba(6,182,212,0.4)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-sm cursor-pointer text-center block">
              Explore Products
            </Link>
            <Link href="/about" className="border border-white/10 px-8 py-3.5 rounded-full flex items-center gap-2.5 text-slate-200 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-sm group cursor-pointer text-center">
              Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
        {/* Right Side Card Layout */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }} 
          className="relative flex justify-center items-center w-full min-h-[440px]"
        >
          {/* Main Content Floating Node Frame Wrapper */}
          <motion.div 
            animate={{ y: [0, -14, 0] }} 
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} 
            className="w-full max-w-[340px]"
          >
            <Link href="/products" className="block cursor-pointer group">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl relative z-20 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300">
                
                {/* Image / Graphic Display Frame */}
                <div className="h-44 rounded-xl bg-gradient-to-tr border border-white/5 flex items-center justify-center relative overflow-hidden bg-[#050816]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:16px_16px] z-0" />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${currentProduct.gradient} opacity-100 z-0`} />
                  
                  {/* Render smooth crossfade transition states using AnimatePresence */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <img 
                        src={currentProduct.imgSrc} 
                        alt={currentProduct.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 select-none"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Text Specifications Metadata */}
                <div className="mt-4 relative overflow-hidden min-h-[100px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                          {currentProduct.category}
                        </span>
                        <span className="text-sm font-semibold text-slate-300">
                          {currentProduct.price}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 uppercase tracking-wide line-clamp-1">
                        {currentProduct.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {currentProduct.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </Link>
          </motion.div>

          {/* Satellite Floater 1 */}
          <motion.div 
            animate={{ y: [-8, 8, -8] }} 
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} 
            className="absolute top-2 left-2 md:-left-4 p-3.5 rounded-xl bg-[#0b0f26]/95 border border-cyan-500/25 shadow-[0_10px_25px_rgba(0,0,0,0.3)] backdrop-blur-md flex items-center gap-3 z-30 pointer-events-none"
          >
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Zap size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">System Performance</p>
              <p className="text-xs font-black text-white">99.8% Optimized</p>
            </div>
          </motion.div>

          {/* Satellite Floater 2 */}
          <motion.div 
            animate={{ y: [8, -8, 8] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
            className="absolute bottom-2 right-2 md:-right-4 p-3.5 rounded-xl bg-[#0b0f26]/95 border border-violet-500/25 shadow-[0_10px_25px_rgba(0,0,0,0.3)] backdrop-blur-md flex items-center gap-3 z-30 pointer-events-none"
          >
            <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Quantum Encryption</p>
              <p className="text-xs font-black text-white">Military Grade</p>
            </div>
          </motion.div>

        </motion.div>
      </Container>

      {/* Infinite auto-scrolling ribbon ticker */}
      <TechSlider />
    </section>
  );
}
