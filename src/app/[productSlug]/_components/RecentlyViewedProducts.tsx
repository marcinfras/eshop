"use client";

import { ProductItem } from "@/app/_components/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import type { ProductCart } from "../../../../lib/graphql/mappers";
import { useEffect } from "react";
import { setRecentlyViewedProducts } from "../../../../lib/actions/setRecentlyViewedProducts";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

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
  }, [slug]);

  if (!products) return null;

  return (
    <div className="mt-2 text-sm leading-loose font-bold mx-auto my-10">
      <h2 className="text-2xl pb-5">Recently viewed products</h2>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={50}
      >
        {products.map((product) => {
          const itemInCart = cart?.find((item) => item?.slug === product.slug);
          return (
            <SwiperSlide key={product.id}>
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
