"use client";

import { CartItem } from "./CartItem";
import { useCart } from "./contexts/CartContext/CartContext";
import { Button } from "./ui/button";

export const CartView = () => {
  const {
    state: { cart },
    getTotalPrice,
    getTotalItems,
  } = useCart();

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 && <p>Your cart is empty!</p>}
      {cart.length > 0 && (
        <>
          <div className="grid gap-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-8 bg-muted/20 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground">Total Items:</span>
              <span className="font-semibold">{getTotalItems()}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-muted-foreground">Total Cost:</span>
              <span className="font-semibold">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </>
  );
};
