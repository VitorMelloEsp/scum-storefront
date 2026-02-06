import { Gem } from "lucide-react";
import { formatCoins } from "@/lib/coins";
import { cn } from "@/lib/utils";

interface CoinAmountProps {
  amount: number;
  className?: string;
  iconSize?: number;
}

export default function CoinAmount({ amount, className, iconSize = 14 }: CoinAmountProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 font-mono", className)}>
      <Gem className="text-primary shrink-0" style={{ width: iconSize, height: iconSize }} />
      {formatCoins(amount)}
    </span>
  );
}
