import React from "react";

export function ZeroTrustDemonstrationCard() {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/5 bg-gradient-to-b from-[#18181B] to-[#09090B] shadow-2xl flex flex-col font-sans mx-auto relative z-20 overflow-hidden">
      
      {/* Custom CSS Keyframes for synced 4-second animation loop */}
      <style>{`
        @keyframes py-ram {
          0% { transform: translateY(-50px); opacity: 0; border-color: rgba(255,255,255,0.05); box-shadow: none; }
          5% { transform: translateY(-40px); opacity: 1; border-color: rgba(255,255,255,0.05); box-shadow: none; }
          20% { transform: translateY(-40px); opacity: 1; border-color: rgba(255,255,255,0.05); box-shadow: none; }
          25% { transform: translateY(0px); opacity: 1; border-color: rgba(255,255,255,0.05); box-shadow: none; }
          30% { transform: translateY(0px); opacity: 0.4; border-color: #FF3B30; box-shadow: 0 0 30px rgba(255,59,48,0.3); }
          35% { transform: translateY(-10px); opacity: 0.4; border-color: #FF3B30; box-shadow: 0 0 20px rgba(255,59,48,0.2); }
          75% { transform: translateY(-10px); opacity: 0.4; border-color: #FF3B30; box-shadow: 0 0 20px rgba(255,59,48,0.2); }
          80% { transform: translateY(-20px); opacity: 0; border-color: rgba(255,255,255,0.05); box-shadow: none; }
          100% { transform: translateY(-50px); opacity: 0; }
        }

        @keyframes py-badge {
          0%, 29% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          31%, 75% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          80%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        }

        @keyframes py-log-1 {
          0%, 4% { opacity: 0; }
          5%, 75% { opacity: 1; }
          80%, 100% { opacity: 0; }
        }
        @keyframes py-log-2 {
          0%, 14% { opacity: 0; }
          15%, 75% { opacity: 1; }
          80%, 100% { opacity: 0; }
        }
        @keyframes py-log-3 {
          0%, 29% { opacity: 0; }
          30%, 75% { opacity: 1; }
          80%, 100% { opacity: 0; }
        }
        @keyframes py-log-4 {
          0%, 39% { opacity: 0; }
          40%, 75% { opacity: 1; }
          80%, 100% { opacity: 0; }
        }
      `}</style>

      {/* SECTION 1: THE VISUAL UI (Top Half) */}
      <div className="relative h-[280px] w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Soft Background Glow (Optional subtle backdrop) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]"></div>

        {/* Abstract Motherboard Slot */}
        <div className="absolute bottom-16 w-56 h-8 rounded-lg bg-[#050505] border border-white/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] flex items-center justify-center z-0">
          <div className="w-full mx-3 flex items-center justify-between">
             <div className="h-0.5 flex-1 bg-white/[0.03] rounded-full"></div>
             <div className="w-3 h-1 bg-transparent"></div> {/* Key separator */}
             <div className="h-0.5 flex-1 bg-white/[0.03] rounded-full"></div>
          </div>
        </div>

        {/* Abstract RAM Stick */}
        <div 
          className="absolute bottom-16 w-48 h-12 rounded-md bg-[#18181B] border border-white/5 flex flex-col items-center justify-center z-10 backdrop-blur-sm"
          style={{ animation: 'py-ram 4s infinite cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          {/* Subtle RAM Label */}
          <span className="text-[10px] text-white/30 font-medium tracking-widest font-mono">DDR4_MODULE</span>
          
          {/* Abstract Gold Pins */}
          <div className="absolute bottom-0 w-full h-1.5 flex gap-1 px-1">
             <div className="flex-1 bg-white/10 rounded-t-sm opacity-50"></div>
             <div className="w-2.5 h-full bg-transparent"></div> {/* Physical Key Notch */}
             <div className="flex-[0.8] bg-white/10 rounded-t-sm opacity-50"></div>
          </div>
        </div>

        {/* Floating Error Badge */}
        <div 
          className="absolute top-1/2 left-1/2 z-20 px-5 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#FF3B30]/30 text-[#FF3B30] text-xs font-medium tracking-wide shadow-[0_8px_30px_rgba(255,59,48,0.2)] whitespace-nowrap"
          style={{ animation: 'py-badge 4s infinite cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          Incompatible: DDR4 on DDR5
        </div>

      </div>

      {/* SECTION 2: THE TECHNICAL CONSOLE (Bottom Half) */}
      <div className="bg-[#000000] p-5 font-mono text-xs leading-relaxed flex flex-col gap-2 overflow-x-auto border-t border-white/5 relative z-30 shadow-[inset_0_10px_20px_rgba(0,0,0,0.4)] h-[160px]">
        
        {/* macOS Native Window Controls */}
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-white/10"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-white/10"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-white/10"></div>
        </div>

        {/* Sync'd Console Logs */}
        <div className="flex flex-col gap-1.5 font-light tracking-tight">
          <div className="text-[#A1A1AA] flex gap-2 whitespace-nowrap" style={{ animation: 'py-log-1 4s infinite' }}>
            <span className="opacity-50">{'>'}</span>
            <span>Initializing structural matrix...</span>
          </div>
          <div className="text-[#A1A1AA] flex gap-2 whitespace-nowrap" style={{ animation: 'py-log-2 4s infinite' }}>
            <span className="opacity-50">{'>'}</span>
            <span>Analyzing memory controller...</span>
          </div>
          <div className="text-[#FF3B30] flex gap-2 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,59,48,0.4)]" style={{ animation: 'py-log-3 4s infinite' }}>
            <span className="opacity-70">{'>'}</span>
            <span>[ERR_PHYSICAL] Key notch misalignment.</span>
          </div>
          <div className="text-[#10B981] flex gap-2 mt-1 whitespace-nowrap" style={{ animation: 'py-log-4 4s infinite' }}>
            <span className="opacity-70">{'>'}</span>
            <span>ACTION: Component rejected.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
