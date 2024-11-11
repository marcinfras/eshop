import { liteClient as algoliasearch } from "algoliasearch/lite";
import { getEnv } from "@/app/utils/utils";
import { InstantSearch, Configure, PoweredBy } from "react-instantsearch";
import { X } from "lucide-react";

import { SearchBox } from "./SearchBox";
import { createPortal } from "react-dom";
import { CustomHits } from "./CustomHits";

const searchClient = algoliasearch(
  getEnv(process.env.NEXT_PUBLIC_ALGOLIA_ID),
  getEnv(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY)
);

export const SearchModal = ({
  isOpen,
  handleCloseModal,
}: {
  isOpen: boolean;
  handleCloseModal: () => void;
}) => {
  const refModal = document.getElementById("searchModal");

  if (!refModal) return null;

  return createPortal(
    <dialog
      open={isOpen}
      className="transition-all fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
      onClick={handleCloseModal}
    >
      <InstantSearch searchClient={searchClient} indexName="products">
        <Configure hitsPerPage={5} />
        <div className="max-w-[960px] w-full block mx-auto my-0 ">
          <div className="relative flex justify-center items-center h-[100px] px-3 gap-2 bg-white border-b-2 border-stone-300">
            <X
              className="text-stone-800 h-5 w-5 cursor-pointer"
              onClick={handleCloseModal}
            />
            <SearchBox handleCloseModal={handleCloseModal} />
            <PoweredBy className="absolute bottom-1 right-1 text-xs" />
          </div>
          <CustomHits />
        </div>
      </InstantSearch>
    </dialog>,
    refModal
  );
};
