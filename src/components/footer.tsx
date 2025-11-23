"use client";

import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/adayildizz",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ada-yıldız-a5953323b/",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/adacan_yildiz/",
      icon: Instagram,
    },
    {
      name: "Email",
      href: "mailto:adayildiz22@ku.edu.tr",
      icon: Mail,
    },
  ];

  return (
    <footer className="w-full bg-black border-t border-gray-800/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Name/Logo */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} Ada Yıldız. All rights reserved.
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-stone-200 transition-colors duration-300"
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
