// API route server-side: recibe un prompt y lo mejora con OpenAI.
// La OPENAI_API_KEY vive SOLO en el servidor (variable de entorno en Vercel),
// nunca llega al navegador.

export const runtime = "nodejs";

const SYSTEM_PROMPT =
  "Eres un experto en prompt engineering. El usuario envía un prompt en español. Mejóralo haciéndolo más claro, específico y efectivo, y da exactamente 3 variantes distintas. Responde EXACTAMENTE en este formato de texto plano, sin markdown, sin comillas envolventes:\n===MEJORADO===\n(el prompt mejorado)\n===VARIANTE1===\n(variante 1)\n===VARIANTE2===\n(variante 2)\n===VARIANTE3===\n(variante 3)";

export async function POST(req: Request) {
  let input = "";
  try {
    const body = await req.json();
    input = (body?.input || "").toString().trim();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if (input.length < 5) {
    return Response.json({ error: "Escribe un prompt un poco más largo." }, { status: 400 });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return Response.json(
      { error: "Falta OPENAI_API_KEY en el servidor. Configúrala en Vercel (Settings → Environment Variables)." },
      { status: 500 },
    );
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        max_tokens: 1200,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: "Mejora este prompt: " + input },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return Response.json(
        { error: `OpenAI respondió ${res.status}. ${detail.slice(0, 160)}` },
        { status: 502 },
      );
    }

    const data = await res.json();
    const txt = String(data?.choices?.[0]?.message?.content || "")
      .replace(/```[a-z]*|```/g, "")
      .trim();

    const parts = txt.split(
      /===\s*MEJORADO\s*===|===\s*VARIANTE\s*1\s*===|===\s*VARIANTE\s*2\s*===|===\s*VARIANTE\s*3\s*===/i,
    );
    const improved = (parts[1] || "").trim();
    const variants = [parts[2], parts[3], parts[4]]
      .filter((x) => x && x.trim())
      .map((x) => x.trim());

    return Response.json({ improved: improved || txt, variants });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "No se pudo mejorar el prompt." },
      { status: 500 },
    );
  }
}
