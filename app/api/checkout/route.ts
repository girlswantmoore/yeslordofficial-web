import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const cart = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: cart.map((item: any) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          description: `${item.color} / ${item.size}`,
          images: [`${process.env.NEXT_PUBLIC_SITE_URL}${item.image}`],
        },
      },
    })),

    shipping_address_collection: {
      allowed_countries: ["US"],
    },

    phone_number_collection: {
      enabled: true,
    },

    automatic_tax: {
      enabled: true,
    },

    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 799,
            currency: "usd",
          },
          display_name: "Standard Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 3,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1499,
            currency: "usd",
          },
          display_name: "Express Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 3,
            },
          },
        },
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}