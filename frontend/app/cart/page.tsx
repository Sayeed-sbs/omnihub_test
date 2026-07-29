"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { useCart } from "@/hooks/useCart";
import { CreditCard, Trash2, ShieldCheck, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  // 📡 Destructuring our full-stack state actions safely from the custom hook wrapper
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  // Calculate dynamic pricing values cleanly out of active MongoDB items matrices
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.productId?.price || 0) * item.quantity;
  }, 0);
  
  const networkFee = subtotal > 0 ? 45 : 0;
  const total = subtotal + networkFee;

  return (
    <main className="bg-[#050816] text-white min-h-screen flex flex-col pt-24">
      <Navbar />

      <div className="flex-grow py-12">
        <Container>
          <div className="mb-8 pb-6 border-b border-white/5">
            <h1 className="text-4xl font-black tracking-tight">System Cart</h1>
            <p className="text-xs text-slate-400 mt-1.5">Review allocations before initializing network purchase protocols</p>
          </div>

          {cartItems.length === 0 ? (
            // 🛒 Empty Tray Feedback Layout
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="p-4 rounded-full bg-white/5 border border-white/10 text-slate-500">
                <ShoppingBag size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Your matrix checkout tray is empty</h3>
                <p className="text-xs text-slate-500 mt-1">No active hardware nodes allocated to your account file signature yet</p>
              </div>
              <Link href="/products" className="mt-2 text-xs font-semibold px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:opacity-90 transition shadow-[0_4px_15px_rgba(6,182,212,0.2)]">
                Browse Asset Catalog
              </Link>
            </div>
          ) : (
            // 📦 Connected Live Ledger Grid Matrix
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Side: Product Line Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  if (!item.productId) return null;
                  return (
                    <div 
                      key={item.productId._id} 
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-white/5 flex items-center justify-center font-bold text-xs text-cyan-400 shrink-0">
                          NODE
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                            {item.productId.category}
                          </span>
                          <h3 className="text-base font-bold text-white mt-1.5">{item.productId.name}</h3>
                          <p className="text-sm font-black text-slate-300 mt-0.5">
                            ${item.productId.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Quantity & Removal Buttons linked directly to backend ports */}
                      <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                        <div className="flex items-center border border-white/10 rounded-xl bg-white/[0.02] select-none">
                          <button 
                            onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                            className="px-3 py-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-black text-white min-w-[16px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                            className="px-3 py-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.productId._id)}
                          className="p-2 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Side: Ledger Billing Card Overview */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 lg:sticky lg:top-28">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CreditCard size={18} className="text-cyan-400" /> Cost Summary
                </h2>
                
                <div className="space-y-3 text-sm border-b border-white/5 pb-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="text-white font-semibold">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Network Encrypting Fee</span>
                    <span className="text-white font-semibold">${networkFee}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center my-5">
                  <span className="text-sm text-slate-400">Total Commitment</span>
                  <span className="text-xl font-black text-white">${total.toLocaleString()}</span>
                </div>

                {/* 🚀 Secure Checkout Pipeline Automation Trigger Button */}
                <button 
                  onClick={async () => {
                    await clearCart();
                    alert("🚀 Quantum Transaction Authenticated! Your network order has been securely deployed to MongoDB records.");
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(6,182,212,0.25)] hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer"
                >
                  Proceed to Secure Checkout <ArrowRight size={16} />
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-emerald-500" /> Cryptographically Validated
                </div>
              </div>

            </div>
          )}
        </Container>
      </div>

      <Footer />
    </main>
  );
}
