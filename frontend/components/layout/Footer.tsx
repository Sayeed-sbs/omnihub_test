"use client";

import Container from "../ui/Container";
import Link from "next/link";
import Image from "next/image"; 
import { Sliders } from "lucide-react"; // Only keep the generic utility icons that exist safely

export default function Footer() {
  // Social link mapping configuration array with embedded vector SVGs
  const socialLinks = [
    { 
      name: "Twitter/X", 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      href: "https://twitter.com" 
    },
    { 
      name: "GitHub", 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.068.069-.068 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      ), 
      href: "https://github.com" 
    },
    { 
      name: "Discord", 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 004.67 4.37a.07.07 0 00-.032.027C.533 10.494-.45 16.458.08 22.336a.08.08 0 00.03.055 19.916 19.916 0 006.015 3.054.078.078 0 00.084-.027c.461-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.298 12.298 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.015-3.054.078.078 0 00.032-.054c.5-5.894-.483-11.82-4.536-17.939a.07.07 0 00-.032-.027zm-11.505 10c-1.18 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.18 0-2.156-1.085-2.156-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ), 
      href: "https://discord.com" 
    },
    { 
      name: "Terminal/Slack", 
      icon: <Sliders size={16} />, 
      href: "https://slack.com" 
    },
    { 
      name: "YouTube", 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      href: "https://youtube.com" 
    },
    { 
      name: "LinkedIn", 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
        </svg>
      ), 
      href: "https://linkedin.com" 
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#03050f]/80 py-16 text-xs text-slate-400">
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1: Platform Brand Description Block & Social Links */}
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-0 select-none group cursor-pointer relative max-w-fit">
            <div className="relative w-14 h-14 overflow-hidden transition-all duration-300 z-10">
              <Image src="/omnihub_logo.png" alt="OMNIHUB Logo" fill className="object-contain" priority />
            </div>
            <div className="z-10 -ml-1">
              <h2 className="text-base font-black tracking-widest leading-none text-white group-hover:text-cyan-400 transition-colors duration-300">OMNIHUB</h2>
              <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider">Future Marketplace</p>
            </div>
          </Link>
          
          <p className="leading-relaxed text-slate-400">
            Next-generation hardware transactional system layer optimized for trading decentralized computational logic hardware components.
          </p>

          {/* Social Network Links Array Output */}
          <div className="flex flex-wrap gap-2 pt-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 hover:border-cyan-500/20 transition-all duration-300 flex items-center justify-center"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Navigation Pathways Links Row */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Network Map</h4>
          <ul className="space-y-2.5 font-medium">
            <li><Link href="/" className="hover:text-white transition-colors">Home Base</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Quantum Devices</Link></li>
            <li><Link href="/categories" className="hover:text-white transition-colors">Catalog Matrix</Link></li>
          </ul>
        </div>

        {/* Col 3: Support Architecture Channels Link Row */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Secure Core</h4>
          <ul className="space-y-2.5 font-medium">
            <li><Link href="/about" className="hover:text-white transition-colors">System Overview</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Establish Link Connection</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Cryptographic Licenses</a></li>
          </ul>
        </div>

        {/* Col 4: Platform Security Seal Ledger Status Block */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Ecosystem Status</h4>
          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span>Mainnet Gateways:</span>
              <span className="font-bold text-emerald-400 animate-pulse">● OPERATIONAL</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Latency Index:</span>
              <span className="font-mono text-slate-300 font-semibold">0.42ms</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Absolute Bottom Copy Rows */}
      <Container className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
        <p>© 2026 OMNIHUB Core Systems Architecture. All Rights Reserved.</p>
        <p className="tracking-widest text-[10px] uppercase font-black text-slate-600">Secure AES-256 Commerce Layer Enabled</p>
      </Container>
    </footer>
  );
}
