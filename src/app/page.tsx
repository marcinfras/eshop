import Image from "next/image";
import { Button } from "./_components/ui/button";
import { getProducts } from "../../lib/graphql";
import Link from "next/navigation";
import { ProductItem } from "./_components/ProductItem";
import { fetchCart } from "../../lib/actions/fetchCart";

export default async function Home() {
  const products = await getProducts();
  const cart = await fetchCart();

  // console.log(cart);

  // console.log(products);

  return (
    <main className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const itemInCart = cart?.find((item) => item?.slug === product.slug);
          // console.log("currentQuantityyyyyyyyyyy: " + currentQuantity);

          return (
            <ProductItem
              key={product.id}
              product={{
                ...product,
                currentQuantity: itemInCart?.quantity || 0,
                idInCart:
                  itemInCart && itemInCart?.quantity > 0
                    ? itemInCart?.id
                    : undefined,
              }}
            />
          );
        })}
      </div>
    </main>
  );
}
