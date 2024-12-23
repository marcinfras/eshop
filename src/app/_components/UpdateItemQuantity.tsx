"use client";

import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
// import { useCart } from "./contexts/CartContext/CartContext";
import { removeFromCart } from "../../../lib/actions/removeFromCart";
import { updateCart } from "../../../lib/actions/updateCart";
import { useLoader } from "./contexts/LoaderContext.tsx/LoaderContext";
import { toast } from "./ui/use-toast";

export const UpdateItemQuantity = ({
  size,
  id,
  currentQuantity,
  className,
}: {
  size?: string;
  id: string;
  currentQuantity: number;
  className?: string;
}) => {
  const { startTransition } = useLoader();

  return (
    <div className={`${className} flex items-center gap-2 `}>
      <Button
        size="icon"
        className={size === "small" ? "w-7 h-7" : ""}
        variant="outline"
        onClick={() => {
          startTransition(async () => {
            const res = await updateCart({
              prodId: id,
              quantity: currentQuantity - 1,
            });

            if ("error" in res)
              toast({
                variant: "destructive",
                title: res.error,
              });
            // await queryClient.invalidateQueries({ queryKey: ["cart"] });
          });
        }}
        disabled={currentQuantity === 1}
      >
        <MinusIcon className="w-4 h-4" />
      </Button>
      <span className="font-medium">{currentQuantity}</span>
      <Button
        size="icon"
        className={size === "small" ? "w-7 h-7" : ""}
        variant="outline"
        onClick={() => {
          startTransition(async () => {
            const res = await updateCart({
              prodId: id,
              quantity: currentQuantity + 1,
            });

            if ("error" in res)
              toast({
                variant: "destructive",
                title: res.error,
              });

            // await queryClient.invalidateQueries({ queryKey: ["cart"] });
          });
        }}
      >
        <PlusIcon className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        className={size === "small" ? "w-7 h-7" : ""}
        variant="outline"
        onClick={() => {
          startTransition(async () => {
            const res = await removeFromCart(id);

            if ("error" in res)
              toast({
                variant: "destructive",
                title: res.error,
                duration: 3000,
              });

            // await queryClient.invalidateQueries({ queryKey: ["cart"] });
          });
        }}
      >
        <XIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
