"use client";

import ShaderBg from "@/components/shader-bg";

export default function Home() {
  return (
    <main
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <ShaderBg />

      {/* Grid overlay sits on top of shader */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 2rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "var(--text)",
              marginBottom: "1rem",
            }}
          >
            Ada Yıldız
          </h1>

          <p
            style={{
              fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
              color: "var(--dim)",
              letterSpacing: "0.05em",
            }}
          >
            Computer Engineer. GPU systems, graphics, ,
            <span className="cursor">_</span>
          </p>
        </div>
      </div>
    </main>
  );
}
