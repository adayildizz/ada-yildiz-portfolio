"use client";

import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: "001",
    title: "RAM — Random Access Melody",
    year: "2025",
    category: "AI × Music",
    problem:
      "Continuous AI-generated music from text prompts, streamed without perceptible buffering latency.",
    tech: ["GenAI", "Llama-3", "Web3"],
    note: "4th place, Stellar Rise-in Web3 Hackathon",
    video: "/videos/ram.mp4",
  },
  {
    id: "002",
    title: "Interactive Building Simulation",
    year: "2024",
    category: "Graphics",
    problem:
      "Shadow mapping and real-time water reflections at interactive scale — pure OpenGL, no engine.",
    tech: ["C++", "OpenGL", "GLSL"],
    note: null,
    video: "/videos/opengl.mp4",
  },
  {
    id: "003",
    title: "Top-down Web3 Game",
    year: "2024",
    category: "Game Dev",
    problem:
      "Procedural level generation with NPC pathfinding, shipped in 2 months for the BitBoy platform.",
    tech: ["Godot", "GDScript", "Web3"],
    note: null,
    video: "/videos/game.mp4",
  },
  {
    id: "004",
    title: "3D Model Showcase",
    year: "2025",
    category: "Web × 3D",
    problem:
      "Real-time WebGL model rendering in the browser, paired with a content system for sharing notes.",
    tech: ["Three.js", "React", "TypeScript"],
    note: null,
    video: "/videos/3d.mp4",
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
          opacity: visible && activeProject?.video ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 40,
          border: "1px solid var(--border)",
          background: "#0a0a0a",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src={activeProject?.video ?? undefined}
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </main>
  );
}
