import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card py-12 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg tracking-tight">HardComp</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            The first Zero-Trust PC builder. We block physical and electrical incompatibilities before you even click.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Mission & Values</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Zero Trust Engine</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Data Accuracy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Open Architecture</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">The Team</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Hardware Partners</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        &copy; 2026 HardComp. All rights reserved. Deterministic guarantees apply to verified hardware only.
      </div>
    </footer>
  );
}
