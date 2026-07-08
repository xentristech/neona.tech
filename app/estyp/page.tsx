"use client";

import { useState, type CSSProperties } from "react";
import "./estyp.css";

/* ---------------- Paleta ---------------- */
const V = "#a78bfa", R = "#22d3ee", C = "#22d3ee", G = "#4ade80", AM = "#fbbf24";

/* ---------------- Datos ---------------- */
const HERO_DEFS = [
  { id: "b", label: "Diagnóstico" },
  { id: "a", label: "Enfoque" },
  { id: "c", label: "Editorial" },
];

const LEVEL_DEFS = [
  { id: "nuevo", emoji: "🌱", label: "Apenas empiezo", desc: "La IA me suena a chino", title: "Ruta: Fundamentos sin miedo", desc2: "Tres herramientas para escribir, resumir y organizar. Nada técnico, resultados el primer día." },
  { id: "algo", emoji: "⚡", label: "Uso algunas apps", desc: "Pero siento que me pierdo lo bueno", title: "Ruta: Productividad con IA", desc2: "Automatiza lo repetitivo y multiplica tu trabajo con el stack que de verdad usan los profesionales." },
  { id: "pro", emoji: "🚀", label: "Ya manejo varias", desc: "Quiero exprimirlas de verdad", title: "Ruta: Stack avanzado", desc2: "Integra, automatiza flujos y conecta tus herramientas. De usuario a operador." },
];

const STATS = [
  { n: "280+", l: "herramientas revisadas" },
  { n: "12", l: "rutas guiadas" },
  { n: "0€", l: "para empezar" },
  { n: "9 min", l: "para tu primer resultado" },
];

const STEPS = [
  { num: "01", emoji: "🧭", title: "Dinos dónde estás", desc: "Un diagnóstico de 10 segundos ubica tu nivel y tu objetivo. Sin cuestionarios eternos." },
  { num: "02", emoji: "✨", title: "Recibe tu ruta", desc: "Te damos 3 herramientas curadas —no 300— en el orden exacto para tu meta." },
  { num: "03", emoji: "📈", title: "Avanza sin FOMO", desc: "Cuando estés listo, te sugerimos el siguiente paso. Nunca más de lo que necesitas." },
];

const CAT_LIST = ["Todo", "IA", "Productividad", "Automatización", "Datos", "Diseño"];
const CAT_COLOR: Record<string, string> = { IA: V, Productividad: C, "Automatización": G, Datos: AM, "Diseño": R };
const DOMAINS: Record<string, string> = { Claude: "claude.ai", Notion: "notion.so", Zapier: "zapier.com", Perplexity: "perplexity.ai", Airtable: "airtable.com", Figma: "figma.com", Make: "make.com", Gamma: "gamma.app", Superhuman: "superhuman.com" };

type Tool = { ini: string; name: string; category: string; desc: string; level: string; color: string; grad: string };
const TOOLS: Tool[] = [
  { ini: "CL", name: "Claude", category: "IA", desc: "Tu copiloto para escribir, analizar y pensar. El punto de entrada más amable a la IA.", level: "Principiante", color: V, grad: "linear-gradient(90deg,#a78bfa,#22d3ee)" },
  { ini: "NO", name: "Notion", category: "Productividad", desc: "Notas, tareas y wiki en un solo lugar. Ordena el caos antes de automatizarlo.", level: "Principiante", color: C, grad: "linear-gradient(90deg,#22d3ee,#a78bfa)" },
  { ini: "ZA", name: "Zapier", category: "Automatización", desc: "Conecta tus apps y elimina el copiar-pegar. Automatización sin escribir código.", level: "Intermedio", color: G, grad: "linear-gradient(90deg,#4ade80,#22d3ee)" },
  { ini: "PE", name: "Perplexity", category: "IA", desc: "Buscador con IA que cita sus fuentes. Investiga en minutos lo que antes tomaba horas.", level: "Principiante", color: V, grad: "linear-gradient(90deg,#a78bfa,#22d3ee)" },
  { ini: "AI", name: "Airtable", category: "Datos", desc: "Hojas de cálculo con superpoderes. Organiza datos sin volverte analista.", level: "Intermedio", color: AM, grad: "linear-gradient(90deg,#fbbf24,#22d3ee)" },
  { ini: "FI", name: "Figma", category: "Diseño", desc: "Diseña y prototipa aunque no seas diseñador. Plantillas listas para empezar.", level: "Intermedio", color: R, grad: "linear-gradient(90deg,#22d3ee,#a78bfa)" },
  { ini: "MA", name: "Make", category: "Automatización", desc: "Flujos visuales potentes para cuando Zapier se te queda corto.", level: "Avanzado", color: G, grad: "linear-gradient(90deg,#4ade80,#a78bfa)" },
  { ini: "GA", name: "Gamma", category: "IA", desc: "Genera presentaciones y documentos con IA en segundos. Adiós a la página en blanco.", level: "Principiante", color: V, grad: "linear-gradient(90deg,#a78bfa,#fbbf24)" },
  { ini: "SU", name: "Superhuman", category: "Productividad", desc: "Vacía tu bandeja de entrada en la mitad del tiempo. Correo para gente ocupada.", level: "Intermedio", color: C, grad: "linear-gradient(90deg,#22d3ee,#22d3ee)" },
];

