import type { ProductSize } from "../hygraph/generated/graphql";

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
  console.log(cart?.cartProduct);

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

/////////////////////////////////////////////////////////

type VariantType = {
  size: ProductSize;
  id: string;
};

type MapperProduct = {
  name: string;
  price: number;
  id: string;
  description: string;
  images: {
    url: string;
  }[];
  variants: (
    | Record<string, unknown>
    | {
        size: ProductSize;
        id: string;
      }
  )[];
};

export const mapperProduct = (product: MapperProduct) => {
  const filteredVariants = product.variants
    .map((variant) => {
      if ("size" in variant) return variant;
      return;
    })
    .filter((v): v is VariantType => Boolean(v?.size));

  return {
    name: product.name,
    price: product.price,
    id: product.id,
    description: product.description,
    images: product.images[0].url,
    variants: filteredVariants.length > 0 ? filteredVariants : undefined,
  };
};
// type MapperProduct = (product: {
//   name: string;
//   price: number;
//   id: string;
//   description: string;
//   images: {
//       url: string;
//   }[];
//   variants: ({} | {
//       size: ProductSize;
//       id: string;
//   })[];
// })
