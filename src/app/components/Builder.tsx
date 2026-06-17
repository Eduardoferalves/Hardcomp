import React from "react";
import { Link } from "react-router";
import { 
  Cpu, 
  LayoutGrid, 
  Box, 
  HardDrive, 
  Monitor, 
  Zap,
  Lock,
  ChevronLeft
} from "lucide-react";

export function Builder() {
  const activeCategories = [
    { id: "cpu", label: "Select Processor", icon: <Cpu className="w-8 h-8 text-[#007BFF]" /> },
    { id: "mobo", label: "Select Motherboard", icon: <LayoutGrid className="w-8 h-8 text-[#007BFF]" /> },
  ];

  const lockedCategories = [
    { id: "ram", label: "Memory", icon: <Box className="w-8 h-8 text-white/40" /> },
    { id: "gpu", label: "Graphics", icon: <Monitor className="w-8 h-8 text-white/40" /> },
    { id: "storage", label: "Storage", icon: <HardDrive className="w-8 h-8 text-white/40" /> },
    { id: "psu", label: "Power Supply", icon: <Zap className="w-8 h-8 text-white/40" /> },
  ];

  const graphNodes = [
    "Processor", "Motherboard", "Memory", "Graphics", "Storage", "Power Supply"
  ];

  return (
    <div className="w-screen h-screen bg-[#121212] font-sans text-white flex flex-col overflow-hidden relative">
      
      {/* Top Flex Container for Areas 1 and 2 */}
      <div className="flex-1 flex flex-row overflow-hidden pb-24">
        
        {/* AREA 1: MAIN CONTENT */}
        <main className="flex-1 flex flex-col overflow-y-auto p-10 relative">
          <div className="max-w-5xl mx-auto w-full flex flex-col h-full">
            {/* Top Header */}
            <header className="mb-10 flex flex-col md:flex-row items-start md:items-center gap-4">
              <Link 
                to="/hub" 
                className="group flex items-center gap-2 text-white/50 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors shrink-0"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-sm font-medium font-sans">Return to Hub</span>
              </Link>
              <div>
                <div className="text-xs font-mono text-white/40 tracking-wider mb-3 uppercase">
                  Builder / Initialization
                </div>
                <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
                  Select your Anchor Component
                </h1>
                <p className="text-white/50 text-base max-w-2xl leading-relaxed">
                  The Zero-Trust engine requires a foundation. Choose a Processor or Motherboard to initialize the topological graph.
                </p>
              </div>
            </header>

            {/* The Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* ACTIVE CARDS */}
              {activeCategories.map((cat) => (
                <button 
                  key={cat.id} 
                  className="group relative h-48 bg-[#1E1E1E]/80 backdrop-blur border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-[#007BFF]/50 hover:bg-[#1E1E1E] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(0,123,255,0.15)]"
                >
                  <div className="p-3 bg-[#007BFF]/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <span className="font-semibold text-lg text-white group-hover:text-[#007BFF] transition-colors">
                    {cat.label}
                  </span>
                </button>
              ))}

              {/* LOCKED CARDS */}
              {lockedCategories.map((cat) => (
                <div 
                  key={cat.id} 
                  className="relative h-48 bg-[#1E1E1E]/50 backdrop-blur border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 opacity-40 cursor-not-allowed grayscale"
                >
                  {/* Lock Overlay Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-4 py-2 bg-black/80 rounded-full border border-white/10 flex items-center gap-2 shadow-lg backdrop-blur-md">
                    <Lock className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-xs font-medium text-white/90 whitespace-nowrap">Awaiting Anchor</span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-full">
                    {cat.icon}
                  </div>
                  <span className="font-semibold text-lg text-white/50">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* AREA 2: RIGHT SIDEBAR (Architecture Graph) */}
        <aside className="w-[300px] shrink-0 bg-[#18181B] border-l border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white mb-2">Architecture Graph</h2>
            <div className="inline-flex items-center px-2 py-1 bg-white/5 rounded font-mono text-[10px] text-[#A1A1AA] tracking-widest border border-white/10">
              GRAPH_UNINITIALIZED
            </div>
          </div>
          
          <div className="flex-1 p-6 flex flex-col gap-3 overflow-y-auto">
            {graphNodes.map((node, index) => (
              <div 
                key={index}
                className="w-full py-4 px-4 border border-dashed border-white/20 rounded-xl bg-transparent flex flex-col items-center justify-center"
              >
                 <span className="text-sm font-medium text-white/30">{node}</span>
                 <span className="text-[10px] font-mono text-white/20 mt-1 uppercase">Pending Input</span>
              </div>
            ))}
          </div>
        </aside>

      </div>

      {/* AREA 3: FIXED BOTTOM REACTIVE BAR */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#121212] border-t border-white/10 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="h-full w-full max-w-[1400px] mx-auto px-10 flex items-center justify-between">
          
          {/* Metrics */}
          <div className="flex items-center gap-10 divide-x divide-white/10">
            
            <div className="pr-10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Total Investment</p>
              <div className="font-mono text-2xl text-white/40">
                $0.00
              </div>
            </div>

            <div className="px-10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Total TDP Draw</p>
              <div className="font-mono text-2xl text-white/40">
                0W
              </div>
            </div>

            <div className="pl-10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">PSU Target Limit</p>
              <div className="font-mono text-2xl text-white/40">
                0W
              </div>
            </div>

          </div>

          {/* Primary Action Button */}
          <button 
            disabled
            className="px-8 py-3.5 bg-gray-800 text-white/40 rounded-lg text-sm font-semibold opacity-50 cursor-not-allowed border border-white/5"
          >
            Finalize Build
          </button>

        </div>
      </div>

    </div>
  );
}