const PATHS = [
  { emoji: "🌱", title: "IA para tu día a día", level: "Principiante", desc: "Escribe, resume y organiza con IA sin conocimientos técnicos.", tools: 3, time: "2 h", grad: "linear-gradient(135deg,rgba(167,139,250,.3),rgba(34,211,238,.15))" },
  { emoji: "⚡", title: "Automatiza lo repetitivo", level: "Intermedio", desc: "Conecta tus apps y recupera horas cada semana sin código.", tools: 4, time: "3 h", grad: "linear-gradient(135deg,rgba(74,222,128,.3),rgba(34,211,238,.15))" },
  { emoji: "📊", title: "Datos sin ser analista", level: "Intermedio", desc: "Ordena, visualiza y saca conclusiones de tus datos con herramientas simples.", tools: 3, time: "2.5 h", grad: "linear-gradient(135deg,rgba(251,191,36,.3),rgba(34,211,238,.15))" },
  { emoji: "🎨", title: "Diseña sin ser diseñador", level: "Principiante", desc: "Crea presentaciones, gráficos y prototipos que se ven profesionales.", tools: 3, time: "2 h", grad: "linear-gradient(135deg,rgba(34,211,238,.3),rgba(167,139,250,.15))" },
];

const TESTIMONIALS = [
  { quote: "Dejé de guardar 40 pestañas de \"herramientas para probar\". neona.tech me dijo cuáles importan y ya.", ini: "MR", name: "María Rojas", role: "Marketing · PYME", grad: "linear-gradient(135deg,#a78bfa,#22d3ee)" },
  { quote: "Como consultor, la sobrecarga de IA me paralizaba. Ahora tengo una ruta y clientes contentos.", ini: "DL", name: "Diego León", role: "Consultor independiente", grad: "linear-gradient(135deg,#22d3ee,#a78bfa)" },
  { quote: "Lo mejor es lo que NO me recomiendan. Menos ruido, más foco. Justo lo que necesitaba.", ini: "CV", name: "Carla Vega", role: "Operaciones", grad: "linear-gradient(135deg,#4ade80,#22d3ee)" },
];

const FAQS = [
  { q: "¿En qué se diferencia de una simple lista de herramientas?", a: "Una lista te abruma; neona.tech te enfoca. Filtramos por tu nivel y objetivo, y te damos solo las 3 herramientas que importan para tu caso, en orden. Lo valioso es lo que dejamos fuera." },
  { q: "¿Necesito saber de tecnología para usarlo?", a: "Para nada. El diagnóstico inicial ubica tu nivel y te habla en tu idioma. Si apenas empiezas, tu ruta será 100% sin jerga y con resultados el primer día." },
  { q: "¿Es realmente gratis?", a: "Sí. El plan Curioso es gratuito para siempre e incluye el directorio completo y tu primera ruta. Solo pagas si quieres rutas ilimitadas y fichas a fondo." },
  { q: "¿Cada cuánto actualizan las herramientas?", a: "Un equipo revisa el catálogo cada semana: añadimos lo que vale la pena y retiramos lo que ya no. Recibes las novedades filtradas, sin ruido." },
  { q: "¿Reciben comisiones por recomendar herramientas?", a: "Nuestra prioridad es tu confianza. Las recomendaciones se basan en utilidad real, no en acuerdos comerciales, y siempre lo indicamos cuando existe un enlace de afiliado." },
];

const INTENTS: { re: RegExp; names: string[] }[] = [
  { re: /(escrib|redact|texto|content|blog|art[ií]cul|copy|carta)/, names: ["Claude", "Gamma"] },
  { re: /(correo|email|mail|bandeja|inbox)/, names: ["Superhuman", "Claude"] },
  { re: /(busc|investig|research|fuente|informaci|averigu)/, names: ["Perplexity", "Claude"] },
  { re: /(automatiz|repetitiv|conect|flujo|integra|sincroniz)/, names: ["Zapier", "Make"] },
  { re: /(organiz|nota|tarea|proyecto|wiki|documenta|plane)/, names: ["Notion", "Airtable"] },
  { re: /(dato|excel|hoja|tabla|an[aá]lisis|m[eé]trica|base de dato)/, names: ["Airtable", "Claude"] },
  { re: /(dise[nñ]|presentaci|slide|diapositiv|gr[aá]fic|logo|prototip|mockup)/, names: ["Figma", "Gamma"] },
];

function recommend(txt: string) {
  const l = txt.toLowerCase();
  let names: string[] = [];
  INTENTS.forEach((i) => { if (i.re.test(l)) i.names.forEach((n) => { if (!names.includes(n)) names.push(n); }); });
  if (!names.length) names = ["Claude", "Perplexity"];
  return names.slice(0, 3).map((n) => {
    const t = TOOLS.find((x) => x.name === n);
    return { name: n, desc: t ? t.desc : "" };
  });
}

function buildPrompt(t: string) {
  const s = (t || "").trim();
  if (!s) return "";
  return "Actúa como un experto en la materia, con experiencia práctica.\n\nContexto: quiero lograr lo siguiente y busco un resultado de calidad profesional.\n\nTarea:\n" + s + "\n\nRequisitos:\n- Responde en pasos claros y numerados.\n- Usa un tono profesional y directo, sin relleno.\n- Incluye un ejemplo concreto que pueda copiar.\n- Si te falta información clave, hazme 1-2 preguntas antes de empezar.\n\nFormato de salida: texto estructurado con encabezados cortos.";
}

