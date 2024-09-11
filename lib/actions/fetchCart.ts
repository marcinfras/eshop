"use server";

import { cookies } from "next/headers";
import { getCartByEmail, getCartByIdHygraph } from "../graphql";
// import { ProductType } from "@/app/_components/contexts/CartContext/CartContext";
// import { getCartFromCookie } from "./createCart";
import { mapperCart } from "../graphql/mappers";
import { revalidateTag } from "next/cache";

export const fetchCart = async () => {
  const cartCookie = cookies().get("cart");

  if (!cartCookie?.value) return [];

  const cart = await getCartByIdHygraph(cartCookie.value);

  revalidateTag("cart");

  return mapperCart(cart);
};

// export const fetchCart = async (email: string) => {
//   const cart = await getCartByEmail(email);

//   if (!cart) {
//     cookies().delete("cart");
//     return [];
//   }

//   cookies().set("cart", cart.id, { httpOnly: true });

//   const reducerCart = cart.cartProduct.map((item) => {
//     if (!item.product) {
//       return [];
//     }

//     return {
//       id: item.product?.id,
//       hygraphId: item.id,
//       slug: item.product?.slug,
//       name: item.product?.name,
//       price: item.product?.price,
//       totalPrice: item.product?.price * item.quantity,
//       quantity: item.quantity,
//       image: item.product?.images[0].url,
//     };
//   });

//   return reducerCart as ProductType[];
// };
