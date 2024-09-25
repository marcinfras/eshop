import { formatCurrency, formatDate } from "@/helpers/helpers";

import Link from "next/link";
import type { OrderStatus } from "../../../../../lib/hygraph/generated/graphql";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";

export const OrdersItem = ({
  order,
}: {
  order: {
    id: string;
    total: number;
    createdAt: string;
    currentStatus: OrderStatus;
  };
}) => {
  const { id, total, createdAt, currentStatus } = order;

  return (
    <div className="flex flex-col sm:flex-row justify-between border rounded-lg p-3 mb-4">
      <div>
        <p className="font-medium text-sm">#{id}</p>
        <div>{formatCurrency(total)}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="self-end">{formatDate(createdAt)}</div>
        <Badge className="self-end" variant={"outline"}>
          {currentStatus}
        </Badge>
        <Button variant="outline" size="sm">
          <Link href={`/account/${id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
};
