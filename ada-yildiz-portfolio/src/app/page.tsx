import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const skills = [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "Python",
        "Django",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      category: "Tools & Others",
      items: ["Git", "Docker", "AWS", "Figma", "Postman", "VS Code"],
    },
  ];

  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description:
        "Leading frontend development for enterprise applications, mentoring junior developers, and implementing best practices.",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations",
      period: "2020 - 2022",
      description:
        "Developed and maintained multiple web applications using modern technologies and agile methodologies.",
    },
    {
      title: "Junior Developer",
      company: "Startup Studio",
      period: "2018 - 2020",
      description:
        "Started my journey in web development, working on various projects and learning industry standards.",
    },
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
                {/* Photo Placeholder */}
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-teal-400/20 via-indigo-400/20 to-purple-400/20 border-4 border-teal-400/30 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Image
                      src="/ada.jpeg"
                      alt="Ada Yildiz"
                      width={320}
                      height={320}
                      className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-teal-400/30"
                    />
                  </div>
                </div>
                {/* Decorative Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-teal-400/20 animate-pulse"></div>
              </div>
            </div>

            {/* Content Section - Right Side */}
            <div className="lg:w-2/3 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
                Hi, I'm Ada Yildiz
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0 mb-8">
                A passionate Full Stack Developer with a love for creating
                beautiful, functional, and user-friendly web applications. I
                enjoy turning complex problems into simple, elegant solutions.
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
                  I'm a dedicated developer with over 5 years of experience in
                  building web applications. My journey in technology started
                  with a curiosity about how things work on the internet, and it
                  has evolved into a passion for creating digital experiences
                  that make a difference.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge with the developer community. I believe in
                  continuous learning and staying up-to-date with the latest
                  industry trends.
                </p>
                <p>
                  I'm always excited to take on new challenges and work on
                  projects that push the boundaries of what's possible on the
                  web.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">
                Quick Facts
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience:</span>
                  <span className="text-white">5+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Projects Completed:</span>
                  <span className="text-white">25+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Technologies:</span>
                  <span className="text-white">15+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Open Source:</span>
                  <span className="text-white">Active Contributor</span>
                </div>
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

      {/* Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent text-center mb-16">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View My Projects
            </Link>
            <a
              href="mailto:hello@adayildiz.com"
              className="border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
