import { useState, useEffect } from "react";
import type { ReactNode, CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ════════════════════════════════════════════════════════════════
// JAZZ SEC · ATTACKER — Auditoria ofensiva
// Estética: cinematográfica · red team · terminal · sóbria
// ════════════════════════════════════════════════════════════════

const WHATSAPP = "https://wa.me/5519998102792?text=Ol%C3%A1%2C+quero+solicitar+o+diagn%C3%B3stico+do+Jazz+Sec+Attacker.";
const LANDING = "https://jazz-sec-landing.vercel.app";
const DEFENDER = "https://jazz-sec-defender.vercel.app";

// ── Tokens ─────────────────────────────────────────────────────
const T = {
  bg: "#07070a",
  bg2: "#0c0c10",
  fg: "#f5f4f0",
  fg2: "rgba(245,244,240,0.62)",
  fg3: "rgba(245,244,240,0.36)",
  fg4: "rgba(245,244,240,0.16)",
  line: "rgba(245,244,240,0.08)",
  lineHi: "rgba(245,244,240,0.18)",
  red: "#ff8a52",
  redHi: "#ffb088",
  redDim: "rgba(255,138,82,0.10)",
  sans: "'Inter Tight','Inter',system-ui,sans-serif",
  serif: "'Instrument Serif',Georgia,serif",
  mono: "'JetBrains Mono',ui-monospace,monospace",
};

// ── Hooks ──────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

// ── Atoms ──────────────────────────────────────────────────────
function Mono({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span style={{ fontFamily: T.mono, letterSpacing: "0.04em", ...style }}>{children}</span>;
}

function Serif({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span style={{ fontFamily: T.serif, fontStyle: "italic", ...style }}>{children}</span>;
}

function Eyebrow({ children, color = T.fg3 }: { children: ReactNode; color?: string }) {
  return (
    <div style={{
      fontFamily: T.mono, fontSize: 11, letterSpacing: "0.22em",
      textTransform: "uppercase", color,
      display: "inline-flex", alignItems: "center", gap: 10,
    }}>
      <span style={{ width: 22, height: 1, background: color, opacity: 0.5 }} />
      {children}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >{children}</motion.div>
  );
}

// ── Background atmosférico ─────────────────────────────────────
function Backdrop() {
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 2000], [0, 200]);
  const glow1Y = useTransform(scrollY, [0, 2000], [0, -120]);
  return (
    <>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        opacity: 0.32, mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .14 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
      }} />
      <motion.div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(to right, ${T.line} 1px, transparent 1px), linear-gradient(to bottom, ${T.line} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 80%)",
        y: gridY,
      }} />
      <motion.div style={{
        position: "fixed", top: "-10vh", left: "50%", width: "120vw", height: "80vh",
        zIndex: 0, pointerEvents: "none",
        x: "-50%", y: glow1Y,
        background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,138,82,0.10), transparent 70%)",
      }} />
    </>
  );
}

