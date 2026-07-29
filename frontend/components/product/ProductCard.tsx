"use client";

import { ShoppingCart, Eye, Star, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import Link from "next/link";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  description: string;
}

const categoryGradients: Record<string, string> = {
  storage: "from-cyan-500/20 via-blue-500/5 to-transparent",
  wearables: "from-pink-500/20 via-purple-500/5 to-transparent",
  displays: "from-blue-500/20 via-cyan-500/5 to-transparent",
  robotics: "from-purple-500/20 via-indigo-500/5 to-transparent",
  processors: "from-rose-500/20 via-red-500/5 to-transparent"
};

export default function ProductCard({ id, name, price, category, rating, description }: ProductProps) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const cleanCat = category.toLowerCase();
  const activeGradient = categoryGradients[cleanCat] || categoryGradients.processors;

  // 🛠️ Fixed: Mapping for all 15 inventory items by unique product name lookup
  const productImages: Record<string, string> = {
    // 📁 Storage Arrays
    "aegis quantum drive": "/s1.webp",
    "cortex vault array": "/s2.webp",
    "chronos mesh bank": "/s3.webp",
    "helios micro cell": "/s4.webp",
    "titan lattice core": "/s5.webp",

    // 📁 Wearables & Syncs
    "neural link band v2": "/w1.webp",
    "pulse matrix ring": "/w2.webp",

    // 📁 Volumetric Displays
    "holodisplay prism": "/d1.webp",
    "aerohud visor frame": "/d2.webp",
    "spectra beam deck": "/d3.webp",

    // 📁 Robotics Cores
    "vector ai drone core": "/r1.webp",
    "nexus actuator deck": "/r2.webp",

    // 📁 Quantum Processors
    "cortex processing...": "/p1.webp", 
    "aura logic switcher": "/p2.webp",
    "nova signal engine": "/p3.webp"
  };

  const cleanName = name?.toLowerCase().trim();
  const localImageSrc = productImages[cleanName] || "/p1.webp";

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    await addToCart(id, 1);
    window.dispatchEvent(new Event("omnihub_cart_updated"));
    setAdding(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-2xl bg-white/[0.02] border border-white/5 p-5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.3)] h-full"
    >
      <div>
        {/* Local Asset Image Frame Display Container Layout */}
        <div className="relative h-48 w-full rounded-xl border border-white/5 flex items-center justify-center overflow-hidden mb-4 bg-[#050816]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:16px_16px] z-0" />
          <div className={`absolute inset-0 bg-gradient-to-tr ${activeGradient} opacity-100 group-hover:scale-110 transition-transform duration-500 z-0`} />

          {/* 🖼️ Standard HTML img tag pointed directly to local unique webp assets */}
          <img
            src={localImageSrc}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-500 pointer-events-none z-10"
          />

          {/* Action Overlay: Appears smoothly on hover with action icons */}
          <div className="absolute inset-0 bg-[#050816]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-40">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="p-3 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              {adding ? <Loader2 size={18} className="animate-spin" /> : <ShoppingCart size={18} />}
            </button>
            <Link
              href={`/products/${id}`}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition border border-white/10 flex items-center justify-center cursor-pointer"
            >
              <Eye size={18} />
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2 select-none">
          <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/10">
            {category}
          </span>
          <div className="flex items-center gap-1 text-amber-400 font-mono text-xs">
            <Star size={12} fill="currentColor" />
            <span className="font-bold text-slate-300">{rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-1 uppercase tracking-wide">
          {name}
        </h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
        <div>
          <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest font-black select-none">Allocation Cost</p>
          <p className="text-lg font-black text-white font-sans">${price.toLocaleString()}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-slate-400 hover:text-cyan-400 cursor-pointer select-none active:scale-95"
        >
          {adding ? "Allocating..." : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}
