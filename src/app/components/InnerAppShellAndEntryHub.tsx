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
import { useTranslation } from "../lib/i18n";

export function InnerAppShellAndEntryHub() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { t } = useTranslation();

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
              <span className="font-bold text-lg tracking-tight">{t('hub.sidebar.title')}</span>
            )}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center text-white/70 hover:text-white"
              title={t('hub.sidebar.toggle')}
            >
              {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
          </div>

          {/* Middle Section (Navigation List) */}
          <nav className="flex flex-col gap-2 px-3 mt-4">
            {/* Active Item */}
            <button className="flex items-center gap-3 px-3 py-2.5 bg-[#007BFF]/10 text-[#007BFF] rounded-lg transition-colors group relative">
              <Plus className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium text-sm">{t('hub.sidebar.newConfig')}</span>}
              {!isSidebarOpen && (
                <div className="absolute left-14 bg-[#1E1E1E] text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {t('hub.sidebar.newConfig')}
                </div>
              )}
            </button>

            {/* Conditionally Active/Inactive Item */}
            <button className="flex items-center gap-3 px-3 py-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors group relative">
              <History className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium text-sm">{t('hub.sidebar.continueBuild')}</span>}
              {!isSidebarOpen && (
                <div className="absolute left-14 bg-[#1E1E1E] text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {t('hub.sidebar.continueBuild')}
                </div>
              )}
            </button>

            {/* Inactive Item */}
            <button className="flex items-center gap-3 px-3 py-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors group relative">
              <Sparkles className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium text-sm">{t('hub.sidebar.guidedWizard')}</span>}
              {!isSidebarOpen && (
                <div className="absolute left-14 bg-[#1E1E1E] text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {t('hub.sidebar.guidedWizard')}
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
                {t('hub.sidebar.syncMsg')}
              </p>
              <button className="text-[#007BFF] hover:text-[#0056b3] text-sm font-medium transition-colors">
                {t('hub.sidebar.syncBtn')}
              </button>
            </div>
          ) : (
             <div className="mx-auto mb-4 p-2 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center group relative cursor-pointer hover:bg-white/10 transition-colors">
               <User className="w-5 h-5 text-[#007BFF]" />
               <div className="absolute left-14 bg-[#1E1E1E] text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {t('hub.sidebar.syncHover')}
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
                <span className="text-sm font-medium text-white/90">{t('hub.sidebar.anonymous')}</span>
              </div>
            )}
            {!isSidebarOpen && (
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">
                <User className="w-4 h-4 text-white/70" />
              </div>
            )}
            <button className="text-white/50 hover:text-white transition-colors p-1" title={t('hub.sidebar.settings')}>
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
              {t('hub.workspace.breadcrumb')}
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-3">
              {t('hub.workspace.title')}
            </h2>
            <p className="text-white/50 text-base max-w-2xl leading-relaxed">
              {t('hub.workspace.subtitle')}
            </p>
          </header>

          {/* Card Grid System */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            
            {/* CARD 1: Cold Start */}
            <Link to="/builder" className="group flex flex-col p-8 bg-[#1E1E1E] border border-white/5 rounded-2xl shadow-xl hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-[10px] tracking-widest px-2 py-1 rounded bg-black/40 border border-white/5 text-gray-400">
                  {t('hub.workspace.cards.scratch.badge')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#007BFF] transition-colors">
                {t('hub.workspace.cards.scratch.title')}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed flex-1">
                {t('hub.workspace.cards.scratch.description')}
              </p>
              <button className="w-full mt-8 bg-[#007BFF] hover:bg-[#0056b3] text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors">
                {t('hub.workspace.cards.scratch.button')}
              </button>
            </Link>

            {/* CARD 2: Upgrade Existing Setup */}
            <Link to="/inventory" className="group flex flex-col p-8 bg-[#1E1E1E] border border-white/5 rounded-2xl shadow-xl hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-[10px] tracking-widest px-2 py-1 rounded bg-black/40 border border-white/5 text-amber-500/80">
                  {t('hub.workspace.cards.upgrade.badge')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('hub.workspace.cards.upgrade.title')}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed flex-1">
                {t('hub.workspace.cards.upgrade.description')}
              </p>
              <button className="w-full mt-8 bg-transparent border border-white/10 hover:border-white/20 hover:bg-white/5 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors">
                {t('hub.workspace.cards.upgrade.button')}
              </button>
            </Link>

            {/* CARD 3: Guided Smart Wizard */}
            <Link to="/wizard" className="group flex flex-col p-8 bg-[#1E1E1E] border border-white/5 rounded-2xl shadow-xl hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-[10px] tracking-widest px-2 py-1 rounded bg-black/40 border border-white/5 text-emerald-500/90">
                  {t('hub.workspace.cards.wizard.badge')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('hub.workspace.cards.wizard.title')}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed flex-1">
                {t('hub.workspace.cards.wizard.description')}
              </p>
              <button className="w-full mt-8 bg-transparent border border-white/10 hover:border-white/20 hover:bg-white/5 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors">
                {t('hub.workspace.cards.wizard.button')}
              </button>
            </Link>

          </div>
        </div>
      </main>

    </div>
  );
}
