import React from "react";

export default function Notes() {
  const notes = [
    {
      id: 1,
      title: "Getting Started with Next.js 14",
      excerpt: "A comprehensive guide to building modern web applications with Next.js 14, covering the new App Router, Server Components, and best practices.",
      category: "Web Development",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["Next.js", "React", "Web Development"],
      featured: true
    },
    {
      id: 2,
      title: "Understanding TypeScript Generics",
      excerpt: "Deep dive into TypeScript generics, exploring advanced patterns and real-world use cases for building type-safe applications.",
      category: "TypeScript",
      date: "2024-01-10",
      readTime: "12 min read",
      tags: ["TypeScript", "Programming", "Advanced"],
      featured: false
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use What",
      excerpt: "A practical comparison of CSS Grid and Flexbox, with examples and guidelines for choosing the right layout method for your design.",
      category: "CSS",
      date: "2024-01-05",
      readTime: "6 min read",
      tags: ["CSS", "Layout", "Frontend"],
      featured: false
    },
    {
      id: 4,
      title: "Building RESTful APIs with Node.js",
      excerpt: "Step-by-step guide to creating robust REST APIs using Node.js, Express, and MongoDB with proper error handling and validation.",
      category: "Backend",
      date: "2023-12-28",
      readTime: "15 min read",
      tags: ["Node.js", "Express", "API", "Backend"],
      featured: false
    },
    {
      id: 5,
      title: "Introduction to Machine Learning",
      excerpt: "Basic concepts and practical examples of machine learning algorithms, perfect for developers looking to get started with AI.",
      category: "Machine Learning",
      date: "2023-12-20",
      readTime: "20 min read",
      tags: ["Machine Learning", "AI", "Python", "Beginner"],
      featured: false
    },
    {
      id: 6,
      title: "Optimizing React Performance",
      excerpt: "Advanced techniques for improving React application performance, including memoization, code splitting, and bundle optimization.",
      category: "React",
      date: "2023-12-15",
      readTime: "10 min read",
      tags: ["React", "Performance", "Optimization"],
      featured: false
    }
  ];

  const categories = [
    "All",
    "Web Development",
    "TypeScript",
    "CSS",
    "Backend",
    "Machine Learning",
    "React"
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Notes & Articles
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Sharing knowledge and insights from my journey in software development. 
              From beginner tutorials to advanced concepts, find valuable resources to enhance your skills.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                  category === "All"
                    ? "bg-teal-600 border-teal-500 text-white"
                    : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          {notes.filter(note => note.featured).map((featuredNote) => (
            <div
              key={featuredNote.id}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-teal-400/30 rounded-2xl p-8 hover:border-teal-400/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-xs font-medium rounded-full">
                  Featured
                </span>
                <span className="text-gray-400 text-sm">{featuredNote.category}</span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-400 text-sm">{featuredNote.date}</span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-400 text-sm">{featuredNote.readTime}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4 hover:text-teal-400 transition-colors cursor-pointer">
                {featuredNote.title}
              </h2>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {featuredNote.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {featuredNote.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Read Full Article
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.filter(note => !note.featured).map((note) => (
              <article
                key={note.id}
                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-teal-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gray-800/50 text-gray-400 text-xs font-medium rounded-full">
                      {note.category}
                    </span>
                    <span className="text-gray-500 text-xs">{note.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors cursor-pointer">
                    {note.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {note.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-full border border-gray-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{note.date}</span>
                    <button className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get notified when I publish new articles and tutorials. 
            No spam, just valuable content delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400/50"
            />
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
