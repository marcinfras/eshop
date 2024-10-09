"use server";

import { cookies } from "next/headers";

export const deleteCartCookie = () => {
  cookies().delete("cart");
};
