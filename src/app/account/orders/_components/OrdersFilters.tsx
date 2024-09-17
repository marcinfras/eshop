"use client";

import { useQueryState } from "nuqs";
import { Button } from "@/app/_components/ui/button";
import { OrderStatus } from "../../../../../lib/hygraph/generated/graphql";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoader } from "@/app/_components/contexts/LoaderContext.tsx/LoaderContext";

type FilterOptionsType = [
  {
    hygraphStatus: "ALL";
    displayed: "All";
  },
  {
    hygraphStatus: OrderStatus.New;
    displayed: "New";
  },
  {
    hygraphStatus: OrderStatus.Paid;
    displayed: "Paid";
  },
  {
    hygraphStatus: OrderStatus.Recived;
    displayed: "Recived";
  },
  {
    hygraphStatus: OrderStatus.Send;
    displayed: "Send";
  },
  {
    hygraphStatus: OrderStatus.InProgress;
    displayed: "In progress";
  }
];

const filterOptions: FilterOptionsType = [
  {
    hygraphStatus: "ALL",
    displayed: "All",
  },
  {
    hygraphStatus: OrderStatus.New,
    displayed: "New",
  },
  {
    hygraphStatus: OrderStatus.Paid,
    displayed: "Paid",
  },
  {
    hygraphStatus: OrderStatus.Recived,
    displayed: "Recived",
  },
  {
    hygraphStatus: OrderStatus.Send,
    displayed: "Send",
  },
  {
    hygraphStatus: OrderStatus.InProgress,
    displayed: "In progress",
  },
];

export const OrdersFilters = () => {
  const [filter, setFilter] = useQueryState("filter");
  const [sortBy, setSortBy] = useQueryState("sortBy");
  const [sortDirection, setSortDirection] = useQueryState("sortDirection");

  const { startTransition } = useLoader();

  console.log(filter);
  //   const searchParams = useSearchParams();

  const router = useRouter();

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
        {filterOptions.map((option) => (
          <Button
            key={option.hygraphStatus}
            variant={
              !filter && option.displayed === "All"
                ? "outline"
                : filter === option.hygraphStatus
                ? "outline"
                : "default"
            }
            onClick={() => {
              startTransition(async () => {
                await setFilter(option.hygraphStatus);
                router.refresh();
              });
            }}
          >
            {option.displayed}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="sort">Sort by:</Label>
        <Select
          value={sortBy || "DATE"}
          onValueChange={(e) => {
            startTransition(async () => {
              await setSortBy(e);
              router.refresh();
            });
          }}
        >
          <SelectTrigger className="w-40 sm:w-auto">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DATE">Date</SelectItem>
            <SelectItem value="TOTAL">Total</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className={sortDirection === "ASC" ? "bg-stone-100" : ""}
          onClick={() => {
            startTransition(async () => {
              await setSortDirection(
                !sortDirection
                  ? "ASC"
                  : sortDirection === "ASC"
                  ? "DESC"
                  : "ASC"
              );
              router.refresh();
            });
          }}
          variant="outline"
          size="icon"
        >
          <ArrowUpDown className="w-4" />

          <span className="sr-only">Sort direction</span>
        </Button>
      </div>
    </>
  );
};
