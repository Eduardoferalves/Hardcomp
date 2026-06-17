import React from "react";
import { Link } from "react-router";
import { 
  ChevronLeft, 
  Trash2, 
  Search, 
  Info,
  LayoutGrid,
  Cpu,
  Box,
  Monitor,
  HardDrive,
  Zap
} from "lucide-react";

export function StaticInventoryManager() {
  return (
    <div className="w-screen h-screen bg-[#121212] text-white font-sans flex flex-col overflow-hidden relative">
      
      {/* HEADER */}
      <header className="px-10 py-8 border-b border-white/5 shrink-0 bg-[#121212]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
          <Link 
            to="/hub" 
            className="group flex items-center gap-2 text-white/50 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium font-sans">Return to Hub</span>
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2 font-sans">
              Static Inventory Declaration
            </h2>
            <p className="text-white/50 text-sm max-w-3xl leading-relaxed">
              Input your existing hardware. The validation engine will lock these as read-only <span className="font-mono text-white/70">[STATIC_NODES]</span>, factoring them into power/socket constraints while excluding them from the final cart calculation.
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-hidden h-[calc(100vh-140px)]">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-start gap-8 h-full">
          
          {/* COLUMN 1: THE INVENTORY BUILDER */}
          <div className="flex-1 flex flex-col overflow-y-auto pb-20 pr-4 w-full gap-4 pt-10 pl-10 md:pl-0">
            
            {/* Slot 1: Filled - Motherboard */}
            <div className="group relative bg-[#1E1E1E]/80 backdrop-blur rounded-2xl border border-emerald-500/30 p-5 flex items-center gap-5 shadow-lg">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono text-white/40 mb-1">Motherboard</div>
                <div className="text-lg font-semibold text-white truncate">ASUS ROG Strix B550-F Gaming</div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0 px-4 border-r border-white/10">
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-wider border border-emerald-500/20">
                  [STATIC_NODE]
                </span>
                <span className="font-mono text-white/50 text-sm">$0.00 (Owned)</span>
              </div>
              <button className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors ml-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Slot 2: Filled - Processor */}
            <div className="group relative bg-[#1E1E1E]/80 backdrop-blur rounded-2xl border border-emerald-500/30 p-5 flex items-center gap-5 shadow-lg">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono text-white/40 mb-1">Processor</div>
                <div className="text-lg font-semibold text-white truncate">AMD Ryzen 7 5800X</div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0 px-4 border-r border-white/10">
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-wider border border-emerald-500/20">
                  [STATIC_NODE]
                </span>
                <span className="font-mono text-white/50 text-sm">$0.00 (Owned)</span>
              </div>
              <button className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors ml-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Slot 3: Active Search - Memory */}
            <div className="relative bg-[#1E1E1E] rounded-2xl border border-[#007BFF]/50 p-5 shadow-[0_0_20px_rgba(0,123,255,0.15)] flex flex-col gap-4">
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 bg-[#007BFF]/10 rounded-xl text-[#007BFF] shrink-0">
                  <Box className="w-6 h-6" />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-[#007BFF]/50" />
                  </div>
                  <input 
                    type="text" 
                    className="block w-full bg-black/50 border border-[#007BFF]/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#007BFF] font-sans text-sm"
                    placeholder="Searching: Corsair Vengeance..."
                    defaultValue="Corsair Vengeance"
                    autoFocus
                  />
                </div>
              </div>
              
              {/* Floating Dropdown Simulation */}
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#18181B] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 mx-5">
                <div className="max-h-48 overflow-y-auto p-1 flex flex-col gap-1">
                  <button className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg text-left transition-colors w-full group">
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#007BFF] transition-colors">Corsair Vengeance LPX 32GB (2 x 16GB) DDR4-3600</div>
                      <div className="text-xs font-mono text-white/40">CMK32GX4M2D3600C18</div>
                    </div>
                    <span className="text-xs font-medium text-white/40 bg-white/5 px-2 py-1 rounded">Select</span>
                  </button>
                  <button className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg text-left transition-colors w-full group">
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#007BFF] transition-colors">Corsair Vengeance RGB Pro 32GB (2 x 16GB) DDR4-3600</div>
                      <div className="text-xs font-mono text-white/40">CMW32GX4M2D3600C18</div>
                    </div>
                    <span className="text-xs font-medium text-white/40 bg-white/5 px-2 py-1 rounded">Select</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Slots 4, 5, 6: Empty States */}
            <button className="group w-full py-6 px-5 rounded-2xl border border-dashed border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 transition-colors flex items-center gap-5">
              <div className="p-3 bg-white/5 rounded-xl text-white/40 group-hover:text-white/70 transition-colors shrink-0">
                <Monitor className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-xs font-mono text-white/40 mb-1 group-hover:text-white/60 transition-colors">Graphics</div>
                <div className="text-sm font-medium text-white/50 group-hover:text-white transition-colors">Click to add existing Graphics...</div>
              </div>
            </button>

            <button className="group w-full py-6 px-5 rounded-2xl border border-dashed border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 transition-colors flex items-center gap-5">
              <div className="p-3 bg-white/5 rounded-xl text-white/40 group-hover:text-white/70 transition-colors shrink-0">
                <HardDrive className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-xs font-mono text-white/40 mb-1 group-hover:text-white/60 transition-colors">Storage</div>
                <div className="text-sm font-medium text-white/50 group-hover:text-white transition-colors">Click to add existing Storage...</div>
              </div>
            </button>

            <button className="group w-full py-6 px-5 rounded-2xl border border-dashed border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 transition-colors flex items-center gap-5">
              <div className="p-3 bg-white/5 rounded-xl text-white/40 group-hover:text-white/70 transition-colors shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-xs font-mono text-white/40 mb-1 group-hover:text-white/60 transition-colors">Power Supply</div>
                <div className="text-sm font-medium text-white/50 group-hover:text-white transition-colors">Click to add existing Power Supply...</div>
              </div>
            </button>

          </div>

          {/* COLUMN 2: TOPOLOGICAL IMPACT PANEL */}
          <div className="w-full md:w-[320px] shrink-0 p-10 pl-0 md:pt-10">
            <div className="h-fit max-h-[calc(100vh-160px)] flex flex-col bg-[#18181B] rounded-2xl p-6 border border-white/5 shadow-2xl">
              
              <h3 className="text-lg font-semibold text-white font-sans shrink-0 mb-6">
                Inventory Engine Status
              </h3>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-sans text-white/40 uppercase tracking-wider">Nodes Declared</span>
                  <span className="font-mono text-xl text-white">2/6</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-sans text-white/40 uppercase tracking-wider">Static TDP Reserved</span>
                  <span className="font-mono text-xl text-yellow-400">170W</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-sans text-white/40 uppercase tracking-wider">Base Architecture Locked</span>
                  <span className="font-mono text-xl text-emerald-400">AM4 Socket</span>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 flex gap-3 mt-6">
                  <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-200/80 leading-relaxed font-sans">
                    Pricing is disabled for declared components. The engine will only calculate costs for missing slots.
                  </p>
                </div>
              </div>

              <div className="shrink-0 pt-6 mt-auto border-t border-white/5">
                <button className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(0,123,255,0.3)] hover:shadow-[0_0_25px_rgba(0,123,255,0.5)]">
                  Lock Inventory & Proceed to Upgrades
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
