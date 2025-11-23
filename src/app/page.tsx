"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate parallax and fade effects
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = Math.max(0.8, 1 - scrollY / 2000);

  const projects = [
    {
      name: "RAM — Random Access Melody",
      description:
        "Real-time, prompt-based music streaming powered by experimental AI music generation. 4th place at Stellar Rise-in Web3 Hackathon.",
      tags: ["GenAI", "Music", "Web3"],
      image: "/project-ram.jpg",
      href: "/projects#ram",
    },
    {
      name: "Interactive Building Simulation",
      description:
        "Desktop-scale simulation in C++ with pure OpenGL. Dynamic shadows, water reflections, and object placement system.",
      tags: ["C++", "OpenGL", "Graphics"],
      image: "/project-opengl.jpg",
      href: "/projects#opengl",
    },
    {
      name: "3D Model Showcase",
      description:
        "Interactive platform for 3D modeling enthusiasts. Built with React, TypeScript, Three.js, and WebGL.",
      tags: ["Three.js", "WebGL", "React"],
      image: "/project-3d.jpg",
      href: "/projects#3d",
    },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#000000ff" }}>
      {/* Fullscreen Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
        }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e131780] via-[#080c0f80] to-[#000000]" />

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(248, 249, 250, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-10 text-center px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
            style={{ color: "#F8F9FA" }}
          >
            Ada Yıldız
          </h1>

          <p
            className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-3xl mx-auto font-light"
            style={{ color: "#B8B9BA" }}
          >
            AI × Graphics × Interactive Media
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/projects"
              className="group relative px-8 py-4 bg-transparent border-2 rounded-none overflow-hidden transition-all duration-300"
              style={{ borderColor: "#E8E9EA", color: "#E8E9EA" }}
            >
              <span className="relative z-10 group-hover:text-[#00082b] transition-colors duration-300">
                View Work
              </span>
              <div
                className="absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: "#E8E9EA" }}
              />
            </Link>

            <a
              href="#about"
              className="px-8 py-4 transition-colors duration-300"
              style={{ color: "#B8B9BA" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F9FA")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#B8B9BA")}
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div
            className="w-6 h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: "#B8B9BA" }}
          >
            <div
              className="w-1 h-3 rounded-full mt-2 animate-pulse"
              style={{ background: "#B8B9BA" }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center py-32 px-4 sm:px-6 lg:px-8"
        style={{ background: "#000000ff" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Photo */}
            <div className="relative group">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8E9EA]/10 to-[#E8E9EA]/5 group-hover:opacity-0 transition-opacity duration-500" />
                <Image
                  src="/ada.jpeg"
                  alt="Ada Yıldız"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div
                className="absolute -inset-4 border rounded-2xl -z-10"
                style={{ borderColor: "rgba(232, 233, 234, 0.1)" }}
              />
            </div>

            {/* Right: Text */}
            <div className="space-y-8">
              <h2
                className="text-5xl md:text-6xl font-bold"
                style={{ color: "#F8F9FA" }}
              >
                Creative Technologist
              </h2>

              <div
                className="space-y-6 text-lg leading-relaxed"
                style={{ color: "#B8B9BA" }}
              >
                <p>
                  I build at the intersection of{" "}
                  <span style={{ color: "#E8E9EA" }}>
                    artificial intelligence
                  </span>
                  ,<span style={{ color: "#E8E9EA" }}> computer graphics</span>,
                  and
                  <span style={{ color: "#E8E9EA" }}> interactive media</span>.
                </p>

                <p>
                  Currently exploring visual language models, real-time
                  rendering, and generative systems. My work spans from backend
                  architecture to immersive 3D experiences.
                </p>

                <p style={{ color: "#888A8E" }}>
                  3rd-year Computer Engineering @ Koç University
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/adayildizz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border transition-colors duration-300"
                  style={{ borderColor: "#2A2D35", color: "#B8B9BA" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#E8E9EA";
                    e.currentTarget.style.color = "#E8E9EA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2A2D35";
                    e.currentTarget.style.color = "#B8B9BA";
                  }}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/ada-yıldız-a5953323b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border transition-colors duration-300"
                  style={{ borderColor: "#2A2D35", color: "#B8B9BA" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#E8E9EA";
                    e.currentTarget.style.color = "#E8E9EA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2A2D35";
                    e.currentTarget.style.color = "#B8B9BA";
                  }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section
        className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b"
        style={{
          background: "linear-gradient(to bottom, #000000ffrgba(0, 0, 0, 1)25)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold mb-20 text-center"
            style={{ color: "#F8F9FA" }}
          >
            Selected Work
          </h2>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <Link key={index} href={project.href} className="group block">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative aspect-[4/3] overflow-hidden ${
                      index % 2 === 1 ? "lg:col-start-2" : ""
                    }`}
                    style={{ background: "#000000ff" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E8E9EA]/5 to-[#E8E9EA]/0 group-hover:opacity-0 transition-opacity duration-500" />
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ color: "#888A8E" }}
                    >
                      Project Image
                    </div>
                    <div className="absolute inset-0 border border-transparent group-hover:border-[#E8E9EA]/50 transition-all duration-500 transform group-hover:scale-95" />
                  </div>

                  {/* Content */}
                  <div
                    className={
                      index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                    }
                  >
                    <h3
                      className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300"
                      style={{ color: "#F8F9FA" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#E8E9EA")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#F8F9FA")
                      }
                    >
                      {project.name}
                    </h3>
                    <p
                      className="text-lg mb-6 leading-relaxed"
                      style={{ color: "#888A8E" }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 border text-sm transition-all duration-300"
                          style={{ borderColor: "#2A2D35", color: "#888A8E" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              href="/projects"
              className="inline-block px-8 py-4 border-2 transition-all duration-300"
              style={{ borderColor: "#E8E9EA", color: "#E8E9EA" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E8E9EA";
                e.currentTarget.style.color = "#00082b";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#E8E9EA";
              }}
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-32 px-4 sm:px-6 lg:px-8"
        style={{ background: "#000000ff" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{ color: "#F8F9FA" }}
          >
            Let's Work Together
          </h2>
          <p className="text-xl mb-12" style={{ color: "#B8B9BA" }}>
            Open to internships, collaborations, and interesting projects.
          </p>
          <a
            href="mailto:adayildiz22@ku.edu.tr"
            className="inline-block px-12 py-5 text-lg font-medium transition-colors duration-300"
            style={{ background: "#E8E9EA", color: "#000000ff" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F8F9FA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#E8E9EA")}
          >
            Get In Touch
          </a>
        </div>
      </section>
    </main>
  );
}
