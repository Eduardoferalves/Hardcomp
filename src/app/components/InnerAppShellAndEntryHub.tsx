import React, { useState } from "react";
import { Link } from "react-router";
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  LayoutGrid, 
  History, 
  Sparkles, 
  Settings, 
  User,
  Plus
} from "lucide-react";

export function InnerAppShellAndEntryHub() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="w-screen h-screen flex flex-row overflow-hidden bg-[#121212] font-sans text-white">
      
      {/* COMPONENT 1: THE COLLAPSIBLE LEFT SIDEBAR */}
      <aside 
        className={`${
          isSidebarOpen ? "w-[260px]" : "w-[80px]"
        } bg-[#18181B] border-r border-white/5 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0`}
      >
        {/* Top Header Area */}
        <div>
          <div className={`flex items-center ${isSidebarOpen ? "justify-between px-6" : "justify-center"} h-20`}>
            {isSidebarOpen && (
              <span className="font-bold text-lg tracking-tight">HardComp</span>
            )}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center text-white/70 hover:text-white"
              title="Toggle Sidebar"
            >
              {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
          </div>

          {/* Middle Section (Navigation List) */}
          <nav className="flex flex-col gap-2 px-3 mt-4">
            {/* Active Item */}
            <button className="flex items-center gap-3 px-3 py-2.5 bg-[#007BFF]/10 text-[#007BFF] rounded-lg transition-colors group relative">
              <Plus className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium text-sm">New Configuration</span>}
              {!isSidebarOpen && (
                <div className="absolute left-14 bg-[#1E1E1E] text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  New Configuration
                </div>
              )}
            </button>

            {/* Conditionally Active/Inactive Item */}
            <button className="flex items-center gap-3 px-3 py-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors group relative">
              <History className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium text-sm">Continue Previous Build</span>}
              {!isSidebarOpen && (
                <div className="absolute left-14 bg-[#1E1E1E] text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  Continue Previous Build
                </div>
              )}
            </button>

            {/* Inactive Item */}
            <button className="flex items-center gap-3 px-3 py-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors group relative">
              <Sparkles className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium text-sm">Guided Smart Wizard</span>}
              {!isSidebarOpen && (
                <div className="absolute left-14 bg-[#1E1E1E] text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  Guided Smart Wizard
                </div>
              )}
            </button>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col">
          {/* Sign In / Sync Progress Card */}
          {isSidebarOpen ? (
            <div className="mx-4 mb-4 p-4 bg-white/5 border border-white/5 rounded-xl backdrop-blur-md">
              <p className="text-xs text-white/70 leading-relaxed mb-3">
                Your build progress is saved locally for 7 days.
              </p>
              <button className="text-[#007BFF] hover:text-[#0056b3] text-sm font-medium transition-colors">
                Create Account / Sync
              </button>
            </div>
          ) : (
             <div className="mx-auto mb-4 p-2 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center group relative cursor-pointer hover:bg-white/10 transition-colors">
               <User className="w-5 h-5 text-[#007BFF]" />
               <div className="absolute left-14 bg-[#1E1E1E] text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  Sync Progress
               </div>
             </div>
          )}

          <div className="h-px w-full bg-white/5"></div>

          {/* Settings & User */}
          <div className={`flex items-center ${isSidebarOpen ? "justify-between px-6" : "justify-center flex-col gap-4 py-4"} h-16`}>
            {isSidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                  <User className="w-4 h-4 text-white/70" />
                </div>
                <span className="text-sm font-medium text-white/90">Anonymous</span>
              </div>
            )}
            {!isSidebarOpen && (
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">
                <User className="w-4 h-4 text-white/70" />
              </div>
            )}
            <button className="text-white/50 hover:text-white transition-colors p-1" title="Settings">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* COMPONENT 2: CENTRAL WORKSPACE */}
      <main className="flex-1 flex flex-col p-10 overflow-y-auto relative">
        <div className="max-w-6xl w-full mx-auto flex flex-col h-full">
          
          {/* Header Segment */}
          <header className="mb-12">
            <div className="text-xs font-mono text-white/40 tracking-wider mb-3">
              Workspace / Initialization
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-3">
              How do you want to begin?
            </h2>
            <p className="text-white/50 text-base max-w-2xl leading-relaxed">
              Select your engineering path. The deterministic engine operates completely client-side without a mandatory account.
            </p>
          </header>

          {/* Card Grid System */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            
            {/* CARD 1: Cold Start */}
            <Link to="/builder" className="group flex flex-col p-8 bg-[#1E1E1E] border border-white/5 rounded-2xl shadow-xl hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-[10px] tracking-widest px-2 py-1 rounded bg-black/40 border border-white/5 text-gray-400">
                  [ FRAMEWORK: HU-001 ]
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#007BFF] transition-colors">
                Scratch Build
              </h3>
              <p className="text-sm text-white/50 leading-relaxed flex-1">
                Start with a clean slate. The platform forces the selection of an Anchor Component (CPU or Motherboard) to lock down the system topology before running reactive constraints.
              </p>
              <button className="w-full mt-8 bg-[#007BFF] hover:bg-[#0056b3] text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors">
                Initialize Empty Build
              </button>
            </Link>

            {/* CARD 2: Upgrade Existing Setup */}
            <Link to="/inventory" className="group flex flex-col p-8 bg-[#1E1E1E] border border-white/5 rounded-2xl shadow-xl hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-[10px] tracking-widest px-2 py-1 rounded bg-black/40 border border-white/5 text-amber-500/80">
                  [ METRIC: STATIC-ISOLATION ]
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                System Upgrade
              </h3>
              <p className="text-sm text-white/50 leading-relaxed flex-1">
                Input components you already own. The validation engine flags them as read-only static nodes, strictly isolating them from checkout pricing while factoring them into TDP and socket limits.
              </p>
              <button className="w-full mt-8 bg-transparent border border-white/10 hover:border-white/20 hover:bg-white/5 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors">
                Declare Existing Hardware
              </button>
            </Link>

            {/* CARD 3: Guided Smart Wizard */}
            <Link to="/wizard" className="group flex flex-col p-8 bg-[#1E1E1E] border border-white/5 rounded-2xl shadow-xl hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-[10px] tracking-widest px-2 py-1 rounded bg-black/40 border border-white/5 text-emerald-500/90">
                  [ CURATION: FIXED MATRIX ]
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Targeted Recommendation
              </h3>
              <p className="text-sm text-white/50 leading-relaxed flex-1">
                For users seeking automated optimization. Declare your precise budget cap and use-case vertical (e.g., 1080p Competitive Gaming, 3D Workstation) to instantly load a pre-validated hardware setup.
              </p>
              <button className="w-full mt-8 bg-transparent border border-white/10 hover:border-white/20 hover:bg-white/5 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors">
                Launch Wizard
              </button>
            </Link>

          </div>
        </div>
      </main>

    </div>
  );
}
