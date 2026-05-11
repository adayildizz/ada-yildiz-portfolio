"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "work", href: "/work" },
  { label: "notes", href: "/notes" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "1.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        href="/"
        style={{
          color: "var(--text)",
          fontSize: "0.875rem",
          letterSpacing: "0.05em",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--amber)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
      >
        AY
      </Link>

      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map(({ label, href }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textDecoration: "none",
                color: active ? "var(--amber)" : "var(--dim)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = active
                  ? "var(--amber)"
                  : "var(--dim)")
              }
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
