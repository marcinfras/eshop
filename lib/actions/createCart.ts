"use server";

import { cookies } from "next/headers";
import {
  addToCartHygraph,
  connectAccountWithCart,
  createCartHygraph,
} from "../graphql";
import { addToCartAction } from "./addToCart";

export const createCart = async (
  product: {
    quantity: number;
    slug: string;
  },
  email: string
) => {
  // 1 pobieramy koszyk

  const cartId = cookies().get("cart");
  console.log(cartId);
  // 2 jesli nie bedzie ma tworzyc tutaj

  if (!cartId) {
    const cart = await createCartHygraph(product);
    await connectAccountWithCart({ cartId: cart.id, email });
    // console.log(cart);

    cookies().set("cart", cart.id, { httpOnly: true });

    // console.log("createCart " + cart.cartProduct[0].id);
    return cart.cartProduct[0].id;
  }

  // 4 jesni bedzie ma aktualizowac cartProduct

  // addToCartAction({ slug: product.slug, quantity: product.quantity });
  const hygraphId = await addToCartHygraph({
    cartId: cartId.value,
    slug: product.slug,
    quantity: product.quantity,
  });

  //   console.log(hygraphId.cartProduct[hygraphId.cartProduct.length - 1].id);
  return hygraphId.cartProduct[hygraphId.cartProduct.length - 1].id;
};
