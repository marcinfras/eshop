"use client";

import Image from "next/image";

import { Button } from "./ui/button";
import Link from "next/link";
import { UpdateItemQuantity } from "./UpdateItemQuantity";
import { useCart } from "./contexts/CartContext/CartContext";
import { formatCurrency } from "../../helpers/helpers";

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
  };
}) => {
  //     id: string;
  //   name: string;
  //   price: number;
  //   totalPrice: number;
  //   quantity: number;
  //   image: string;

  const {
    state: { cart },
    addToCart,
    getCurrentQuantityById,
  } = useCart();

  const currentQuantity = getCurrentQuantityById(product.id);
  const isInCart = currentQuantity > 0;

  const addToCartHandler = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      totalPrice: product.price,
      quantity: 1,
      image: product.images[0].url,
    };

    console.log(item);

    addToCart(item);
  };

  console.log(cart);

  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-lg">
      <Image
        src={product.images[0].url}
        alt={product.name}
        width={800}
        height={800}
        className="w-full h-60 object-contain"
      />
      <div className="p-4">
        <Link href={`/${product.slug}`}>
          <h3 className="text-lg font-semibold mb-2 inline-block">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold">
            {formatCurrency(product.price)}
          </span>
          {!isInCart ? (
            <Button onClick={addToCartHandler} size="sm">
              Add to Cart
            </Button>
          ) : (
            <UpdateItemQuantity
              size="small"
              id={product.id}
              currentQuantity={currentQuantity}
            />
          )}
        </div>
      </div>
    </div>
  );
};
