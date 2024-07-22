export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
};
