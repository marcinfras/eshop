import Image from "next/image";

import { UpdateItemQuantity } from "@/app/_components/UpdateItemQuantity";
import type { ProductCart } from "../../../../lib/graphql/mappers";
import { formatCurrency } from "@/helpers/helpers";

export const CartItem = ({ item }: { item: ProductCart }) => {
  return (
    <div className="flex items-center h-[100px] gap-4">
      <div className="w-[70px]  sm:w-[100px]">
        <Image
          src={item.images.url}
          alt={item.name}
          width={800}
          height={800}
          className="rounded-lg h-[70px] sm:h-[100px] w-auto m-auto"
        />
      </div>

      <div className="grow">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-muted-foreground">{formatCurrency(item.price)}</p>
      </div>
      <UpdateItemQuantity
        id={item.id}
        currentQuantity={item.quantity}
        className="w-[100px]"
      />
    </div>
  );
};
