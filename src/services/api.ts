export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  command: string;
}

export interface OrderPayload {
  steamId: string;
  items: CartItem[];
  total: number;
  timestamp: string;
}

export async function submitOrder(steamId: string, cartItems: CartItem[]): Promise<{ success: boolean; orderId: string }> {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const payload: OrderPayload = {
    steamId,
    items: cartItems,
    total,
    timestamp: new Date().toISOString(),
  };

  // TODO: Replace with real fetch call
  console.log("📦 Order submitted:", JSON.stringify(payload, null, 2));

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
  };
}
