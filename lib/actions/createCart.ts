"use server";

import { cookies } from "next/headers";
import { createCartHygraph } from "../graphql";

export const createCart = async (product: {
  quantity: number;
  slug: string;
}) => {
  // 1 pobieramy koszyk
  const cartId = cookies().get("cart");
  console.log(cartId);
  // 2 jesli nie bedzie ma tworzyc tutaj

  if (!cartId) {
    const cart = await createCartHygraph(product);
    // console.log(cart);

    cookies().set("cart", cart.id, { httpOnly: true });

    // console.log("createCart " + cart.cartProduct[0].id);
    return cart.cartProduct[0].id;
  }

  // 3 sprawdz czy produkty sa dostepne jesli nie usun je z koszyka

  // 4 jesni bedzie ma aktualizowac cartProduct
};
