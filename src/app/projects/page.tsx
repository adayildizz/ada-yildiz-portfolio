import React from "react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "RAM – Random Access Melodies",
      description:
        "A real‑time, prompt‑based music streaming site powered by an experimental music generation model and Llama‑3 for chatbot interactions. Awarded 4th place in the Stellar Rise‑in Web3 Hackathon and currently expanding with grant funding.",
      technologies: ["GenAI", "Music Generation", "Llama‑3", "Web3"],
      image: "/project-ram.jpg",
      github: "https://github.com/adayildizz/ram", // replace if repo exists
      live: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Interactive Building Simulation (C++ / OpenGL)",
      description:
        "A desktop-scale simulation built in modern C++ with pure OpenGL (no engine). Features an object placement system (grid/snapping and basic collision checks), dynamic shadow mapping, and a water surface with reflections/refractions and wave animation.",
      technologies: [
        "C++",
        "OpenGL",
        "Shadow Mapping",
        "Water Rendering",
        "Object Placement",
      ],
      image: "/project-opengl-building.jpg",
      github: "https://github.com/adayildizz/opengl-building-sim", // replace if repo exists
      live: "#",
      featured: false,
    },
    {
      id: 3,
      title: "Top‑down Web3 Game (OP_HACK001)",
      description:
        "Developed within 2 months using Godot Engine. Features random level generation, NPC movement logic, and integration with the BitBoy platform for Bitcoin‑related games. Learned rapid prototyping, gameplay balancing, and user testing.",
      technologies: ["Godot", "Procedural Generation", "Game Design"],
      image: "/project-op_hack001.jpg",
      github: "https://github.com/adayildizz/op_hack001", // replace if repo exists
      live: "#",
      featured: true,
    },
    {
      id: 4,
      title: "3D Model Showcase & Blog Website",
      description:
        "An interactive platform for enthusiasts of 3D modeling and graphics. Includes blog and post sections for sharing insights. Built with React, TypeScript, Three.js, and WebGL.",
      technologies: ["React", "TypeScript", "Three.js", "WebGL"],
      image: "/project-3dshowcase.jpg",
      github: "https://github.com/adayildizz/3d-showcase", // replace if repo exists
      live: "#",
      featured: false,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
              My Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A selection of projects that reflect my interest in AI, computer
              graphics, and interactive media. Each one challenged me to explore
              new tools, learn quickly, and deliver something functional.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-teal-400/50 transition-all duration-300 hover:transform hover:scale-105 ${
                  project.featured ? "ring-2 ring-teal-400/50" : ""
                }`}
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Project Image</div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {project.featured && (
                    <span className="inline-block bg-teal-500/20 text-teal-400 text-xs font-medium px-2 py-1 rounded-full mb-3">
                      Featured
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-white text-center py-2 px-4 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 text-sm"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
