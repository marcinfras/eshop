"use client";

import Link from "next/link";

import { SVGProps } from "react";
import { dataTagSymbol, useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";

import { formatCurrency, formatDate } from "@/helpers/helpers";
import { fetchOrderById } from "../../../../../lib/actions/fetchOrder";
import { Loader } from "@/app/_components/Loader";
import { Separator } from "@/app/_components/ui/separator";
import { Badge } from "@/app/_components/ui/badge";
import { OrderDetailItem } from "./OrderDetailItem";

export const OrderDetail = ({ orderId }: { orderId: string }) => {
  const session = useSession();

  const {
    data: order,
    isPending,
    isError,
  } = useQuery({
    queryKey: [orderId],
    queryFn: async () => {
      const data = await fetchOrderById({
        orderId,
        email: session.data?.user?.email as string,
      });
      return data;
    },
    enabled: !!session.data?.user?.email,
  });

  if (isPending || session.status === "loading") return <Loader />;

  if (order && "error" in order) {
    throw Error(order.error);
  }

  if (!order || isError) {
    throw Error("Something went wrong");
  }

  console.log(order);

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/account/orders"
          className="inline-flex items-center text-sm sm:text-base gap-2 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Orders
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex flex-col items-start gap-1">
          <div className="text-xs sm:text-lg  sm:block font-medium">
            #{orderId}
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
        <div>
          <div className="text-lg font-medium">Order Summary</div>
          <div className="">
            <Separator className="my-2" />
            <div className="flex items-center justify-between font-medium">
              <span className="text-muted-foreground">Total</span>
              <span>{formatCurrency(order?.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
