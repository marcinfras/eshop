import { OrderOrderByInput } from "../../lib/hygraph/generated/graphql";

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
};

export const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB").format(new Date(value));
};

export const getOrderByString = ({
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
