import Image from "next/image";
import { Button } from "./_components/ui/button";
import { getProducts } from "../../lib/graphql";

export default async function Home() {
  const products = await getProducts();

  console.log(products);

  return (
    <main className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.slug}
            className="bg-background rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={product.images[0].url}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-60 object-contain"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-primary font-semibold">
                  ${product.price}
                </span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
