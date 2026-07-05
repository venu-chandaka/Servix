"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Calendar, Bot, ClipboardList, Map, MessageSquare, Bell, Bookmark, Wallet, Settings, User, 
  MapPin, Camera, Video, Sparkles, Search,
  Star, Activity, Shield, Wrench, Check, ChevronRight, Cloud, Cpu, Receipt, Droplet, Info, Phone, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Calendar, label: "Book Service" },
  { icon: Bot, label: "AI Assistant" },
  { icon: ClipboardList, label: "My Diagnoses" },
  { icon: Map, label: "Live Tracking" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Bell, label: "Notifications" },
  { icon: User, label: "Profile" },
];

const nearbyPros = [
  // --- PLUMBERS ---
  { name: "Rahul Sharma", skill: "Master Plumber", rating: "4.9", exp: "8 years", distance: "1.2 km", price: "₹349/hr", eta: "15 mins", phone: "+91 98765 12345" },
  { name: "Karan Singh", skill: "Emergency Plumber", rating: "4.7", exp: "5 years", distance: "2.8 km", price: "₹299/hr", eta: "30 mins", phone: "+91 87654 98765" },
  { name: "Mohammed Ali", skill: "Pipe Specialist", rating: "4.8", exp: "11 years", distance: "4.5 km", price: "₹399/hr", eta: "45 mins", phone: "+91 99887 77665" },
  { name: "Sandeep Reddy", skill: "General Plumber", rating: "4.5", exp: "3 years", distance: "0.9 km", price: "₹250/hr", eta: "10 mins", phone: "+91 91234 56789" },

  // --- ELECTRICIANS ---
  { name: "Amit Patel", skill: "Expert Electrician", rating: "4.8", exp: "12 years", distance: "2.5 km", price: "₹299/hr", eta: "25 mins", phone: "+91 98989 89898" },
  { name: "Vijay Kumar", skill: "Wiring Specialist", rating: "4.6", exp: "7 years", distance: "3.2 km", price: "₹250/hr", eta: "35 mins", phone: "+91 97777 66666" },
  { name: "Ramesh Naidu", skill: "Heavy Duty Electrician", rating: "4.9", exp: "15 years", distance: "5.0 km", price: "₹450/hr", eta: "1 hr", phone: "+91 94444 33333" },
  { name: "Abdul Rehman", skill: "Quick Fix Electrician", rating: "4.4", exp: "4 years", distance: "1.5 km", price: "₹200/hr", eta: "20 mins", phone: "+91 95555 22222" },

  // --- CARPENTERS ---
  { name: "Vikram Singh", skill: "Expert Carpenter", rating: "4.7", exp: "15 years", distance: "3.0 km", price: "₹450/hr", eta: "40 mins", phone: "+91 98888 11111" },
  { name: "Anand Woodworks", skill: "Furniture Repair", rating: "4.9", exp: "20 years", distance: "6.2 km", price: "₹600/hr", eta: "Tomorrow", phone: "+91 93333 44444" },
  { name: "Deepak Joshi", skill: "General Carpenter", rating: "4.5", exp: "6 years", distance: "2.1 km", price: "₹300/hr", eta: "30 mins", phone: "+91 92222 55555" },
  { name: "Manish Tiwari", skill: "Door/Window Specialist", rating: "4.8", exp: "9 years", distance: "4.8 km", price: "₹400/hr", eta: "1 hr", phone: "+91 96666 77777" },

  // --- APPLIANCE REPAIR (AC/Fridge/Washing Machine) ---
  { name: "Suresh Kumar", skill: "AC Mechanic", rating: "4.9", exp: "6 years", distance: "0.8 km", price: "₹399/hr", eta: "10 mins", phone: "+91 99999 88888" },
  { name: "Manoj Tiwari", skill: "Washing Machine Expert", rating: "4.8", exp: "7 years", distance: "1.5 km", price: "₹300/hr", eta: "18 mins", phone: "+91 98765 54321" },
  { name: "Prakash Rao", skill: "Fridge Specialist", rating: "4.6", exp: "5 years", distance: "3.5 km", price: "₹350/hr", eta: "45 mins", phone: "+91 91111 00000" },
  { name: "Imran Khan", skill: "TV & Electronics Repair", rating: "4.7", exp: "8 years", distance: "2.2 km", price: "₹299/hr", eta: "25 mins", phone: "+91 90000 11111" },

  // --- PAINTERS ---
  { name: "Priya Das", skill: "Interior Painter", rating: "4.8", exp: "9 years", distance: "4.1 km", price: "₹250/hr", eta: "1 hr", phone: "+91 98900 12345" },
  { name: "Santosh Yadav", skill: "Wall Putty Expert", rating: "4.5", exp: "4 years", distance: "1.8 km", price: "₹200/hr", eta: "30 mins", phone: "+91 97800 54321" },
  { name: "Lakshmi Colors", skill: "Full House Painting", rating: "4.9", exp: "12 years", distance: "5.5 km", price: "₹500/hr", eta: "Tomorrow", phone: "+91 96700 98765" },
  { name: "Gopal Krishna", skill: "Exterior Painter", rating: "4.6", exp: "7 years", distance: "3.3 km", price: "₹300/hr", eta: "2 hrs", phone: "+91 95600 11223" },

  // --- MECHANICS (Car/Bike Repair) ---
  { name: "Rajesh Verma", skill: "Car Mechanic", rating: "4.6", exp: "10 years", distance: "5.2 km", price: "₹500/visit", eta: "20 mins", phone: "+91 94500 33445" },
  { name: "Surya Auto Care", skill: "Bike Mechanic", rating: "4.8", exp: "8 years", distance: "1.1 km", price: "₹200/visit", eta: "10 mins", phone: "+91 93400 55667" },
  { name: "Karthik Raj", skill: "Engine Specialist", rating: "4.9", exp: "15 years", distance: "6.8 km", price: "₹800/visit", eta: "1 hr", phone: "+91 92300 77889" },
  { name: "Dinesh Motors", skill: "Puncture & Towing", rating: "4.4", exp: "3 years", distance: "2.4 km", price: "₹300/visit", eta: "15 mins", phone: "+91 91200 99001" },

  // --- BUILDERS / MASONS ---
  { name: "Sanjay Gupta", skill: "Builder & Mason", rating: "4.7", exp: "20 years", distance: "6.0 km", price: "₹800/day", eta: "Tomorrow", phone: "+91 99888 12345" },
  { name: "Raju Mistri", skill: "Tile Specialist", rating: "4.8", exp: "14 years", distance: "3.7 km", price: "₹700/day", eta: "2 hrs", phone: "+91 98777 54321" },
  { name: "Ganesh Constructions", skill: "Wall Building", rating: "4.6", exp: "10 years", distance: "4.2 km", price: "₹650/day", eta: "Tomorrow", phone: "+91 97666 98765" },
  { name: "Babu Bhai", skill: "Cement Works", rating: "4.5", exp: "8 years", distance: "2.9 km", price: "₹600/day", eta: "4 hrs", phone: "+91 96555 11223" },

  // --- DRIVERS ---
  { name: "Ashok Travels", skill: "Private Driver", rating: "4.9", exp: "12 years", distance: "1.5 km", price: "₹500/day", eta: "20 mins", phone: "+91 95444 33445" },
  { name: "Sunil Kumar", skill: "Heavy Vehicle Driver", rating: "4.7", exp: "9 years", distance: "4.5 km", price: "₹800/day", eta: "1 hr", phone: "+91 94333 55667" },
  { name: "Nitin Transport", skill: "Outstation Driver", rating: "4.8", exp: "15 years", distance: "7.1 km", price: "₹1000/day", eta: "Tomorrow", phone: "+91 93222 77889" },
  { name: "Ravi Shankar", skill: "Local Taxi Driver", rating: "4.5", exp: "4 years", distance: "0.5 km", price: "₹300/trip", eta: "5 mins", phone: "+91 92111 99001" },
];

