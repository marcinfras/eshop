"use server";

import { cookies } from "next/headers";

export const deleteCartCookie = async () => {
  cookies().delete("cart");
};