// ── Nav ────────────────────────────────────────────────────────
function Nav({ y }: { y: number }) {
  const scrolled = y > 40;
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: "20px 32px",
      borderBottom: `1px solid ${scrolled ? T.line : "transparent"}`,
      background: scrolled ? "rgba(7,7,10,0.72)" : "transparent",
      backdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
      transition: "all 320ms ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href={LANDING} style={{ textDecoration: "none", color: T.fg, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 28, height: 28, borderRadius: 6,
            border: `1px solid ${T.lineHi}`,
            display: "grid", placeItems: "center",
            fontFamily: T.mono, fontSize: 12, fontWeight: 700,
            background: "rgba(245,244,240,0.04)",
          }}>JS</span>
          <span style={{ fontFamily: T.sans, fontWeight: 700, fontSize: 15 }}>Jazz Sec</span>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.red, letterSpacing: "0.18em", marginLeft: 6 }}>· ATTACKER</span>
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[
            { l: "Objetivo", h: "#objective" },
            { l: "Escopo", h: "#scope" },
            { l: "Metodologia", h: "#method" },
            { l: "Output", h: "#output" },
          ].map(i => (
            <a key={i.l} href={i.h} style={{
              fontFamily: T.sans, fontSize: 13, color: T.fg2, textDecoration: "none",
            }}>{i.l}</a>
          ))}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: T.sans, fontSize: 13, fontWeight: 600,
            color: T.bg, background: T.red,
            padding: "9px 18px", borderRadius: 999, textDecoration: "none",
          }}>Solicitar diagnóstico →</a>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function Hero({ y }: { y: number }) {
  return (
    <section style={{
      position: "relative", zIndex: 1,
      minHeight: "100vh",
      padding: "180px 32px 60px",
      display: "flex", flexDirection: "column", justifyContent: "center",
      maxWidth: 1280, margin: "0 auto",
    }}>
      <Reveal>
        <Eyebrow color={T.red}>
          <motion.span style={{
            width: 6, height: 6, borderRadius: "50%", background: T.red,
            boxShadow: `0 0 12px ${T.red}`,
          }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
          Red Team · Operação de varredura ativa
        </Eyebrow>
      </Reveal>
      <Reveal delay={0.12}>
        <h1 style={{
          fontFamily: T.sans, fontWeight: 700,
          fontSize: "clamp(56px, 11vw, 168px)",
          lineHeight: 0.92, letterSpacing: "-0.045em",
          color: T.fg, margin: "32px 0 0",
          transform: `translateY(${-y * 0.05}px)`,
        }}>
          Vemos o que eles<br/>
          veriam — <Serif style={{ color: T.red, fontWeight: 400 }}>antes que vejam.</Serif>
        </h1>
      </Reveal>
      <Reveal delay={0.24}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, marginTop: 64, alignItems: "end" }}>
          <p style={{
            fontFamily: T.sans, fontSize: "clamp(15px, 1.4vw, 18px)",
            color: T.fg2, lineHeight: 1.6, maxWidth: 560,
          }}>
            Mapeamos a superfície de ataque pública da sua operação usando a mesma metodologia
            que adversários reais usam — recon automatizado, identificação de CVEs ativos,
            credenciais expostas e configurações inseguras. Sem injeção, sem ruído, sem
            impacto operacional. Você recebe o relatório priorizado por risco em até 24h.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: T.sans, fontSize: 14, fontWeight: 600,
              color: T.bg, background: T.red,
              padding: "16px 24px", borderRadius: 999, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10, justifyContent: "center",
            }}>Solicitar diagnóstico <span style={{ fontFamily: T.mono, fontSize: 11 }}>→</span></a>
            <a href="#method" style={{
              fontFamily: T.sans, fontSize: 14, fontWeight: 500,
              color: T.fg, border: `1px solid ${T.lineHi}`,
              padding: "15px 24px", borderRadius: 999,
              textDecoration: "none", textAlign: "center",
            }}>Ver metodologia</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── Live scan feed (mock cinematográfico) ──────────────────────
