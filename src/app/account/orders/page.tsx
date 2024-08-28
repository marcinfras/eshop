// https://v0.dev/r/1fLhZtmpPLK

import { OrdersList } from "@/app/_components/OrdersList";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { SVGProps } from "react";

const Page = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 sm:px-2 max-w-[800px]">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <OrdersList />
    </div>
  );
};

export default Page;
