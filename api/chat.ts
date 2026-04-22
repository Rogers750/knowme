import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  console.log(`[api/chat] ${req.method} — start`);

  if (req.method !== "POST") {
    console.log(`[api/chat] rejected: method=${req.method}`);
    res.statusCode = 405;
    res.end("Method not allowed");
    return;
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  console.log(`[api/chat] DEEPSEEK_API_KEY present=${Boolean(apiKey)}, length=${apiKey?.length ?? 0}`);

  if (!apiKey) {
    console.error("[api/chat] ERROR: DEEPSEEK_API_KEY is not set");
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "API key not configured" }));
    return;
  }

  let body: unknown;
  try {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(Buffer.from(chunk as ArrayBuffer));
    }
    const raw = Buffer.concat(chunks).toString();
    console.log(`[api/chat] body length=${raw.length}`);
    body = JSON.parse(raw);
  } catch (err) {
    console.error("[api/chat] ERROR: failed to parse request body", err);
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Invalid request body" }));
    return;
  }

  try {
    console.log("[api/chat] calling DeepSeek...");
    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    console.log(`[api/chat] DeepSeek responded: status=${upstream.status}`);

    const data = await upstream.json();

    if (!upstream.ok) {
      console.error(`[api/chat] DeepSeek error response:`, JSON.stringify(data));
    }

    res.statusCode = upstream.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error("[api/chat] ERROR: fetch to DeepSeek failed", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Failed to reach DeepSeek", detail: String(err) }));
  }
}
