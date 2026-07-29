"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "../ui/Container";
import { useCart } from "@/hooks/useCart";
import { Menu, X, ShoppingCart, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface UserProfile {
  name: string;
  email: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCartHovered, setIsCartHovered] = useState(false); // 🔥 Track cart element hover states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, refreshCart } = useCart();
  const badgeCount = cartItems.length;

  const isCartPage = pathname === "/cart"; // 🔥 Check if current browser path matches the cart

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch (e) {
        console.error(e);
      }
    }

    // 📡 Global Synchronization Event Handler
    const handleCartSync = () => {
      refreshCart();
    };

    window.addEventListener("omnihub_cart_updated", handleCartSync);
    return () => window.removeEventListener("omnihub_cart_updated", handleCartSync);
  }, []); // ⚡ FIX: Left empty so the listener binds once and doesn't infinitely loop render styles

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const navContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  const navItemVariants = {
    hidden: { y: -60, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-xl bg-[#050816]/70">
      <Container className="flex items-center justify-between h-24">
        {/* Left Side: Logo Branding Matrix with tighter gap-2 alignment */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <Link href="/" className="flex items-center gap-0 select-none group cursor-pointer relative">
            {/* 🛠️ Adjusted from w-30 h-26 down to a stable w-16 h-16 container to eliminate blank layout empty space */}
            <div className="relative w-16 h-16 overflow-hidden transition-all duration-300 z-10">
              <Image 
                src="/omnihub_logo.png" 
                alt="OMNIHUB Logo" 
                fill 
                sizes="64px" // 🛠️ Fixed: Tells Next.js the exact max width of this container to clear console errors
                className="object-contain" 
                priority 
              />
            </div>

            {/* 🛠️ Shifted text slightly left with -ml-1 for a tighter, high-end professional appearance next to graphic */}
            <div className="z-10 -ml-1">
              <h2 className="text-xl font-black tracking-widest leading-none text-white group-hover:text-cyan-400 transition-colors duration-300">OMNIHUB</h2>
              <p className="text-[11px] text-slate-400 mt-1.5 uppercase tracking-wider">Future Marketplace</p>
            </div>
          </Link>
        </motion.div>

        {/* Center: Menu Items */}
        <motion.nav
          variants={navContainerVariants}
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="hidden lg:flex items-center gap-3 text-[15px] font-semibold text-slate-300 bg-white/[0.02] border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md"
        >
          {navLinks.map((link, idx) => {
            const isActivePage = pathname === link.href;
            return (
              <motion.div key={link.name} variants={navItemVariants} transition={{ type: "spring", stiffness: 120, damping: 14 }} className="inline-block">
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 transition-colors duration-200 cursor-pointer block ${isActivePage ? "text-cyan-400 font-bold" : "hover:text-white"}`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="relative z-10">{link.name}</span>
                  <AnimatePresence>
                    {(hoveredIndex === idx || (isActivePage && hoveredIndex === null)) && (
                      <motion.div
                        layoutId="navbarUnderline"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        initial={isActivePage ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
          {/* 🛠️ Updated cart element with pathname active state integration, hover triggers, and matching line animations */}
          <Link 
            href="/cart" 
            className={`flex items-center gap-1.5 transition-colors relative p-2.5 rounded-xl hover:bg-white/5 cursor-pointer ${isCartPage ? "text-cyan-400" : "hover:text-cyan-400"}`}
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
          >
            <ShoppingCart size={22} />
            {badgeCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 text-white text-[10px] font-black flex items-center justify-center border border-[#050816] shadow-[0_0_10px_rgba(34,211,238,0.6)] animate-pulse"
              >
                {badgeCount}
              </motion.span>
            )}

            <AnimatePresence>
              {(isCartHovered || (isCartPage && !isCartHovered)) && (
                <motion.div
                  layoutId="navbarUnderline"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  initial={isCartPage ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </AnimatePresence>
          </Link>

          {user ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-4 select-none">
              <span className="text-xs font-bold text-cyan-300 bg-cyan-500/5 border border-cyan-500/20 px-3.5 py-2 rounded-xl max-w-[140px] truncate shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                👾 {user.name}
              </span>
              <button onClick={handleSignOut} className="p-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 border border-transparent hover:border-rose-500/10 transition-all duration-200 cursor-pointer">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors p-2.5 rounded-xl hover:bg-white/5 cursor-pointer">
              <User size={22} />
            </Link>
          )}

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </Container>
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full border-t border-white/5 bg-[#050816]/95 backdrop-blur-2xl flex flex-col p-6 space-y-4 font-semibold text-slate-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl hover:bg-white/5 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

    </header>
  );
}
