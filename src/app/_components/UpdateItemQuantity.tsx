import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "./contexts/CartContext/CartContext";

export const UpdateItemQuantity = ({
  size,
  id,
  currentQuantity,
}: {
  size?: string;
  id: string;
  currentQuantity: number;
}) => {
  const {
    deleteFromCart,
    increaseItemQuantity,

    decreaseItemQuantity,
  } = useCart();

  return (
    <div className={`flex items-center gap-2`}>
      <Button
        size="icon"
        className={size === "small" ? "w-7 h-7" : ""}
        variant="outline"
        onClick={() => decreaseItemQuantity(id, currentQuantity - 1)}
        disabled={currentQuantity === 1}
      >
        <MinusIcon className="w-4 h-4" />
      </Button>
      <span className="font-medium">{currentQuantity}</span>
      <Button
        size="icon"
        className={size === "small" ? "w-7 h-7" : ""}
        variant="outline"
        onClick={() => increaseItemQuantity(id, currentQuantity + 1)}
      >
        <PlusIcon className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        className={size === "small" ? "w-7 h-7" : ""}
        variant="outline"
        onClick={() => deleteFromCart(id)}
      >
        <XIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
