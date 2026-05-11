"use client";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        padding: "1.5rem 2rem",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "0.7rem",
        color: "var(--dim)",
      }}
    >
      <span>© {new Date().getFullYear()} Ada Yıldız</span>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <a
          href="https://github.com/adayildizz"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--dim)", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
        >
          github
        </a>
        <a
          href="https://www.linkedin.com/in/ada-yıldız-a5953323b/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--dim)", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
        >
          linkedin
        </a>
        <a
          href="mailto:adayildiz22@ku.edu.tr"
          style={{ color: "var(--dim)", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--amber)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
        >
          e-mail
        </a>
      </div>
    </footer>
  );
}
