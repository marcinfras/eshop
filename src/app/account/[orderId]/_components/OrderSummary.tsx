import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/helpers/helpers";

export const OrderSummary = ({ total }: { total: number }) => {
  return (
    <div>
      <div className="text-lg font-medium">Order Summary</div>
      <div className="">
        <Separator className="my-2" />
        <div className="flex items-center justify-between font-medium">
          <span className="text-muted-foreground">Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};
