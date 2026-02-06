import { useState } from "react";
import { StoreProvider } from "@/contexts/StoreContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import WalletModal from "@/components/WalletModal";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <StoreProvider>
      <div className="min-h-screen bg-tactical-gradient">
        <Header onCartOpen={() => setCartOpen(true)} />
        <main>
          <HeroSection />
          <ProductGrid />
        </main>
        <footer className="border-t border-border py-8 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            SCUM Server Store &mdash; All items delivered in-game via server commands
          </p>
        </footer>
        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
        <WalletModal />
      </div>
    </StoreProvider>
  );
};

export default Index;
