"use server";

import { updateNameHygraph } from "../graphql";

export const updateNameAction = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  // console.log("tratatata");

  const res = await updateNameHygraph({
    name,
    email,
  });

  if ("error" in res) {
    return { error: res.error };
  }

  return res;
};
