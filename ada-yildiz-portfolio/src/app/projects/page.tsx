import React from "react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce application built with Next.js, featuring user authentication, product management, and payment integration.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Stripe",
        "MongoDB",
      ],
      image: "/project1.jpg",
      github: "https://github.com/username/ecommerce",
      live: "https://ecommerce-demo.com",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Redis"],
      image: "/project2.jpg",
      github: "https://github.com/username/task-manager",
      live: "https://task-manager-demo.com",
      featured: false,
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A weather application that displays current weather conditions and forecasts using multiple weather APIs with beautiful visualizations.",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "CSS3", "Vite"],
      image: "/project3.jpg",
      github: "https://github.com/username/weather-app",
      live: "https://weather-dashboard.com",
      featured: false,
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and dark mode.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Vercel",
      ],
      image: "/project4.jpg",
      github: "https://github.com/username/portfolio",
      live: "https://portfolio-demo.com",
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
              Here are some of the projects I've worked on. Each one represents
              a unique challenge and an opportunity to learn and grow as a
              developer.
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
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-teal-600/20 hover:bg-teal-600/30 text-teal-400 text-center py-2 px-4 rounded-lg border border-teal-500/30 hover:border-teal-500/50 transition-all duration-200 text-sm"
                    >
                      Live Demo
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
