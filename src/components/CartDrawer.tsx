import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/contexts/StoreContext";
import { submitOrder } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import CoinAmount from "@/components/CoinAmount";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const {
    user,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    balance,
    deductBalance,
    openWallet,
  } = useStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login with Steam before checking out.",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) return;

    // Check balance
    if (balance < cartTotal) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough SCUM Coins. Please top up your wallet.",
        variant: "destructive",
      });
      onOpenChange(false);
      openWallet();
      return;
    }

    setLoading(true);
    try {
      const deducted = deductBalance(cartTotal);
      if (!deducted) {
        toast({
          title: "Insufficient Funds",
          description: "You don't have enough SCUM Coins. Please top up your wallet.",
          variant: "destructive",
        });
        onOpenChange(false);
        openWallet();
        return;
      }

      const result = await submitOrder(user.steamId, cart);
      if (result.success) {
        toast({
          title: "🎯 Order Sent!",
          description: `Order ${result.orderId} has been placed. Items will be delivered shortly.`,
        });
        clearCart();
        onOpenChange(false);
      }
    } catch {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md bg-background border-border">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Your Cart
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {cart.length === 0
              ? "Your cart is empty."
              : `${cart.length} item${cart.length !== 1 ? "s" : ""} in your cart.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <ShoppingCart className="mb-4 h-12 w-12 opacity-30" />
              <p className="text-sm">No items yet. Start shopping!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {item.name}
                    </p>
                    <CoinAmount amount={item.price} className="text-sm text-primary" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm font-bold text-foreground font-mono">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-border pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Total</span>
              <CoinAmount amount={cartTotal} className="text-xl font-bold text-primary" iconSize={18} />
            </div>
            <Separator className="bg-border" />
            <Button
              variant="tactical"
              className="w-full py-6 text-base"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Checkout"}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
