import { getCartByIdHygraph, getProducts } from "../../lib/graphql";

import { ProductItem } from "./_components/ProductItem";
import { cookies } from "next/headers";
import { NewsletterPopup } from "./_components/NewsletterPopup";

export default async function Home() {
  const products = await getProducts();
  const cart = await getCartByIdHygraph();

  const newsletter = cookies().get("newsletter");

  // console.log(cart);

  // console.log(products);

  if (cart && "error" in cart) throw new Error(cart.error);

  return (
    <main className="container mx-auto px-4 md:px-6 py-12">
      {JSON.stringify(cart, null, 2)}
      {/* {JSON.stringify(mailerLite, null, 2)} */}
      {!newsletter?.value && <NewsletterPopup />}
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
