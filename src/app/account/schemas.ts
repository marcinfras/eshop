import * as yup from "yup";

export const nameSchema = yup.object({
  name: yup.string().required(),
});

export const changePasswordSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .required()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
