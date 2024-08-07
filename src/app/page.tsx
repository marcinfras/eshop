import Image from "next/image";
import { Button } from "./_components/ui/button";
import { getProducts } from "../../lib/graphql";
import Link from "next/navigation";
import { ProductItem } from "./_components/ProductItem";

export default async function Home() {
  const products = await getProducts();

  const test = {
    images: [
      {
        url: "https://media.graphassets.com/GwlxIi81SWvHXA8qsSC6",
      },
    ],
    id: "1",
    name: "Unisex Long Sleeve Tee",
    price: 1999,
    slug: "unisex-long-sleeve-tee",
    test: true,
  };

  console.log(products);

  return (
    <main className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
