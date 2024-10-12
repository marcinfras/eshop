"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addToCartSchema } from "../addToCartSchema";
import { createCart } from "../../../../lib/actions/createCart";
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
        {/* {variants && (
            <div className="grid gap-2">
            <Label htmlFor="size" className="text-base">
            Size
            </Label>
            
            <RadioGroup
            id="size"
            // defaultValue="m"
            className="flex items-center gap-2"
            >
            {variants.map((variant) => (
                <Label
                key={variant.size}
                defaultValue={variant.size}
                htmlFor={variant.size}
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                  >
                  <RadioGroupItem id={variant.size} value={variant.size} />
                  {variant.size}
                  </Label>
                  ))}
                  </RadioGroup>
                  </div>
                  )} */}
        {/* <div className="grid gap-2">
          <Label htmlFor="quantity" className="text-base">
            Quantity
          </Label>
          <Select defaultValue="1">
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <Button size="lg">Add to cart</Button>
      </form>
    </Form>
  );
};
