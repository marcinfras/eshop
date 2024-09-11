"use server";

import { cookies } from "next/headers";
import { addToCartHygraph } from "../graphql";

export const addToCartAction = async ({
  slug,
  quantity,
}: {
  slug: string;
  quantity: number;
}) => {
  const cartId = cookies().get("cart");

  if (!cartId?.value) return;

  const hygraphId = await addToCartHygraph({
    cartId: cartId.value,
    slug,
    quantity,
  });

  return hygraphId;
};
