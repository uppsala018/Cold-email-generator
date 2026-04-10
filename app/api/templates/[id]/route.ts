import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserTemplates } from "@/lib/templates";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { error } = await supabase
      .from("saved_templates")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      throw error;
    }

    const templates = await getUserTemplates(user.id);
    return NextResponse.json({ templates });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to delete the template right now."
      },
      { status: 500 }
    );
  }
}
