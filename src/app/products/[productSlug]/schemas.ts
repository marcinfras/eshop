import * as yup from "yup";

export const addToCartSchema = yup.object({
  quantity: yup.string().required(),
});

export const addReviewSchema = yup.object({
  rating: yup.number().min(1).max(5).required(),
  title: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  content: yup.string().required(),
});
