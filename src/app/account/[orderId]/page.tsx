import { getServerSession } from "next-auth";
// import { OrderDetail } from "./_components/OrderDetail";

import Link from "next/link";
import { formatDate } from "@/helpers/helpers";
import { Separator } from "@/app/_components/ui/separator";
import { Badge } from "@/app/_components/ui/badge";
import { OrderDetailItem } from "./_components/OrderDetailItem";
import { ArrowLeft } from "lucide-react";
import { OrderSummary } from "./_components/OrderSummary";
import { getOrderByIdHygraph } from "../../../../lib/graphql";

// https://v0.dev/r/m1fFuMxpk1b
const Page = async ({ params }: { params: { orderId: string } }) => {
  const session = await getServerSession();

  if (!session?.user?.email) throw new Error("Failed to get order");

  const order = await getOrderByIdHygraph({
    orderId: params.orderId,
    email: session?.user?.email,
  });

  if (order && "error" in order) {
    throw Error(order.error);
  }

  if (!order) {
    throw Error("Something went wrong");
  }

  return (
    <div className="container mx-auto px-3 md:px-6 py-8">
      {/* {JSON.stringify(session, null, 2)} */}

      {/* <OrderDetail orderId={params.orderId} /> */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/account/orders"
          className="inline-flex items-center text-sm sm:text-base gap-2 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          {/* <ArrowLeftIcon className="h-4 w-4" /> */}
          <ArrowLeft className="w-4" />
          Back to Orders
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex flex-col items-start gap-1">
          <div className="text-xs sm:text-lg  sm:block font-medium">
            #{params.orderId}
          </div>
          <Badge className="" variant={"outline"}>
            Paid
          </Badge>
          <div className="text-sm text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">Order Details</div>
          </div>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="w-[80px] hidden md:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 hidden sm:table-cell text-right text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {order?.orderItems.map((item) => (
                      <OrderDetailItem key={item.product?.name} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <OrderSummary total={order.total} />
      </div>
    </div>
  );
};

export default Page;
