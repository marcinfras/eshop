import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";

export const UpdateItemQuantity = ({ size }: { size?: string }) => {
  return (
    <div className={`flex items-center gap-2`}>
      <Button
        size="icon"
        className={size === "small" ? "w-7 h-7" : ""}
        variant="outline"
      >
        <MinusIcon className="w-4 h-4" />
      </Button>
      <span className="font-medium">1</span>
      <Button
        size="icon"
        className={size === "small" ? "w-7 h-7" : ""}
        variant="outline"
      >
        <PlusIcon className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        className={size === "small" ? "w-7 h-7" : ""}
        variant="outline"
      >
        <XIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
