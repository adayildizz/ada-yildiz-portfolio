"use client";

import ShaderBg from "@/components/shader-bg";
import { useRef, useEffect, useState } from "react";

/* ── Projects ──────────────────────────────────────────────── */
const projects = [
  {
    id: "001",
    title: "SPH Fluid Simulation",
    year: "2026",
    problem: "Screen-space rendering pipeline for real-time fluid simulation, implementing NVIDIA's position-based fluids paper. Bilateral blur for surface smoothing, depth-based rendering for a physically plausible appearance.",
    tech: ["C++", "OpenGL", "GLSL", "CUDA"],
    note: "ongoing",
    video: null,
  },
  {
    id: "002",
    title: "Interactive World Builder",
    year: "2025",
    problem: "Real-time 3D world builder with terrain generation, dynamic lighting & shadows, water rendering with reflection/refraction, object placement, and raycasting for interaction.",
    tech: ["C++", "OpenGL", "GLSL"],
    note: null,
    video: "/videos/buildingsimulationvideo.mp4",
  },
  {
    id: "003",
    title: "RAM — Random Access Melody",
    year: "2025",
    problem: "Real-time AI music streaming platform. Google Lyria model integrated via WebSocket streaming, Redis session management for concurrent requests. Text prompt to continuous audio, no buffering.",
    tech: ["GenAI", "Lyria", "WebSocket", "Redis"],
    note: "4th place, Stellar Rise-in Web3 Hackathon",
    video: null,
  },
  {
    id: "004",
    title: "Electroactive Haptic Feedback",
    year: "2026",
    problem: "Haptic feedback system for accessible data visualization on an electrovibration touchscreen for visually impaired users. Three encoding strategies (frequency, amplitude, texture-based) comparatively tested.",
    tech: ["Python", "Pygame", "PyVISA"],
    note: "Koç University RML Lab",
    video: null,
  },
  {
    id: "005",
    title: "PhysioTracker",
    year: "2026",
    problem: "End-to-end remote physical therapy monitoring system. Mobile app for patients, web dashboard for practitioners. Real-time joint angle computation via MediaPipe BlazePose with threshold-based exercise evaluation.",
    tech: ["React Native", "FastAPI", "MediaPipe", "MySQL"],
    note: "Capstone Project",
    video: "/videos/physiotrackervideo.mp4",
  },
  {
    id: "006",
    title: "Rubik's Cube 3D",
    year: "2025",
    problem: "Interactive Rubik's Cube simulation with instanced rendering, Phong shading, smooth animations, and full camera & cube manipulation.",
    tech: ["C++", "OpenGL"],
    note: null,
    video: null,
  },
];

/* ── Experience ────────────────────────────────────────────── */
const experiences = [
  {
    role: "Research Assistant",
    place: "Robotics & Mechatronics Lab (RML), Koç University",
    year: "Mar 2026 — Present",
    desc: "Developing a haptic feedback system for accessible data visualization on an electrovibration touchscreen for visually impaired users. Supervisor: Prof. Çağatay Başdoğan.",
    key: "rml",
  },
  {
    role: "Software Dev. Intern",
    place: "Genarion",
    year: "Feb 2025 — Jun 2025",
    desc: "Integrated and fine-tuned visual language models (Qwen2.5-vl, Minicpm) for project-specific domains. Built data pipelines and prompt systems for multimodal tasks.",
    key: "genarion",
  },
  {
    role: "Backend Dev. Intern",
    place: "Azerion Turkey",
    year: "Aug 2024 — Oct 2024",
    desc: "Contributed to the relaunch of the Game Distribution Platform — backend redevelopment and monetization API integration.",
    key: "azerion-2024",
  },
  {
    role: "Corporate Relations Co-Leader",
    place: "KU ACM",
    year: "May 2024 — May 2025",
    desc: "Coordinated partnerships with tech companies for student career growth. Organized events bridging academia and industry in AI and game development.",
    key: "kuacm",
  },
  {
    role: "Backend Dev. Intern",
    place: "Azerion Turkey",
    year: "Mar 2023 — Oct 2023",
    desc: "Developed and maintained backend features for the Game Distribution Platform.",
    key: "azerion-2023",
  },
];

