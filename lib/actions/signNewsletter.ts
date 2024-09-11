"use server";

import { getEnv } from "@/app/utils/utils";
import { cookies } from "next/headers";

export const signNewsletter = async (email?: string) => {
  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getEnv(process.env.MAILERLITE_TOKEN)}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) return { error: "Failed to Sign up for the newsletter" };

    const { data } = await res.json();

    cookies().set("newsletter", "subscribed");

    return { id: data.id };
  } catch (error) {
    console.error((error as Error).message);
    return { error: "Failed to Sign up for the newsletter" };
  }
};

export const cancelNewsletter = async () => {
  cookies().set("newsletter", "cancelled");
};
