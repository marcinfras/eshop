type MapperCart =
  | {
      id: string;
      cartProduct: Array<{
        id: string;
        quantity: number;
        product?: {
          id: string;
          slug: string;
          name: string;
          price: number;
          images: Array<{
            url: string;
          }>;
        } | null;
      }>;
    }
  | null
  | undefined;

export type ProductCart = {
  id: string;
  quantity: number;
  slug: string;
  name: string;
  price: number;
  images: {
    url: string;
  };
};
export const mapperCart = (cart: MapperCart) => {
  return cart?.cartProduct
    .map((v) => {
      if (!v.product) return;
      return {
        id: v.id,
        slug: v.product.slug,
        images: v.product.images[0],
        name: v.product.name,
        price: v.product.price,
        quantity: v.quantity,
      };
    })
    .filter((v): v is ProductCart => Boolean(v));
};