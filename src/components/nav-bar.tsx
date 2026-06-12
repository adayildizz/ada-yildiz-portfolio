"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const links = [
  { label: "work", href: "/work" },
  { label: "notes", href: "/notes" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [photoHovered, setPhotoHovered] = useState(false);

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
      <div style={{ position: "relative" }}>
        <Link
          href="/"
          style={{
            color: "var(--text)",
            fontSize: "0.875rem",
            letterSpacing: "0.05em",
            textDecoration: "none",
            display: "block",
          }}
          onMouseEnter={() => setPhotoHovered(true)}
          onMouseLeave={() => setPhotoHovered(false)}
        >
          AY
        </Link>

        {/* hover photo window */}
        <div
          onMouseEnter={() => setPhotoHovered(true)}
          onMouseLeave={() => setPhotoHovered(false)}
          style={{
            position: "absolute",
            top: "calc(100% + 0.75rem)",
            left: 0,
            width: photoHovered ? "160px" : "0px",
            height: photoHovered ? "200px" : "0px",
            opacity: photoHovered ? 1 : 0,
            overflow: "hidden",
            border: photoHovered ? "1px solid var(--border)" : "none",
            background: "#0a0a0a",
            transition: "width 0.25s ease, height 0.25s ease, opacity 0.2s ease",
            pointerEvents: photoHovered ? "auto" : "none",
          }}
        >
          <Image
            src="/ada.jpeg"
            alt="Ada Yıldız"
            width={160}
            height={200}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

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
