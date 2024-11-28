"use server";

import { cookies } from "next/headers";
import { isStringArray, safeJsonParse } from "@/helpers/helpers";

export const setRecentlyViewedProducts = (slug: string) => {
  if (!slug) return;

  const value = cookies().get("recentlyViewedProducts")?.value;

  if (!value) {
    cookies().set("recentlyViewedProducts", JSON.stringify([slug]), {
      httpOnly: true,
      secure: true,
    });
    return null;
  }

  const products = safeJsonParse<string[]>(value, isStringArray);

  if (!products) return;

  const viewedProducts = products.filter((item) => item !== slug);
  const newViewedProducts = [slug, ...viewedProducts].slice(0, 6);

  cookies().set("recentlyViewedProducts", JSON.stringify(newViewedProducts), {
    httpOnly: true,
    secure: true,
  });
};
