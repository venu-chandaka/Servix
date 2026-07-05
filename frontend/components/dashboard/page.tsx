"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Calendar, Bot, ClipboardList, Map, MessageSquare, Bell, Bookmark, Wallet, Settings, User, 
  MapPin, Camera, Video, Mic, Sparkles, Search,
  Star, Activity, ShieldAlert, Wrench, CheckCircle2, ChevronRight, UploadCloud, Cpu, Receipt, Droplet
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Calendar, label: "Book Service" },
  { icon: Bot, label: "AI Assistant" },
  { icon: ClipboardList, label: "My Diagnoses" },
  { icon: Map, label: "Live Tracking" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Bell, label: "Notifications" },
  { icon: User, label: "Profile" },
];

const nearbyPros = [
  { name: "Rahul Sharma", skill: "Master Plumber", rating: "4.9", exp: "8 years", distance: "1.2 km", price: "₹349/hr", eta: "15 min" },
  { name: "Priya Patel", skill: "Electrician", rating: "4.8", exp: "5 years", distance: "2.5 km", price: "₹299/hr", eta: "25 min" },
  { name: "Amit Kumar", skill: "AC Technician", rating: "4.9", exp: "10 years", distance: "3.1 km", price: "₹449/hr", eta: "45 min" },
];

const recentDiagnoses = [
  { issue: "Washing Machine Motor Failure", date: "Today, 10:30 AM", confidence: "94%", status: "Resolved", icon: Wrench },
  { issue: "Kitchen Sink Leak", date: "Yesterday, 4:15 PM", confidence: "88%", status: "Pending Fix", icon: Droplet },
];

type AIState = "idle" | "capturing" | "processing" | "results";
type InputMethod = "camera" | "video" | "voice" | null;

