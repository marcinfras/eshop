"use server";

import bcrypt from "bcrypt";
import { createAccount } from "../graphql";

export async function createAccountAction({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = bcrypt.hashSync(password, 12);
  return await createAccount({ name, email, password: hashedPassword });
}
