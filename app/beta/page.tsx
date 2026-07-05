"use client";

import { useRef, useState, type CSSProperties } from "react";
import "./beta.css";

/* ---------------- Datos ---------------- */
type Badge = "free" | "paid" | "freemium";
type Tool = {
  name: string;
  short: string;
  desc: string;
  cats: string[];
  badge: Badge;
  rating: string;
  url: string;
};

const DOMAINS: Record<string, string> = {
  ChatGPT: "openai.com",
  Midjourney: "midjourney.com",
  Cursor: "cursor.com",
  Runway: "runwayml.com",
  ElevenLabs: "elevenlabs.io",
  "Notion AI": "notion.so",
  Claude: "claude.ai",
  "Stable Diffusion": "stability.ai",
  Perplexity: "perplexity.ai",
  Descript: "descript.com",
  Replit: "replit.com",
  Gamma: "gamma.app",
};

const TOOLS: Tool[] = [
  { name: "ChatGPT", short: "Asistente IA más usado", desc: "El asistente de IA más usado del mundo. Chat, análisis, código y mucho más.", cats: ["escritura", "codigo", "productividad"], badge: "freemium", rating: "9.4", url: "https://chat.openai.com" },
  { name: "Claude", short: "Razonamiento y código", desc: "Asistente IA de Anthropic. Análisis largo, código y razonamiento avanzado.", cats: ["escritura", "codigo", "productividad"], badge: "freemium", rating: "9.5", url: "https://claude.ai" },
  { name: "Midjourney", short: "Imágenes de alta calidad", desc: "Generación de imágenes de alta calidad con prompts en lenguaje natural.", cats: ["imagen"], badge: "paid", rating: "9.6", url: "https://midjourney.com" },
  { name: "Cursor", short: "Editor con IA integrada", desc: "Editor de código con IA integrada. Refactoriza, explica y genera código.", cats: ["codigo"], badge: "freemium", rating: "9.2", url: "https://cursor.com" },
  { name: "Perplexity", short: "Búsqueda con fuentes", desc: "Motor de búsqueda con IA. Respuestas con fuentes verificadas en tiempo real.", cats: ["productividad", "escritura"], badge: "freemium", rating: "9.0", url: "https://perplexity.ai" },
  { name: "Runway", short: "Video con IA", desc: "Generación y edición de video con IA. Text-to-video y video-to-video.", cats: ["video", "imagen"], badge: "paid", rating: "8.8", url: "https://runwayml.com" },
  { name: "ElevenLabs", short: "Voz hiperrealista", desc: "Clonación de voz y texto a audio hiperrealista en múltiples idiomas.", cats: ["audio"], badge: "freemium", rating: "9.1", url: "https://elevenlabs.io" },
  { name: "Notion AI", short: "IA en tu workspace", desc: "IA integrada en tu workspace. Resume, escribe y organiza documentos.", cats: ["escritura", "productividad"], badge: "paid", rating: "8.5", url: "https://notion.so" },
  { name: "Stable Diffusion", short: "Imágenes open-source", desc: "Modelo open-source de generación de imágenes. Corre local o en la nube.", cats: ["imagen"], badge: "free", rating: "8.7", url: "https://stability.ai" },
  { name: "Descript", short: "Edita audio como texto", desc: "Edición de audio y video editando el texto transcrito. Muy intuitivo.", cats: ["audio", "video"], badge: "freemium", rating: "8.6", url: "https://descript.com" },
  { name: "Replit", short: "IDE con agente IA", desc: "IDE en el browser con agente IA que escribe y despliega tu app.", cats: ["codigo"], badge: "freemium", rating: "8.9", url: "https://replit.com" },
  { name: "Gamma", short: "Slides desde un prompt", desc: "Genera presentaciones, documentos y páginas web desde un prompt.", cats: ["escritura", "productividad"], badge: "freemium", rating: "8.4", url: "https://gamma.app" },
];