export default function DashboardPage() {
  const [firstName, setFirstName] = useState("Guest");
  const [initials, setInitials] = useState("G");

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [aiState, setAiState] = useState<AIState>("idle");
  const [inputMethod, setInputMethod] = useState<InputMethod>(null);
  const [processingStep, setProcessingStep] = useState(0);

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
      await navigator.mediaDevices.getUserMedia({ audio: true });
      startProcessing("voice");
    } catch (err) {
      alert("Microphone permission was denied.");
    }
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>, method: InputMethod) => {
    if (e.target.files && e.target.files.length > 0) {
      startProcessing(method);
    }
  };

  const startProcessing = (method: InputMethod) => {
    setInputMethod(method);
    setAiState("capturing");
    setTimeout(() => {
      setAiState("processing");
      let step = 0;
      const interval = setInterval(() => {
        step += 1;
        setProcessingStep(step);
        if (step >= 4) {
          clearInterval(interval);
          setTimeout(() => setAiState("results"), 800);
        }
      }, 1200);
    }, 2000);
  };

  const resetAI = () => {
    setAiState("idle");
    setInputMethod(null);
    setProcessingStep(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-blue-100">
      
      <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} className="hidden" onChange={(e) => onFileSelected(e, "camera")} />
      <input type="file" accept="video/*" capture="environment" ref={videoInputRef} className="hidden" onChange={(e) => onFileSelected(e, "video")} />

      {/* --- Sidebar --- */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 sticky top-0 h-screen">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-md shadow-blue-600/20">F</div>
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">FixFlow AI</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          {navItems.map((item, idx) => (
            <button key={idx} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${item.active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}>
              <item.icon className={`w-5 h-5 ${item.active ? "text-blue-600" : "text-slate-400"}`} />
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
            <div className="hidden sm:flex items-center gap-2 text-slate-500 text-sm font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer">
              <MapPin className="w-4 h-4 text-blue-600" />
              Koramangala, Bengaluru
            </div>
            <span className="lg:hidden font-extrabold text-xl text-slate-900 tracking-tight ml-2">FixFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-sm">
              {initials}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-7xl mx-auto w-full">
          
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome, {firstName} 👋</h1>
            <p className="text-slate-500 mt-1">What do you need help with today?</p>
          </div>

          {/* --- MANUAL SEARCH: Need help today? --- */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Book a Professional</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              
              {/* Search Bar with integrated Mic */}
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="E.g., Leaking kitchen sink, AC Repair..." 
                  className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-inner"
                />
                {/* Embedded Mic Icon */}
                <button 
                  onClick={handleVoiceClick}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 hover:text-blue-600 transition-colors"
                  title="Use Voice Search"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  onClick={handleVoiceClick} 
                  variant="outline" 
                  className="h-14 px-4 rounded-xl border-slate-200 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors hidden sm:flex"
                  title="Voice Analysis"
                >
                  <Mic className="w-5 h-5" />
                </Button>
                
                <Button className="h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/20 flex-1 sm:flex-none">
                  Book a Service
                </Button>
              </div>

            </div>
          </div>

          {/* --- AI SMART DIAGNOSIS --- */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden mb-8 min-h-[400px] flex flex-col justify-center">
            
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-indigo-50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <AnimatePresence mode="wait">
              
              {/* STATE 1: IDLE SELECTION */}
              {aiState === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Not sure what's broken? Let AI analyze it.</h2>
                  <p className="text-slate-500 max-w-lg mx-auto mb-10">
                    Upload a photo, record a video, or explain your problem. Our AI will instantly detect the issue and estimate costs.
                  </p>
                  
                  <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    <button onClick={handleCameraClick} className="group bg-white border-2 border-slate-100 hover:border-blue-500 p-6 rounded-2xl transition-all hover:shadow-lg hover:shadow-blue-500/10 flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-50 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 rounded-full flex items-center justify-center mb-4 transition-colors"><Camera className="w-6 h-6" /></div>
                      <h3 className="font-bold text-slate-900">Camera Analysis</h3>
                      <p className="text-xs text-slate-500 mt-2 text-center">Take a photo of the damaged appliance</p>
                    </button>
                    
                    <button onClick={handleVideoClick} className="group bg-white border-2 border-slate-100 hover:border-indigo-500 p-6 rounded-2xl transition-all hover:shadow-lg hover:shadow-indigo-500/10 flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-50 group-hover:bg-indigo-50 text-slate-600 group-hover:text-indigo-600 rounded-full flex items-center justify-center mb-4 transition-colors"><Video className="w-6 h-6" /></div>
                      <h3 className="font-bold text-slate-900">Video Analysis</h3>
                      <p className="text-xs text-slate-500 mt-2 text-center">Record moving defects (max 60s)</p>
                    </button>
                    
                    <button onClick={handleVoiceClick} className="group bg-white border-2 border-slate-100 hover:border-emerald-500 p-6 rounded-2xl transition-all hover:shadow-lg hover:shadow-emerald-500/10 flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-50 group-hover:bg-emerald-50 text-slate-600 group-hover:text-emerald-600 rounded-full flex items-center justify-center mb-4 transition-colors"><Mic className="w-6 h-6" /></div>
                      <h3 className="font-bold text-slate-900">Voice Analysis</h3>
                      <p className="text-xs text-slate-500 mt-2 text-center">Use your microphone to explain the problem</p>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STATE 2: CAPTURING */}
              {aiState === "capturing" && (
                <motion.div key="capturing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 flex flex-col items-center justify-center h-64">
                  <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-slate-200 border-dashed flex items-center justify-center animate-pulse mb-6">
                    {inputMethod === "camera" && <Camera className="w-10 h-10 text-slate-400" />}
                    {inputMethod === "video" && <Video className="w-10 h-10 text-slate-400" />}
                    {inputMethod === "voice" && <Mic className="w-10 h-10 text-slate-400" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {inputMethod === "camera" ? "Analyzing Image..." : inputMethod === "video" ? "Analyzing Video..." : "Listening to Voice..."}
                  </h3>
                </motion.div>
              )}

              {/* STATE 3: AI PROCESSING STEPPER */}
              {aiState === "processing" && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 max-w-xl mx-auto w-full py-8">
                  <h3 className="text-2xl font-bold text-center text-slate-900 mb-10">AI Backend Processing</h3>
                  <div className="space-y-6">
                    {[
                      { icon: UploadCloud, text: "Uploading to FastAPI server..." },
                      { icon: Cpu, text: "Running Computer Vision / NLP Models..." },
                      { icon: ShieldAlert, text: "Assessing severity & safety risks..." },
                      { icon: Receipt, text: "Generating repair cost estimates..." },
                    ].map((step, idx) => (
                      <div key={idx} className={`flex items-center gap-4 transition-opacity duration-500 ${processingStep >= idx ? 'opacity-100' : 'opacity-30'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${processingStep > idx ? 'bg-green-100 text-green-600' : processingStep === idx ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                          {processingStep > idx ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${processingStep >= idx ? 'text-slate-900' : 'text-slate-500'}`}>{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STATE 4: RESULTS CARD */}
              {aiState === "results" && (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold text-slate-900">Diagnosis Complete</h2>
                        <p className="text-sm text-slate-500">Processed in 1.4s • AI Confidence: <span className="font-bold text-green-600">96%</span></p>
                      </div>
                    </div>
                    <Button variant="ghost" onClick={resetAI} className="text-slate-500 hover:bg-slate-100">Scan Again</Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Detected Issue</p>
                        <h3 className="text-xl font-bold text-slate-900">Failed AC Compressor Capacitor</h3>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1">
                          <ShieldAlert className="w-4 h-4" /> High Severity
                        </div>
                        <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1">
                          <Wrench className="w-4 h-4" /> AC Repair
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                        <h4 className="font-bold text-sm text-slate-900 mb-2">AI Recommended Solution</h4>
                        <p className="text-sm text-slate-600">The capacitor providing start-up voltage to the compressor has blown. Requires immediate replacement to prevent compressor motor burnout.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                          <p className="text-xs text-slate-500 font-semibold mb-1">Est. Repair Cost</p>
                          <p className="text-xl font-bold text-slate-900">₹850 - ₹1,200</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                          <p className="text-xs text-slate-500 font-semibold mb-1">Est. Duration</p>
                          <p className="text-xl font-bold text-slate-900">45 Mins</p>
                        </div>
                      </div>
                      <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                        <h4 className="font-bold text-sm text-red-700 flex items-center gap-2 mb-1">
                          <ShieldAlert className="w-4 h-4" /> Safety Warning
                        </h4>
                        <p className="text-xs text-red-600">Do not attempt DIY repair. Capacitors store lethal high voltage even when the AC is turned off from the mains.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 h-12 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md">
                      Book AC Technician Now
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 text-lg font-bold border-slate-200 hover:bg-slate-50 rounded-xl">
                      Get Second Opinion (Manual)
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- BOTTOM SECTION: PROS & HISTORY --- */}
          <div className="grid lg:grid-cols-2 gap-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">AI Matched Professionals</h3>
                <span className="text-sm text-blue-600 font-semibold cursor-pointer">View All</span>
              </div>
              <div className="space-y-3">
                {nearbyPros.map((pro, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 shrink-0">
                      {pro.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-sm">{pro.name}</h4>
                      <p className="text-xs text-slate-500">{pro.skill} • {pro.exp}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-amber-600 font-bold text-xs mb-1">
                        <Star className="w-3 h-3 fill-amber-500" /> {pro.rating}
                      </div>
                      <p className="text-xs font-bold text-slate-900">{pro.price}</p>
                    </div>
                    <Button size="sm" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs rounded-lg">Book</Button>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Recent AI Diagnoses</h3>
              </div>
              <div className="space-y-3">
                {recentDiagnoses.map((diag, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                      <diag.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{diag.issue}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{diag.date}</span>
                        <span className="flex items-center gap-1 text-green-600 font-semibold"><CheckCircle2 className="w-3 h-3" /> {diag.confidence}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${diag.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {diag.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}