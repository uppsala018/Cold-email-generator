import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripeClient } from "@/lib/stripe";
import { getBaseUrl } from "@/lib/utils";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!process.env.STRIPE_PRICE_ID) {
      return NextResponse.json(
        { error: "Missing STRIPE_PRICE_ID. Update your environment variables." },
        { status: 500 }
      );
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1
        }
      ],
      customer_email: user.email,
      success_url: `${getBaseUrl()}/dashboard?checkout=success`,
      cancel_url: `${getBaseUrl()}/dashboard?checkout=cancelled`,
      metadata: {
        userId: user.id,
        email: user.email || ""
      }
    });

    if (!session.url) {
      throw new Error("Stripe checkout session did not include a redirect URL.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to create Stripe checkout session."
      },
      { status: 500 }
    );
  }
}
