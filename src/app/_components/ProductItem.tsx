"use client";

import Image from "next/image";

import { Button } from "./ui/button";
import Link from "next/link";
import { UpdateItemQuantity } from "./UpdateItemQuantity";

import { formatCurrency } from "../../helpers/helpers";
import { useSession } from "next-auth/react";
import { createCart } from "../../../lib/actions/createCart";

import { useLoader } from "./contexts/LoaderContext.tsx/LoaderContext";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

import { useIntersectionObserverImage } from "../_hooks/useIntersectionObserverImage";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export const ProductItem = ({
  product,
}: {
  product: {
    name: string;
    price: number;
    id: string;
    slug: string;
    images: {
      url: string;
    }[];
    currentQuantity: number;
    idInCart?: string;
  };
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const session = useSession();
  const { startTransition } = useLoader();
  const router = useRouter();

  const { imgRef, isVisible } = useIntersectionObserverImage(
    product.images[0].url
  );

  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-lg relative">
      <div ref={imgRef} className="relative w-full h-60">
        {!isLoaded && (
          <Skeleton className="absolute top-0 left-0 w-full h-60" />
        )}

        {isVisible && (
          <Image
            // ref={imgRef}
            src={product.images[0].url}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-60 object-contain relative"
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 inline-block">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0"
          >
            {product.name}
          </Link>
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold">
            {formatCurrency(product.price)}
          </span>
          {product.currentQuantity === 0 ? (
            <Button
              className="relative"
              onClick={() => {
                startTransition(async () => {
                  const res = await createCart(
                    { quantity: 1, slug: product.slug },
                    session.data?.user?.email
                  );

                  if (res && "error" in res)
                    toast({
                      variant: "destructive",
                      title: res.error,
                    });

                  router.refresh();
                });
              }}
              size="sm"
            >
              Add to Cart
            </Button>
          ) : (
            <UpdateItemQuantity
              className="relative"
              size="small"
              id={product.idInCart as string}
              currentQuantity={product.currentQuantity}
            />
          )}
        </div>
      </div>
    </div>
  );
};
