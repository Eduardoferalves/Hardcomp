import { Link } from "react-router";
import { PlusSquare, RefreshCw, Wand2, ChevronRight } from "lucide-react";
import { useTranslation } from "../lib/i18n";

export function Hub() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 flex flex-col container mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">{t('hub.title')}</h1>
        <p className="text-muted-foreground max-w-2xl">
          {t('hub.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {/* Card 1: Cold Start */}
        <Link 
          to="/builder" 
          className="group relative flex flex-col bg-card border border-border p-8 rounded-xl hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.15)] overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
            <ChevronRight className="w-6 h-6 text-primary" />
          </div>
          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
            <PlusSquare className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-foreground">{t('hub.cards.coldStart.title')} <span className="text-muted-foreground font-normal text-sm ml-2">{t('hub.cards.coldStart.badge')}</span></h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
            {t('hub.cards.coldStart.description')}
          </p>
          <div className="mt-auto pt-4 border-t border-border/50 font-mono text-xs text-primary flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            {t('hub.cards.coldStart.status')}
          </div>
        </Link>

        {/* Card 2: Upgrade Existing Setup */}
        <Link 
          to="/builder?mode=upgrade" 
          className="group relative flex flex-col bg-card border border-border p-8 rounded-xl hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.15)] overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
            <ChevronRight className="w-6 h-6 text-primary" />
          </div>
          <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center mb-6">
            <RefreshCw className="w-7 h-7 text-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-foreground">{t('hub.cards.upgrade.title')} <span className="text-muted-foreground font-normal text-sm ml-2">{t('hub.cards.upgrade.badge')}</span></h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
            {t('hub.cards.upgrade.description')}
          </p>
          <div className="mt-auto pt-4 border-t border-border/50 font-mono text-xs text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
            {t('hub.cards.upgrade.status')}
          </div>
        </Link>

        {/* Card 3: Guided Wizard */}
        <Link 
          to="/builder?mode=wizard" 
          className="group relative flex flex-col bg-card border border-border p-8 rounded-xl hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(0,123,255,0.15)] overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
            <ChevronRight className="w-6 h-6 text-primary" />
          </div>
          <div className="w-14 h-14 bg-success/10 rounded-lg flex items-center justify-center mb-6">
            <Wand2 className="w-7 h-7 text-success" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-foreground">{t('hub.cards.wizard.title')} <span className="text-muted-foreground font-normal text-sm ml-2">{t('hub.cards.wizard.badge')}</span></h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
            {t('hub.cards.wizard.description')}
          </p>
          <div className="mt-auto pt-4 border-t border-border/50 font-mono text-xs text-success flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
            {t('hub.cards.wizard.status')}
          </div>
        </Link>
      </div>
    </div>
  );
}
