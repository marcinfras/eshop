import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import Image from "next/image";
import { UpdateItemQuantity } from "./UpdateItemQuantity";
import { useCart } from "./contexts/CartContext/CartContext";
import { formatCurrency } from "../../helpers/helpers";

export const CartItem = ({
  item,
}: {
  item: {
    id: string;
    name: string;
    price: number;
    totalPrice: number;
    quantity: number;
    image: string;
  };
}) => {
  const { getCurrentQuantityById } = useCart();

  const currentQuantity = getCurrentQuantityById(item.id);

  return (
    <div className="grid grid-cols-[100px_1fr_100px] items-center gap-4">
      <Image
        src={item.image}
        alt={item.name}
        width={800}
        height={800}
        className="rounded-lg"
      />
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-muted-foreground">{formatCurrency(item.price)}</p>
      </div>
      <UpdateItemQuantity id={item.id} currentQuantity={currentQuantity} />
      {/* <div className="flex items-center gap-2">
        <Button size="icon" variant="outline">
          <MinusIcon className="w-4 h-4" />
        </Button>
        <span className="font-medium">1</span>
        <Button size="icon" variant="outline">
          <PlusIcon className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline">
          <XIcon className="w-4 h-4" />
        </Button>
      </div> */}
    </div>
  );
};
