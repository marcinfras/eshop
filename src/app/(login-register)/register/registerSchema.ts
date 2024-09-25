import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

// type RegisterSchema = yup.InferType<typeof registerSchema>;
