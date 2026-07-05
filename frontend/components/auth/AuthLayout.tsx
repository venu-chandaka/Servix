"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, Zap, Paintbrush, Hammer, Droplets } from "lucide-react";

const floatingIcons = [
  { Icon: Wrench, top: "15%", left: "10%", delay: 0 },
  { Icon: Zap, top: "25%", left: "80%", delay: 1.5 },
  { Icon: Paintbrush, top: "70%", left: "15%", delay: 3 },
  { Icon: Droplets, top: "65%", left: "85%", delay: 2 },
  { Icon: Hammer, top: "85%", left: "50%", delay: 0.5 },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-slate-50 selection:bg-blue-100 overflow-hidden font-sans">
      
      {/* Premium Abstract Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
        <div className="absolute left-0 top-0 -translate-x-1/4 -translate-y-1/4 w-[800px] h-[800px] rounded-full bg-blue-200/40 blur-[120px]" />
        <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] rounded-full bg-indigo-200/40 blur-[100px]" />
      </div>

      {/* Floating Service Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute text-blue-500/20"
            style={{ top: item.top, left: item.left }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <item.Icon className="w-16 h-16" />
          </motion.div>
        ))}
      </div>

      {/* Auth Card Container */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}