"use server";

import bcrypt from "bcrypt";
import { createAccount } from "../graphql";
import { registerSchema } from "@/app/(login-register)/register/registerSchema";

export async function createAccountAction({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    await registerSchema.validate(
      { name, email, password },
      { abortEarly: false }
    );

    const hashedPassword = bcrypt.hashSync(password, 12);
    return await createAccount({ name, email, password: hashedPassword });
  } catch (error) {
    throw new Error("Something went wrong during account creation.");
  }
}
