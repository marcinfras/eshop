import { OrderOrderByInput } from "../../lib/hygraph/generated/graphql";

export const productsPerPage = 8;

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

export const isStringArray = (obj: unknown): obj is string[] => {
  return Array.isArray(obj) && obj.every((item) => typeof item === "string");
};

export const safeJsonParse = <T>(
  jsonString: string,
  validator: (obj: unknown) => obj is T
): T | null => {
  try {
    const parsed = JSON.parse(jsonString);

    if (validator(parsed)) {
      return parsed;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
