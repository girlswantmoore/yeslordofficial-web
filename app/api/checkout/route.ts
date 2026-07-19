import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "../../../data/products";
import { getSalePriceCents } from "../../../lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const cart = await request.json();

  if (!Array.isArray(cart) || cart.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  let checkoutItems;

  try {
    checkoutItems = cart.map((item: unknown) => {
      const cartItem = item as {
        slug?: string;
        color?: string;
        size?: string;
        quantity?: number;
      };
      const product = products.find(
        (candidate) => candidate.slug === cartItem.slug
      );
      const color = product?.colors.find(
        (candidate) => candidate.name === cartItem.color
      );
      const quantity = Number(cartItem.quantity);

      if (
        !product ||
        !color ||
        !cartItem.size ||
        !product.sizes.includes(cartItem.size) ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        throw new Error("INVALID_CART_ITEM");
      }

      return { product, color, size: cartItem.size, quantity };
    });
  } catch {
    return NextResponse.json(
      { error: "Your cart contains an invalid item." },
      { status: 400 }
    );
  }

  const subtotalCents = checkoutItems.reduce(
    (sum, item) =>
      sum + getSalePriceCents(item.product.price) * item.quantity,
    0
  );

  const shippingOptions =
    subtotalCents >= 10000
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

    line_items: checkoutItems.map(({ product, color, size, quantity }) => ({
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: getSalePriceCents(product.price),
        product_data: {
          name: product.name,
          description: `${color.name} / ${size}`,
          images: [`${process.env.NEXT_PUBLIC_SITE_URL}${color.front}`],
          metadata: {
            product_slug: product.slug,
            color: color.name,
            size,
          },
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
