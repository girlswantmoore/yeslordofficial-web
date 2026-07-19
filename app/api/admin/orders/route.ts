import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const excludedOrders = [
  "cs_live_a12IqJ1BmCRhGMhd3BnMVYe47jyyaV5WdT6XF59vIbAWvdJnVSSyjuTqDc",
  "cs_live_b1bsOCyCPTy5CN3BZLsygzw2FzaaxmizLNox7wVdzRITGE2YZm2PfBZEem",
];

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessions = await stripe.checkout.sessions.list({
    limit: 25,
    expand: ["data.customer_details", "data.shipping_cost"],
  });

  const paidSessions = sessions.data.filter(
    (session) =>
      !excludedOrders.includes(session.id) && session.payment_status === "paid"
  );

  const orders = await Promise.all(
    paidSessions.map(async (session) => {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100, expand: ["data.price.product"] }
      );

      return {
        id: session.id,
        created: session.created,
        amountTotal: session.amount_total,
        currency: session.currency,
        paymentStatus: session.payment_status,
        customer: session.customer_details,
        shipping: session.collected_information?.shipping_details,
        shippingCost: session.shipping_cost,
        items: lineItems.data.map((item) => {
          const stripeProduct =
            item.price?.product && typeof item.price.product !== "string"
              ? item.price.product
              : null;
          const metadata =
            stripeProduct && !stripeProduct.deleted
              ? stripeProduct.metadata
              : {};
          const legacyVariant =
            stripeProduct && !stripeProduct.deleted
              ? stripeProduct.description
              : null;
          const [legacyColor, legacySize] = legacyVariant?.includes(" / ")
            ? legacyVariant.split(" / ", 2)
            : [];

          return {
            name: item.description,
            quantity: item.quantity,
            amount: item.amount_total,
            color: metadata.color || legacyColor || null,
            size: metadata.size || legacySize || null,
          };
        }),
      };
    })
  );

  return NextResponse.json({ orders });
}
