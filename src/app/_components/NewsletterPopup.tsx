"use client";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  cancelNewsletter,
  signNewsletter,
} from "../../../lib/actions/signNewsletter";
import { toast } from "./ui/use-toast";

type EmailFormInput = {
  email: string;
};

const newsletterSchema = yup.object({
  email: yup.string().email().required(),
});

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { data } = useSession();

  const form = useForm<EmailFormInput>({
    resolver: yupResolver(newsletterSchema),
    defaultValues: {
      email: data?.user?.email || "",
    },
  });

  const { handleSubmit, control } = form;

  const closePopup = () => {
    cancelNewsletter();
    setIsOpen(false);
  };

  const onSubmit = handleSubmit(async ({ email }) => {
    if (!email) return;

    const res = await signNewsletter(email);

    if ("error" in res) {
      toast({
        variant: "destructive",
        title: res.error,
        description: "Try again!",
        duration: 3000,
      });
      return;
    }
    if (res.id) {
      toast({
        title: "You have successfully subscribed to the newsletter",
        duration: 3000,
      });
      setIsOpen(false);
    }
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={closePopup}
    >
      <div
        className="mx-4 w-full max-w-md rounded-lg bg-background p-6 shadow-lg sm:p-8 relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4" onClick={closePopup}>
          X
        </button>
        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Subscribe to our newsletter</h2>
            <p className="text-muted-foreground">
              Stay up to date with our latest news, offers, and updates.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Enter your email" />
                      </FormControl>
                      <FormMessage className="first-letter:uppercase" />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
