"use server";

import { cookies } from "next/headers";
import { getCartByIdHygraph } from "../graphql";
import { mapperCart } from "../graphql/mappers";
import { revalidateTag } from "next/cache";

export const fetchCart = async () => {
  const cartCookie = cookies().get("cart");

  if (!cartCookie?.value) return [];

  const cart = await getCartByIdHygraph(cartCookie.value);

  if ("error" in cart) return cart;

  revalidateTag("cart");

  return mapperCart(cart);
};
