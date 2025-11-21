import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // ——— Data from CV ———
  const skills = [
    {
      category: "Frontend & Graphics",
      items: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Three.js",
        "WebGL",
      ],
    },
    {
      category: "Backend & AI",
      items: [
        "Node.js",
        "Python",
        "Visual Language Models (Qwen2.5-VL, MiniCPM-V)",
        "Llama 3 (exp.)",
      ],
    },
    {
      category: "Tools & Engines",
      items: ["Git", "Godot Engine", "C++/OpenGL", "NumPy", "VS Code"],
    },
  ];

  const experiences = [
    {
      title: "Software Developer Intern",
      company: "Genarion",
      period: "Feb 2025 – Jun 2025",
      description:
        "Integrated visual language models (mainly Qwen2.5-VL and MiniCPM-V) into an early-stage product; performed task-specific fine-tuning aligned with project needs.",
    },
    {
      title: "Backend Developer Intern",
      company: "Azerion Turkey (Re-launch Phase)",
      period: "Aug 2024 – Oct 2024",
      description:
        "Contributed to relaunching the Game Distribution Project; returned after a successful earlier internship to help ship user-facing improvements.",
    },
    {
      title: "Corporate Relations Co‑Leader",
      company: "KU ACM (Koç University ACM Student Chapter)",
      period: "May 2024 – May 2025",
      description:
        "Co‑chaired the corporate relations committee; coordinated outreach and partnerships for events and activities.",
    },
    {
      title: "Backend Developer Intern",
      company: "Azerion Turkey",
      period: "Mar 2023 – Oct 2023",
      description:
        "First web development experience on the Game Distribution Project team; contributed to backend tasks and team processes.",
    },
  ];

  const projects = [
    {
      name: "Top‑down Web3 Game (OP_HACK001)",
      period: "Aug 2024 – Sep 2024",
      description:
        "Built with Godot: random level generation, NPC movement logic; prepared for the BitBoy platform. Focused on rapid prototyping, gameplay balancing and user testing.",
      tags: ["Godot", "Gameplay", "Procedural Gen"],
      href: "/projects#op_hack001",
    },
    {
      name: "3D Model Showcase & Blog (in progress)",
      period: "2025 – ",
      description:
        "Interactive site for sharing 3D models and posts around computer graphics. Stack: TypeScript, React, Three.js, WebGL.",
      tags: ["Three.js", "WebGL", "React"],
      href: "/projects#3d_showcase",
    },
    {
      name: "RAM – Random Access Melody",
      period: "Jun 2025 – ",
      description:
        "Realtime, prompt‑based music streaming with an experimental music generation model + Llama‑3 for chatbot. 4th place at Stellar Rise‑in Web3 Hackathon; currently expanding with grant support.",
      tags: ["GenAI", "Music", "Llama-3"],
      href: "/projects#ram",
    },
  ];

  const quickFacts = [
    { label: "University", value: "Koç University (BSc, CENG)" },
    { label: "Year", value: "3rd Year (GPA 2.9)" },
    { label: "Internships", value: "3" },
    { label: "Focus", value: "AI × Graphics × Backend" },
    { label: "Hackathon", value: "4th – Stellar Rise‑in Web3" },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            {/* Photo Section - Left Side */}
            <div className="lg:w-1/3 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-teal-400/20 via-indigo-400/20 to-purple-400/20 border-4 border-teal-400/30 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Image
                      src="/ada.jpeg"
                      alt="Ada Yıldız"
                      width={320}
                      height={320}
                      className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-teal-400/30"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-teal-400/20 animate-pulse"></div>
              </div>
            </div>

            {/* Content Section - Right Side */}
            <div className="lg:w-2/3 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
                Hi, I'm Ada Yıldız
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-8">
                I am a computer engineering student exploring the intersection
                of artificial intelligence, computer graphics, and backend
                development. Still shaping my path, I enjoy learning by building
                and experimenting with new technologies that connect creativity
                and software.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/projects"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  View My Work
                </Link>
                <a
                  href="#contact"
                  className="border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                About Me
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I enjoy building things that sit between creativity and
                  engineering. My recent work spans backend development for game
                  distribution, visual language models for interactive systems,
                  and web graphics experiments.
                </p>
                <p>
                  I like short feedback loops: prototype fast, test with users,
                  iterate. When I don’t know the answer yet, I learn by
                  implementing small, focused demos and documenting what worked.
                </p>
                <p>
                  Currently, I’m a 3rd‑year Computer Engineering student at Koç
                  University. Courses in Machine Learning and Image
                  Processing—and time in the KUIS AI Lab’s autonomous vehicle
                  project—shaped my interest in AI + graphics.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">
                Quick Facts
              </h3>
              <div className="space-y-3">
                {quickFacts.map((f) => (
                  <div key={f.label} className="flex justify-between">
                    <span className="text-gray-400">{f.label}:</span>
                    <span className="text-white">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent text-center mb-16">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-teal-400 mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Snapshot Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent text-center mb-16">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 hover:border-teal-500/60 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-teal-300">
                    {p.name}
                  </h3>
                  <span className="text-teal-400 text-xs font-medium whitespace-nowrap ml-3">
                    {p.period}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs bg-gray-800/60 border border-gray-700/60 rounded-full text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent text-center mb-16">
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">
                    {exp.title}
                  </h3>
                  <span className="text-teal-400 text-sm font-medium">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{exp.company}</p>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Ready to Collaborate?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            I’m open to internships, part‑time roles, and collaborations around
            AI, graphics, and interactive media. Feel free to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View My Projects
            </Link>
            <a
              href="mailto:adayildiz22@ku.edu.tr"
              className="border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              adayildiz22@ku.edu.tr
            </a>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/in/ada-y%C4%B1ld%C4%B1z-a5953323b/"
                className="text-teal-300 hover:underline"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/adayildizz"
                className="text-teal-300 hover:underline"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
