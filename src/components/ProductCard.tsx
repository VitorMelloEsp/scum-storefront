import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import type { Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import CoinAmount from "@/components/CoinAmount";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user, addToCart } = useStore();
  const { toast } = useToast();

  const handleAdd = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login with Steam to add items to your cart.",
        variant: "destructive",
      });
      return;
    }
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:glow-accent">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute left-2 top-2 rounded border border-border bg-background/80 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-base font-bold text-foreground">{product.name}</h3>
        {product.description && (
          <p className="mb-3 flex-1 text-sm text-muted-foreground leading-snug">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <CoinAmount amount={product.price} className="text-lg font-bold text-primary" iconSize={16} />
          <Button size="sm" variant="tactical" onClick={handleAdd} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
