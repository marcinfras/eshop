import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import type { NextRequest} from "next/server";
import { getEnv } from "@/app/utils/utils";

import { createOrderHygraph } from "../../../../lib/graphql";
import { OrderStatus } from "../../../../lib/hygraph/generated/graphql";


const stripeKey = getEnv(process.env.STRIPE_KEY);

const handler = async (req: NextRequest) => {
  const payload = await req.text();

  const sig = req.headers.get("stripe-signature");
  if (!sig) throw new Error("Signature is not a string");

  try {
    const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      getEnv(process.env.STRIPE_WEBHOOK)
    );
    eventStripeWebhook(event);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: `Webhook error: ${error.message}`,
        status: 400,
      });
    }
  }

  return NextResponse.json({
    status: 200,
  });
};

const eventStripeWebhook = async (event: Stripe.Event) => {
  const type = event.type;

  switch (type) {
    // case "charge.succeeded":
    case "checkout.session.completed":
      const { id, metadata, customer, customer_email } = event.data.object;
      console.log({
        id,
        metadata,
        customer,
        customer_email,
      });

      if (metadata) {
        const items = JSON.parse(metadata.items) as {
          slug: string;
          quantity: number;
          price: number;
        }[];

        const orderItems = items.map((item) => ({
          quantity: item.quantity,
          total: item.quantity * item.price,
          slug: item.slug,
        }));

        const total = orderItems.reduce((acc, cur) => cur.total + acc, 0);

        const orderId = await createOrderHygraph({
          email: metadata.email,
          total,
          orderItems,
          stripeCheckoutId: id,
          currentStatus: OrderStatus.Paid,
        });

        console.log("Orderiddddddddddddddd: " + orderId);
      }

      return;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

export { handler as POST };
