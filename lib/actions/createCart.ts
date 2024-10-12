"use server";

import { cookies } from "next/headers";
import {
  addToCartHygraph,
  createCartHygraph,
  getCartByIdHygraph,
} from "../graphql";

import { revalidateTag } from "next/cache";
// import { addToCartAction } from "./addToCart";

export const createCart = async (
  product: {
    quantity: number;
    slug: string;
  },
  email: string | undefined | null
) => {
  const cartCookie = getCartFromCookie();

  if (!cartCookie) {
    const cart = await createCartHygraph(product, email);

    if ("error" in cart) return cart;

    cookies().set("cart", cart.id, { httpOnly: true, secure: true });
    return;
  }

  const res = await addToCartHygraph({
    cartId: cartCookie,
    slug: product.slug,
    quantity: product.quantity,
  });

  if ("error" in res) return res;

  const cart = await getCartByIdHygraph();

  if (cart && "error" in cart) return cart;

  revalidateTag("cart");

  return cart;
};

const getCartFromCookie = () => {
  const cartId = cookies().get("cart");
  return cartId?.value;
};
