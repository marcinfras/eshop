"use server";

import { cookies } from "next/headers";
import { removeFromCartHygraph } from "../graphql";

export const removeFromCart = async ({ prodId }: { prodId: string }) => {
  const cartId = cookies().get("cart");

  if (!cartId?.value) return;

  const res = await removeFromCartHygraph({
    cartId: cartId.value,
    prodId,
  });

  return res;

  //   console.log(hygraphId.cartProduct[hygraphId.cartProduct.length - 1].id);
  //   return hygraphId.cartProduct[hygraphId.cartProduct.length - 1].id;
};
