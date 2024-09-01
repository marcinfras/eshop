"use client";

import { useSession } from "next-auth/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../../lib/actions/fetchOrders";
import { Loader } from "./Loader";
import { formatCurrency, formatData } from "@/helpers/helpers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { SVGProps, useCallback } from "react";
import { OrdersItem } from "./OrdersItem";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { OrderStatus } from "../../../lib/hygraph/generated/graphql";

// type FilterOptionsType =
//   | "All"
//   | "New"
//   | "Paid"
//   | "Recived"
//   | "Send"
//   | "In progress";
// const filterOptions = ["All", OrderStatus.Paid, OrderStatus.Paid, OrderStatus.Recived, OrderStatus.Send, OrderStatus.InProgress,]
//   ["All", "New", "PAID", "Recived", "Send", "In progress"];
const filterOptions = [
  {
    hygraphStatus: "ALL",
    displayed: "All",
  },
  {
    hygraphStatus: OrderStatus.New,
    displayed: "New",
  },
  {
    hygraphStatus: OrderStatus.Paid,
    displayed: "Paid",
  },
  {
    hygraphStatus: OrderStatus.Recived,
    displayed: "Recived",
  },
  {
    hygraphStatus: OrderStatus.Send,
    displayed: "Send",
  },
  {
    hygraphStatus: OrderStatus.InProgress,
    displayed: "In progress",
  },
];

const sortByOptions = [];

export const OrdersList = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  console.log(searchParams);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const { data: orders, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const data = await fetchOrders(session.data?.user?.email as string);
      return data;
    },
  });

  console.log(orders);

  console.log(isPending);

  if (session.status === "loading" || isPending) return <Loader />;

  if (orders && "error" in orders) {
    throw new Error(orders.error as string);
  }

  if (orders && !("error" in orders) && orders.length === 0) {
    return <p>You havent ordered anything yet</p>;
  }

  const filteredOrders = orders?.filter((order) =>
    // searchParams.get("filter")
    //   ? order.currentStatus === searchParams.get("filter")
    //   : order

    !searchParams.get("filter") || searchParams.get("filter") === "ALL"
      ? order
      : searchParams.get("filter")
      ? order.currentStatus === searchParams.get("filter")
      : order
  );

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
          {filterOptions.map((option) => (
            <Button
              key={option.hygraphStatus}
              variant={
                !searchParams.get("filter") && option.displayed === "All"
                  ? "outline"
                  : searchParams.get("filter") === option.hygraphStatus
                  ? "outline"
                  : "default"
              }
              onClick={() => {
                router.push(
                  pathname +
                    "?" +
                    createQueryString("filter", option.hygraphStatus)
                );
              }}
            >
              {option.displayed}
            </Button>
          ))}

          {/* <Button
            onClick={() => {
              router.push(pathname + "?" + createQueryString("filter", "new"));
            }}
          >
            New
          </Button>
          <Button>Paid</Button>
          <Button>Recived</Button>
          <Button>Send</Button>
          <Button>In progress</Button> */}
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="sort">Sort by:</Label>
          <Select
            value={searchParams.get("sortBy") || "date"}
            onValueChange={(e) => {
              router.push(pathname + "?" + createQueryString("sortBy", e));
            }}
          >
            <SelectTrigger className="w-40 sm:w-auto">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="total">Total</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ArrowUpDownIcon className="h-4 w-4" />
            <span className="sr-only">Sort direction</span>
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {JSON.stringify(session, null, 4)}
        <div>
          {filteredOrders &&
            filteredOrders.map((order) => (
              <OrdersItem key={order.id} order={order} />
            ))}
        </div>
      </div>
    </>
  );
};

function ArrowUpDownIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}
