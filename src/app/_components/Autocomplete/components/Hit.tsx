import { Highlight } from "react-instantsearch";
import type { Hit as HitType } from "instantsearch.js";
import Image from "next/image";
import Link from "next/link";

export type ProductAlgolia = {
  categories: { name: string }[];
  description: string;
  images: { url: string }[];
  name: string;
  slug: string;
};

type HitProps = {
  hit: HitType<ProductAlgolia>;
};
export const Hit = ({ hit }: HitProps) => {
  return (
    <Link href={`/products/${hit.slug}`} className="cursor-pointer">
      <article className="w-full h-full p-4 flex items-center gap-3">
        <div className="w-[70px]  sm:w-[100px]">
          <Image
            alt={hit.name}
            className="max-h-[100px] w-auto m-auto"
            src={hit.images[0].url}
            width={800}
            height={800}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="hit-name font-medium">
            <Highlight attribute="name" hit={hit} />
          </div>
          <div className="hit-description text-sm">
            <Highlight attribute={["description"]} hit={hit} />
          </div>
        </div>
      </article>
    </Link>
  );
};
