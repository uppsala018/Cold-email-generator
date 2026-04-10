# Cold Email Generator

Production-ready SaaS starter built with Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth, Stripe Checkout, and the OpenAI API.

## Features

- Modern landing page with hero, benefits, use cases, FAQ, pricing, and footer
- Supabase email/password signup and login
- Middleware-protected dashboard route
- Stripe Checkout flow for a single monthly subscription
- Paywall state for unsubscribed users
- Server-side OpenAI generation route that returns 1 cold email and 2 subject lines
- Placeholder usage tracking ready for future monthly limits
- Vercel-friendly environment configuration

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Stripe Checkout
- OpenAI API

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.local.example .env.local
```

3. Fill in the values in `.env.local`:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

4. Run the development server:

```bash
npm run dev
```

5. Open `http://localhost:3000`

## Supabase Setup

1. Create a Supabase project.
2. Enable email/password auth in `Authentication > Providers`.
3. Copy your project URL and anon key into `.env.local`.
4. For production, configure your site URL and redirect URLs in Supabase auth settings.

## Stripe Setup

1. Create a product named `Cold Email Generator Pro`.
2. Create one recurring monthly price for that product.
3. Copy the Stripe price ID into `STRIPE_PRICE_ID`.
4. Add a webhook endpoint for `/api/stripe/webhook`.
5. Subscribe the webhook to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## Subscription State

This starter checks subscription status from Supabase user metadata:

- `app_metadata.subscription_status`
- `user_metadata.subscription_status`

Accepted active states:

- `active`
- `trialing`

In production, update this state from the Stripe webhook and store a canonical record in a `subscriptions` table. The webhook route already contains the placeholder handler for that wiring.

For local UI testing, set:

```env
NEXT_PUBLIC_ENABLE_TEST_SUBSCRIPTION=true
```

## OpenAI Setup

The generator only calls OpenAI from the server route at `app/api/generate/route.ts`. The API key is never exposed to the client.

The route:

- validates input
- checks auth
- checks subscription access
- checks placeholder usage limits
- generates 2 subject lines and 1 cold email

## Suggested Next Production Improvements

- Persist users, subscriptions, and usage in Supabase tables
- Add billing portal support
- Add resend or postmark emails for onboarding
- Add audit logging and analytics
- Expand prompt/version management
- Add E2E and integration tests

## Deploying To Vercel

1. Push the project to GitHub.
2. Import it into Vercel.
3. Add all environment variables in the Vercel project settings.
4. Set your Stripe success URL and webhook URL to the deployed domain.
5. Update `NEXT_PUBLIC_APP_URL` to the production URL.

## Project Structure

```text
app/
  api/
    checkout/
    generate/
    stripe/webhook/
  dashboard/
  login/
  pricing/
  signup/
components/
  dashboard/
  landing/
lib/
  supabase/
types/
```
