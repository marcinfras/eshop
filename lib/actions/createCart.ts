"use server";

import { cookies } from "next/headers";
import { createCartHygraph } from "../graphql";

const createCart = async (products: { quantity: number; slug: string }) => {
  const cart = await createCartHygraph(products);

  cookies().set("cart", cart.id, { httpOnly: true });
};
