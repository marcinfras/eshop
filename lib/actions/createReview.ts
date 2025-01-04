"use server";

import { checkProductReviewByEmail, createReview } from "../graphql";

export const createReviewAction = async (review: {
  headline: string;
  name: string;
  email: string;
  content: string;
  rating: number;
  slug: string;
}) => {
  const existingReviewCount = await checkProductReviewByEmail({
    email: review.email,
    slug: review.slug,
  });

  if (existingReviewCount && existingReviewCount > 0)
    return { error: "You have already reviewed this product." };

  const res = await createReview(review);

  if (!res)
    return { error: "We couldn't submit your review. Please try again later." };

  return res;
};
