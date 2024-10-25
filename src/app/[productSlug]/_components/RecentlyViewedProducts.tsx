"use client";

import { ProductItem } from "@/app/_components/ProductItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";
import type { ProductCart } from "../../../../lib/graphql/mappers";
import { useEffect } from "react";
import { setRecentlyViewedProducts } from "../../../../lib/actions/recentlyViewedProductsAction";

export const RecentlyViewedProducts = ({
  cart,
  slug,
  products,
}: {
  cart: ProductCart[] | undefined;
  slug: string;
  products?:
    | {
        price: number;
        id: string;
        name: string;
        slug: string;
        images: {
          url: string;
        }[];
      }[]
    | null
    | undefined;
}) => {
  useEffect(() => {
    setRecentlyViewedProducts(slug);

    // console.log(products);
  }, [slug]);

  if (!products) return null;

  return (
    <div className="mt-2 text-sm leading-loose font-bold  mx-auto">
      <h2 className="text-2xl">Recently viewed products</h2>

      <Carousel className="w-[75%] sm:w-[85%] md:w-[90%] my-6 mx-auto">
        <CarouselContent>
          {products.map((product) => {
            const itemInCart = cart?.find(
              (item) => item?.slug === product.slug
            );
            return (
              <CarouselItem
                className=" sm:basis-1/2 md:basis-1/3"
                key={product.id}
              >
                <ProductItem
                  product={{
                    ...product,
                    currentQuantity: itemInCart?.quantity || 0,
                    idInCart:
                      itemInCart && itemInCart?.quantity > 0
                        ? itemInCart?.id
                        : undefined,
                  }}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
