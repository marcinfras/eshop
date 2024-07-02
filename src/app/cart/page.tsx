import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import Image from "next/image";
import { useCart } from "../_components/contexts/CartContext/CartContext";
import { CartItem } from "../_components/CartItem";
import { CartView } from "../_components/CartView";

const Page = () => {
  const cart = [
    {
      images: [
        {
          url: "https://media.graphassets.com/GwlxIi81SWvHXA8qsSC6",
        },
      ],
      id: "1",
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
      id: "2",
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
      id: "3",
      name: "Unisex Zip Hoodie",
      price: 3999,
      slug: "unisex-zip-hoodie",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <CartView />
    </div>
  );
};

export default Page;