const recentDiagnoses = [
  { issue: "Washing Machine Motor Failure", date: "Today, 10:30 AM", confidence: "94%", status: "Resolved", icon: Wrench },
  { issue: "Kitchen Sink Leak", date: "Yesterday, 4:15 PM", confidence: "88%", status: "Pending Fix", icon: Droplet },
];

type AIState = "idle" | "capturing" | "processing" | "results";
type InputMethod = "camera" | "video" | "voice" | null;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [firstName, setFirstName] = useState("Guest");
  const [initials, setInitials] = useState("G");

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [aiState, setAiState] = useState<AIState>("idle");
  const [inputMethod, setInputMethod] = useState<InputMethod>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [aiData, setAiData] = useState<any>(null); 

  useEffect(() => {
    const savedName = localStorage.getItem("fixflow_user_name");
    if (savedName) {
      setFirstName(savedName.split(" ")[0]);
      setInitials(savedName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase());
    } else {
      setFirstName("Bhanu");
      setInitials("BK");
    }
  }, []);

  const handleCameraClick = () => cameraInputRef.current?.click();
  const handleVideoClick = () => videoInputRef.current?.click();

  const handleVoiceClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setInputMethod("voice");
      setAiState("capturing");
      
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const file = new File([audioBlob], "voice_record.wav", { type: "audio/wav" });
        stream.getTracks().forEach(track => track.stop()); 
        startProcessing("voice", file);
      };
      
      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000); 
    } catch (err) {
      alert("Microphone permission was denied.");
    }
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>, method: InputMethod) => {
    if (e.target.files && e.target.files.length > 0) {
      startProcessing(method, e.target.files[0]);
    }
  };

  const startProcessing = async (method: InputMethod, file?: File) => {
    if (method !== "voice") {
      setInputMethod(method);
      setAiState("capturing");
    }
    
    setTimeout(() => {
      setAiState("processing");
      let step = 0;
      const interval = setInterval(() => {
        step += 1;
        setProcessingStep(step);
        if (step >= 3) clearInterval(interval);
      }, 1500);
    }, 1000);

    try {
      if (!file) throw new Error("No file provided");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Unknown Backend Error");
      }
      
      const data = await response.json();
      setAiData(data); 
      
      setProcessingStep(4);
      setTimeout(() => setAiState("results"), 500);

    } catch (error: any) {
      alert(`AI Failed! Reason: ${error.message}`);
      resetAI();
    }
  };

  const resetAI = () => {
    setAiState("idle");
    setInputMethod(null);
    setProcessingStep(0);
    setAiData(null);
  };

  // --- THE FLAWLESS SMART FILTER LOGIC ---
  const getFilteredPros = () => {
    if (!aiData || !aiData.category) return nearbyPros;
    const cat = aiData.category.toLowerCase();
    
    const filtered = nearbyPros.filter(pro => {
      const skill = pro.skill.toLowerCase();
      
      const isPlumber = skill.includes("plumb") || skill.includes("pipe");
      const isElectrician = skill.includes("electric") || skill.includes("wir");
      const isCarpenter = skill.includes("carpent") || skill.includes("wood") || skill.includes("furniture") || skill.includes("door");
      const isPainter = skill.includes("paint");
      const isAppliance = skill.includes("ac ") || skill.includes("appliance") || skill.includes("fridge") || skill.includes("tv") || skill.includes("machine");
      const isMechanic = skill.includes("mechanic") || skill.includes("auto") || skill.includes("motor");
      const isBuilder = skill.includes("build") || skill.includes("mason") || skill.includes("tile") || skill.includes("cement");
      const isDriver = skill.includes("driv") || skill.includes("taxi");

      if ((cat.includes("plumb") || cat.includes("leak") || cat.includes("water") || cat.includes("pipe") || cat.includes("sink")) && isPlumber) return true;
      if ((cat.includes("electric") || cat.includes("wire") || cat.includes("power") || cat.includes("light") || cat.includes("switch")) && isElectrician) return true;
      if ((cat.includes("carpent") || cat.includes("furniture") || cat.includes("wood") || cat.includes("table") || cat.includes("door")) && isCarpenter) return true;
      if ((cat.includes("paint") || cat.includes("color") || cat.includes("wall")) && isPainter) return true;
      if ((cat.includes("ac ") || cat.includes("appliance") || cat.includes("machine") || cat.includes("fridge") || cat.includes("tv")) && isAppliance) return true;
      if ((cat.includes("mechanic") || cat.includes("car") || cat.includes("bike") || cat.includes("engine") || cat.includes("vehicle")) && isMechanic) return true;
      if ((cat.includes("build") || cat.includes("mason") || cat.includes("cement") || cat.includes("construct")) && isBuilder) return true;
      if ((cat.includes("driv") || cat.includes("taxi") || cat.includes("transport")) && isDriver) return true;
      
      return skill.includes(cat) || cat.includes(skill);
    });

    // CRITICAL FIX: If we found literally no one, just show everyone instead of a blank screen.
    return filtered.length > 0 ? filtered : nearbyPros;
  };

  const displayedPros = getFilteredPros();

  const MicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" x2="12" y1="19" y2="22"></line>
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-blue-100">
      
      <input type="file" accept="image/*" ref={cameraInputRef} className="hidden" onChange={(e) => onFileSelected(e, "camera")} />
      <input type="file" accept="video/*" ref={videoInputRef} className="hidden" onChange={(e) => onFileSelected(e, "video")} />

      {/* --- Sidebar --- */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 sticky top-0 h-screen">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-md shadow-blue-600/20">F</div>
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">FixFlow AI</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          {navItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === item.label ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.label ? "text-white" : "text-slate-400"}`} />
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-slate-500 text-sm font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <MapPin className="w-4 h-4 text-blue-600" />
              Koramangala, Bengaluru
            </div>
            <span className="lg:hidden font-extrabold text-xl text-slate-900 tracking-tight ml-2">FixFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-sm border-2 border-white ring-2 ring-slate-100">
              {initials}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-7xl mx-auto w-full">
          
          {/* TAB 1: DASHBOARD (AI & OVERVIEW) */}
          {activeTab === "Dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome, {firstName} 👋</h1>
                <p className="text-slate-500 mt-1 text-base">What do you need help with today?</p>
              </div>

              {/* MANUAL SEARCH */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Book a Professional</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="E.g., Leaking kitchen sink, AC Repair..." 
                      className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-inner"
                    />
                    <button onClick={handleVoiceClick} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 hover:text-blue-600 transition-colors" title="Use Voice Search">
                      <MicIcon />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleVoiceClick} variant="outline" className="h-14 px-4 rounded-xl border-slate-200 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors hidden sm:flex">
                      <MicIcon />
                    </Button>
                    <Button onClick={() => setActiveTab("Book Service")} className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200 font-bold tracking-wide">
                      Find Pros
                    </Button>
                  </div>
                </div>
              </div>

              {/* AI SMART DIAGNOSIS CARD */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg shadow-slate-200/50 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
                <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-indigo-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                <AnimatePresence mode="wait">
                  {/* IDLE */}
                  {aiState === "idle" && (
                    <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Sparkles className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Not sure what's broken? Let AI analyze it.</h2>
                      <p className="text-slate-500 max-w-lg mx-auto mb-10">Upload a photo, record a video, or just explain your problem to our Gemini AI.</p>
                      <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                        <button onClick={handleCameraClick} className="group bg-white border-2 border-slate-100 hover:border-blue-500 p-6 rounded-2xl transition-all hover:shadow-xl hover:shadow-blue-500/10 flex flex-col items-center">
                          <div className="w-12 h-12 bg-slate-50 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 rounded-full flex items-center justify-center mb-4 transition-colors"><Camera className="w-6 h-6" /></div>
                          <h3 className="font-bold text-slate-900">Camera Analysis</h3>
                          <p className="text-xs text-slate-500 mt-2 text-center">Take a photo of the issue</p>
                        </button>
                        <button onClick={handleVideoClick} className="group bg-white border-2 border-slate-100 hover:border-indigo-500 p-6 rounded-2xl transition-all hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col items-center">
                          <div className="w-12 h-12 bg-slate-50 group-hover:bg-indigo-50 text-slate-600 group-hover:text-indigo-600 rounded-full flex items-center justify-center mb-4 transition-colors"><Video className="w-6 h-6" /></div>
                          <h3 className="font-bold text-slate-900">Video Analysis</h3>
                          <p className="text-xs text-slate-500 mt-2 text-center">Record moving defects</p>
                        </button>
                        <button onClick={handleVoiceClick} className="group bg-white border-2 border-slate-100 hover:border-emerald-500 p-6 rounded-2xl transition-all hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col items-center">
                          <div className="w-12 h-12 bg-slate-50 group-hover:bg-emerald-50 text-slate-600 group-hover:text-emerald-600 rounded-full flex items-center justify-center mb-4 transition-colors"><MicIcon /></div>
                          <h3 className="font-bold text-slate-900">Voice Analysis</h3>
                          <p className="text-xs text-slate-500 mt-2 text-center">Explain the problem</p>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* CAPTURING */}
                  {aiState === "capturing" && (
                    <motion.div key="capturing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 flex flex-col items-center justify-center h-64">
                      <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-slate-200 border-dashed flex items-center justify-center animate-pulse mb-6">
                        {inputMethod === "camera" && <Camera className="w-10 h-10 text-slate-400" />}
                        {inputMethod === "video" && <Video className="w-10 h-10 text-slate-400" />}
                        {inputMethod === "voice" && <MicIcon />}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {inputMethod === "camera" ? "Analyzing Image..." : inputMethod === "video" ? "Analyzing Video..." : "Recording Voice (5s)..."}
                      </h3>
                    </motion.div>
                  )}

                  {/* PROCESSING */}
                  {aiState === "processing" && (
                    <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 max-w-xl mx-auto w-full py-8">
                      <h3 className="text-2xl font-bold text-center text-slate-900 mb-10 tracking-tight">AI Backend Processing</h3>
                      <div className="space-y-6">
                        {[
                          { icon: Cloud, text: "Uploading to FastAPI server..." },
                          { icon: Cpu, text: "Running Gemini 3.5 Models..." },
                          { icon: Shield, text: "Assessing severity & safety risks..." },
                          { icon: Receipt, text: "Generating repair cost estimates..." },
                        ].map((step, idx) => (
                          <div key={idx} className={`flex items-center gap-4 transition-opacity duration-500 ${processingStep >= idx ? 'opacity-100' : 'opacity-30'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${processingStep > idx ? 'bg-green-100 text-green-600' : processingStep === idx ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                              {processingStep > idx ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                              <p className={`font-semibold ${processingStep >= idx ? 'text-slate-900' : 'text-slate-500'}`}>{step.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* RESULTS */}
                  {aiState === "results" && aiData && (
                    <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shadow-inner">
                            <Check className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Diagnosis Complete</h2>
                            <p className="text-sm text-slate-500 font-medium">Processed by Gemini AI • Confidence: <span className="font-bold text-green-600">{aiData.confidence || "96%"}</span></p>
                          </div>
                        </div>
                        <Button variant="ghost" onClick={resetAI} className="text-slate-500 hover:bg-slate-100 font-semibold">Scan Again</Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Detected Issue</p>
                            <h3 className="text-xl font-bold text-slate-900 leading-tight">{aiData.detected_issue}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <div className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 shadow-sm border ${aiData.severity === 'Emergency' || aiData.severity === 'High' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                              <Info className="w-4 h-4" /> {aiData.severity} Severity
                            </div>
                            <div className="bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 shadow-sm">
                              <Wrench className="w-4 h-4" /> {aiData.category}
                            </div>
                          </div>
                          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                            <h4 className="font-bold text-sm text-slate-900 mb-2">AI Recommended Solution</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">{aiData.recommended_solution}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                              <p className="text-xs text-slate-500 font-semibold mb-1">Est. Repair Cost</p>
                              <p className="text-xl font-bold text-slate-900">{aiData.est_cost}</p>
                            </div>
                            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                              <p className="text-xs text-slate-500 font-semibold mb-1">Est. Duration</p>
                              <p className="text-xl font-bold text-slate-900">{aiData.est_duration}</p>
                            </div>
                          </div>
                          
                          {aiData.safety_warning && (
                            <div className="bg-red-50 border border-red-100 p-4 rounded-xl shadow-sm">
                              <h4 className="font-bold text-sm text-red-700 flex items-center gap-2 mb-1">
                                <Shield className="w-4 h-4" /> Safety Warning
                              </h4>
                              <p className="text-xs text-red-600 leading-relaxed">{aiData.safety_warning}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Button onClick={() => setActiveTab("Book Service")} className="flex-1 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200 transition-all">
                          Find a Pro to Fix This Now
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* BOTTOM SECTION: PROS & HISTORY */}
              <div className="grid lg:grid-cols-2 gap-8">
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Top Rated Professionals</h3>
                    <span onClick={() => setActiveTab("Book Service")} className="text-sm text-blue-600 font-semibold cursor-pointer hover:underline">View All</span>
                  </div>
                  <div className="space-y-3">
                    {nearbyPros.slice(0, 3).map((pro, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600 shrink-0 text-xl shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {pro.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{pro.name}</h4>
                          <div className="flex items-center mt-1 flex-wrap gap-y-1">
                            <p className="text-xs text-slate-500">{pro.skill}</p>
                            <span className="w-1 h-1 rounded-full bg-slate-300 mx-2"></span>
                            <span className="text-xs text-slate-500 font-medium flex items-center"><Phone className="w-3 h-3 mr-1"/>{pro.phone}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 text-amber-600 font-bold text-xs mb-1">
                            <Star className="w-3.5 h-3.5 fill-amber-500" /> {pro.rating}
                          </div>
                          <p className="text-xs font-bold text-slate-900">{pro.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Diagnoses</h3>
                  </div>
                  <div className="space-y-3">
                    {recentDiagnoses.map((diag, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
                          <diag.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 text-sm mb-1">{diag.issue}</h4>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span>{diag.date}</span>
                            <span className="flex items-center gap-1 text-green-600 font-semibold"><Check className="w-3.5 h-3.5" /> {diag.confidence}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${diag.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                            {diag.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {/* TAB 2: BOOK SERVICE (FULL LIST) */}
          {activeTab === "Book Service" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-6">
              
              {/* Dynamic Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {aiData?.category ? `Recommended ${aiData.category}s` : "Available Professionals"}
                  </h2>
                  <p className="text-slate-500 mt-1 font-medium">
                    {aiData?.category 
                      ? "Top-rated partners specifically matched to fix your issue." 
                      : "Top-rated FixFlow partners near your location."}
                  </p>
                </div>
                <div className="flex gap-2">
                  {aiData?.category && (
                    <Button variant="outline" onClick={() => setAiData(null)} className="rounded-full bg-white shadow-sm border-slate-200 font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                      Clear AI Filter
                    </Button>
                  )}
                </div>
              </div>

              {/* Animated Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {displayedPros.map((pro, index) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={pro.name}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 shadow-inner shrink-0">
                            {pro.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{pro.name}</h3>
                            <p className="text-blue-600 text-sm font-bold tracking-wide">{pro.skill}</p>
                            
                            {/* Pro Info Row */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2.5 text-sm text-slate-500 font-medium">
                              <span className="flex items-center text-yellow-600 font-bold bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
                                <Star className="w-3.5 h-3.5 mr-1 fill-yellow-500"/> {pro.rating}
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                              <span>{pro.exp}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                              <span className="flex items-center text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                                <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> {pro.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price & ETA */}
                        <div className="text-right shrink-0 ml-4">
                          <div className="text-2xl font-black text-slate-900 tracking-tight">{pro.price}</div>
                          <div className="text-sm text-emerald-700 font-bold flex items-center justify-end mt-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 w-max ml-auto shadow-sm">
                            <Clock className="w-3.5 h-3.5 mr-1.5"/> {pro.eta}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="mt-8 flex gap-3">
                        <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-xl shadow-lg transition-all font-bold h-12">
                          Book Now
                        </Button>
                        <Button variant="outline" className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold h-12 hover:border-slate-300 transition-colors">
                          View Profile
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}