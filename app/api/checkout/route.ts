import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const cart = await request.json();

  const subtotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const shippingOptions =
    subtotal >= 100
      ? [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day" as const,
                  value: 3,
                },
                maximum: {
                  unit: "business_day" as const,
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: {
                amount: 1499,
                currency: "usd",
              },
              display_name: "Express Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day" as const,
                  value: 1,
                },
                maximum: {
                  unit: "business_day" as const,
                  value: 3,
                },
              },
            },
          },
        ]
      : [
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: {
                amount: 799,
                currency: "usd",
              },
              display_name: "Standard Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day" as const,
                  value: 3,
                },
                maximum: {
                  unit: "business_day" as const,
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount" as const,
              fixed_amount: {
                amount: 1499,
                currency: "usd",
              },
              display_name: "Express Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day" as const,
                  value: 1,
                },
                maximum: {
                  unit: "business_day" as const,
                  value: 3,
                },
              },
            },
          },
        ];

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

    shipping_options: shippingOptions,

    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}