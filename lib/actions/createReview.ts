"use server";

import { createReview } from "../graphql";

export const createReviewAction = async (review: {
  headline: string;
  name: string;
  email: string;
  content: string;
  rating: number;
  slug: string;
}) => {
  const res = await createReview(review);

  return res;
};
