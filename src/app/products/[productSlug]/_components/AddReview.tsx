"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { useForm } from "react-hook-form";
import { addReviewSchema } from "../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea } from "@/app/_components/ui/textarea";
import { StarRating } from "./StarRating";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/app/_components/ui/use-toast";
import { createReviewAction } from "../../../../../lib/actions/createReview";
import { LoadingButton } from "@/app/_components/LoadingButton";
import { useSession } from "next-auth/react";

type AddReviewInputs = {
  rating: number;
  title: string;
  name: string;
  email: string;
  content: string;
};

export const AddReview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = useSession();
  const router = useRouter();
  const param = useParams();

  const form = useForm<AddReviewInputs>({
    resolver: yupResolver(addReviewSchema),
    defaultValues: {
      rating: 0,
      title: "",
      name: data?.user?.name || "",
      email: data?.user?.email || "",
      content: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);

    const review = {
      headline: data.title,
      name: data.name,
      email: data.email,
      content: data.content,
      rating: data.rating,
      slug: String(param.productSlug),
    };
    const res = await createReviewAction(review);

    if ("error" in res) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: res.error,
        duration: 5000,
      });
    }

    if ("id" in res) {
      toast({
        title: "Review Submitted!",
        description:
          "Your review has been posted. Feel free to browse more products!",
        duration: 5000,
      });
      router.refresh();
    }

    setIsSubmitting(false);
    setIsOpen(false);
    reset();
  });

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary">Add a review</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle>Write a Review</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormField
              control={control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <StarRating
                      readOnly={false}
                      rating={field.value}
                      onChange={(rating) => field.onChange(rating)}
                    />
                  </FormControl>
                  <FormMessage className="first-letter:uppercase" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title..." {...field} />
                  </FormControl>
                  <FormMessage className="first-letter:uppercase" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="first-letter:uppercase" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="first-letter:uppercase" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your detailed review here..."
                    />
                  </FormControl>
                  <FormMessage className="first-letter:uppercase" />
                </FormItem>
              )}
            />
            {!isSubmitting && <Button type="submit">Submit Review</Button>}
            {isSubmitting && <LoadingButton>Submitting</LoadingButton>}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
