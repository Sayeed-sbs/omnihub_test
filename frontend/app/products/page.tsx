"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/product/ProductCard";
import api from "@/lib/api";
import { inventoryProducts, Product } from "./productsData";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const filterCategories = [
  { name: "All Devices", slug: "all" },
  { name: "Storage Arrays", slug: "storage" },
  { name: "Wearables & Syncs", slug: "wearables" },
  { name: "Volumetric Displays", slug: "displays" },
  { name: "Robotics Cores", slug: "robotics" },
  { name: "Quantum Processors", slug: "processors" }
];

const gridItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
};

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(3000);

  const activeCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.length > 0 ? response.data : inventoryProducts);
      } catch (error) {
        setProducts(inventoryProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategorySelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("category");
    else params.set("category", slug);
    router.push(`?${params.toString()}`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesCategory = activeCategory === "all" || prod.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = prod.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [products, activeCategory, searchQuery, maxPrice]);

  return (
    <main className="bg-[#050816] text-white min-h-screen flex flex-col pt-24 selection:bg-cyan-500/30">
      <Navbar />
      <div className="flex-grow py-12">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/5 select-none">
            <div>
              <h1 className="text-4xl font-black uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Quantum Inventory</h1>
              <p className="text-[11px] font-mono text-cyan-400 mt-1.5 uppercase">// Systems Database Stream Active</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 px-4 py-2.5 rounded-xl cursor-pointer select-none transition-all duration-200 hover:text-white text-slate-300">
                {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                {sidebarOpen ? "Minimize Filters" : "Expand Filters"}
              </button>
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Query system assets payload..." className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-2.5 pl-11 pr-10 text-xs text-white focus:outline-none focus:border-cyan-500/40 font-medium transition-all" />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer p-1 rounded-md hover:bg-white/5"><X size={14} /></button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 mt-10 relative">
            <aside className={`transition-all duration-300 ease-in-out lg:sticky lg:top-28 h-fit shrink-0 overflow-hidden ${sidebarOpen ? "w-full lg:w-64 opacity-100" : "w-full lg:w-0 lg:opacity-0 pointer-events-none"}`}>
              <div className="space-y-8">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-slate-500 select-none"><SlidersHorizontal size={13} className="text-cyan-400" /> Filter Parameters</div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest select-none">// Core Categories</h4>
                  <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto pb-3 lg:pb-0 scrollbar-none select-none">
                    {filterCategories.map((cat) => (
                      <button key={cat.slug} onClick={() => handleCategorySelect(cat.slug)} className={`whitespace-nowrap text-left text-xs font-semibold px-4 py-3 rounded-xl border w-full transition-all duration-200 cursor-pointer select-none ${activeCategory === cat.slug ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.05)]" : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-white hover:border-white/10 hover:bg-white/[0.02]"}`}>{cat.name}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest select-none"><span>// Allocation Limit</span><span className="text-cyan-400 font-bold text-xs font-sans">${maxPrice.toLocaleString()}</span></div>
                  <input type="range" min="100" max="3000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none focus:ring-0" />
                </div>
              </div>
            </aside>

            <div className="flex-grow w-full">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-500 font-mono text-xs select-none"><Loader2 size={32} className="animate-spin text-cyan-400" /><p className="uppercase tracking-widest font-black">// Mapping Datasets...</p></div>
              ) : (
                <div className="space-y-6">
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider select-none">Showing {filteredProducts.length} assets verified match indices</div>
                  <motion.div layout className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${sidebarOpen ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-3 xl:grid-cols-4"}`}>
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map((product) => (
                        <motion.div key={product._id} variants={gridItemVariants} initial="hidden" animate="show" exit="exit" layout whileHover={{ y: -4 }} className="cursor-pointer">
                          <ProductCard id={product._id} name={product.name} price={product.price} category={product.category} rating={product.rating} description={product.description} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<main className="bg-[#050816] text-white min-h-screen flex items-center justify-center font-mono text-xs"><Loader2 size={24} className="animate-spin text-cyan-400" /> LOADING INFRASTRUCTURE FILES...</main>}>
      <ProductsContent />
    </Suspense>
  );
}
