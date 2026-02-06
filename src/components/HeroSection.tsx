import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  const { user, loginWithSteam } = useStore();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="SCUM survival landscape"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 text-center mt-[20vh]">
        <h1 className="mb-2 text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          SCUM <span className="text-gradient-accent">SERVER STORE</span>
        </h1>
        <p className="mb-8 max-w-lg text-lg text-muted-foreground font-medium">
          Gear up, arm up, survive. Get weapons, vehicles, supplies, and boosts
          delivered directly to your character.
        </p>

        {!user && (
          <Button variant="steam" size="lg" onClick={loginWithSteam} className="gap-3 text-lg px-8 py-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-steam" viewBox="0 0 16 16">
              <path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.2 2.2 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.22 2.22 0 0 1-1.312-1.568L.33 10.333Z"/>
              <path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027m2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048"/>
            </svg>
            Login with Steam to Start
          </Button>
        )}

        {user && (
          <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2">
            <span className="text-sm font-medium text-primary">✓ Logged in as {user.name}</span>
          </div>
        )}

        <a
          href="#products"
          className="mt-12 flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        >
          <span className="text-xs uppercase tracking-widest">Browse Items</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
