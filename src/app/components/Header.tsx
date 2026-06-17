import { Link } from "react-router";
import { ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <ShieldCheck className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xl tracking-tight">HardComp</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Features</a>
          <a href="#" className="hover:text-foreground transition-colors">Architecture</a>
          <a href="#" className="hover:text-foreground transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-foreground/70 hover:text-foreground bg-transparent hover:bg-white/5 transition-colors px-4 py-2 rounded-md">
            Sign In
          </button>
          <Link 
            to="/hub" 
            className="text-sm font-semibold bg-primary text-white hover:bg-primary/90 px-5 py-2.5 rounded-md transition-all shadow-[0_4px_14px_0_rgba(0,123,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,123,255,0.23)] hover:-translate-y-[1px]"
          >
            Start Building
          </Link>
        </div>
      </div>
    </header>
  );
}
