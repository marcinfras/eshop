"use server";

import { revalidateTag } from "next/cache";
import { getOrdersByEmailHygraph } from "../graphql";

import { OrderOrderByInput } from "../hygraph/generated/graphql";

export const fetchOrders = async ({
  email,
  sortBy,
  sortDirection,
  filter,
}: {
  email: string;
  sortBy: string | null;
  sortDirection: string | null;
  filter: string | null;
}) => {
  if (!email) return [];

  const orderBy = getOrderByString({ sortBy, sortDirection });

  const where = {
    ...(!filter || filter === "ALL"
      ? { email: email }
      : { email: email, currentStatus: filter }),
  };

  const orders = await getOrdersByEmailHygraph({ where, orderBy });

  if ("error" in orders) {
    return { error: orders.error };
  }

  revalidateTag("orders");

  return orders;
};

const getOrderByString = ({
  sortBy,
  sortDirection,
}: {
  sortBy: string | null;
  sortDirection: string | null;
}) => {
  switch (sortBy) {
    case "DATE":
      return !sortDirection || sortDirection === "DESC"
        ? OrderOrderByInput.CreatedAtDesc
        : sortDirection === "ASC"
        ? OrderOrderByInput.CreatedAtAsc
        : OrderOrderByInput.CreatedAtDesc;
    case "TOTAL":
      return !sortDirection || sortDirection === "DESC"
        ? OrderOrderByInput.TotalDesc
        : OrderOrderByInput.TotalAsc;
    default:
      return !sortDirection || sortDirection === "DESC"
        ? OrderOrderByInput.CreatedAtDesc
        : OrderOrderByInput.CreatedAtAsc;
  }
};
