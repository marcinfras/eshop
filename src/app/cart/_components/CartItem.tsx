

import Image from "next/image";

// import { useCart } from "./contexts/CartContext/CartContext";

import { UpdateItemQuantity } from "@/app/_components/UpdateItemQuantity";
import type { ProductCart } from "../../../../lib/graphql/mappers";
import { formatCurrency } from "@/helpers/helpers";

export const CartItem = ({ item }: { item: ProductCart }) => {
  // const { getCurrentQuantityById } = useCart();

  // const currentQuantity = getCurrentQuantityById(item.id);

  return (
    <div className="grid grid-cols-[100px_1fr_100px] items-center gap-4">
      <Image
        src={item.images.url}
        alt={item.name}
        width={800}
        height={800}
        className="rounded-lg"
      />
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-muted-foreground">{formatCurrency(item.price)}</p>
      </div>
      <UpdateItemQuantity id={item.id} currentQuantity={item.quantity} />
    </div>
  );
};
