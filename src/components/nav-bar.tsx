"use client";

import { useState } from "react";
import Image from "next/image";

const links = [
  { label: "about", href: "#about" },
  { label: "work", href: "#work" },
  { label: "experience", href: "#experience" },
];

const socials = [
  {
    href: "https://github.com/adayildizz",
    label: "GitHub",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/ada-yıldız-a5953323b/",
    label: "LinkedIn",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    href: "mailto:adayildiz22@ku.edu.tr",
    label: "Email",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

export default function NavBar() {
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
      {/* AY + hover photo */}
      <div style={{ position: "relative" }}>
        <a
          href="#home"
          style={{ color: "var(--text)", fontSize: "0.875rem", letterSpacing: "0.05em", textDecoration: "none", display: "block" }}
          onMouseEnter={() => setPhotoHovered(true)}
          onMouseLeave={() => setPhotoHovered(false)}
        >
          AY
        </a>
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
          <Image src="/ada.jpeg" alt="Ada Yıldız" width={160} height={200}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {/* page links */}
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textDecoration: "none", color: "var(--dim)", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
          >
            {label}
          </a>
        ))}

        {/* divider */}
        <span style={{ width: "1px", height: "14px", background: "var(--border)" }} />

        {/* social icons */}
        {socials.map(({ href, label, icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            style={{ color: "var(--dim)", display: "flex", alignItems: "center", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--amber)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
          >
            {icon}
          </a>
        ))}
      </div>
    </nav>
  );
}
