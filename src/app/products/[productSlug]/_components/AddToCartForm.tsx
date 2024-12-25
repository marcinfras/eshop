"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addToCartSchema } from "../schemas";
import { createCart } from "../../../../../lib/actions/createCart";
import { toast } from "@/app/_components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useLoader } from "@/app/_components/contexts/LoaderContext.tsx/LoaderContext";

type AddToCartForm = {
  quantity: string;
};

export const AddToCartForm = ({
  slug,
  email,
}: {
  slug: string;
  email?: string | undefined | null;
}) => {
  const form = useForm<AddToCartForm>({
    resolver: yupResolver(addToCartSchema),
    defaultValues: {
      quantity: "1",
    },
  });

  const router = useRouter();
  const { startTransition } = useLoader();

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const res = await createCart(
        { quantity: Number(data.quantity), slug: slug },
        email
      );

      if (res && "error" in res)
        toast({
          variant: "destructive",
          title: res.error,
        });

      router.refresh();
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="grid gap-4 md:gap-10">
        <FormField
          control={control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-base">Quantity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button size="lg">Add to cart</Button>
      </form>
    </Form>
  );
};
