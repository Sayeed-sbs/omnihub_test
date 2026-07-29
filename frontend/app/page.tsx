"use client";

import Navbar from "@/components/layout/Navbar"; 
import Hero from "@/components/hero/Hero"; 
import Footer from "@/components/layout/Footer"; 
import Container from "@/components/ui/Container"; 
import SectionTitle from "@/components/ui/SectionTitle"; 
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// 📦 Expanded deep inventory collection array containing 12 premium products for a fluid scrolling loop track
const featuredProducts = [
  { id: "1", name: "Aegis Quantum Drive", price: 899, category: "Storage", rating: 4.9, description: "Solid-state crystalline memory arrays utilizing atomic spin encryption matrix grids." },
  { id: "2", name: "Cortex Vault Array", price: 450, category: "Storage", rating: 4.6, description: "High-density thermal cell hardware backup rig optimized for continuous data loads." },
  { id: "3", name: "Chronos Mesh Bank", price: 1200, category: "Storage", rating: 4.8, description: "Temporal parity storage block running decentralized block redundancy routines." },
  { id: "4", name: "Helios Micro Cell", price: 299, category: "Storage", rating: 4.5, description: "Pocket-sized rapid processing memory asset for quick telemetry downloads." },
  { id: "5", name: "Titan Lattice Core", price: 2400, category: "Storage", rating: 5.0, description: "Enterprise-grade high-frequency mainframe network database array layout block." },
  { id: "6", name: "Neural Link Band v2", price: 1249, category: "Wearables", rating: 4.8, description: "High-fidelity biometric signal transmitter optimized for localized cybernetic automation sync." },
  { id: "7", name: "Pulse Matrix Ring", price: 599, category: "Wearables", rating: 4.6, description: "Compact micro-logic telemetry ring mapping blood chemistry changes in real-time." },
  { id: "8", name: "HoloDisplay Prism", price: 1850, category: "Displays", rating: 4.7, description: "Volumetric true-3D lightfield projection deck emitting zero localized ocular strain radiation." },
  { id: "9", name: "Aerohud Visor Frame", price: 950, category: "Displays", rating: 4.4, description: "Tactical augmented projection overlay visor for close-proximity code management." },
  { id: "10", name: "Spectra Beam Deck", price: 1350, category: "Displays", rating: 4.6, description: "High-refresh laser grid light projection terminal for localized rendering meshes." },
  { id: "11", name: "Vector AI Drone Core", price: 1999, category: "Robotics", rating: 5.0, description: "Autonomous environmental mapping processor running sub-millisecond navigational calculations." },
  { id: "12", name: "Nexus Actuator Deck", price: 750, category: "Robotics", rating: 4.7, description: "High-torque multi-axis robotic motor control controller utilizing dynamic micro-steps." }
];

export default function Home() {
  return (
    <main className="bg-[#050816] text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        {/* Marketplace Section */}
        <section className="py-24 border-t border-white/5 bg-[#030611]/50 relative overflow-hidden">
          {/* Subtle Ambient Edge Glow Fades */}
          <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-[#050816] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-[#050816] to-transparent z-20 pointer-events-none" />

          <Container>
            {/* Section Heading */}
            <SectionTitle 
              title="Featured Innovations" 
              subtitle="Explore premium hardware configurations engineered for the upcoming smart economy infrastructure." 
            />

            {/* 🔄 Automated Horizontal X-Axis Auto-Scroller Row (Uses standard pointer cursor) */}
            <div 
              id="featured-slider-track"
              className="mt-12 overflow-x-auto pb-8 scrollbar-thin scrollbar-track-white/[0.02] scrollbar-thumb-cyan-500/20 hover:scrollbar-thumb-cyan-500/40 transition-colors duration-300 flex gap-6 snap-x snap-mandatory scroll-smooth cursor-pointer"
              ref={(el) => {
                if (!el) return;
                
                // Clears previous interval definitions to prevent background execution duplicates
                if ((el as any)._scrollTimer) clearInterval((el as any)._scrollTimer);

                // Auto scrolls smoothly across the 12 inventory components
                (el as any)._scrollTimer = setInterval(() => {
                  const maxScroll = el.scrollWidth - el.clientWidth;
                  
                  if (el.scrollLeft >= maxScroll - 10) {
                    el.scrollTo({ left: 0, behavior: "smooth" }); // Snaps back cleanly to the start
                  } else {
                    const cardWidth = el.querySelector("div")?.clientWidth || 320;
                    el.scrollBy({ left: cardWidth + 24, behavior: "smooth" }); // Advances exactly one card step
                  }
                }, 3500); // Transitions forward every 3.5 seconds
              }}
            >
              {featuredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="min-w-[280px] sm:min-w-[320px] max-w-[320px] flex-shrink-0 snap-start"
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>

            {/* 🛠️ Cyberpunk "See More" Redirection Matrix Button */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <Link 
                href="/products" 
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer select-none active:scale-95"
              >
                Access Hardware Matrix
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>

          </Container>
        </section>
      </div>
      <Footer />
    </main>
  );
}
