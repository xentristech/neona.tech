"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import TechMarquee from "./components/TechMarquee";

const services = ["Productos con IA", "IA + Datos", "SEO con IA"];

export default function Home() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (!input.value || !input.checkValidity()) {
      input.focus();
      return;
    }
    // Sin backend todavía: guardamos localmente mientras se conecta el endpoint.
    // TODO: conectar a un handler real (PHP en Hostinger o servicio de formularios).
    try {
      const list = JSON.parse(localStorage.getItem("neona_leads") || "[]");
      list.push({ email: input.value, ts: Date.now() });
      localStorage.setItem("neona_leads", JSON.stringify(list));
    } catch {}
    setSent(true);
    setEmail("");
  }

  return (
    <>
      <div className="aurora" aria-hidden>
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="veil" aria-hidden />

      <div className="relative z-[2] mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-5 py-6 sm:px-8 sm:py-8">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br from-[var(--violet)] to-[var(--accent)] text-[15px] font-extrabold text-white shadow-[0_6px_20px_rgba(34,211,238,0.25)]">
              N
            </span>
            <span className="text-[17px] font-semibold tracking-tight">
              neona<span className="font-normal text-[var(--muted)]">.tech</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-2 text-[12.5px] text-[var(--muted)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            En construcción
          </span>
        </header>

        {/* Hero */}
        <motion.main
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col justify-center py-[8vh]"
        >
          <motion.p
            variants={item}
            className="m-0 text-sm tracking-wide text-[var(--muted)]"
          >
            Un nuevo estudio de inteligencia artificial
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 max-w-[16ch] text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl lg:text-[5.2rem]"
          >
            Algo <span className="grad">inteligente</span>
            <br />
            está por llegar.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--muted)] sm:text-xl"
          >
            Productos con IA, datos que deciden y SEO para la nueva era de la
            búsqueda. Estamos afinando cada detalle. Muy pronto.
          </motion.p>

          {/* Chips de servicios */}
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-2.5">
            {services.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                {s}
              </span>
            ))}
          </motion.div>

          {/* Captura de correo */}
          <motion.div variants={item} className="mt-10 max-w-[480px]">
            <label
              htmlFor="email"
              className="mb-2.5 block text-[13px] text-[var(--muted)]"
            >
              Déjanos tu correo y te avisamos el día del lanzamiento
            </label>
            <form onSubmit={handleSubmit} noValidate className="flex flex-wrap gap-2.5">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                autoComplete="email"
                className="min-w-[200px] flex-1 rounded-xl border border-white/10 bg-[var(--bg-soft)] px-4 py-3.5 text-[15px] text-[var(--ink)] outline-none transition placeholder:text-[#616a80] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-soft)]"
              />
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-[var(--accent)] px-6 py-3.5 text-[15px] font-semibold text-[#04121a] transition hover:brightness-110 active:translate-y-px active:scale-[0.98]"
              >
                Avísame
              </button>
            </form>
            {sent && (
              <p className="mt-3 text-sm text-[var(--accent)]">
                Listo. Serás de los primeros en saberlo.
              </p>
            )}
          </motion.div>
        </motion.main>

        {/* Muro de tecnologías */}
        <motion.section
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/[0.06] pt-10 pb-6"
        >
          <p className="mb-6 text-center text-[13px] tracking-wide text-[var(--muted)]">
            Trabajamos con lo mejor del ecosistema de IA y datos
          </p>
          <TechMarquee />
        </motion.section>

        {/* Footer */}
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-[13px] text-[var(--muted)]">
          <span>© 2026 neona.tech · En construcción</span>
          <a
            href="mailto:hola@neona.tech"
            className="transition-colors hover:text-[var(--ink)]"
          >
            hola@neona.tech
          </a>
        </footer>
      </div>
    </>
  );
}
