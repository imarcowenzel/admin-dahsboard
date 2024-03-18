import { NextResponse } from "next/server";
import Stripe from "stripe";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { Product } from "@prisma/client";

interface Item {
  product: Product;
  quantity: number;
  selectedSize: string | null;
}

// CORS headers for allowing cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handling OPTIONS requests for CORS preflight checks
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { items } = await req.json();

  if (!items || items.length === 0) {
    return new NextResponse("Items are required", { status: 400 });
  }

  const productIds = items.map((item: Item) => item.product.id);

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // Iterate through products and add them to line_items
  products.forEach((product) => {
    const quantity = items.find(
      (item: Item) => item.product.id === product.id
    ).quantity;

    line_items.push({
      quantity: quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.totalPrice.toNumber() * 100,
      },
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  // Create a new checkout session with Stripe
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  // Return the checkout session URL in the response
  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
