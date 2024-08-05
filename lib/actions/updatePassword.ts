"use server";

import bcrypt from "bcrypt";
import { updatePasswordHygraph } from "../graphql";

export async function updatePasswordAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const hashedPassword = bcrypt.hashSync(password, 12);
  const res = await updatePasswordHygraph({ email, password: hashedPassword });

  if ("error" in res) {
    return { error: res.error };
  }

  return res;
}
