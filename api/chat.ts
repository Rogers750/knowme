export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return json({ error: "API key not configured" }, 500);
  }

  try {
    const body = await req.json();
    const upstream = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      }
    );
    const data = await upstream.json();
    return json(data, upstream.status);
  } catch {
    return json({ error: "Failed to reach DeepSeek" }, 500);
  }
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
