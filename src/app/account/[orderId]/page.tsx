import { OrderDetail } from "@/app/_components/OrderDetail";
import { Badge } from "@/app/_components/ui/badge";
import { Separator } from "@/app/_components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { SVGProps } from "react";

// https://v0.dev/r/m1fFuMxpk1b
const Page = ({ params }: { params: { orderId: string } }) => {
  return (
    <div className="container mx-auto px-3 md:px-6 py-8">
      <OrderDetail orderId={params.orderId} />
    </div>
  );
};

export default Page;
