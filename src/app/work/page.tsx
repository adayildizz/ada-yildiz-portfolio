"use client";

import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: "001",
    title: "SPH Fluid Simulation",
    year: "2024",
    category: "Graphics",
    problem:
      "Screen-space rendering pipeline for real-time fluid simulation, implementing NVIDIA's position-based fluids paper.",
    tech: ["C++", "OpenGL", "GLSL", "CUDA"],
    note: null,
    video: null,
  },
  {
    id: "002",
    title: "Interactive World Builder",
    year: "2024",
    category: "Graphics",
    problem:
      "Real-time terrain generation with water rendering and raycasting — a rendering engine built from scratch in OpenGL.",
    tech: ["C++", "OpenGL", "GLSL"],
    note: null,
    video: null,
  },
  {
    id: "003",
    title: "RAM — Random Access Melody",
    year: "2025",
    category: "AI × Music",
    problem:
      "Text prompt to continuous AI-generated audio stream, no buffering. Llama-3 for semantic parsing, experimental music model for real-time synthesis.",
    tech: ["GenAI", "Llama-3", "Web3"],
    note: "4th place, Stellar Rise-in Web3 Hackathon",
    video: null,
  },
  {
    id: "004",
    title: "Electroactive Haptic Feedback",
    year: "2025",
    category: "Research × HCI",
    problem:
      "Translates visual data properties — bar height, color intensity, slice size — into electrical haptic signals via a VISA-compatible signal generator, in real time.",
    tech: ["Python", "Pygame", "PyVISA"],
    note: "Koç University RML Lab",
    video: null,
  },
];

export default function Work() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeProject = projects.find((p) => p.id === hovered);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (hovered && activeProject?.video) {
      timerRef.current = setTimeout(() => setVisible(true), 80);
    } else {
      setVisible(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hovered, activeProject]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (visible && activeProject?.video) {
      video.load();
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [visible, activeProject]);

  return (
    <main
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        paddingTop: "8rem",
        paddingBottom: "4rem",
        paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
        paddingRight: "clamp(1.5rem, 5vw, 4rem)",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <header style={{ marginBottom: "4rem" }}>
        <p
          style={{
            fontSize: "0.7rem",
            color: "var(--dim)",
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
          }}
        >
          WORK
        </p>
        <h1
          style={{
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            fontWeight: 400,
            color: "var(--text)",
          }}
        >
          Selected projects
        </h1>
      </header>

      <div>
        {projects.map((project) => {
          const isHovered = hovered === project.id;

          return (
            <div
              key={project.id}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "1.75rem 0",
                borderBottom: "1px solid var(--border)",
                borderLeft: isHovered
                  ? "2px solid var(--amber)"
                  : "2px solid transparent",
                paddingLeft: isHovered ? "1rem" : "0",
                cursor: "default",
                transition: "border-color 0.2s ease, padding-left 0.2s ease",
              }}
            >
              {/* id + title + year */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--dim)",
                    letterSpacing: "0.1em",
                    flexShrink: 0,
                  }}
                >
                  {project.id}
                </span>
                <span
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                    fontWeight: 500,
                    color: "var(--text)",
                    flex: 1,
                  }}
                >
                  {project.title}
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--dim)", flexShrink: 0 }}>
                  {project.year}
                </span>
              </div>

              {/* problem */}
              <div
                style={{
                  paddingLeft: "2.5rem",
                  overflow: "hidden",
                  maxHeight: isHovered ? "4rem" : "0",
                  marginBottom: isHovered ? "0.75rem" : "0",
                  transition: "max-height 0.3s ease, margin-bottom 0.3s ease",
                }}
              >
                <p style={{ fontSize: "0.8rem", color: "var(--dim)", lineHeight: 1.6 }}>
                  {project.problem}
                </p>
              </div>

              {/* tags */}
              <div
                style={{
                  paddingLeft: "2.5rem",
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                  overflow: "hidden",
                  maxHeight: isHovered ? "3rem" : "0",
                  transition: "max-height 0.3s ease",
                }}
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{ fontSize: "0.65rem", color: "var(--amber)", letterSpacing: "0.05em" }}
                  >
                    [{t}]
                  </span>
                ))}
                {project.note && (
                  <span style={{ fontSize: "0.65rem", color: "var(--dim)", letterSpacing: "0.03em" }}>
                    — {project.note}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating video — fixed right side */}
      <div
        style={{
          position: "fixed",
          right: "clamp(2rem, 5vw, 5rem)",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(200px, 22vw, 320px)",
          aspectRatio: "16/9",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 40,
          border: "1px solid var(--border)",
          background: "#0a0a0a",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {activeProject?.video ? (
          <video
            ref={videoRef}
            src={activeProject.video}
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <span
            style={{
              fontSize: "0.65rem",
              color: "var(--dim)",
              letterSpacing: "0.08em",
            }}
          >
            no video yet
          </span>
        )}
      </div>
    </main>
  );
}
