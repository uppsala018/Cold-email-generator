export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

export async function POST(req: Request) {
  try {
    const { text, tone } = await req.json();

    if (!text || typeof text !== "string") {
      return Response.json(
        { error: "Missing text" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    let instruction = "Rewrite this email in clear, natural, professional English.";

    if (tone === "friendly") {
      instruction = "Rewrite this email in clear, natural, friendly English.";
    } else if (tone === "warm") {
      instruction = "Rewrite this email in warm, natural, polite English.";
    } else if (tone === "shorter") {
      instruction = "Rewrite this email to be shorter, clear, natural, and professional.";
    } else if (tone === "correct-only") {
      instruction =
        "Correct the grammar and language of this email, but keep the meaning and structure as close to the original as possible.";
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5",
        input: [
          { role: "system", content: instruction },
          { role: "user", content: text }
        ]
      })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OpenAI API error:", data);
      return Response.json(
        { error: "OpenAI request failed", details: data },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    const rewritten =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "";

    return Response.json(
      { rewritten },
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  } catch (error) {
    console.error("Rewrite API error:", error);
    return Response.json(
      { error: "Server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}