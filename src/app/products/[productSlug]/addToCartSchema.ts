import * as yup from "yup";

export const addToCartSchema = yup.object({
  quantity: yup.string().required(),
});
