"use client";

import { useState } from "react";

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
    href: null,
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
    href: null,
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
    href: null,
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
    href: null,
  },
];

export default function Work() {
  const [hovered, setHovered] = useState<string | null>(null);

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
                display: "block",
                padding: "1.75rem 0",
                borderBottom: "1px solid var(--border)",
                borderLeft: isHovered
                  ? "2px solid var(--amber)"
                  : "2px solid transparent",
                paddingLeft: isHovered ? "1rem" : "0",
                textDecoration: "none",
                cursor: "default",
                transition: "border-color 0.2s ease, padding-left 0.2s ease",
              }}
            >
              {/* Row 1: id + title + year */}
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
                    color: isHovered ? "var(--text)" : "var(--text)",
                    flex: 1,
                    transition: "color 0.2s ease",
                  }}
                >
                  {project.title}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--dim)",
                    flexShrink: 0,
                  }}
                >
                  {project.year}
                </span>
              </div>

              {/* Row 2: problem statement */}
              <div
                style={{
                  paddingLeft: "2.5rem",
                  marginBottom: isHovered ? "0.75rem" : "0",
                  overflow: "hidden",
                  maxHeight: isHovered ? "4rem" : "0",
                  transition: "max-height 0.3s ease, margin-bottom 0.3s ease",
                }}
              >
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--dim)",
                    lineHeight: 1.6,
                  }}
                >
                  {project.problem}
                </p>
              </div>

              {/* Row 3: tech tags */}
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
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--amber)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    [{t}]
                  </span>
                ))}
                {project.note && (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--dim)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    — {project.note}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
