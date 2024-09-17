import Link from "next/link";
import { Separator } from "../_components/ui/separator";
import { SVGProps } from "react";
import { fetchOrderByStripeCheckoutId } from "../../../lib/actions/fetchOrder";
import { toast } from "../_components/ui/use-toast";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/helpers/helpers";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const sessionId = searchParams["session_id"];

  console.log("sessionIddddddd: " + sessionId);

  if (!sessionId || Array.isArray(sessionId))
    throw new Error("Failed to get order");

  const order = await fetchOrderByStripeCheckoutId(sessionId);

  if ("error" in order) {
    throw new Error("Failed to get order");
  }

  return (
    <div className="flex flex-col bg-background">
      <main className="container flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-green-500 p-4 text-green-50">
            <CircleCheckIcon className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Payment Successful
          </h1>
          <p className="max-w-md text-muted-foreground">
            Thank you for your purchase! Your order is being processed and will
            be shipped soon.
          </p>
        </div>
        <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <Separator className="my-4" />
          <div className="grid gap-4">
            {order.orderItems.map((item) => (
              <div
                key={item.product?.name}
                className="grid grid-cols-[1fr_auto] items-center gap-2"
              >
                <div>
                  <h3 className="text-sm font-medium">{item.product?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">{formatCurrency(item.total)}</div>
              </div>
            ))}

            {/* <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <div>
                <h3 className="text-sm font-medium">Aqua Filters</h3>
                <p className="text-sm text-muted-foreground">Quantity: 3</p>
              </div>
              <div className="text-right">$49.00</div>
            </div> */}
            <Separator className="my-4" />
            <div className="grid grid-cols-[1fr_auto] items-center gap-2 font-medium">
              <div>Total</div>
              <div className="text-right">{formatCurrency(order.total)}</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end gap-2">
            <Link
              href="/"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Continue Shopping
            </Link>
            <Link
              href="/account/orders"
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              View Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;

function CircleCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
