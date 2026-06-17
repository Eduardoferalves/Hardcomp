import { Link } from "react-router";
import { ArrowRight, Database, Fingerprint, Lock } from "lucide-react";
import { ZeroTrustDemonstrationCard } from "./ZeroTrustDemonstrationCard";

export function Landing() {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-background">
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* Left Side: Copy */}
        <div className="flex-1 text-left max-w-2xl flex flex-col items-start z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            SYS_STATUS: DETERMINISTIC_ENGINE_ACTIVE
          </div>
          
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            Don't just buy hardware. <span className="text-muted-foreground">Buy the mathematical certainty that it works.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
            The first Zero-Trust PC builder. We block physical and electrical incompatibilities before you even click.
          </p>
          
          <Link 
            to="/hub"
            className="group px-8 py-4 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,123,255,0.4)] hover:shadow-[0_0_30px_rgba(0,123,255,0.6)] flex items-center gap-3 text-lg"
          >
            Enter the Builder Hub
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Side: Visual Showcase - Poka-Yoke Demonstration */}
        <div className="flex-1 w-full max-w-xl relative flex justify-center lg:justify-end z-20">
          <ZeroTrustDemonstrationCard />
        </div>
      </section>

      {/* Features Section (Technical Trust) */}
      <section className="py-24 bg-[#121212] border-t border-border/30 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">The Mathematics of Compatibility</h2>
            <p className="text-muted-foreground font-mono text-sm">SYSTEM_ARCHITECTURE // TRUST_NO_ONE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-card border border-border/50 p-8 rounded-lg hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 font-mono text-[15px]">100% Compatibility Guarantee</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Deterministic validation engine.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border/50 p-8 rounded-lg hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 font-mono text-[15px]">Live Price Tracking</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Algorithmic market intelligence (Redis cache updated hourly).
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border/50 p-8 rounded-lg hover:border-destructive/50 transition-colors group">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Fingerprint className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 font-mono text-[15px]">Poka-Yoke UI</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Errors prevented by design.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
