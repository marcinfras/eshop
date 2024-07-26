"use server";

import { cookies } from "next/headers";
import { getCartByEmail } from "../graphql";
import { ProductType } from "@/app/_components/contexts/CartContext/CartContext";

export const fetchCart = async (email: string) => {
  const cart = await getCartByEmail(email);

  if (!cart) return;

  cookies().set("cart", cart.id, { httpOnly: true });

  const reducerCart = cart.cartProduct.map((item) => {
    if (!item.product) {
      return null;
    }

    return {
      id: item.product?.id,
      hygraphId: item.id,
      slug: item.product?.slug,
      name: item.product?.name,
      price: item.product?.price,
      totalPrice: item.product?.price * item.quantity,
      quantity: item.quantity,
      image: item.product?.images[0].url,
    };
  });

  return reducerCart as ProductType[];
};
