"use server";

import { cookies } from "next/headers";
import { getProductsBySlugs } from "../graphql";

export const getRecentlyViewedProductsAction = async () => {
  const value = cookies().get("recentlyViewedProducts")?.value;

  if (!value) return;

  const slugs: string[] = JSON.parse(value);

  const data = await getProductsBySlugs(slugs);

  if (!data) return null;

  return data;
};

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

  const products: string[] = JSON.parse(value);

  const viewedProducts = products.filter((item) => item !== slug);
  const newViewedProducts = [slug, ...viewedProducts].slice(0, 6);

  cookies().set("recentlyViewedProducts", JSON.stringify(newViewedProducts), {
    httpOnly: true,
    secure: true,
  });
};
