// src/components/NavBar.tsx
"use client";
import Link from "next/link";
import React from "react";

interface TwitterProps {
  className?: string;
}

const Twitter: React.FC<TwitterProps> = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-6.597-8.716L7.227 21.75H3.91l7.393-8.47L2.454 2.25H8.08L12 7.502 18.244 2.25zM17.29 20.675H14.98L5.006 3.336h2.433L17.29 20.675z" />
  </svg>
);

interface NavBarProps {
  showNav: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ showNav }) => {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-transparent backdrop-blur-md border-b border-gray-800/40 shadow-lg transition-all duration-500 ${
        showNav
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        transitionProperty: "opacity, transform",
        transform: showNav ? "translateY(0)" : "translateY(-40px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6">
        {/* Nav Links using next-intl Link */}
        <Link
          href="/" // Link to the root of the current locale
          className="flex-1 min-w-[90px] max-w-[160px] text-center px-2 py-2 sm:px-3 sm:py-2 rounded-lg text-gray-200 hover:text-teal-400 font-medium transition-colors duration-200 bg-gray-800/60 hover:bg-gray-700/80"
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="flex-1 min-w-[90px] max-w-[160px] text-center px-2 py-2 sm:px-3 sm:py-2 rounded-lg text-gray-200 hover:text-teal-400 font-medium transition-colors duration-200 bg-gray-800/60 hover:bg-gray-700/80"
        >
          Projects
        </Link>
        {/*<Link
          href="/models"
          className="flex-1 min-w-[90px] max-w-[160px] text-center px-2 py-2 sm:px-3 sm:py-2 rounded-lg text-gray-200 hover:text-teal-400 font-medium transition-colors duration-200 bg-gray-800/60 hover:bg-gray-700/80"
        >
          Models
        </Link>*/}
        <Link
          href="/notes"
          className="flex-1 min-w-[90px] max-w-[160px] text-center px-2 py-2 sm:px-3 sm:py-2 rounded-lg text-gray-200 hover:text-teal-400 font-medium transition-colors duration-200 bg-gray-800/60 hover:bg-gray-700/80"
        >
          Notes
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
