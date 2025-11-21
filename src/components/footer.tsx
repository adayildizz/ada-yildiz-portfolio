"use client";

import { Twitter, Instagram, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black/80 text-gray-300 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-6 justify-center">
          <a
            href="https://x.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400 transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://www.instagram.com/adacan_yildiz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://github.com/adayildizz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-100 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/ada-y%C4%B1ld%C4%B1z-a5953323b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
