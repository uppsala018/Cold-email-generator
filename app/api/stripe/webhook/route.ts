import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing Stripe webhook configuration." },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "checkout.session.completed":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionEvent(event);
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Invalid webhook event."
      },
      { status: 400 }
    );
  }
}

async function handleSubscriptionEvent(event: Stripe.Event) {
  void event;

  // Placeholder:
  // 1. Read `userId` from checkout session metadata or map the Stripe customer to a user.
  // 2. Persist subscription status in Supabase, ideally in a `subscriptions` table.
  // 3. Optionally mirror a lightweight `subscription_status` value into user metadata for fast checks.
}
