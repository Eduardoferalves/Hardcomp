import { ShieldCheck } from "lucide-react";
import { useTranslation } from "../lib/i18n";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/50 bg-card py-12 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg tracking-tight">{t('navigation.brand')}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            {t('navigation.footer.description')}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">{t('navigation.footer.mission.title')}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">{t('navigation.footer.mission.item1')}</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">{t('navigation.footer.mission.item2')}</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">{t('navigation.footer.mission.item3')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">{t('navigation.footer.team.title')}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">{t('navigation.footer.team.item1')}</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">{t('navigation.footer.team.item2')}</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">{t('navigation.footer.team.item3')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">{t('navigation.footer.legal.title')}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">{t('navigation.footer.legal.item1')}</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">{t('navigation.footer.legal.item2')}</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">{t('navigation.footer.legal.item3')}</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        {t('navigation.footer.copyright')}
      </div>
    </footer>
  );
}
