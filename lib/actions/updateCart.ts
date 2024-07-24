"use server";

import { cookies } from "next/headers";
import { updateCartHygraph } from "../graphql";

export const updateCart = async ({
  prodId,
  quantity,
}: {
  prodId: string;
  quantity: number;
}) => {
  const cartId = cookies().get("cart");

  // console.log(cartId?.value);
  // console.log(prodId);
  // console.log(quantity);
  // console.log(":titiitiit");
  if (!cartId?.value) return;
  // console.log("tratatata");

  const res = await updateCartHygraph({
    cartId: cartId.value,
    prodId,
    quantity,
  });

  return res.id;
};
