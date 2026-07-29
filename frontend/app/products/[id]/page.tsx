"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { useCart } from "@/hooks/useCart";
import { Shield, Cpu, Zap, Star, ShoppingCart, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  description: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const categoryGradients: Record<string, string> = {
  storage: "from-cyan-500/30 via-blue-500/10 to-transparent",
  wearables: "from-pink-500/30 via-purple-500/10 to-transparent",
  displays: "from-blue-500/30 via-cyan-500/10 to-transparent",
  robotics: "from-purple-500/30 via-indigo-500/10 to-transparent",
  processors: "from-rose-500/30 via-red-500/10 to-transparent"
};

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  // 🛠️ Feature Added: State tracking for the Click-to-Zoom functionality
  const [isZoomed, setIsZoomed] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    await addToCart(product._id, 1);
    window.dispatchEvent(new Event("omnihub_cart_updated"));
    setAdding(false);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${resolvedParams.id}`);
        const data = await response.json();
        if (data.success && data.product) {
          setProduct(data.product);
        } else if (data._id) {
          setProduct(data);
        } else {
          throw new Error("Target not in DB instance");
        }
      } catch (error) {
        console.error("Linkage failed...", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [resolvedParams.id]);

  if (loading || !product) {
    return (
      <main className="bg-[#050816] text-white min-h-screen flex flex-col pt-24 justify-between">
        <Navbar />
        <div className="flex items-center justify-center py-32 text-cyan-400 gap-2 font-mono text-xs select-none">
          <Loader2 size={18} className="animate-spin" /> 
          SYNCHRONIZING HARDWARE SPECIFICATION TRACE...
        </div>
        <Footer />
      </main>
    );
  }

  const activeGradient = categoryGradients[product.category?.toLowerCase()] || categoryGradients.processors;

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

  const cleanName = product.name?.toLowerCase().trim();
  const localImageSrc = productImages[cleanName] || "/p1.webp";

  return (
    <main className="bg-[#050816] text-white min-h-screen flex flex-col pt-24 selection:bg-cyan-500/30">
      <Navbar />
      <div className="flex-grow py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
        <Container className="max-w-5xl relative z-10 space-y-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-cyan-400 cursor-pointer select-none group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> 
            [ RETURN TO HARDWARE MATRIX ]
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
            {/* Left Box: Click-to-Zoom Image Box Container Frame */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="relative h-96 w-full rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden bg-[#090d22] shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)} // Click to switch mode state values
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:24px_24px] z-0 pointer-events-none" />
              <div className={`absolute inset-0 bg-gradient-to-tr ${activeGradient} z-0 pointer-events-none`} />
              
              {/* Image node dynamically updates magnification factor by evaluation profile state triggers */}
              <img 
                src={localImageSrc} 
                alt={product.name} 
                className={`absolute inset-0 w-full h-full object-cover opacity-100 z-10 transition-transform duration-500 ease-out select-none ${
                  isZoomed ? "scale-[1.6]" : "scale-100"
                }`} 
              />
            </motion.div>

            {/* Right Box: Technical Spec Metrics */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center select-none">
                  <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-md border border-cyan-400/20">{product.category}</span>
                  <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold"><Star size={14} fill="currentColor" /> {product.rating}</div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl font-black text-white uppercase tracking-tight leading-tight">{product.name}</h1>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{product.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 select-none">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.01] border border-white/5 font-mono text-[11px] text-slate-400"><Shield size={14} className="text-cyan-400" /> AES-256 Crypto Verified</div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.01] border border-white/5 font-mono text-[11px] text-slate-400"><Cpu size={14} className="text-cyan-400" /> Multi-Thread Logic Link</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest font-black select-none">Allocation Cost</p>
                  <p className="text-3xl font-black text-white">${product.price.toLocaleString()}</p>
                </div>

                <button 
                  onClick={handleAddToCart} 
                  disabled={adding} 
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs uppercase tracking-widest text-white cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_35px_rgba(6,182,212,0.4)] transition-all duration-300 active:scale-95"
                >
                  {adding ? <Loader2 size={14} className="animate-spin" /> : <ShoppingCart size={14} />} 
                  Allocate Component
                </button>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}
