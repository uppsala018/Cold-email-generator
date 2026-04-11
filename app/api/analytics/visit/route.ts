import { NextResponse } from "next/server";
import { z } from "zod";
import { trackSiteVisit } from "@/lib/analytics";

const visitSchema = z.object({
  visitorId: z.string().min(8).max(120),
  path: z.string().min(1).max(200)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = visitSchema.parse(body);

    await trackSiteVisit(input.visitorId, input.path);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid visit payload." }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to track visit." }, { status: 500 });
  }
}
