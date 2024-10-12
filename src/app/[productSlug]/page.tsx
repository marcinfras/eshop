import Image from "next/image";
import { getProductBySlug, isProductInCartHygraph } from "../../../lib/graphql";
import { Separator } from "../_components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar";
import type { SVGProps } from "react";
import { formatCurrency } from "../../helpers/helpers";
import { AddToCartForm } from "./_components/AddToCartForm";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { UpdateItemQuantity } from "../_components/UpdateItemQuantity";

const Page = async ({ params }: { params: { productSlug: string } }) => {
  const product = await getProductBySlug(params.productSlug);
  const session = await getServerSession();

  const isProductInCart = await isProductInCartHygraph({
    cartId: cookies().get("cart")?.value,
    slug: params.productSlug,
  });

  if (isProductInCart !== null && "error" in isProductInCart) {
    throw new Error("Something went wrong");
  }

  const { name, price, description, images } = product;

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      {/* {JSON.stringify(product, null, 2)} */}
      <div className="grid gap-4 md:gap-8 justify-center">
        <div className="grid gap-4 w-[70vw] md:w-full">
          <Image
            src={images}
            alt="Product Image"
            width={600}
            height={900}
            className="aspect-[3/3] object-contain border w-full rounded-lg overflow-hidden"
          />
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">{name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
          </div>

          <div className="text-4xl font-bold">{formatCurrency(price)}</div>
        </div>
        {/* <div className="grid gap-4 md:gap-10"> */}
        {isProductInCart ? (
          <UpdateItemQuantity
            id={isProductInCart.id}
            currentQuantity={isProductInCart.quantity}
          />
        ) : (
          <AddToCartForm
            slug={params.productSlug}
            email={session?.user?.email}
          />
        )}

        {/* </div> */}
        <Separator />
        <div className="grid gap-4 text-sm leading-loose">
          <h2 className="font-bold text-lg">Product Details</h2>

          <p>{description}</p>
        </div>
        <Separator />
        <div className="grid gap-4 text-sm leading-loose">
          <h2 className="font-bold text-lg">Customer Reviews</h2>
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 border">
              {/* <AvatarImage src="/placeholder-user.jpg" /> */}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-4">
              <div className="flex gap-4 items-start">
                <div className="grid gap-0.5 text-sm">
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <time className="text-sm text-muted-foreground">
                    2 days ago
                  </time>
                </div>
                <div className="flex items-center gap-0.5 ml-auto">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <div className="text-sm leading-loose text-muted-foreground">
                <p>
                  I&apos;ve been experimenting with my Acme Prism T-Shirt for a
                  few weeks now, and it&apos;s been a versatile addition to my
                  wardrobe. It&apos;s great for both casual and more dressed-up
                  occasions.
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-4">
              <div className="flex gap-4 items-start">
                <div className="grid gap-0.5 text-sm">
                  <h3 className="font-semibold">Alex Smith</h3>
                  <time className="text-sm text-muted-foreground">
                    3 weeks ago
                  </time>
                </div>
                <div className="flex items-center gap-0.5 ml-auto">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <div className="text-sm leading-loose text-muted-foreground">
                <p>
                  I recently purchased the Acme Prism T-Shirt, and it has been a
                  great addition to my wardrobe. The quality is excellent, and
                  the fit is true to size. I&apos;ve received a lot of
                  compliments on the unique design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function StarIcon(props: SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default Page;
