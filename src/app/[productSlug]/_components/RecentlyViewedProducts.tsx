"use client";

import { ProductItem } from "@/app/_components/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/app/_components/ui/carousel";
import type { ProductCart } from "../../../../lib/graphql/mappers";
import { useEffect } from "react";
import { setRecentlyViewedProducts } from "../../../../lib/actions/recentlyViewedProductsAction";
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

    // console.log(products);
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
        {products.map((product, i) => {
          const itemInCart = cart?.find((item) => item?.slug === product.slug);
          return (
            <SwiperSlide
              // className={`${
              //   i === 0 || i === products.length - 1 ? "ml-5" : ""
              // }`}
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
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <h2 className="bg-transpaernt relative top-[-50px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque eos culpa
        praesentium ab eaque reiciendis necessitatibus in ex neque rem nihil
        repudiandae odio fuga, quis non! Natus doloremque, voluptate ipsum
        itaque neque earum quisquam placeat labore dignissimos non veritatis
        animi quia explicabo nulla ab pariatur? Officia asperiores dicta ut
        explicabo hic facere quas, neque voluptates. Eos id atque porro
        excepturi! Ipsa nostrum cum quod tenetur ullam nisi iure vitae corporis
        cumque, reprehenderit laboriosam iusto, veniam consectetur aut
        consequatur delectus quam cupiditate esse id labore porro totam? Eius,
        veritatis nihil est tempora, distinctio enim fugit laborum earum
        accusantium unde vero sapiente.
      </h2> */}
      {/* <Carousel className="w-[75%] sm:w-[85%] md:w-[90%] my-6 mx-auto">
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
      </Carousel> */}
    </div>
  );
};
