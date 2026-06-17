import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, RefreshCcw } from "lucide-react";

export function Wizard() {
  const [budget, setBudget] = useState(850);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#121212] font-sans text-white">
      
      {/* TOP HEADER */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 shrink-0 bg-[#121212]">
        <div className="flex-1 flex justify-start">
          <Link 
            to="/hub" 
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors px-3 py-2 -ml-3 rounded-lg hover:bg-white/5"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Return to Hub</span>
          </Link>
        </div>
        <div className="text-sm font-medium text-white/50">
          Wizard <span className="mx-2 text-white/20">/</span> Parametric Constraints
        </div>
        <div className="flex-1"></div> {/* Spacer for center alignment */}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-hidden px-4 flex justify-center items-center pb-8 pt-4">
        <div className="w-full max-w-4xl max-h-[calc(100vh-120px)] flex flex-col bg-[#1E1E1E] border border-white/5 shadow-2xl rounded-3xl relative overflow-hidden">
          
          {/* Header Section */}
          <div className="px-8 pt-8 md:px-10 md:pt-10 shrink-0 mb-6">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
              Define your constraints
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
              The deterministic engine will query our curated matrix of pre-validated builds based on your strict parameters.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-8 md:px-10 space-y-10 pb-4">
            {/* INPUT SECTION 1: FINANCIAL CONSTRAINT */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-base font-medium text-white/90">
                  Maximum Investment Cap
                </label>
                <div className="flex items-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  <span className="font-mono text-4xl font-bold text-white mr-1">$</span>
                  <input
                    type="number"
                    min="0"
                    max="3000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-32 bg-transparent text-center text-4xl font-bold font-mono text-white outline-none border-b border-white/10 focus:border-[#007BFF] transition-colors appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style={{ MozAppearance: 'textfield' }}
                  />
                </div>
              </div>
            
            {/* Custom styled slider */}
            <div className="relative w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/10">
              <div 
                className="absolute top-0 left-0 h-full bg-[#007BFF] shadow-[0_0_15px_rgba(0,123,255,0.5)] rounded-full transition-all duration-150 ease-out"
                style={{ width: `${(budget / 3000) * 100}%` }}
              ></div>
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-white/30 mt-2">
              <span>$0</span>
              <span>$3,000+</span>
            </div>
          </div>

          {/* INPUT SECTION 2: USE-CASE MATRIX */}
          <div>
            <label className="text-base font-medium text-white/90 block mb-5">
              Target Workload & Resolution
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Active */}
              <div className="relative p-6 rounded-2xl border-2 border-[#007BFF] bg-[#007BFF]/5 shadow-[0_0_20px_rgba(0,123,255,0.15)] flex flex-col justify-between cursor-pointer group transition-all">
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    1080p Competitive Gaming
                  </h3>
                </div>
                <div className="mt-6">
                  <span className="inline-flex font-mono text-xs text-[#007BFF] tracking-wider font-medium">
                    [ TIER_ENTRY_LEVEL ]
                  </span>
                </div>
              </div>

              {/* Card 2: Inactive */}
              <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 flex flex-col justify-between cursor-pointer group transition-colors">
                <div>
                  <h3 className="text-base font-semibold text-white/80 group-hover:text-white transition-colors mb-1">
                    Office & Productivity
                  </h3>
                </div>
                <div className="mt-6">
                  <span className="inline-flex font-mono text-xs text-white/40 tracking-wider group-hover:text-white/60 transition-colors">
                    [ TIER_BASE ]
                  </span>
                </div>
              </div>

              {/* Card 3: Locked */}
              <div className="relative p-6 rounded-2xl border border-[#FF3B30]/60 bg-black/20 flex flex-col justify-between cursor-not-allowed opacity-40 grayscale shadow-[inset_0_0_30px_rgba(255,59,48,0.05)] overflow-hidden">
                {/* Locked overlay logic */}
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center backdrop-blur-[1px]">
                  <div className="bg-[#1E1E1E] border border-[#FF3B30]/50 px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-xs font-medium text-[#FF3B30]">Budget Insufficient for 4K Tier</span>
                  </div>
                </div>
                
                <div className="relative z-0">
                  <h3 className="text-base font-semibold text-white/80 mb-1">
                    4K AAA Gaming & Render
                  </h3>
                </div>
                <div className="mt-6 relative z-0">
                  <span className="inline-flex font-mono text-xs text-white/40 tracking-wider">
                    [ TIER_ENTHUSIAST ]
                  </span>
                </div>
              </div>

            </div>
          </div>
          </div>

          {/* BOTTOM ACTION BAR */}
          <div className="px-8 pb-8 pt-6 md:px-10 md:pb-10 md:pt-6 mt-auto border-t border-white/10 shrink-0 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#1E1E1E]">
            <button className="flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors group">
              <RefreshCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" />
              Reset Parameters
            </button>
            
            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
              <button className="w-full md:w-auto bg-[#007BFF] hover:bg-[#0056b3] text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(0,123,255,0.3)] hover:shadow-[0_0_25px_rgba(0,123,255,0.5)]">
                Query Validated Builds
              </button>
              <div className="text-[11px] font-mono text-green-400 tracking-wider">
                &gt; Database Engine: 4 Builds match current parameters.
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
