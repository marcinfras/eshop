import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import Image from "next/image";

const Page = () => {
  const cart = [
    {
      images: [
        {
          url: "https://media.graphassets.com/GwlxIi81SWvHXA8qsSC6",
        },
      ],
      name: "Unisex Long Sleeve Tee",
      price: 1999,
      slug: "unisex-long-sleeve-tee",
    },
    {
      images: [
        {
          url: "https://media.graphassets.com/pRwUMCYSoOrHycP1VgIm",
        },
      ],
      name: "Snapback",
      price: 1299,
      slug: "snapback",
    },
    {
      images: [
        {
          url: "https://media.graphassets.com/Li6gjg0ySmeWOY8zh72w",
        },
      ],
      name: "Unisex Zip Hoodie",
      price: 3999,
      slug: "unisex-zip-hoodie",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid gap-6">
        {cart.map((item) => (
          <div
            key={item.slug}
            className="grid grid-cols-[100px_1fr_100px] items-center gap-4"
          >
            <Image
              src={item.images[0].url}
              alt={item.name}
              width={800}
              height={800}
              className="rounded-lg"
            />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline">
                <MinusIcon className="w-4 h-4" />
              </Button>
              <span className="font-medium">1</span>
              <Button size="icon" variant="outline">
                <PlusIcon className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline">
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-muted/20 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-muted-foreground">Total Items:</span>
          <span className="font-semibold">4</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-muted-foreground">Total Cost:</span>
          <span className="font-semibold">$123</span>
        </div>
        <Button size="lg" className="w-full">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Page;
