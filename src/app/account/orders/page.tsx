// https://v0.dev/r/1fLhZtmpPLK

import { getServerSession } from "next-auth";
// import { OrdersList } from "./_components/OrdersList";

import { OrdersItem } from "./_components/OrdersItem";
import { OrdersFilters } from "./_components/OrdersFilters";
import { getOrdersByEmailHygraph } from "../../../../lib/graphql";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your orders",
};

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession();

  if (!session?.user?.email) throw new Error("Failed to get orders");

  const orders = await getOrdersByEmailHygraph({
    email: session.user.email,
    sortBy:
      typeof searchParams["sortBy"] === "string"
        ? searchParams["sortBy"]
        : null,
    sortDirection:
      typeof searchParams["sortDirection"] === "string"
        ? searchParams["sortDirection"]
        : null,
    filter:
      typeof searchParams["filter"] === "string"
        ? searchParams["filter"]
        : null,
  });

  if (orders && "error" in orders) {
    throw new Error(orders.error);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 sm:px-2 max-w-[800px]">
      {/* {JSON.stringify(session, null, 2)} */}
      {JSON.stringify(searchParams, null, 2)}
      {/* {JSON.stringify(orders)} */}
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {/* <OrdersList /> */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <OrdersFilters />
      </div>
      <div className="overflow-x-auto">
        {/* {JSON.stringify(session, null, 4)} */}
        <div>
          {orders && !("error" in orders) && orders.length === 0 ? (
            <p>You havent ordered anything yet</p>
          ) : (
            orders.map((order) => <OrdersItem key={order.id} order={order} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
