import Link from "next/link";
import { Button } from "./_components/ui/button";
import { getCartByIdHygraph, getProductsByCollection } from "../../lib/graphql";
import { ProductsSwiper } from "./_components/ProductsSwiper";

export default async function Home() {
  const newInProducts = await getProductsByCollection("New In");
  const cart = await getCartByIdHygraph();

  if (cart && "error" in cart) throw new Error(cart.error);

  return (
    <main>
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Eshop
          </h1>
          <p className="text-xl mb-8">Discover Our high quality products</p>
          <Button size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-12">
        <ProductsSwiper
          cart={cart}
          products={newInProducts}
          title="New Collection"
          titleClass="text-center text-3xl"
        />
      </section>
    </main>
  );
}
