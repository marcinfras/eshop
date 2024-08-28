export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
};

export const formatData = (value: string) => {
  return new Intl.DateTimeFormat("en-GB").format(new Date(value));
};
