import { Gem, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { formatCoins } from "@/lib/coins";
import CoinAmount from "@/components/CoinAmount";

interface TopUpPackage {
  id: string;
  coins: number;
  priceLabel: string;
}

const topUpPackages: TopUpPackage[] = [
  { id: "pkg-1k", coins: 1000, priceLabel: "R$ 10,00" },
  { id: "pkg-2.5k", coins: 2500, priceLabel: "R$ 22,50" },
  { id: "pkg-5k", coins: 5000, priceLabel: "R$ 45,00" },
  { id: "pkg-10k", coins: 10000, priceLabel: "R$ 80,00" },
  { id: "pkg-25k", coins: 25000, priceLabel: "R$ 175,00" },
  { id: "pkg-50k", coins: 50000, priceLabel: "R$ 300,00" },
];

export default function WalletModal() {
  const { walletOpen, closeWallet, balance } = useStore();

  const handlePurchase = (pkg: TopUpPackage) => {
    console.log(`💳 Initiating payment for package: ${formatCoins(pkg.coins)} Coins — ${pkg.priceLabel}`);
  };

  return (
    <Dialog open={walletOpen} onOpenChange={(open) => !open && closeWallet()}>
      <DialogContent className="sm:max-w-lg bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Gem className="h-5 w-5 text-primary" />
            My Wallet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Top up your SCUM Coins to purchase in-game items.
          </DialogDescription>
        </DialogHeader>

        {/* Current Balance */}
        <div className="flex items-center justify-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-5">
          <Gem className="h-8 w-8 text-primary" />
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Current Balance</p>
            <p className="text-3xl font-bold font-mono text-primary">{formatCoins(balance)}</p>
          </div>
        </div>

        {/* Top-up Packages */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Top-up Packages
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {topUpPackages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => handlePurchase(pkg)}
                className="group flex flex-col items-center gap-1 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:bg-secondary/50"
              >
                <CoinAmount amount={pkg.coins} className="text-base font-bold text-foreground" iconSize={16} />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {pkg.priceLabel}
                </span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
