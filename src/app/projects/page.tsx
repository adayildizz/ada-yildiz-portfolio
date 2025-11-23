"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "RAM — Random Access Melodies",
      subtitle: "AI Music Generation",
      description:
        "Real-time, prompt-based music streaming powered by experimental music generation model and Llama-3. 4th place at Stellar Rise-in Web3 Hackathon.",
      longDescription:
        "A groundbreaking platform that transforms text prompts into continuous music streams. Built with cutting-edge AI models and blockchain integration, RAM represents the future of interactive music creation.",
      technologies: ["GenAI", "Llama-3", "Music Generation", "Web3"],
      year: "2025",
      category: "AI × Music",
      image: "/project-ram.jpg",
    },
    {
      id: 2,
      title: "Interactive Building Simulation",
      subtitle: "Real-time Graphics",
      description:
        "Desktop-scale simulation in C++ with pure OpenGL. Features dynamic shadow mapping, water reflections, and object placement system.",
      longDescription:
        "A comprehensive 3D simulation showcasing advanced rendering techniques including dynamic shadows, realistic water with reflections and refractions, and an intuitive object placement system with collision detection.",
      technologies: ["C++", "OpenGL", "Shadow Mapping", "Water Rendering"],
      year: "2024",
      category: "Graphics",
      image: "/project-opengl.jpg",
    },
    {
      id: 3,
      title: "Top-down Web3 Game",
      subtitle: "Game Development",
      description:
        "Built with Godot Engine for BitBoy platform. Features procedural level generation, NPC AI, and blockchain integration.",
      longDescription:
        "A complete game developed in 2 months featuring random level generation, sophisticated NPC movement logic, and integration with Web3 technologies. Focused on rapid prototyping and user testing.",
      technologies: ["Godot", "Procedural Gen", "Game AI", "Web3"],
      year: "2024",
      category: "Game Dev",
      image: "/project-game.jpg",
    },
    {
      id: 4,
      title: "3D Model Showcase Platform",
      subtitle: "Interactive Web",
      description:
        "Interactive platform for 3D modeling enthusiasts with blog functionality. Built with React, TypeScript, and Three.js.",
      longDescription:
        "A modern web platform combining 3D visualization with content management. Features real-time 3D model rendering, interactive controls, and a blog system for sharing insights and tutorials.",
      technologies: ["React", "TypeScript", "Three.js", "WebGL"],
      year: "2025",
      category: "Web × 3D",
      image: "/project-3d.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-stone-200 to-stone-100 bg-clip-text text-transparent">
              Selected Work
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            AI, Graphics, and Interactive Experiences
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
                    Project Visual
                  </div>
                </div>

                {/* Overlay - Shows on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-500 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Border Effect */}
                <div
                  className={`absolute inset-0 border-2 transition-all duration-500 ${
                    hoveredId === project.id
                      ? "border-stone-200 scale-95"
                      : "border-transparent"
                  }`}
                />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top: Category & Year */}
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-sm uppercase tracking-wider transition-all duration-300 ${
                        hoveredId === project.id
                          ? "text-stone-200 opacity-100"
                          : "text-gray-400 opacity-0"
                      }`}
                    >
                      {project.category}
                    </span>
                    <span
                      className={`text-sm transition-all duration-300 ${
                        hoveredId === project.id
                          ? "text-gray-400 opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom: Title & Description */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-stone-200 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-lg text-gray-400 mb-4">
                      {project.subtitle}
                    </p>

                    {/* Expanded Description */}
                    <p
                      className={`text-gray-300 mb-6 transition-all duration-500 ${
                        hoveredId === project.id
                          ? "opacity-100 max-h-32"
                          : "opacity-0 max-h-0"
                      }`}
                    >
                      {project.longDescription}
                    </p>

                    {/* Technologies */}
                    <div
                      className={`flex flex-wrap gap-2 transition-all duration-500 ${
                        hoveredId === project.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 border border-stone-200/30 text-stone-200 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-stone-200 to-stone-100 bg-clip-text text-transparent">
              Interested in Collaboration?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            I'm always open to discussing new projects and opportunities.
          </p>
          <a
            href="mailto:adayildiz22@ku.edu.tr"
            className="inline-block px-12 py-5 bg-stone-200 text-black text-lg font-medium hover:bg-stone-100 transition-colors duration-300"
          >
            Let's Talk
          </a>
        </div>
      </section>
    </main>
  );
}
