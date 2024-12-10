"use client";

import { useLoader } from "@/app/_components/contexts/LoaderContext.tsx/LoaderContext";
import { productsPerPage } from "@/helpers/helpers";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export const ProductsPagination = ({
  allProducts,
}: {
  allProducts: number;
}) => {
  const [page, setPage] = useQueryState("page");

  const { startTransition } = useLoader();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between space-x-4 mt-6">
      <button
        className="p-2 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
        disabled={!page || page === "1"}
        onClick={() => {
          startTransition(async () => {
            await setPage(String(Number(page) - 1));
            router.refresh();
          });
        }}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        className="p-2 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
        disabled={
          page && Number(page) * productsPerPage > allProducts ? true : false
        }
        onClick={() => {
          startTransition(async () => {
            await setPage(!page ? "2" : String(Number(page) + 1));
            router.refresh();
          });
        }}
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
