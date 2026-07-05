"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  // Change acceptTerms to use refine()
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});


type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  // Watch password to update strength indicator
  const passwordValue = watch("password", "");
  
  React.useEffect(() => {
    let strength = 0;
    if (passwordValue.length > 5) strength += 25;
    if (passwordValue.length > 7) strength += 25;
    if (/[A-Z]/.test(passwordValue)) strength += 25;
    if (/[0-9]/.test(passwordValue) || /[^A-Za-z0-9]/.test(passwordValue)) strength += 25;
    setPasswordStrength(strength);
  }, [passwordValue]);

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-400";
    if (passwordStrength <= 50) return "bg-amber-400";
    if (passwordStrength <= 75) return "bg-blue-400";
    return "bg-emerald-500";
  };

  // Make sure to import createClient at the top of the file!
  // import { createClient } from "@/lib/supabase/client";

    const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    try {
      // 1. Save their full name to the browser's memory!
      localStorage.setItem("fixflow_user_name", data.fullName);

      // Fake a loading delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Account created successfully!");
      
      // 2. Send them straight to the dashboard!
      window.location.href = "/dashboard"; 
      
    } catch (error) {
      toast.error("Failed to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />

      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4 border border-blue-100">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Create an account</h2>
        <p className="text-sm text-slate-500">Join FixFlow to book trusted professionals.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              {...register("fullName")}
              type="text"
              placeholder="John Doe"
              className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-12 pl-11 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {passwordValue.length > 0 && (
            <div className="pt-1 flex gap-1">
              {[25, 50, 75, 100].map((step) => (
                <div key={step} className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${passwordStrength >= step ? getStrengthColor() : "w-0"}`} 
                    style={{ width: passwordStrength >= step ? '100%' : '0%' }}
                  />
                </div>
              ))}
            </div>
          )}
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mt-2">
          <input
            {...register("acceptTerms")}
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 cursor-pointer"
          />
          <div className="text-sm text-slate-600">
            I accept the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            {errors.acceptTerms && <p className="text-xs text-red-500 mt-1">{errors.acceptTerms.message}</p>}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
          Sign In
        </a>
      </p>
    </motion.div>
  );
}