import type { UseHitsProps } from "react-instantsearch";
import { Hit } from "./Hit";
import type { ProductAlgolia } from "./Hit";

import { useHits } from "react-instantsearch";

export const CustomHits = (props: UseHitsProps<ProductAlgolia>) => {
  const { items, results } = useHits(props);

  if (!results?.__isArtificial && results?.nbHits === 0) {
    return (
      <div className="bg-white text-center py-6">
        <p>No matching results were found.</p>
      </div>
    );
  }

  return (
    <ol className="max-h-[calc(100vh-100px)] overflow-y-auto">
      {items.map((hit) => (
        <li
          key={hit.objectID}
          className="bg-white hover:bg-stone-50 transition  border-b-2 border-stone-50 h-[150px]"
        >
          <Hit hit={hit} />
        </li>
      ))}
    </ol>
  );
};
