"use client";

import React, { useEffect, useRef, useState } from "react";

interface CardDot {
  active: boolean;
  t: number;
  ci: number;
  toHub: boolean;
  x: number;
  y: number;
  opacity: number;
}

const CARDS = [
  {
    label: "Resume Analysis",
    sub: "AI-powered",
    angle: -90,
    r: 188,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    label: "Job Matching",
    sub: "Intelligent fit",
    angle: -30,
    r: 198,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="11" y1="8" x2="11" y2="14" />
      </svg>
    ),
  },
  {
    label: "Talent Discovery",
    sub: "Smart search",
    angle: 30,
    r: 198,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: "Interview Prep",
    sub: "Practice mode",
    angle: 90,
    r: 188,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    label: "Career Growth",
    sub: "Path insights",
    angle: 150,
    r: 198,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    label: "Skill Assessment",
    sub: "Deep analysis",
    angle: 210,
    r: 188,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    label: "Recruitment Analytics",
    sub: "Live metrics",
    angle: 270,
    r: 196,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const DOTS_COUNT = 18;
const SPEED = 0.55;

export default function HiringEcosystem() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<{ el: HTMLDivElement; state: CardDot }[]>([]);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  const [isSmall, setIsSmall] = useState(false);
  // Hub center — recalculated dynamically in large mode; fixed in small mode
  const hubRef = useRef({ x: 340, y: 280 });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setIsSmall(w < 560);
    });
    observer.observe(wrap);
    setIsSmall(wrap.offsetWidth < 560);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
      // Update hub center for radial layout
      if (!isSmall) {
        hubRef.current = { x: wrap.offsetWidth / 2, y: wrap.offsetHeight / 2 };
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const dots: { el: HTMLDivElement; state: CardDot }[] = [];
    for (let i = 0; i < DOTS_COUNT; i++) {
      const el = document.createElement("div");
      el.style.cssText = `
        position:absolute;width:5px;height:5px;border-radius:50%;
        background:#00C873;pointer-events:none;z-index:20;opacity:0;
        transition:opacity .1s;
      `;
      wrap.appendChild(el);
      const state: CardDot = { active: false, t: 0, ci: 0, toHub: true, x: 0, y: 0, opacity: 0 };
      dots.push({ el, state });
    }
    dotsRef.current = dots;

    const launchDot = (d: { el: HTMLDivElement; state: CardDot }) => {
      d.state.ci = Math.floor(Math.random() * CARDS.length);
      d.state.toHub = Math.random() > 0.35;
      d.state.t = 0;
      d.state.active = true;
      d.el.style.opacity = "0";
    };

    dots.forEach((d, i) => setTimeout(() => launchDot(d), i * 280));

    const frame = (ts: number) => {
      const dt = Math.min(ts - lastRef.current, 32) / 1000;
      lastRef.current = ts;
      const W = canvas.width;
      ctx.clearRect(0, 0, W, canvas.height);

      const HX = hubRef.current.x;
      const HY = hubRef.current.y;

      cardRefs.current.forEach((el) => {
        if (!el || !wrap) return;
        const rect = el.getBoundingClientRect();
        const wRect = wrap.getBoundingClientRect();
        const cx = rect.left - wRect.left + rect.width / 2;
        const cy = rect.top - wRect.top + rect.height / 2;
        ctx.beginPath();
        ctx.moveTo(HX, HY);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = "rgba(0,155,90,0.10)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      dots.forEach((d) => {
        if (!d.state.active) return;
        d.state.t += dt * SPEED;
        if (d.state.t >= 1) {
          d.state.active = false;
          d.el.style.opacity = "0";
          setTimeout(() => launchDot(d), Math.random() * 800 + 200);
          return;
        }
        const card = cardRefs.current[d.state.ci];
        if (!card || !wrap) return;
        const rect = card.getBoundingClientRect();
        const wRect = wrap.getBoundingClientRect();
        const cardCX = rect.left - wRect.left + rect.width / 2;
        const cardCY = rect.top - wRect.top + rect.height / 2;
        const sx = d.state.toHub ? cardCX : HX;
        const sy = d.state.toHub ? cardCY : HY;
        const ex = d.state.toHub ? HX : cardCX;
        const ey = d.state.toHub ? HY : cardCY;
        const t = d.state.t;
        const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const px = sx + (ex - sx) * e;
        const py = sy + (ey - sy) * e;
        const fade = t < 0.1 ? t * 10 : t > 0.85 ? (1 - t) / 0.15 : 1;
        d.el.style.opacity = (fade * 0.9).toFixed(2);
        d.el.style.left = px + "px";
        d.el.style.top = py + "px";
      });

      const t = ts / 1000;
      for (let i = 0; i < 7; i++) {
        const px = 80 + Math.sin(t * 0.4 + i * 1.1) * 260 + i * 70;
        const py = 60 + Math.cos(t * 0.3 + i * 0.9) * 180 + i * 55;
        const alpha = (0.15 + 0.12 * Math.sin(t + i)) * 0.6;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,115,${alpha.toFixed(2)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      dots.forEach((d) => d.el.remove());
    };
  }, [isSmall]);

  // ── SMALL SCREEN: hub on top, cards in grid below ──
  if (isSmall) {
    return (
      <div
        ref={wrapRef}
        style={{ position: "relative", width: "100%", background: "transparent", overflow: "hidden", paddingBottom: 24 }}
      >
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        />

        {/* Hub centred at top */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 32, marginBottom: 24 }}>
          {/* pulse ring */}
          <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1.5px solid rgba(0,200,115,0.4)",
              animation: "hirefella-ring-pulse 2.4s ease-in-out infinite",
            }} />
            <div style={{
              width: 80, height: 80, borderRadius: "50%", background: "#009B5A",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 12px rgba(0,155,90,0.12), 0 0 0 24px rgba(0,155,90,0.06)",
              position: "relative", zIndex: 1,
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
              </svg>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#fff", letterSpacing: "0.05em", marginTop: 3 }}>AI Hub</span>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
          padding: "0 12px",
        }}>
          {CARDS.map((card, i) => (
            <div
              key={card.label}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(0,155,90,0.18)",
                borderRadius: 12,
                padding: "10px 12px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                animation: `hirefella-float 6s ease-in-out ${-i * 0.8}s infinite`,
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                background: "linear-gradient(135deg, #009B5A, #00C873)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#1a2a1e", lineHeight: 1.3 }}>{card.label}</div>
                <div style={{ fontSize: 10, color: "#4a7a5e", marginTop: 1 }}>{card.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes hirefella-ring-pulse {
            0%,100% { transform:scale(1); opacity:.7; }
            50%      { transform:scale(1.4); opacity:0; }
          }
          @keyframes hirefella-float {
            0%,100% { transform: translateY(0px); }
            33%      { transform: translateY(-4px); }
            66%      { transform: translateY(2px); }
          }
        `}</style>
      </div>
    );
  }

  // ── LARGE SCREEN: radial layout (original, but centered dynamically) ──
  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: 560,
        background: "transparent",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Hub ring pulse */}
      <HubRing />

      {/* Hub */}
      <Hub />

      {/* Cards */}
      {CARDS.map((card, i) => {
        const containerWidth = wrapRef.current?.offsetWidth ?? 680;
        const CX = containerWidth / 2;
        const CY = 280;
        const rad = (card.angle * Math.PI) / 180;
        const x = CX + Math.cos(rad) * card.r;
        const y = CY + Math.sin(rad) * card.r;
        const delays = [0, -0.8, -1.5, -2.2, -3, -4, -5];
        const rotations = [-1.2, 1.1, -0.8, 1.3, -0.5, 0.9, -1];
        return (
          <div
            key={card.label}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 145,
              height: 110,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(0,155,90,0.18)",
              borderRadius: 14,
              padding: "12px 14px 10px",
              zIndex: 10,
              transform: `translate(-50%,-50%) rotate(${rotations[i]}deg)`,
              cursor: "default",
              animation: `hirefella-float 6s ease-in-out ${delays[i]}s infinite`,
            }}
          >
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: "linear-gradient(135deg, #009B5A, #00C873)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 7,
            }}>
              {card.icon}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1a2a1e", lineHeight: 1.3, whiteSpace: "nowrap" }}>
              {card.label}
            </div>
            <div style={{ fontSize: 11, color: "#4a7a5e", marginTop: 2 }}>{card.sub}</div>
          </div>
        );
      })}

      <style>{`
        @keyframes hirefella-ring-pulse {
          0%,100% { width:88px; height:88px; opacity:.7; }
          50%      { width:116px; height:116px; opacity:0; }
        }
        @keyframes hirefella-float {
          0%,100% { transform: translate(-50%,-50%) translateY(0px); }
          33%      { transform: translate(-50%,-50%) translateY(-5px); }
          66%      { transform: translate(-50%,-50%) translateY(3px); }
        }
      `}</style>
    </div>
  );
}

// Extracted so they don't re-render on resize
function HubRing() {
  return (
    <div style={{
      position: "absolute",
      left: "50%", top: 280,
      width: 88, height: 88,
      borderRadius: "50%",
      border: "1.5px solid rgba(0,200,115,0.4)",
      transform: "translate(-50%,-50%)",
      zIndex: 9,
      animation: "hirefella-ring-pulse 2.4s ease-in-out infinite",
    }} />
  );
}

function Hub() {
  return (
    <div style={{
      position: "absolute",
      left: "50%", top: 280,
      width: 88, height: 88,
      borderRadius: "50%",
      background: "#009B5A",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      boxShadow: "0 0 0 14px rgba(0,155,90,0.12), 0 0 0 28px rgba(0,155,90,0.06)",
      zIndex: 10,
      transform: "translate(-50%,-50%)",
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
      <span style={{ fontSize: 10, fontWeight: 600, color: "#fff", letterSpacing: "0.05em", marginTop: 4 }}>AI Hub</span>
    </div>
  );
}