/* ── Project card (pure display, no hover logic) ───────────── */
function ProjectCard({ project, showVideo }: { project: (typeof projects)[0]; showVideo: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (showVideo) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [showVideo]);

  return (
    <div style={{ minWidth: "100%", padding: "2.5rem 2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
        <span style={{ fontSize: "0.65rem", color: "var(--dim)", letterSpacing: "0.1em" }}>{project.id}</span>
        <span style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", fontWeight: 500, color: "var(--text)", flex: 1 }}>{project.title}</span>
        <span style={{ fontSize: "0.7rem", color: "var(--dim)" }}>{project.year}</span>
      </div>
      <p style={{ fontSize: "0.85rem", color: "var(--dim)", lineHeight: 1.75, maxWidth: "640px" }}>{project.problem}</p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {project.tech.map((t) => (
          <span key={t} style={{ fontSize: "0.65rem", color: "var(--amber)", letterSpacing: "0.05em" }}>[{t}]</span>
        ))}
        {project.note && (
          <span style={{ fontSize: "0.65rem", color: "var(--dim)", letterSpacing: "0.03em" }}>— {project.note}</span>
        )}
      </div>
      {project.video && (
        <div style={{ overflow: "hidden", maxHeight: showVideo ? "500px" : "0px", transition: "max-height 0.4s ease" }}>
          <video ref={videoRef} src={project.video} muted loop playsInline controls
            style={{ width: "100%", display: "block", border: "1px solid var(--border)", background: "#050a14" }} />
        </div>
      )}
    </div>
  );
}

/* ── Projects carousel ─────────────────────────────────────── */
function ProjectsCarousel() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const total = projects.length;
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const handleMouseEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(true);
  };
  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setHovered(false), 150);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", position: "relative" }}
    >
      {/* top bar: dots left, arrows right — fixed position, never moves */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 1.25rem", borderBottom: "none" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {projects.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} style={{
              width: i === index ? "1.5rem" : "0.4rem",
              height: "0.4rem", borderRadius: "2px",
              background: i === index ? "var(--amber)" : "var(--border)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.3s ease, background 0.2s ease",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[{ fn: prev, label: "←" }, { fn: next, label: "→" }].map(({ fn, label }) => (
            <button key={label} onClick={fn} style={{
              background: "none", border: "1px solid var(--border)", color: "var(--dim)",
              cursor: "pointer", padding: "0.3rem 0.75rem", fontSize: "0.85rem",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--amber)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--dim)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* slides */}
      <div style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", transform: `translateX(-${index * 100}%)`, transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} showVideo={hovered && i === index && !!p.video} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────── */
function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ position: "relative", zIndex: 1, paddingTop: "8rem", paddingBottom: "6rem", paddingLeft: "clamp(1.5rem, 5vw, 4rem)", paddingRight: "clamp(1.5rem, 5vw, 4rem)", maxWidth: "900px", margin: "0 auto" }}>
      <p style={{ fontSize: "0.7rem", color: "var(--dim)", letterSpacing: "0.1em", marginBottom: "2.5rem" }}>#{label}</p>
      {children}
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* HOME */}
      <section id="home" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <ShaderBg />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 2rem" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 500, letterSpacing: "0.02em", color: "var(--amber)", marginBottom: "1rem" }}>
              Ada Yıldız
            </h1>
            <p style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)", color: "var(--dim)", letterSpacing: "0.05em" }}>
              Computer Engineer. GPU systems, graphics,<span className="cursor">_</span>
            </p>
          </div>
        </div>
      </section>

      <div style={{ background: "var(--bg)" }}>

        {/* ABOUT */}
        <Section id="about" label="about">
          <div style={{ display: "grid", gap: "1.25rem", maxWidth: "620px" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.85 }}>
              Computer Engineering student at Koç University, specializing in graphics programming and AI systems.
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--dim)", lineHeight: 1.85 }}>
              I build real-time 3D rendering engines, haptic interfaces, and distributed AI applications. Currently deepening expertise in GPU programming and neural rendering.
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--dim)", lineHeight: 1.85 }}>
              Anatolian Scholar at Koç University — full tuition, housing, and stipend. Erasmus exchange at IT University of Copenhagen, 2025–2026.
            </p>
          </div>
        </Section>

        {/* WORK */}
        <Section id="work" label="work">
          <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 400, color: "var(--text)", marginBottom: "3rem" }}>
            Selected projects
          </h2>
          <ProjectsCarousel />
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" label="experience">
          <div style={{ display: "grid", gap: "2.25rem" }}>
            {experiences.map((e) => (
              <div key={e.key} style={{ borderLeft: "2px solid var(--border)", paddingLeft: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.3rem", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.9rem", color: "var(--text)", fontWeight: 500 }}>{e.role}</span>
                  <span style={{ fontSize: "0.65rem", color: "var(--dim)", letterSpacing: "0.05em", flexShrink: 0 }}>{e.year}</span>
                </div>
                <p style={{ fontSize: "0.7rem", color: "var(--amber)", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>{e.place}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--dim)", lineHeight: 1.65 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </>
  );
}
