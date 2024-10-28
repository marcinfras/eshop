import Image from "next/image";
import { getCartByIdHygraph, getProductBySlug } from "../../../lib/graphql";
import { Separator } from "../_components/ui/separator";

import { formatCurrency } from "../../helpers/helpers";
import { AddToCartForm } from "./_components/AddToCartForm";
import { getServerSession } from "next-auth";

import { UpdateItemQuantity } from "../_components/UpdateItemQuantity";
import type { Metadata } from "next";

import { RecentlyViewedProducts } from "./_components/RecentlyViewedProducts";
import { ProductDetails } from "./_components/ProductDetails";
import { Reviews } from "./_components/Reviews";
import { StarIcon } from "../_components/StarIcon";
import { getRecentlyViewedProductsAction } from "../../../lib/actions/recentlyViewedProductsAction";

export async function generateMetadata({
  params,
}: {
  params: { productSlug: string };
}) {
  const product = await getProductBySlug(params.productSlug);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images],
    },
  } satisfies Metadata;
}

const Page = async ({ params }: { params: { productSlug: string } }) => {
  const { name, price, description, images } = await getProductBySlug(
    params.productSlug
  );
  const session = await getServerSession();

  const cart = await getCartByIdHygraph();

  const recentlyViewedProducts = await getRecentlyViewedProductsAction();

  const products = recentlyViewedProducts?.filter(
    (item) => item.slug !== params.productSlug
  );

  if (!cart || "error" in cart) {
    throw new Error("Something went wrong");
  }

  const isProductInCart = cart?.find(
    (item) => item.slug === params.productSlug
  );

  return (
    <div className="max-w-6xl px-4 mx-auto py-6">
      <div className="grid md:grid-cols-2 md:grid-rows-none gap-6 lg:gap-12 items-start ">
        <div className="grid gap-4 md:gap-8 justify-center">
          <div className="grid gap-4 w-[70vw] md:w-full">
            <Image
              src={images}
              alt="Product Image"
              width={600}
              height={900}
              className="aspect-[3/3] object-contain border w-full rounded-lg overflow-hidden"
            />
          </div>
        </div>
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5  ${
                      i > 2
                        ? "fill-muted stroke-muted-foreground"
                        : "fill-primary"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-4xl font-bold">{formatCurrency(price)}</div>
          </div>

          {isProductInCart ? (
            <UpdateItemQuantity
              id={isProductInCart.id}
              currentQuantity={isProductInCart.quantity}
            />
          ) : (
            <AddToCartForm
              slug={params.productSlug}
              email={session?.user?.email}
            />
          )}

          <Separator />
          <ProductDetails description={description} />

          <Separator />
          <Reviews />
        </div>
      </div>

      <RecentlyViewedProducts
        cart={cart}
        slug={params.productSlug}
        products={products && products?.length > 0 ? products : null}
      />
    </div>
  );
};

export default Page;