/* ---------------- Helpers ---------------- */
function tagStyle(col: string): CSSProperties {
  return { fontSize: ".63rem", fontWeight: 700, padding: "2px 8px", borderRadius: 5, letterSpacing: ".05em", textTransform: "uppercase", color: col, background: col + "22", border: `1px solid ${col}44` };
}
function ToolLogo({ name }: { name: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`https://icons.duckduckgo.com/ip3/${DOMAINS[name]}.ico`} alt={name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
}

type ChatMsg = { role: "user" | "bot"; text: string; tools?: { name: string; desc: string }[] };

/* ---------------- Componente ---------------- */
export default function Estyp() {
  const [hero, setHero] = useState("b");
  const [cat, setCat] = useState("Todo");
  const [level, setLevel] = useState<string | null>(null);
  const [annual, setAnnual] = useState(false);
  const [faq, setFaq] = useState(0);
  const [email, setEmail] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [playTab, setPlayTab] = useState<"chat" | "prompt">("chat");
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState<ChatMsg[]>([]);
  const [promptInput, setPromptInput] = useState("");
  const [promptOut, setPromptOut] = useState("");

  const sel = LEVEL_DEFS.find((l) => l.id === level);
  const filtered = cat === "Todo" ? TOOLS : TOOLS.filter((t) => t.category === cat);

  function onChatSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = chatInput.trim();
    if (!q) return;
    const recs = recommend(q);
    setChatLog((log) => [...log, { role: "user", text: q }, { role: "bot", text: "Para eso, tu punto de partida ideal es:", tools: recs }]);
    setChatInput("");
  }
  function onPromptSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPromptOut(buildPrompt(promptInput));
  }

  const seg = (active: boolean): CSSProperties => ({ border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".82rem", fontWeight: 600, padding: "7px 18px", borderRadius: 20, transition: "all .18s", ...(active ? { background: V, color: "#fff" } : { background: "transparent", color: "#9090b8" }) });
  const playSeg = (active: boolean): CSSProperties => ({ border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".82rem", fontWeight: 600, padding: "8px 16px", borderRadius: 8, transition: "all .18s", ...(active ? { background: V, color: "#fff" } : { background: "transparent", color: "#9090b8" }) });

  const plans = [
    { name: "Curioso", featured: false, tagline: "Para probar el agua sin compromiso.", price: "0€", period: "/ siempre", cta: "Crear cuenta", featured2: false, features: ["Directorio completo", "1 ruta guiada", "Diagnóstico de nivel", "Novedades semanales"] },
    { name: "Pro", featured: true, tagline: "Para profesionales que quieren avanzar en serio.", price: annual ? "7€" : "9€", period: annual ? "/ mes · anual" : "/ mes", cta: "Empezar con Pro", featured2: true, features: ["Todo lo de Curioso", "Rutas ilimitadas", "Fichas técnicas a fondo", "Comparativas y alternativas", "Soporte prioritario"] },
    { name: "Equipos", featured: false, tagline: "Para poner a tu equipo al día, juntos.", price: annual ? "19€" : "24€", period: annual ? "/ mes · anual" : "/ mes", cta: "Hablar con ventas", featured2: false, features: ["Todo lo de Pro", "Hasta 10 personas", "Rutas compartidas", "Panel de progreso", "Onboarding guiado"] },
  ];

  return (
    <div className="e-root">
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 720px 620px at -6% -12%,rgba(167,139,250,.09),transparent 68%),radial-gradient(ellipse 620px 520px at 106% 4%,rgba(34,211,238,.06),transparent 66%),radial-gradient(ellipse 700px 500px at 60% 110%,rgba(34,211,238,.05),transparent 70%)" }} />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(6,6,14,.82)", backdropFilter: "blur(20px)", borderBottom: "1px solid #17172e" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", gap: "2rem", padding: "0 clamp(1rem,4vw,2.5rem)", height: 60 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
            <div className="e-jakarta" style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#a78bfa,#22d3ee)", display: "grid", placeItems: "center", fontWeight: 900, fontSize: ".72rem", color: "#fff", boxShadow: "0 0 18px rgba(167,139,250,.4)" }}>N</div>
            <span className="e-jakarta" style={{ fontWeight: 800, fontSize: "1.08rem", letterSpacing: "-.03em", color: "#eeeef5" }}>neona.tech</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: ".15rem", flex: 1 }}>
            {[["#como", "Cómo funciona"], ["#tools", "Herramientas"], ["#asistente", "Asistente"], ["#rutas", "Rutas"], ["#precios", "Precios"]].map(([href, label]) => (
              <a key={href} href={href} className="e-navlink" style={{ fontSize: ".8rem", color: "#9090b8", textDecoration: "none", fontWeight: 500, padding: "6px 11px", borderRadius: 7 }}>{label}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".85rem", flexShrink: 0 }}>
            <a href="#top" className="e-link" style={{ fontSize: ".8rem", color: "#9090b8", textDecoration: "none", fontWeight: 600 }}>Entrar</a>
            <a href="#cta" className="e-btn-primary" style={{ fontSize: ".8rem", fontWeight: 700, color: "#fff", background: V, padding: "8px 17px", borderRadius: 8, textDecoration: "none" }}>Empezar gratis</a>
          </div>
        </div>
      </nav>

      {/* HERO SWITCHER */}
      <div id="top" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "1.5rem clamp(1rem,4vw,2.5rem) 0", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span className="e-mono" style={{ fontSize: ".66rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#55556a" }}>Vista del hero</span>
        <div style={{ display: "inline-flex", background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 9, padding: 3, gap: 2 }}>
          {HERO_DEFS.map((h) => (
            <button key={h.id} onClick={() => setHero(h.id)} style={{ border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".78rem", fontWeight: 600, padding: "6px 14px", borderRadius: 7, transition: "all .18s", ...(hero === h.id ? { background: V, color: "#fff", boxShadow: "0 2px 10px rgba(167,139,250,.35)" } : { background: "transparent", color: "#9090b8" }) }}>{h.label}</button>
          ))}
        </div>
      </div>

      {/* HERO A: Enfoque centrado */}
      {hero === "a" && (
        <section style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto", padding: "3.5rem clamp(1rem,4vw,2.5rem) 1rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: V, fontWeight: 700, border: "1px solid rgba(167,139,250,.3)", borderRadius: 20, padding: "5px 14px", marginBottom: "1.75rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: V, animation: "estyp-blink 2s infinite" }} />El punto de partida en tecnología
          </div>
          <h1 className="e-jakarta" style={{ fontSize: "clamp(2.4rem,6vw,4.3rem)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-.035em", margin: "0 0 1.35rem" }}>
            Deja de sentirte<br /><span style={{ color: V }}>perdido</span> con la <span style={{ color: R }}>tecnología</span>.
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#9090b8", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 2.4rem" }}>
            Miles de apps, IA nueva cada semana, cero tiempo. <strong style={{ color: "#eeeef5", fontWeight: 600 }}>neona.tech</strong> es el directorio curado que te dice exactamente por dónde empezar y qué ignorar.
          </p>
          <div style={{ display: "flex", gap: ".85rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#como" className="e-btn-primary" style={{ fontSize: ".92rem", fontWeight: 700, color: "#fff", background: V, padding: "13px 26px", borderRadius: 10, textDecoration: "none" }}>Encuentra mi punto de partida</a>
            <a href="#tools" className="e-btn-ghost" style={{ fontSize: ".92rem", fontWeight: 600, color: "#eeeef5", background: "#13132a", border: "1px solid #2a2a50", padding: "13px 24px", borderRadius: 10, textDecoration: "none" }}>Ver herramientas</a>
          </div>
        </section>
      )}

      {/* HERO B: Diagnóstico interactivo */}
      {hero === "b" && (
        <section style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "3rem clamp(1rem,4vw,2.5rem) 1rem", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "3rem", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: V, fontWeight: 700, border: "1px solid rgba(167,139,250,.3)", borderRadius: 20, padding: "5px 14px", marginBottom: "1.6rem" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: V, animation: "estyp-blink 2s infinite" }} />Diagnóstico en 10 segundos
            </div>
            <h1 className="e-jakarta" style={{ fontSize: "clamp(2.2rem,4.6vw,3.6rem)", fontWeight: 800, lineHeight: 1.07, letterSpacing: "-.035em", margin: "0 0 1.25rem" }}>
              ¿Abrumado por tanta<br /><span style={{ color: V }}>tecnología</span>? Empieza<br />por <span style={{ color: R }}>aquí</span>.
            </h1>
            <p style={{ fontSize: "1.02rem", color: "#9090b8", lineHeight: 1.7, maxWidth: 480, margin: "0 0 1.75rem" }}>
              Dinos tu nivel y te armamos una ruta con las 3 herramientas que sí importan para tu trabajo. Sin ruido, sin FOMO.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <div><div className="e-jakarta" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#eeeef5" }}>280<span style={{ color: V }}>+</span></div><div style={{ fontSize: ".72rem", color: "#55556a", textTransform: "uppercase", letterSpacing: ".05em" }}>herramientas revisadas</div></div>
              <div><div className="e-jakarta" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#eeeef5" }}>12</div><div style={{ fontSize: ".72rem", color: "#55556a", textTransform: "uppercase", letterSpacing: ".05em" }}>rutas guiadas</div></div>
              <div><div className="e-jakarta" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#eeeef5" }}>0<span style={{ color: R }}>€</span></div><div style={{ fontSize: ".72rem", color: "#55556a", textTransform: "uppercase", letterSpacing: ".05em" }}>para empezar</div></div>
            </div>
          </div>
          <div style={{ background: "#0b0b18", border: "1px solid #22224a", borderRadius: 18, padding: "1.6rem", boxShadow: "0 30px 80px -30px rgba(0,0,0,.8)" }}>
            <div className="e-mono" style={{ fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: V, fontWeight: 500, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: V, animation: "estyp-blink 2s infinite" }} />¿Qué tanto te abruma la tecnología?
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
              {LEVEL_DEFS.map((lv) => (
                <button key={lv.id} onClick={() => setLevel(lv.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: ".85rem", padding: ".85rem 1rem", borderRadius: 12, cursor: "pointer", textAlign: "left", transition: "all .18s", ...(level === lv.id ? { background: "rgba(167,139,250,.12)", border: "1px solid rgba(167,139,250,.45)" } : { background: "#0d0d1a", border: "1px solid #1e1e3a" }) }}>
                  <span style={{ fontSize: "1.3rem" }}>{lv.emoji}</span>
                  <span style={{ display: "flex", flexDirection: "column", textAlign: "left", gap: 1 }}>
                    <span className="e-jakarta" style={{ fontWeight: 700, fontSize: ".92rem", color: "#eeeef5" }}>{lv.label}</span>
                    <span style={{ fontSize: ".76rem", color: "#9090b8" }}>{lv.desc}</span>
                  </span>
                </button>
              ))}
            </div>
            {sel ? (
              <div style={{ marginTop: "1.1rem", padding: "1.1rem", background: "linear-gradient(135deg,rgba(167,139,250,.14),rgba(34,211,238,.08))", border: "1px solid rgba(167,139,250,.32)", borderRadius: 13 }}>
                <div style={{ fontSize: ".66rem", letterSpacing: ".1em", textTransform: "uppercase", color: V, fontWeight: 700, marginBottom: ".5rem" }}>Tu ruta recomendada</div>
                <div className="e-jakarta" style={{ fontWeight: 700, fontSize: "1.05rem", color: "#eeeef5", marginBottom: ".35rem" }}>{sel.title}</div>
                <div style={{ fontSize: ".82rem", color: "#9090b8", lineHeight: 1.55, marginBottom: ".9rem" }}>{sel.desc2}</div>
                <a href="#rutas" className="e-btn-primary" style={{ display: "inline-block", fontSize: ".82rem", fontWeight: 700, color: "#fff", background: V, padding: "9px 18px", borderRadius: 8, textDecoration: "none" }}>Ver la ruta completa →</a>
              </div>
            ) : (
              <div style={{ marginTop: "1.1rem", padding: "1rem", border: "1px dashed #2a2a50", borderRadius: 13, textAlign: "center", fontSize: ".8rem", color: "#55556a" }}>Elige una opción y te mostramos por dónde empezar.</div>
            )}
          </div>
        </section>
      )}

      {/* HERO C: Editorial */}
      {hero === "c" && (
        <section style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "3.5rem clamp(1rem,4vw,2.5rem) 1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <span className="e-mono" style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: V }}>01 — Menos ruido</span>
            <span style={{ flex: 1, height: 1, background: "#1e1e3a" }} />
            <span className="e-mono" style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#55556a" }}>neona.tech / directorio curado</span>
          </div>
          <h1 className="e-jakarta" style={{ fontSize: "clamp(2.6rem,8.5vw,6.5rem)", fontWeight: 800, lineHeight: .98, letterSpacing: "-.045em", margin: "0 0 1.5rem" }}>
            Menos apps.<br />Más <span style={{ color: V }}>tecnología</span><br />que <span style={{ color: R }}>sí</span> usas.
          </h1>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "end", borderTop: "1px solid #1e1e3a", paddingTop: "1.5rem" }}>
            <p style={{ fontSize: "1.1rem", color: "#9090b8", lineHeight: 1.65, maxWidth: 540, margin: 0 }}>
              Un equipo revisa cientos de herramientas para que tú no tengas que hacerlo. Te quedas solo con lo que mueve tu trabajo hacia adelante.
            </p>
            <a href="#tools" className="e-btn-primary" style={{ fontSize: ".92rem", fontWeight: 700, color: "#fff", background: V, padding: "13px 26px", borderRadius: 10, textDecoration: "none", whiteSpace: "nowrap" }}>Explorar →</a>
          </div>
        </section>
      )}

      {/* STATS BAND */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid #17172e", borderBottom: "1px solid #17172e", marginTop: "2.5rem", padding: "0 clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 1, background: "#17172e" }}>
          {STATS.map((s) => (
            <div key={s.l} style={{ background: "#06060e", padding: "1.4rem 1.5rem", textAlign: "center" }}>
              <div className="e-jakarta" style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-.03em", color: "#eeeef5" }}>{s.n}</div>
              <div style={{ fontSize: ".7rem", color: "#55556a", marginTop: 3, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <section id="como" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "5rem clamp(1rem,4vw,2.5rem) 1rem" }}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 3rem" }}>
          <div className="e-mono" style={{ fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: V, marginBottom: ".8rem" }}>Cómo funciona</div>
          <h2 className="e-jakarta" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.12, margin: "0 0 .9rem" }}>De abrumado a enfocado en 3 pasos</h2>
          <p style={{ fontSize: "1rem", color: "#9090b8", lineHeight: 1.65, margin: 0 }}>Nada de tutoriales de 4 horas. Solo el camino más corto hacia la herramienta correcta.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}>
          {STEPS.map((st) => (
            <div key={st.num} className="e-card-soft" style={{ background: "#0d0d1a", border: "1px solid #1a1a32", borderRadius: 16, padding: "1.6rem", position: "relative", overflow: "hidden" }}>
              <div className="e-jakarta" style={{ fontSize: "2.4rem", fontWeight: 800, color: "#1e1e3a", lineHeight: 1, marginBottom: "1rem" }}>{st.num}</div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#13132a", border: "1px solid #2a2a50", display: "grid", placeItems: "center", fontSize: "1.3rem", marginBottom: "1rem" }}>{st.emoji}</div>
              <h3 className="e-jakarta" style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 .5rem", color: "#eeeef5" }}>{st.title}</h3>
              <p style={{ fontSize: ".88rem", color: "#9090b8", lineHeight: 1.6, margin: 0 }}>{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLAYGROUND */}
      <section id="asistente" style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto", padding: "4.5rem clamp(1rem,4vw,2.5rem) 1rem" }}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 2rem" }}>
          <div className="e-mono" style={{ fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: C, marginBottom: ".8rem" }}>Pruébalo ahora</div>
          <h2 className="e-jakarta" style={{ fontSize: "clamp(1.8rem,3.3vw,2.4rem)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.12, margin: "0 0 .8rem" }}>Escribe lo que necesitas. Te decimos con qué.</h2>
          <p style={{ fontSize: "1rem", color: "#9090b8", lineHeight: 1.6, margin: 0 }}>Un asistente que traduce &quot;quiero hacer X&quot; en las herramientas exactas, y un mejorador que convierte tu idea en un prompt que sí funciona.</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
          <div style={{ display: "inline-flex", background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 11, padding: 4, gap: 3 }}>
            <button onClick={() => setPlayTab("chat")} style={playSeg(playTab === "chat")}>💬 Asistente</button>
            <button onClick={() => setPlayTab("prompt")} style={playSeg(playTab === "prompt")}>✨ Mejorar prompt</button>
          </div>
        </div>
        <div style={{ background: "#0a0a16", border: "1px solid #22224a", borderRadius: 20, padding: "1.4rem", boxShadow: "0 30px 80px -35px rgba(0,0,0,.8)" }}>
          {playTab === "chat" && (
            <>
              <div style={{ minHeight: 290, maxHeight: 360, overflowY: "auto", display: "flex", flexDirection: "column", gap: ".85rem", padding: ".4rem .3rem 1rem" }}>
                {chatLog.length === 0 ? (
                  <div style={{ margin: "auto", textAlign: "center", padding: "1.5rem 1rem" }}>
                    <div style={{ fontSize: "2rem", marginBottom: ".7rem" }}>💬</div>
                    <div style={{ fontSize: ".9rem", color: "#9090b8", marginBottom: "1.1rem" }}>Cuéntame qué quieres lograr. Por ejemplo:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", justifyContent: "center" }}>
                      {["\"Quiero automatizar mis correos\"", "\"Investigar un tema rápido\"", "\"Hacer una presentación\""].map((ex) => (
                        <span key={ex} style={{ fontSize: ".78rem", color: "#c4c4d8", background: "#13132a", border: "1px solid #2a2a50", padding: "6px 12px", borderRadius: 20 }}>{ex}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  chatLog.map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                      <div style={{ maxWidth: "82%", padding: ".7rem 1rem", borderRadius: 14, fontSize: ".88rem", lineHeight: 1.5, ...(m.role === "user" ? { background: V, color: "#fff" } : { background: "#13132a", color: "#e4e4f0", border: "1px solid #2a2a50" }) }}>
                        <div>{m.text}</div>
                        {m.tools && m.tools.length > 0 && (
                          <div style={{ display: "flex", flexDirection: "column", gap: ".5rem", marginTop: ".75rem" }}>
                            {m.tools.map((tt) => (
                              <div key={tt.name} style={{ background: "#0a0a16", border: "1px solid #2a2a50", borderRadius: 10, padding: ".6rem .8rem" }}>
                                <div className="e-jakarta" style={{ fontWeight: 700, fontSize: ".83rem", color: V, marginBottom: 2 }}>{tt.name}</div>
                                <div style={{ fontSize: ".76rem", color: "#9090b8", lineHeight: 1.45 }}>{tt.desc}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={onChatSubmit} style={{ display: "flex", gap: ".6rem", marginTop: ".5rem", borderTop: "1px solid #1a1a32", paddingTop: "1rem" }}>
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Escribe qué necesitas hacer..." style={{ flex: 1, background: "#06060e", border: "1px solid #2a2a50", borderRadius: 10, padding: "12px 15px", fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".9rem", color: "#eeeef5", outline: "none" }} />
                <button type="submit" className="e-btn-primary" style={{ background: V, color: "#fff", border: "none", borderRadius: 10, padding: "0 22px", fontWeight: 700, fontSize: ".88rem", cursor: "pointer" }}>Enviar</button>
              </form>
            </>
          )}
          {playTab === "prompt" && (
            <form onSubmit={onPromptSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label className="e-mono" style={{ fontSize: ".66rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#55556a", marginBottom: ".6rem" }}>Tu idea en bruto</label>
                  <textarea value={promptInput} onChange={(e) => setPromptInput(e.target.value)} placeholder="Ej: escribe un correo para pedir un aumento de sueldo" style={{ height: 220, resize: "none", background: "#06060e", border: "1px solid #2a2a50", borderRadius: 12, padding: 14, fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".9rem", color: "#eeeef5", outline: "none", lineHeight: 1.6 }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label className="e-mono" style={{ fontSize: ".66rem", letterSpacing: ".1em", textTransform: "uppercase", color: C, marginBottom: ".6rem" }}>Prompt mejorado</label>
                  {promptOut ? (
                    <div className="e-mono" style={{ height: 220, overflowY: "auto", background: "#0a0a16", border: "1px solid rgba(34,211,238,.3)", borderRadius: 12, padding: 14, fontSize: ".8rem", color: "#c4c4d8", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{promptOut}</div>
                  ) : (
                    <div style={{ height: 220, display: "grid", placeItems: "center", textAlign: "center", background: "#0a0a16", border: "1px dashed #2a2a50", borderRadius: 12, padding: 14, fontSize: ".82rem", color: "#55556a" }}>Escribe tu idea y pulsa &quot;Mejorar&quot; para ver un prompt estructurado, listo para pegar en cualquier IA.</div>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "1.1rem" }}>
                <button type="submit" className="e-btn-grad" style={{ background: "linear-gradient(135deg,#a78bfa,#22d3ee)", color: "#06060e", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 800, fontSize: ".9rem", cursor: "pointer" }}>✨ Mejorar mi prompt</button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section id="tools" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "4rem clamp(1rem,4vw,2.5rem) 1rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <div className="e-mono" style={{ fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: V, marginBottom: ".6rem" }}>El directorio</div>
            <h2 className="e-jakarta" style={{ fontSize: "clamp(1.7rem,3vw,2.3rem)", fontWeight: 800, letterSpacing: "-.03em", margin: 0 }}>Herramientas curadas, no un buscador infinito</h2>
          </div>
        </div>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
          {CAT_LIST.map((c) => (
            <button key={c} onClick={() => setCat(c)} style={{ cursor: "pointer", fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".8rem", fontWeight: 600, padding: "7px 15px", borderRadius: 20, transition: "all .18s", ...(cat === c ? { background: V, color: "#fff", border: `1px solid ${V}` } : { background: "#0d0d1a", color: "#9090b8", border: "1px solid #1e1e3a" }) }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(285px,1fr))", gap: "1rem" }}>
          {filtered.map((t) => (
            <div key={t.name} className="e-card" style={{ background: "#0d0d1a", border: "1px solid #1a1a32", borderRadius: 15, overflow: "hidden" }}>
              <div style={{ height: 3, background: t.grad }} />
              <div style={{ padding: "1.25rem 1.35rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".9rem" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 11, background: "#fff", border: "1px solid #2a2a50", display: "grid", placeItems: "center", overflow: "hidden", padding: 6 }}><ToolLogo name={t.name} /></div>
                  <span style={tagStyle(CAT_COLOR[t.category] || V)}>{t.category}</span>
                </div>
                <h3 className="e-jakarta" style={{ fontSize: "1.02rem", fontWeight: 700, color: "#eeeef5", margin: "0 0 .4rem" }}>{t.name}</h3>
                <p style={{ fontSize: ".82rem", color: "#9090b8", lineHeight: 1.55, margin: "0 0 1rem" }}>{t.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: ".85rem", borderTop: "1px solid #1a1a32" }}>
                  <span style={{ fontSize: ".72rem", color: "#55556a" }}>{t.level}</span>
                  <span style={{ fontSize: ".76rem", color: V, fontWeight: 600 }}>Ver ficha →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RUTAS */}
      <section id="rutas" style={{ position: "relative", zIndex: 1, background: "#0a0a15", borderTop: "1px solid #17172e", borderBottom: "1px solid #17172e", padding: "5rem clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 620, margin: "0 0 2.75rem" }}>
            <div className="e-mono" style={{ fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: R, marginBottom: ".8rem" }}>Rutas de aprendizaje</div>
            <h2 className="e-jakarta" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.12, margin: "0 0 .9rem" }}>Un camino claro, no una pila de pestañas</h2>
            <p style={{ fontSize: "1rem", color: "#9090b8", lineHeight: 1.65, margin: 0 }}>Cada ruta junta las herramientas exactas para un objetivo, en el orden en que las necesitas.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1rem" }}>
            {PATHS.map((p) => (
              <a key={p.title} href="#cta" className="e-card" style={{ textDecoration: "none", background: "#0d0d1a", border: "1px solid #1a1a32", borderRadius: 16, padding: "1.5rem", display: "block" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginBottom: "1rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: p.grad, display: "grid", placeItems: "center", fontSize: "1.2rem" }}>{p.emoji}</div>
                  <span style={{ fontSize: ".68rem", fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: "#13132a", border: "1px solid #2a2a50", color: "#9090b8" }}>{p.level}</span>
                </div>
                <h3 className="e-jakarta" style={{ fontSize: "1.12rem", fontWeight: 700, color: "#eeeef5", margin: "0 0 .5rem" }}>{p.title}</h3>
                <p style={{ fontSize: ".85rem", color: "#9090b8", lineHeight: 1.55, margin: "0 0 1.2rem" }}>{p.desc}</p>
                <div className="e-mono" style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: ".75rem", color: "#55556a" }}>
                  <span>{p.tools} herramientas</span><span style={{ color: "#2a2a50" }}>·</span><span>{p.time}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "5rem clamp(1rem,4vw,2.5rem) 1rem" }}>
        <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 2.75rem" }}>
          <div className="e-mono" style={{ fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: V, marginBottom: ".8rem" }}>Quién lo usa</div>
          <h2 className="e-jakarta" style={{ fontSize: "clamp(1.8rem,3.3vw,2.4rem)", fontWeight: 800, letterSpacing: "-.03em", margin: 0 }}>Profesionales que dejaron de perseguir cada novedad</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
          {TESTIMONIALS.map((tm) => (
            <div key={tm.name} style={{ background: "#0d0d1a", border: "1px solid #1a1a32", borderRadius: 16, padding: "1.6rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <p style={{ fontSize: ".95rem", color: "#d4d4e4", lineHeight: 1.65, margin: 0, fontWeight: 500 }}>&quot;{tm.quote}&quot;</p>
              <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginTop: "auto" }}>
                <div className="e-jakarta" style={{ width: 38, height: 38, borderRadius: "50%", background: tm.grad, display: "grid", placeItems: "center", fontWeight: 800, fontSize: ".85rem", color: "#fff" }}>{tm.ini}</div>
                <div>
                  <div style={{ fontSize: ".85rem", fontWeight: 600, color: "#eeeef5" }}>{tm.name}</div>
                  <div style={{ fontSize: ".75rem", color: "#55556a" }}>{tm.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "4rem clamp(1rem,4vw,2.5rem) 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="e-mono" style={{ fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: V, marginBottom: ".8rem" }}>Precios</div>
          <h2 className="e-jakarta" style={{ fontSize: "clamp(1.8rem,3.3vw,2.4rem)", fontWeight: 800, letterSpacing: "-.03em", margin: "0 0 1.5rem" }}>Empieza gratis. Sube cuando lo necesites.</h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 24, padding: 5 }}>
            <button onClick={() => setAnnual(false)} style={seg(!annual)}>Mensual</button>
            <button onClick={() => setAnnual(true)} style={seg(annual)}>Anual <span style={{ fontSize: ".66rem", color: G }}>-20%</span></button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem", alignItems: "stretch" }}>
          {plans.map((pl) => (
            <div key={pl.name} style={{ background: "#0d0d1a", borderRadius: 18, padding: "1.75rem", position: "relative", display: "flex", flexDirection: "column", ...(pl.featured2 ? { border: "1.5px solid rgba(167,139,250,.5)", boxShadow: "0 20px 60px -25px rgba(167,139,250,.4)" } : { border: "1px solid #1a1a32" }) }}>
              {pl.featured2 && (
                <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontSize: ".63rem", fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: V, background: "rgba(167,139,250,.14)", border: "1px solid rgba(167,139,250,.3)", padding: "3px 9px", borderRadius: 20 }}>Popular</div>
              )}
              <div className="e-jakarta" style={{ fontSize: "1.15rem", fontWeight: 800, color: "#eeeef5", marginBottom: ".4rem" }}>{pl.name}</div>
              <div style={{ fontSize: ".85rem", color: "#9090b8", lineHeight: 1.5, marginBottom: "1.4rem", minHeight: "2.4em" }}>{pl.tagline}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: "1.5rem" }}>
                <span className="e-jakarta" style={{ fontSize: "2.6rem", fontWeight: 800, letterSpacing: "-.03em", color: "#eeeef5" }}>{pl.price}</span>
                <span style={{ fontSize: ".85rem", color: "#55556a" }}>{pl.period}</span>
              </div>
              <a href="#cta" className={pl.featured2 ? "e-btn-primary" : "e-btn-ghost"} style={{ display: "block", textAlign: "center", fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".85rem", fontWeight: 700, padding: 11, borderRadius: 9, textDecoration: "none", ...(pl.featured2 ? { background: V, color: "#fff" } : { background: "#13132a", color: "#eeeef5", border: "1px solid #2a2a50" }) }}>{pl.cta}</a>
              <div style={{ display: "flex", flexDirection: "column", gap: ".7rem", marginTop: "1.5rem" }}>
                {pl.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: ".83rem", color: "#c4c4d8", lineHeight: 1.45 }}>
                    <span style={{ color: G, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "4rem clamp(1rem,4vw,2.5rem) 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div className="e-mono" style={{ fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: V, marginBottom: ".8rem" }}>Preguntas frecuentes</div>
          <h2 className="e-jakarta" style={{ fontSize: "clamp(1.8rem,3.3vw,2.4rem)", fontWeight: 800, letterSpacing: "-.03em", margin: 0 }}>Lo que la gente pregunta</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}>
          {FAQS.map((q, i) => (
            <div key={i} style={{ borderRadius: 13, overflow: "hidden", transition: "all .18s", ...(faq === i ? { background: "#0f0f1e", border: "1px solid #2a2a50" } : { background: "#0d0d1a", border: "1px solid #1a1a32" }) }}>
              <button onClick={() => setFaq(faq === i ? -1 : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", background: "none", border: "none", cursor: "pointer", padding: "1.15rem 1.3rem", textAlign: "left" }}>
                <span className="e-jakarta" style={{ fontSize: ".98rem", fontWeight: 600, color: "#eeeef5" }}>{q.q}</span>
                <span style={{ fontSize: "1.3rem", color: V, fontWeight: 400, flexShrink: 0, lineHeight: 1, transition: "transform .2s", transform: `rotate(${faq === i ? "45" : "0"}deg)` }}>+</span>
              </button>
              {faq === i && (
                <div style={{ padding: "0 1.3rem 1.25rem", fontSize: ".9rem", color: "#9090b8", lineHeight: 1.65 }}>{q.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "2rem clamp(1rem,4vw,2.5rem) 5rem" }}>
        <div style={{ background: "linear-gradient(135deg,rgba(167,139,250,.14),rgba(34,211,238,.08))", border: "1px solid rgba(167,139,250,.28)", borderRadius: 24, padding: "clamp(2.5rem,6vw,4.5rem) clamp(1.5rem,5vw,3rem)", textAlign: "center", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: "-40%", left: "50%", width: 400, height: 400, transform: "translateX(-50%)", background: "radial-gradient(circle,rgba(167,139,250,.18),transparent 70%)", pointerEvents: "none" }} />
          <h2 className="e-jakarta" style={{ position: "relative", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.1, margin: "0 0 1rem" }}>Tu punto de partida<br />te está esperando</h2>
          <p style={{ position: "relative", fontSize: "1.05rem", color: "#b4b4cc", lineHeight: 1.6, maxWidth: 480, margin: "0 auto 2rem" }}>Crea tu cuenta gratis y recibe tu primera ruta personalizada en menos de un minuto.</p>
          <form onSubmit={(e) => { e.preventDefault(); setSignedUp(true); }} style={{ position: "relative", display: "flex", gap: ".6rem", maxWidth: 440, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
            <input type="email" required placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, minWidth: 200, background: "#06060e", border: "1px solid #2a2a50", borderRadius: 10, padding: "13px 16px", fontFamily: "var(--font-dm-sans),sans-serif", fontSize: ".92rem", color: "#eeeef5", outline: "none" }} />
            <button type="submit" className="e-btn-primary" style={{ fontSize: ".92rem", fontWeight: 700, color: "#fff", background: V, padding: "13px 24px", borderRadius: 10, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>Empezar gratis</button>
          </form>
          {signedUp && (
            <div style={{ position: "relative", marginTop: "1rem", fontSize: ".85rem", color: G, fontWeight: 600 }}>✓ ¡Listo! Revisa tu correo para tu primera ruta.</div>
          )}
          <div style={{ position: "relative", marginTop: "1rem", fontSize: ".75rem", color: "#55556a" }}>Sin tarjeta · Cancela cuando quieras</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid #17172e", padding: "2.5rem clamp(1rem,4vw,2.5rem)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div className="e-jakarta" style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg,#a78bfa,#22d3ee)", display: "grid", placeItems: "center", fontWeight: 900, fontSize: ".68rem", color: "#fff" }}>N</div>
            <span className="e-jakarta" style={{ fontWeight: 800, fontSize: ".95rem", color: "#9090b8" }}>neona.tech</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[["#como", "Cómo funciona"], ["#tools", "Herramientas"], ["#precios", "Precios"], ["#top", "Entrar"]].map(([href, label]) => (
              <a key={href} href={href} className="e-footlink" style={{ fontSize: ".8rem", color: "#55556a", textDecoration: "none" }}>{label}</a>
            ))}
          </div>
          <div className="e-mono" style={{ fontSize: ".75rem", color: "#55556a" }}>© 2026 neona.tech</div>
        </div>
      </footer>
    </div>
  );
}
