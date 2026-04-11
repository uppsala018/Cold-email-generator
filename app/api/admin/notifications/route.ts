import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/billing";
import { createAdminNotification } from "@/lib/notifications";

const notificationSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1).max(120),
  message: z.string().min(1).max(2000)
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user || !isAdminUser(user)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const body = await request.json();
    const input = notificationSchema.parse(body);
    const notification = await createAdminNotification({
      userId: input.userId,
      title: input.title.trim(),
      message: input.message.trim(),
      createdByEmail: user.email || "admin"
    });

    return NextResponse.json({ notification }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Add a recipient, title, and message before sending." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to send the private notification."
      },
      { status: 500 }
    );
  }
}