const PROMPTS = [
  { tag: "Escritura", title: "Reescribir para LinkedIn", preview: "Reescribe el siguiente texto para LinkedIn. Tono profesional pero cercano, sin gerundios, máximo 3 párrafos. Añade un gancho inicial y un cierre con llamado a la acción. Texto: [PEGA AQUÍ]", saves: "1.2k" },
  { tag: "Código", title: "Revisar y optimizar función", preview: "Eres un senior developer. Revisa esta función: [PEGA CÓDIGO]. Identifica bugs, mejora la legibilidad y sugiere optimizaciones con ejemplos.", saves: "987" },
  { tag: "Marketing", title: "Copy para anuncio Meta Ads", preview: "Escribe 3 versiones de copy para un anuncio de Facebook/Instagram. Producto: [PRODUCTO]. Audiencia: [AUDIENCIA]. Objetivo: conversiones. Incluye titular y CTA.", saves: "2.1k" },
  { tag: "Productividad", title: "Resumir reunión larga", preview: "Resume la siguiente transcripción de reunión en: 3 puntos clave, decisiones tomadas, próximos pasos con responsables y fechas. Transcripción: [PEGA AQUÍ]", saves: "756" },
  { tag: "IA / Prompts", title: "Crear sistema de instrucciones", preview: "Actúa como experto en prompt engineering. Crea un system prompt completo para un agente IA que ayude a [TAREA]. Incluye rol, restricciones y formato de salida.", saves: "3.4k" },
  { tag: "Análisis", title: "Analizar datos de ventas", preview: "Analiza los siguientes datos de ventas y dame: tendencias principales, outliers, comparativa con el periodo anterior y 3 recomendaciones accionables. Datos: [PEGA AQUÍ]", saves: "642" },
];

const CAT_DEFS: [string, string][] = [
  ["all", "Todas"], ["escritura", "Escritura"], ["imagen", "Imagen"],
  ["codigo", "Código"], ["video", "Video"], ["audio", "Audio"], ["productividad", "Productividad"],
];

const SYSTEM_PROMPT =
  "Eres un experto en prompt engineering. El usuario envía un prompt en español. Mejóralo haciéndolo más claro, específico y efectivo, y da exactamente 3 variantes distintas. Responde EXACTAMENTE en este formato de texto plano, sin markdown, sin comillas envolventes:\n===MEJORADO===\n(el prompt mejorado)\n===VARIANTE1===\n(variante 1)\n===VARIANTE2===\n(variante 2)\n===VARIANTE3===\n(variante 3)";

/* ---------------- Helpers de estilo ---------------- */
function badgeStyle(b: Badge): CSSProperties {
  const base: CSSProperties = { fontSize: ".6rem", fontWeight: 700, padding: "2px 8px", borderRadius: 5, letterSpacing: ".04em", textTransform: "uppercase" };
  if (b === "free") return { ...base, color: "#4ade80", background: "rgba(74,222,128,.12)", border: "1px solid rgba(74,222,128,.28)" };
  if (b === "paid") return { ...base, color: "#fbbf24", background: "rgba(251,191,36,.12)", border: "1px solid rgba(251,191,36,.28)" };
  return { ...base, color: "#a78bfa", background: "rgba(167,139,250,.12)", border: "1px solid rgba(167,139,250,.28)" };
}
const badgeLabel = (b: Badge) => (b === "free" ? "Gratis" : b === "paid" ? "Pago" : "Freemium");

function ToolLogo({ name }: { name: string }) {
  const dom = DOMAINS[name];
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`https://icons.duckduckgo.com/ip3/${dom}.ico`} alt={name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
}

