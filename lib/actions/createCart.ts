"use server";

import { cookies } from "next/headers";
import {
  addToCartHygraph,
  // connectAccountWithCart,
  createCartHygraph,
  getCartByIdHygraph,
} from "../graphql";
import { mapperCart } from "../graphql/mappers";
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

  const cart = await getCartByIdHygraph(cartCookie);

  if ("error" in cart) return cart;

  revalidateTag("cart");

  return mapperCart(cart);
};

const getCartFromCookie = () => {
  const cartId = cookies().get("cart");
  return cartId?.value;
};
