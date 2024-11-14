import { getCartByIdHygraph, getProducts } from "../../../lib/graphql";

import { ProductItem } from "../_components/ProductItem";

export const metadata = {
  title: "Products",
  openGraph: {
    title: "Products",
  },
};

export default async function Products() {
  const products = await getProducts();
  const cart = await getCartByIdHygraph();

  if (cart && "error" in cart) throw new Error(cart.error);

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