function ScanFeed() {
  const lines = [
    "› RECON · resolving DNS · 247 records",
    "› ENUM · subdomain wordlist · 12,043 entries",
    "› HTTP · 81 hosts responding · cataloguing",
    "› TECH · Apache/2.4.41 · Nginx/1.18 · IIS/10",
    "› CMS · WordPress 6.2.4 · plugins: woocommerce 7.4.1",
    "› SCAN · 24 plugins · 11 active CVEs detected",
    "› AUTH · /wp-admin · /api/v1/auth · /actuator",
    "› JWT · none-alg · RS256→HS256 · jwk injection",
    "› API · GraphQL exposed · introspection allowed",
    "› STORAGE · S3 bucket discovered · ACL: public-read",
    "› SECRET · .env exposed via .well-known/.env",
    "› GIT · .git/HEAD accessible · branch leak",
    "› CONFIG · CORS: * · headers missing CSP, HSTS",
    "› CRED · 7 emails on breach dump · 2 reused",
    "› REPORT · consolidating · severity matrix",
    "› DELIVERY · WhatsApp · operator notified",
  ];
  return (
    <section style={{
      position: "relative", zIndex: 1,
      borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`,
      background: "rgba(12,12,16,0.5)",
      padding: "20px 0", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", gap: 0,
        animation: "scanRoll 95s linear infinite",
        width: "max-content",
      }}>
        {[...lines, ...lines, ...lines].map((it, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "0 28px",
            fontFamily: T.mono, fontSize: 12, color: T.fg2,
            whiteSpace: "nowrap",
          }}>
            <span style={{ color: T.red }}>●</span>
            {it}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section wrapper ────────────────────────────────────────────
function Section({ id, n, label, title, sub, children }: {
  id?: string; n: string; label: string; title: ReactNode; sub?: string; children: ReactNode;
}) {
  return (
    <section id={id} style={{
      position: "relative", zIndex: 1,
      padding: "140px 32px", maxWidth: 1280, margin: "0 auto",
    }}>
      <Reveal>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80,
          paddingBottom: 64, borderBottom: `1px solid ${T.line}`, marginBottom: 64,
          alignItems: "end",
        }}>
          <div>
            <Mono style={{ fontSize: 11, color: T.fg3, letterSpacing: "0.22em" }}>ATO {n}</Mono>
            <div style={{
              fontFamily: T.mono, fontSize: 11, color: T.red,
              letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 12,
            }}>{label}</div>
          </div>
          <div>
            <h2 style={{
              fontFamily: T.sans, fontWeight: 700,
              fontSize: "clamp(34px, 5vw, 60px)",
              lineHeight: 1.02, letterSpacing: "-0.035em",
              color: T.fg, margin: 0,
            }}>{title}</h2>
            {sub && (
              <p style={{
                fontFamily: T.sans, fontSize: 16, color: T.fg2,
                lineHeight: 1.6, marginTop: 24, maxWidth: 560,
              }}>{sub}</p>
            )}
          </div>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

// ── ATO 01 · Objective ─────────────────────────────────────────
function Objective() {
  const items = [
    { t: "Exposição inadvertida", d: "Painéis administrativos esquecidos, ambientes de staging públicos, dashboards sem auth — o tipo de coisa que ninguém lembra que existe até alguém encontrar." },
    { t: "CVEs ativos não corrigidos", d: "Frameworks e plugins desatualizados rodando com vulnerabilidades públicas que têm exploit conhecido. WordPress, Spring Boot, Laravel, Next.js." },
    { t: "Configurações inseguras", d: "CORS aberto, headers críticos ausentes (CSP, HSTS, X-Frame-Options), buckets S3 com ACL pública, .env e .git acessíveis via HTTP." },
    { t: "Credenciais e segredos vazados", d: "Tokens em sourcemaps, API keys hardcoded em JS, emails da empresa em breach databases, padrões reutilizados em múltiplos serviços." },
    { t: "Lógica exposta", d: "APIs sem rate limit, endpoints internos sem autorização (BOLA/BFLA), endpoints de webhook sem verificação de assinatura, GraphQL com introspection ligada." },
    { t: "Infraestrutura cinza", d: "Domínios e subdomínios esquecidos, takeover potencial (CNAME apontando para serviços expirados), DNS misconfigurations." },
  ];
  return (
    <Section
      id="objective"
      n="01"
      label="Objetivo"
      title={<>O que <Serif style={{ color: T.red, fontWeight: 400 }}>de fato</Serif>{"\n"}procuramos.</>}
      sub="Auditoria ofensiva não é varredura genérica de antivírus. Procuramos os vetores que adversários reais exploram para conseguir foothold inicial em uma operação."
    >
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        borderTop: `1px solid ${T.line}`,
      }}>
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div style={{
              padding: "32px 28px",
              borderRight: i % 3 !== 2 ? `1px solid ${T.line}` : "none",
              borderBottom: `1px solid ${T.line}`,
              minHeight: 200,
            }}>
              <Mono style={{ fontSize: 10, color: T.red, letterSpacing: "0.22em" }}>VECTOR · 0{i + 1}</Mono>
              <h4 style={{
                fontFamily: T.sans, fontWeight: 700, fontSize: 19,
                color: T.fg, margin: "16px 0 12px", letterSpacing: "-0.015em",
                lineHeight: 1.2,
              }}>{it.t}</h4>
              <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.fg2, lineHeight: 1.65 }}>{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── ATO 02 · Scope (superfície coberta) ────────────────────────
function Scope() {
  const blocks = [
    { title: "Aplicação Web", tags: ["WordPress", "Spring Boot", "Django", "Laravel", "Next.js", "Express", "Rails", "FastAPI"] },
    { title: "API & Serviços", tags: ["REST", "GraphQL", "gRPC", "WebSocket", "OAuth/OIDC", "SAML", "JWT", "Webhooks"] },
    { title: "Infra & Cloud", tags: ["AWS S3", "GCP Storage", "Azure Blob", "Redis", "Kubernetes", "Docker", "Cloudflare", "CDN edge"] },
    { title: "DevOps & Secrets", tags: [".env", ".git", "sourcemaps", "Actuator", "Swagger", "Robots.txt", "Sitemap", "Backup files"] },
  ];
  return (
    <Section
      id="scope"
      n="02"
      label="Escopo"
      title={<>Superfície <Serif style={{ color: T.red, fontWeight: 400 }}>coberta.</Serif></>}
      sub="A varredura cobre toda a stack que normalmente fica exposta publicamente — aplicação, APIs, infra e DevOps."
    >
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 1, background: T.line,
        border: `1px solid ${T.line}`, borderRadius: 12, overflow: "hidden",
      }}>
        {blocks.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.06}>
            <div style={{
              background: T.bg, padding: "32px 28px",
              minHeight: 220,
            }}>
              <Mono style={{ fontSize: 10, color: T.red, letterSpacing: "0.22em" }}>BLOCO · 0{i + 1}</Mono>
              <h4 style={{
                fontFamily: T.sans, fontWeight: 700, fontSize: 22,
                color: T.fg, margin: "14px 0 22px", letterSpacing: "-0.02em",
              }}>{b.title}</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {b.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: T.mono, fontSize: 11, color: T.fg2,
                    padding: "5px 11px", border: `1px solid ${T.line}`,
                    borderRadius: 999, letterSpacing: "0.04em",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── ATO 03 · Methodology ───────────────────────────────────────
function Methodology() {
  const steps = [
    {
      n: "01", t: "Briefing & escopo",
      d: "Você informa o domínio e o contexto operacional. Assinamos NDA. Escopo é definido em conjunto — sem zona cinzenta, sem surpresa.",
      bullets: ["Domínio principal e subdomínios autorizados", "Janela de execução", "NDA assinado antes de qualquer dado técnico"],
    },
    {
      n: "02", t: "Reconnaissance",
      d: "Enumeração passiva de assets — DNS, certificados, BGP, third-party leaks. A varredura é externa; nada é tocado dentro do seu perímetro.",
      bullets: ["Subdomain discovery (CT logs, DNS bruteforce, OSINT)", "Identificação de stack (fingerprinting passivo)", "Map de portas e serviços públicos"],
    },
    {
      n: "03", t: "Enumeration & análise",
      d: "Varredura ativa controlada sobre os assets identificados. Sem injeção, sem teste de carga, sem payload destrutivo — apenas verificação.",
      bullets: ["Conferência de CVEs ativos por versão detectada", "Análise de headers, CORS, cookies, JWT", "Inspeção de .env, .git, sourcemaps, robots, sitemap"],
    },
    {
      n: "04", t: "Triagem & priorização",
      d: "Cada achado é validado, falso positivo é descartado e a lista é organizada por criticidade. Acompanha plano de correção por item.",
      bullets: ["Classificação CVSS v4 / Crítico, Alto, Médio, Baixo", "Plano de correção priorizado", "Sumário executivo + relatório técnico"],
    },
    {
      n: "05", t: "Apresentação",
      d: "Em até 24h após o início, nossa equipe entra em contato via WhatsApp para agendar a reunião de apresentação dos resultados.",
      bullets: ["Reunião de 45-60 min com o time técnico", "Sumário separado para liderança", "Q&A direto com quem fez a varredura"],
    },
  ];
  return (
    <Section
      id="method"
      n="03"
      label="Metodologia"
      title={<>Cinco passos.{"\n"}<Serif style={{ color: T.red, fontWeight: 400 }}>Vinte e quatro horas.</Serif></>}
      sub="Processo 100% remoto. Sem instalar nada, sem liberar acesso a servidores, sem reunião antes do contrato. Você fala com a gente, assina o NDA, e a operação começa."
    >
      <div style={{ borderTop: `1px solid ${T.line}` }}>
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <div style={{
              display: "grid", gridTemplateColumns: "100px 1fr 1.6fr",
              gap: 32, padding: "40px 0",
              borderBottom: `1px solid ${T.line}`, alignItems: "start",
            }}>
              <Mono style={{ fontSize: 13, color: T.red, letterSpacing: "0.22em" }}>{s.n}</Mono>
              <h4 style={{
                fontFamily: T.sans, fontWeight: 700, fontSize: 22,
                color: T.fg, letterSpacing: "-0.02em", margin: 0,
              }}>{s.t}</h4>
              <div>
                <p style={{ fontFamily: T.sans, fontSize: 14.5, color: T.fg2, lineHeight: 1.65, marginBottom: 16 }}>{s.d}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {s.bullets.map(b => (
                    <li key={b} style={{
                      display: "flex", gap: 12, alignItems: "flex-start",
                      padding: "6px 0",
                      fontFamily: T.mono, fontSize: 12, color: T.fg2,
                    }}>
                      <span style={{ color: T.red, marginTop: 2 }}>›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── ATO 04 · Output (preview de relatório) ─────────────────────
function Output() {
  return (
    <Section
      id="output"
      n="04"
      label="Output"
      title={<>O relatório que você <Serif style={{ color: T.red, fontWeight: 400 }}>recebe.</Serif></>}
      sub="Duas versões — uma técnica para o time de TI, uma executiva para a liderança. PDF, criptografado, entregue por canal direto. Trecho ilustrativo abaixo."
    >
      <Reveal>
        <div style={{
          border: `1px solid ${T.line}`, borderRadius: 16,
          background: T.bg2,
          fontFamily: T.mono, fontSize: 13, color: T.fg2,
          overflow: "hidden",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 24px", borderBottom: `1px solid ${T.line}`,
            fontFamily: T.mono, fontSize: 11, color: T.fg3, letterSpacing: "0.22em",
          }}>
            <span>JAZZ-SEC-RPT · 2026-Q2 · CONFIDENCIAL</span>
            <span style={{ color: T.red }}>● 14 ACHADOS</span>
          </div>
          <div style={{ padding: "32px 36px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
              {[
                { l: "CRÍTICO", v: "02", c: "#ff5a5a" },
                { l: "ALTO", v: "04", c: T.red },
                { l: "MÉDIO", v: "05", c: "#f5d56b" },
                { l: "BAIXO", v: "03", c: "#a3a39a" },
              ].map(it => (
                <div key={it.l} style={{
                  padding: "16px 18px", border: `1px solid ${T.line}`, borderRadius: 8,
                  background: "rgba(245,244,240,0.02)",
                }}>
                  <div style={{ fontSize: 10, color: it.c, letterSpacing: "0.22em" }}>{it.l}</div>
                  <div style={{
                    fontFamily: T.sans, fontWeight: 700, fontSize: 32,
                    color: T.fg, marginTop: 8, letterSpacing: "-0.03em",
                  }}>{it.v}</div>
                </div>
              ))}
            </div>
            <pre style={{
              fontFamily: T.mono, fontSize: 12.5, color: T.fg2,
              lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0,
            }}>
{`# JS-2026-Q2-001 [CRÍTICO]
  Achado:    Server-Side Request Forgery (SSRF) via parâmetro 'url'
  Endpoint:  POST /api/v1/integrations/fetch
  Vetor:     Atacante pode forçar requisições internas a partir do servidor,
             alcançando metadados da instância (IMDS) na AWS.
  Impacto:   Comprometimento de credenciais IAM. Acesso total à conta cloud.
  Prova:     Validamos resposta 200 com payload http://169.254.169.254/latest/meta-data
  Correção:  Implementar lista de permissão (allowlist) de hosts no parâmetro 'url'.
             Bloquear ranges privados (RFC 1918, link-local, IMDS).
  Esforço:   2-4h dev · 1h QA

# JS-2026-Q2-004 [ALTO]
  Achado:    Credenciais expostas em arquivo .env público
  URL:       https://staging.cliente.com.br/.env
  Vetor:     Arquivo .env servido pelo webserver. Contém AWS_SECRET_KEY,
             DATABASE_URL e JWT_SECRET em texto claro.
  Correção:  Bloquear servimento de arquivos dotfiles no webserver. Rotacionar
             todos os segredos expostos imediatamente.
  Esforço:   30min ops + rotação de segredos`}
            </pre>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

// ── ATO 05 · Custody ───────────────────────────────────────────
function Custody() {
  const items = [
    { t: "Varredura não invasiva", d: "Atuamos sobre o que está exposto publicamente. Sem injeção, sem teste de carga, sem payload destrutivo." },
    { t: "NDA antes do primeiro byte", d: "Confidencialidade contratual assinada antes de qualquer informação técnica ser trocada." },
    { t: "Zero retenção pós-entrega", d: "Concluído o diagnóstico, os artefatos coletados são destruídos. Nada vai para training, nada é compartilhado." },
    { t: "Conformidade LGPD por design", d: "Nenhum dado pessoal é coletado durante a varredura externa. Atuamos dentro do escopo autorizado." },
  ];
  return (
    <Section
      id="custody"
      n="05"
      label="Cadeia de Custódia"
      title={<>Seu nome, suas brechas,{"\n"}<Serif style={{ color: T.red, fontWeight: 400 }}>seus arquivos.</Serif></>}
      sub="A confiança vem antes do contrato. Estas são as regras de operação — explicadas antes, cumpridas durante, auditáveis depois."
    >
      <Reveal>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          borderTop: `1px solid ${T.line}`,
        }}>
          {items.map((it, i) => (
            <div key={i} style={{
              padding: "36px 28px",
              borderRight: i < items.length - 1 ? `1px solid ${T.line}` : "none",
              borderBottom: `1px solid ${T.line}`,
            }}>
              <Mono style={{ fontSize: 10, color: T.red, letterSpacing: "0.22em" }}>0{i + 1} · CUSTÓDIA</Mono>
              <h4 style={{
                fontFamily: T.sans, fontWeight: 700, fontSize: 18,
                color: T.fg, margin: "16px 0 12px", letterSpacing: "-0.015em",
                lineHeight: 1.25,
              }}>{it.t}</h4>
              <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.fg2, lineHeight: 1.65, margin: 0 }}>{it.d}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

// ── ATO 06 · Request (CTA) ─────────────────────────────────────
function Request() {
  return (
    <section id="request" style={{
      position: "relative", zIndex: 1,
      padding: "120px 32px 160px",
      maxWidth: 1280, margin: "0 auto",
    }}>
      <Reveal>
        <div style={{
          padding: "80px 60px",
          border: `1px solid ${T.line}`, borderRadius: 24,
          background: "linear-gradient(180deg, rgba(255,138,82,0.06), rgba(255,138,82,0.0))",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,138,82,0.12), transparent 60%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", textAlign: "center" }}>
            <Eyebrow color={T.red}>Próximo passo</Eyebrow>
            <h2 style={{
              fontFamily: T.sans, fontWeight: 700,
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 1.02, letterSpacing: "-0.04em",
              color: T.fg, margin: "32px auto 24px", maxWidth: 880,
            }}>
              Você diz o domínio.<br/>
              <Serif style={{ color: T.red, fontWeight: 400 }}>A gente faz o resto.</Serif>
            </h2>
            <p style={{
              fontFamily: T.sans, fontSize: 17, color: T.fg2,
              lineHeight: 1.6, maxWidth: 560, margin: "0 auto 40px",
            }}>
              Solicite o diagnóstico via WhatsApp. Em até 24h nossa equipe retorna
              com o NDA, escopo e janela de execução. O relatório consolidado é
              entregue na sequência.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
                padding: "18px 32px", borderRadius: 999,
                background: T.red, color: T.bg, textDecoration: "none",
                fontFamily: T.sans, fontWeight: 600, fontSize: 15,
                display: "inline-flex", alignItems: "center", gap: 10,
              }}>Solicitar pelo WhatsApp <span style={{ fontFamily: T.mono, fontSize: 12 }}>→</span></a>
              <a href={LANDING} style={{
                padding: "17px 32px", borderRadius: 999,
                border: `1px solid ${T.lineHi}`, color: T.fg,
                textDecoration: "none", background: "transparent",
                fontFamily: T.sans, fontWeight: 500, fontSize: 15,
              }}>Voltar à operação</a>
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
              maxWidth: 720, margin: "0 auto",
              paddingTop: 40, borderTop: `1px solid ${T.line}`,
            }}>
              {[
                { v: "<24h", l: "primeiro retorno" },
                { v: "NDA", l: "antes do dado" },
                { v: "Zero", l: "retenção pós" },
                { v: "100%", l: "remoto" },
              ].map(it => (
                <div key={it.l}>
                  <div style={{ fontFamily: T.sans, fontWeight: 700, fontSize: 22, color: T.fg, letterSpacing: "-0.025em" }}>{it.v}</div>
                  <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fg3, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 4 }}>{it.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      position: "relative", zIndex: 1,
      padding: "40px 32px",
      borderTop: `1px solid ${T.line}`,
      maxWidth: 1280, margin: "0 auto",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 16,
    }}>
      <a href={LANDING} style={{
        display: "flex", alignItems: "center", gap: 10,
        color: T.fg, textDecoration: "none",
      }}>
        <span style={{
          width: 26, height: 26, borderRadius: 6,
          border: `1px solid ${T.lineHi}`, display: "grid", placeItems: "center",
          fontFamily: T.mono, fontSize: 11, fontWeight: 700,
          background: "rgba(245,244,240,0.04)",
        }}>JS</span>
        <span style={{ fontFamily: T.sans, fontWeight: 700, fontSize: 14 }}>Jazz Sec · Attacker</span>
      </a>
      <div style={{ display: "flex", gap: 24 }}>
        <a href={DEFENDER} style={{ fontFamily: T.sans, fontSize: 13, color: T.fg2, textDecoration: "none" }}>Defender</a>
        <a href={LANDING} style={{ fontFamily: T.sans, fontSize: 13, color: T.fg2, textDecoration: "none" }}>Operação</a>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ fontFamily: T.sans, fontSize: 13, color: T.fg2, textDecoration: "none" }}>WhatsApp</a>
      </div>
      <Mono style={{ fontSize: 10, color: T.fg3, letterSpacing: "0.18em" }}>© 2026 JAZZ AUTOMATIONS</Mono>
    </footer>
  );
}

// ── Root ───────────────────────────────────────────────────────
export default function App() {
  const y = useScrollY();
  return (
    <div style={{
      background: T.bg, minHeight: "100vh", color: T.fg,
      fontFamily: T.sans, overflowX: "hidden",
    }}>
      <style>{`
        @keyframes scanRoll{from{transform:translateX(0);}to{transform:translateX(-33.333%);}}
        a{transition:opacity 200ms,color 200ms,background 200ms,border-color 200ms;}
        a:hover{opacity:0.92;}
      `}</style>
      <Backdrop />
      <Nav y={y} />
      <Hero y={y} />
      <ScanFeed />
      <Objective />
      <Scope />
      <Methodology />
      <Output />
      <Custody />
      <Request />
      <Footer />
    </div>
  );
}
