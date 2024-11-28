"use client";

import { ProductItem } from "@/app/_components/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";

import { useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import type { ProductCart } from "../../../lib/graphql/mappers";
import { setRecentlyViewedProducts } from "../../../lib/actions/setRecentlyViewedProducts";

export const ProductsSwiper = ({
  cart,
  title,
  titleClass,
  slug,
  products,
}: {
  cart: ProductCart[] | undefined;
  title: string;
  titleClass?: string;
  slug?: string;
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
    if (slug) {
      setRecentlyViewedProducts(slug);
    }
  }, [slug]);

  if (!products) return null;

  return (
    <div className="mt-2 text-sm leading-loose font-bold mx-auto my-10">
      <h2 className={`text-2xl pb-5 ${titleClass}`}>{title}</h2>
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