/* ---------------- Componente ---------------- */
export default function Beta() {
  const improverRef = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState("all");
  const [ptInput, setPtInput] = useState("");
  const [ptLoading, setPtLoading] = useState(false);
  const [ptResult, setPtResult] = useState("");
  const [ptVariants, setPtVariants] = useState<string[]>([]);
  const [ptError, setPtError] = useState("");
  const [email, setEmail] = useState("");
  const [signupNote, setSignupNote] = useState("Sin tarjeta. Sin spam. Acceso inmediato.");
  const [signupErr, setSignupErr] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function toast(msg: string) {
    setToastMsg(msg);
    setToastShow(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 2800);
  }

  async function improve() {
    const input = ptInput.trim();
    if (input.length < 5) {
      setPtError("Escribe un prompt un poco más largo.");
      setPtResult(""); setPtVariants([]);
      return;
    }
    const key = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
    if (!key) {
      setPtError("Falta la API key. Agrega NEXT_PUBLIC_ANTHROPIC_API_KEY en .env.local y reinicia el servidor (npm run dev).");
      return;
    }
    setPtLoading(true); setPtError(""); setPtResult(""); setPtVariants([]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: process.env.NEXT_PUBLIC_ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
          max_tokens: 1200,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: "Mejora este prompt: " + input }],
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`La API respondió ${res.status}. ${body.slice(0, 160)}`);
      }
      const data = await res.json();
      const txt = String(data?.content?.[0]?.text || "").replace(/```[a-z]*|```/g, "").trim();
      const parts = txt.split(/===\s*MEJORADO\s*===|===\s*VARIANTE\s*1\s*===|===\s*VARIANTE\s*2\s*===|===\s*VARIANTE\s*3\s*===/i);
      const mejorado = (parts[1] || "").trim();
      const variantes = [parts[2], parts[3], parts[4]].filter((x) => x && x.trim()).map((x) => x.trim());
      setPtResult(mejorado || txt);
      setPtVariants(variantes);
    } catch (err) {
      setPtError(err instanceof Error ? err.message : "No se pudo mejorar el prompt. Intenta de nuevo.");
    } finally {
      setPtLoading(false);
    }
  }

  function loadPrompt(preview: string) {
    setPtInput(preview);
    const el = improverRef.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
    toast('Prompt cargado — pulsa "Mejorar prompt".');
  }

  function onSignup(e: React.FormEvent) {
    e.preventDefault();
    const em = email.trim();
    if (!em.includes("@")) {
      setSignupNote("Ingresa un email válido."); setSignupErr(true); return;
    }
    setSignupNote(`¡Listo! ${em} fue registrado. Revisa tu bandeja.`);
    setSignupErr(false); setEmail("");
    toast("Bienvenido a neona.tech.");
  }

  const filtered = cat === "all" ? TOOLS : TOOLS.filter((t) => t.cats.includes(cat));
  const heroTools = TOOLS.slice(0, 5);
  const heroStats = [{ n: "1K+", l: "herramientas" }, { n: "240+", l: "prompts" }, { n: "100%", l: "gratis" }];
  const stats = [{ n: "1K+", l: "Herramientas indexadas" }, { n: "240+", l: "Prompts curados" }, { n: "18+", l: "Categorías" }, { n: "100%", l: "Gratis para empezar" }];

  return (
    <div className="nt-root">
      {/* glow de fondo */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 720px 620px at -6% -12%,rgba(167,139,250,.09),transparent 66%),radial-gradient(ellipse 620px 520px at 106% 2%,rgba(240,171,252,.06),transparent 64%),radial-gradient(ellipse 700px 480px at 70% 108%,rgba(103,232,249,.05),transparent 70%)" }} />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(6,6,14,.82)", backdropFilter: "blur(20px)", borderBottom: "1px solid #17172e" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", display: "flex", alignItems: "center", gap: "2rem", padding: "0 clamp(1rem,4vw,2.5rem)", height: 60 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 12px #a78bfa" }} />
            <span className="nt-jakarta" style={{ fontWeight: 800, fontSize: "1.12rem", letterSpacing: "-.02em", color: "#eeeef5" }}>neona<span style={{ color: "#9090b8" }}>.tech</span></span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: ".25rem", flex: 1, justifyContent: "center" }}>
            <a href="#tools" className="nt-navlink" style={{ fontSize: ".82rem", color: "#9090b8", textDecoration: "none", fontWeight: 500, padding: "6px 12px", borderRadius: 7 }}>Herramientas</a>
            <a href="#prompts" className="nt-navlink" style={{ fontSize: ".82rem", color: "#9090b8", textDecoration: "none", fontWeight: 500, padding: "6px 12px", borderRadius: 7 }}>Prompts</a>
            <a href="#improver" className="nt-navlink" style={{ fontSize: ".82rem", color: "#9090b8", textDecoration: "none", fontWeight: 500, padding: "6px 12px", borderRadius: 7 }}>Mejorar prompt</a>
          </div>
          <a href="#signup" className="nt-btn-primary" style={{ fontSize: ".82rem", fontWeight: 700, color: "#fff", background: "#a78bfa", padding: "8px 17px", borderRadius: 8, textDecoration: "none", flexShrink: 0 }}>Acceso gratis</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto", padding: "clamp(2.5rem,6vw,4.5rem) clamp(1rem,4vw,2.5rem) 3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(2rem,4vw,3.5rem)", alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: ".68rem", letterSpacing: ".16em", textTransform: "uppercase", color: "#a78bfa", fontWeight: 700, border: "1px solid rgba(167,139,250,.3)", borderRadius: 20, padding: "5px 14px", marginBottom: "1.6rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a78bfa", animation: "nt-blink 2s infinite" }} />Beta abierta · sin tarjeta
          </div>
          <h1 className="nt-jakarta" style={{ fontSize: "clamp(2.3rem,5vw,3.9rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-.035em", margin: "0 0 1.3rem" }}>
            Herramientas IA,<br /><span style={{ color: "#a78bfa" }}>prompts que funcionan</span><br />y nada de <span style={{ color: "#f0abfc" }}>ruido</span>.
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#9090b8", lineHeight: 1.7, maxWidth: 480, margin: "0 0 2rem" }}>
            Directorio curado de herramientas IA con enlaces directos, prompts listos para usar, y una IA que mejora tus instrucciones al instante. Todo gratis.
          </p>
          <div style={{ display: "flex", gap: ".85rem", flexWrap: "wrap", marginBottom: "2.25rem" }}>
            <a href="#tools" className="nt-btn-primary" style={{ fontSize: ".92rem", fontWeight: 700, color: "#fff", background: "#a78bfa", padding: "13px 26px", borderRadius: 10, textDecoration: "none" }}>Explorar herramientas</a>
            <a href="#improver" className="nt-btn-ghost" style={{ fontSize: ".92rem", fontWeight: 600, color: "#eeeef5", background: "#13132a", border: "1px solid #2a2a50", padding: "13px 24px", borderRadius: 10, textDecoration: "none" }}>Mejorar un prompt</a>
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {heroStats.map((s) => (
              <div key={s.l}>
                <div className="nt-jakarta" style={{ fontSize: "1.4rem", fontWeight: 800, color: "#eeeef5" }}>{s.n}</div>
                <div style={{ fontSize: ".7rem", color: "#55556a", textTransform: "uppercase", letterSpacing: ".05em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BENTO PREVIEW */}
        <div style={{ background: "linear-gradient(180deg,#0c0c18,#0a0a14)", border: "1px solid #22224a", borderRadius: 20, padding: "1.15rem", boxShadow: "0 40px 90px -35px rgba(0,0,0,.85),0 0 0 1px rgba(167,139,250,.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".55rem", background: "#06060e", border: "1px solid #1e1e3a", borderRadius: 11, padding: "10px 13px", marginBottom: ".9rem" }}>
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="#55556a" strokeWidth="1.6" style={{ flexShrink: 0 }}><circle cx="7" cy="7" r="5" /><path d="M11 11l3 3" /></svg>
            <span style={{ fontSize: ".82rem", color: "#55556a" }}>Buscar herramienta IA…</span>
            <span style={{ marginLeft: "auto", fontSize: ".62rem", color: "#55556a", border: "1px solid #1e1e3a", borderRadius: 5, padding: "2px 7px" }}>⌘K</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            {heroTools.map((t) => (
              <div key={t.name} className="nt-row" style={{ display: "flex", alignItems: "center", gap: ".7rem", background: "#0e0e1c", border: "1px solid #1a1a32", borderRadius: 11, padding: ".65rem .8rem" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "#fff", display: "grid", placeItems: "center", overflow: "hidden", padding: 5, flexShrink: 0 }}><ToolLogo name={t.name} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="nt-jakarta" style={{ fontWeight: 700, fontSize: ".86rem", color: "#eeeef5" }}>{t.name}</div>
                  <div style={{ fontSize: ".72rem", color: "#9090b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.short}</div>
                </div>
                <span style={badgeStyle(t.badge)}>{badgeLabel(t.badge)}</span>
                <span className="nt-mono" style={{ fontSize: ".74rem", color: "#67e8f9", flexShrink: 0 }}>{t.rating}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginTop: ".9rem", padding: ".7rem .85rem", background: "linear-gradient(135deg,rgba(167,139,250,.14),rgba(240,171,252,.07))", border: "1px solid rgba(167,139,250,.28)", borderRadius: 11 }}>
            <span style={{ fontSize: "1.1rem" }}>✨</span>
            <span style={{ fontSize: ".8rem", color: "#d4d4e4", fontWeight: 500 }}>Mejora cualquier prompt con IA en un clic</span>
          </div>
        </div>
      </section>

      {/* IMPROVER */}
      <section id="improver" ref={improverRef} style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "2.5rem clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ background: "linear-gradient(180deg,#0d0d1a,#0a0a14)", border: "1px solid #22224a", borderRadius: 20, padding: "clamp(1.5rem,3vw,2.2rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".5rem" }}>
            <span style={{ fontSize: "1.2rem" }}>✨</span>
            <h2 className="nt-jakarta" style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-.02em", margin: 0 }}>Mejorador de prompts</h2>
            <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#4ade80", background: "rgba(74,222,128,.12)", border: "1px solid rgba(74,222,128,.25)", padding: "2px 8px", borderRadius: 5 }}>IA real</span>
          </div>
          <p style={{ fontSize: ".92rem", color: "#9090b8", margin: "0 0 1.25rem" }}>Pega un prompt en bruto y la IA lo reescribe más claro y específico, con 3 variantes.</p>
          <textarea value={ptInput} onChange={(e) => setPtInput(e.target.value)} placeholder="Ej: escribe un correo para pedir un aumento de sueldo" className="nt-input" style={{ width: "100%", height: 120, resize: "vertical", background: "#06060e", border: "1px solid #2a2a50", borderRadius: 12, padding: 14, fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".92rem", color: "#eeeef5", outline: "none", lineHeight: 1.6 }} />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: ".9rem" }}>
            <button onClick={improve} disabled={ptLoading} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: ptLoading ? "#6d5ba8" : "#a78bfa", color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".9rem", fontWeight: 700, cursor: ptLoading ? "wait" : "pointer", transition: "background .18s" }}>
              {ptLoading && <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.35)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "nt-spin .7s linear infinite" }} />}
              {ptLoading ? "Mejorando…" : "✨ Mejorar prompt"}
            </button>
          </div>

          {ptError && (
            <div style={{ marginTop: "1rem", padding: ".85rem 1rem", background: "rgba(248,113,113,.1)", border: "1px solid rgba(248,113,113,.3)", borderRadius: 10, fontSize: ".85rem", color: "#f87171" }}>{ptError}</div>
          )}

          {ptResult && (
            <div style={{ marginTop: "1.25rem", background: "#06060e", border: "1px solid rgba(167,139,250,.28)", borderRadius: 13, padding: "1.15rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".7rem" }}>
                <span style={{ fontSize: ".66rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#a78bfa", fontWeight: 700 }}>Prompt mejorado</span>
                <button className="nt-copy" onClick={() => { try { navigator.clipboard.writeText(ptResult); toast("Prompt copiado al portapapeles."); } catch { toast("No se pudo copiar."); } }} style={{ fontSize: ".72rem", fontWeight: 600, color: "#a78bfa", background: "rgba(167,139,250,.1)", border: "1px solid rgba(167,139,250,.25)", borderRadius: 7, padding: "5px 11px", cursor: "pointer" }}>Copiar</button>
              </div>
              <div style={{ fontSize: ".9rem", color: "#d4d4e4", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{ptResult}</div>
            </div>
          )}

          {ptVariants.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <div style={{ fontSize: ".66rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#55556a", fontWeight: 700, marginBottom: ".6rem" }}>Variantes sugeridas</div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                {ptVariants.map((v, i) => (
                  <div key={i} className="nt-variant" onClick={() => { setPtInput(v); setPtResult(""); setPtVariants([]); toast("Variante cargada como nuevo prompt."); }} style={{ background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 10, padding: ".75rem .9rem", cursor: "pointer", fontSize: ".85rem", color: "#c4c4d8", lineHeight: 1.55, display: "flex", gap: ".6rem" }}>
                    <span className="nt-mono" style={{ color: "#a78bfa", fontWeight: 700, fontSize: ".75rem", flexShrink: 0 }}>V{i + 1}</span>{v}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid #17172e", borderBottom: "1px solid #17172e", padding: "0 clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 1, background: "#17172e" }}>
          {stats.map((s) => (
            <div key={s.l} style={{ background: "#06060e", padding: "1.4rem 1.5rem", textAlign: "center" }}>
              <div className="nt-jakarta" style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-.03em", color: "#eeeef5" }}>{s.n}</div>
              <div style={{ fontSize: ".7rem", color: "#55556a", marginTop: 3, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TOOLS */}
      <section id="tools" style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto", padding: "4rem clamp(1rem,4vw,2.5rem) 1rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.4rem" }}>
          <div>
            <h2 className="nt-jakarta" style={{ fontSize: "clamp(1.5rem,2.6vw,2rem)", fontWeight: 800, letterSpacing: "-.03em", margin: "0 0 .35rem" }}>Herramientas IA</h2>
            <div style={{ fontSize: ".88rem", color: "#9090b8" }}>Curadas y verificadas. Enlaces directos a cada herramienta.</div>
          </div>
          <a href="#signup" style={{ fontSize: ".82rem", color: "#a78bfa", textDecoration: "none", fontWeight: 600 }}>Ver las 1,000+ herramientas →</a>
        </div>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
          {CAT_DEFS.map(([id, name]) => (
            <button key={id} className="nt-chip" onClick={() => setCat(id)} style={{ ...(cat === id ? { background: "#a78bfa", color: "#fff", border: "1px solid #a78bfa" } : { background: "#0d0d1a", color: "#9090b8", border: "1px solid #1e1e3a" }), cursor: "pointer", fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".8rem", fontWeight: 600, padding: "7px 15px", borderRadius: 20 }}>{name}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1rem" }}>
          {filtered.map((t) => (
            <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer" className="nt-card" style={{ textDecoration: "none", background: "#0d0d1a", border: "1px solid #1a1a32", borderRadius: 15, padding: "1.3rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", display: "grid", placeItems: "center", overflow: "hidden", padding: 7 }}><ToolLogo name={t.name} /></div>
                <span style={badgeStyle(t.badge)}>{badgeLabel(t.badge)}</span>
              </div>
              <div className="nt-jakarta" style={{ fontSize: "1.05rem", fontWeight: 700, color: "#eeeef5", marginBottom: ".4rem" }}>{t.name}</div>
              <div style={{ fontSize: ".82rem", color: "#9090b8", lineHeight: 1.55, marginBottom: "1rem", flex: 1 }}>{t.desc}</div>
              <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                {t.cats.map((c) => (
                  <span key={c} style={{ fontSize: ".66rem", color: "#7a7a98", background: "#13132a", border: "1px solid #22223f", padding: "2px 8px", borderRadius: 5 }}>{c}</span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: ".85rem", borderTop: "1px solid #1a1a32" }}>
                <span style={{ fontSize: ".78rem", color: "#a78bfa", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>Ver herramienta <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 10L10 2M4 2h6v6" /></svg></span>
                <span className="nt-mono" style={{ fontSize: ".76rem", color: "#67e8f9" }}>{t.rating}/10</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* PROMPTS */}
      <section id="prompts" style={{ position: "relative", zIndex: 1, background: "#0a0a15", borderTop: "1px solid #17172e", borderBottom: "1px solid #17172e", padding: "4rem clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto" }}>
          <div style={{ marginBottom: "1.75rem" }}>
            <h2 className="nt-jakarta" style={{ fontSize: "clamp(1.5rem,2.6vw,2rem)", fontWeight: 800, letterSpacing: "-.03em", margin: "0 0 .35rem" }}>Prompts curados</h2>
            <div style={{ fontSize: ".88rem", color: "#9090b8" }}>Haz clic en cualquiera para cargarlo en el mejorador.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1rem" }}>
            {PROMPTS.map((p) => (
              <div key={p.title} className="nt-card" onClick={() => loadPrompt(p.preview)} style={{ background: "#0d0d1a", border: "1px solid #1a1a32", borderRadius: 14, padding: "1.35rem", cursor: "pointer", display: "flex", flexDirection: "column" }}>
                <span style={{ alignSelf: "flex-start", fontSize: ".64rem", fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "#a78bfa", background: "rgba(167,139,250,.12)", border: "1px solid rgba(167,139,250,.25)", padding: "3px 9px", borderRadius: 5, marginBottom: ".9rem" }}>{p.tag}</span>
                <div className="nt-jakarta" style={{ fontSize: "1rem", fontWeight: 700, color: "#eeeef5", marginBottom: ".5rem" }}>{p.title}</div>
                <div className="nt-mono" style={{ fontSize: ".82rem", color: "#9090b8", lineHeight: 1.55, marginBottom: "1.1rem", flex: 1 }}>{p.preview.length > 115 ? p.preview.slice(0, 115) + "…" : p.preview}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: ".85rem", borderTop: "1px solid #1a1a32" }}>
                  <span style={{ fontSize: ".78rem", color: "#a78bfa", fontWeight: 600 }}>Usar este prompt →</span>
                  <span style={{ fontSize: ".72rem", color: "#55556a" }}>{p.saves} usos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="signup" style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto", padding: "4.5rem clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ background: "linear-gradient(135deg,rgba(167,139,250,.14),rgba(240,171,252,.08))", border: "1px solid rgba(167,139,250,.28)", borderRadius: 24, padding: "clamp(2.5rem,6vw,4rem) clamp(1.5rem,5vw,3rem)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-40%", left: "50%", width: 400, height: 400, transform: "translateX(-50%)", background: "radial-gradient(circle,rgba(167,139,250,.18),transparent 70%)", pointerEvents: "none" }} />
          <h2 className="nt-jakarta" style={{ position: "relative", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.1, margin: "0 0 1rem" }}>Acceso completo,<br /><span style={{ color: "#a78bfa" }}>sin costo.</span></h2>
          <p style={{ position: "relative", fontSize: "1.02rem", color: "#b4b4cc", lineHeight: 1.6, maxWidth: 520, margin: "0 auto 2rem" }}>Regístrate gratis y desbloquea el directorio completo, 240+ prompts curados, historial de mejoras y alertas de nuevas herramientas.</p>
          <form onSubmit={onSignup} style={{ position: "relative", display: "flex", gap: ".6rem", maxWidth: 440, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
            <input type="email" required placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="nt-input" style={{ flex: 1, minWidth: 200, background: "#06060e", border: "1px solid #2a2a50", borderRadius: 10, padding: "13px 16px", fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".92rem", color: "#eeeef5", outline: "none" }} />
            <button type="submit" className="nt-btn-primary" style={{ fontSize: ".92rem", fontWeight: 700, color: "#fff", background: "#a78bfa", padding: "13px 24px", borderRadius: 10, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>Entrar gratis</button>
          </form>
          <div style={{ position: "relative", marginTop: "1rem", fontSize: ".78rem", color: signupErr ? "#f87171" : "#9090b8" }}>{signupNote}</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid #17172e", padding: "2.5rem clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div className="nt-jakarta" style={{ fontWeight: 800, fontSize: ".98rem", color: "#9090b8" }}>neona.tech</div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <a href="#tools" className="nt-footlink" style={{ fontSize: ".8rem", color: "#55556a", textDecoration: "none" }}>Herramientas</a>
            <a href="#prompts" className="nt-footlink" style={{ fontSize: ".8rem", color: "#55556a", textDecoration: "none" }}>Prompts</a>
            <a href="#improver" className="nt-footlink" style={{ fontSize: ".8rem", color: "#55556a", textDecoration: "none" }}>Mejorar prompt</a>
            <a href="#signup" className="nt-footlink" style={{ fontSize: ".8rem", color: "#55556a", textDecoration: "none" }}>Registro</a>
          </div>
          <div className="nt-mono" style={{ fontSize: ".75rem", color: "#55556a" }}>© 2026 neona.tech · Hecho en Colombia</div>
        </div>
      </footer>

      {/* TOAST */}
      {toastShow && (
        <div style={{ position: "fixed", bottom: "1.75rem", left: "50%", transform: "translateX(-50%)", zIndex: 500, background: "#13132a", border: "1px solid rgba(167,139,250,.35)", borderRadius: 10, padding: "11px 18px", fontSize: ".85rem", color: "#eeeef5", boxShadow: "0 12px 40px -10px rgba(0,0,0,.7)" }}>{toastMsg}</div>
      )}
    </div>
  );
}
