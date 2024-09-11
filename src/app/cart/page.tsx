import Image from "next/image";
// import { useCart } from "../_components/contexts/CartContext/CartContext";git

import { fetchCart } from "../../../lib/actions/fetchCart";
import { formatCurrency } from "@/helpers/helpers";

import { CheckoutButton } from "./_components/CheckoutButton";
import { CartItem } from "./_components/CartItem";

const Page = async () => {
  const cart = await fetchCart();

  const totalItems = cart?.reduce((acc, cur) => cur?.quantity + acc, 0);

  const totalPrice = cart
    ?.map((item) => {
      const totalPrice = item?.quantity * item?.price;
      return totalPrice;
    })
    .reduce((acc, cur) => acc + cur, 0);

  //acc cur
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {(!cart || cart.length === 0) && <p>Your cart is empty!</p>}
      {cart && cart.length > 0 && (
        <>
          <div className="grid gap-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-8 bg-muted/20 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground">Total Items:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-muted-foreground">Total Cost:</span>
              <span className="font-semibold">
                {formatCurrency(totalPrice as number)}
              </span>
            </div>
            <CheckoutButton />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
