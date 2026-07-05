"use client";

import Link from "next/link";
import React from "react";
import { motion, type Variants } from "framer-motion";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative pb-16 lg:pb-24 overflow-hidden bg-slate-50 selection:bg-blue-100 font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Very light grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
        
        {/* Subtle radial glow & Blurred circles */}
        <div className="absolute left-0 top-0 -z-10 w-[800px] h-[800px] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute right-0 bottom-0 -z-10 w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-[100px]" />
      </div>

      {/* Main Container */}
      {/* Removed top padding entirely (pt-0) */}
      <div className="container relative z-10 mx-auto max-w-7xl px-10 sm:px-16 lg:px-0">
        
        {/* Changed items-center to items-start so text doesn't get pushed down */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start pt-8 lg:pt-12">
          
          {/* Left Column: Content */}
          <motion.div
            className="flex flex-col items-start text-left w-full max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100/50 shadow-sm shadow-blue-100 text-blue-600 text-sm font-medium transition-transform hover:scale-105">
                <Sparkles className="w-4 h-4 fill-blue-600/20" />
                <span>AI Powered Home Services</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-6 w-full">
              <h1 className="text-5xl sm:text-6xl lg:text-[4.2rem] leading-[1.1] font-extrabold tracking-tight text-slate-900">
                Book{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Trusted
                </span>{" "}
                Home Services<br className="hidden sm:block" /> In Minutes.
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="mb-10 w-full max-w-xl">
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                Describe your problem using text, voice, image, or video. Our AI understands the issue, estimates repair costs, and instantly connects you with the right professional.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-start items-center w-full"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-xl h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white text-base shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/30 hover:-translate-y-0.5"
              ><Link href="/signup">
                Book Service Now </Link>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-xl h-14 px-8 border-slate-200 bg-white/50 text-slate-900 hover:bg-slate-100 hover:border-slate-300 text-base backdrop-blur-sm transition-all hover:-translate-y-0.5"
              >
                Explore Services
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Image Grid */}
          <motion.div
            className="relative hidden lg:block w-full max-w-xl ml-auto lg:pt-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          >
            <div className="flex gap-4 items-start">
              {/* Left Column of Images */}
              <div className="flex flex-col gap-4 w-1/2 mt-12">
                {/* Electrician */}
                <div className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-xl shadow-slate-200/50 h-64 border border-white/60">
                  <img 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop" 
                    alt="Electrician at work" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 text-white font-semibold tracking-wide text-sm">Electricians</div>
                </div>
                
                {/* Plumber */}
                <div className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-xl shadow-slate-200/50 h-56 border border-white/60 bg-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop" 
                    alt="Plumber at work" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 text-white font-semibold tracking-wide text-sm">Plumbers</div>
                </div>
              </div>

              {/* Right Column (Single tall image) */}
              <div className="w-1/2 relative cursor-pointer  group overflow-hidden rounded-3xl shadow-xl shadow-slate-200/50 h-[32rem] border border-white/60">
                {/* Carpenter */}
                <img 
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" 
                  alt="Carpenter working" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 text-white font-semibold tracking-wide text-sm">Carpenters</div>
                
                {/* Floating Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg shadow-black/5 text-sm font-bold text-slate-800">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  4.9/5
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}