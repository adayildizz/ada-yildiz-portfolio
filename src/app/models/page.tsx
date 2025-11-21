import React from "react";

export default function Models() {
  const models = [
    {
      id: 1,
      title: "Machine Learning Model A",
      description:
        "A deep learning model for image classification trained on a custom dataset with 95% accuracy.",
      category: "Computer Vision",
      framework: "TensorFlow",
      performance: "95% Accuracy",
      github: "https://github.com/username/model-a",
      demo: "https://demo-model-a.com",
    },
    {
      id: 2,
      title: "NLP Sentiment Analyzer",
      description:
        "Natural language processing model for sentiment analysis with multilingual support.",
      category: "Natural Language Processing",
      framework: "PyTorch",
      performance: "89% F1-Score",
      github: "https://github.com/username/nlp-model",
      demo: "https://sentiment-demo.com",
    },
    {
      id: 3,
      title: "Recommendation System",
      description:
        "Collaborative filtering recommendation engine for e-commerce applications.",
      category: "Recommendation Systems",
      framework: "Scikit-learn",
      performance: "87% Precision",
      github: "https://github.com/username/rec-system",
      demo: "https://recommendation-demo.com",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
              AI Models & Research
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Exploring the frontiers of artificial intelligence through
              innovative models and research projects. From computer vision to
              natural language processing, discover the cutting-edge solutions
              I've developed.
            </p>
          </div>
        </div>
      </section>

      {/* Models Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model) => (
              <div
                key={model.id}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-teal-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Model Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-xs font-medium rounded-full">
                      {model.category}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {model.framework}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                    {model.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {model.description}
                  </p>

                  {/* Performance Metric */}
                  <div className="mb-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                    <span className="text-gray-400 text-xs">Performance:</span>
                    <div className="text-teal-400 font-semibold">
                      {model.performance}
                    </div>
                  </div>

                  {/* Model Links */}
                  <div className="flex gap-3">
                    <a
                      href={model.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-white text-center py-2 px-4 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 text-sm"
                    >
                      Code
                    </a>
                    <a
                      href={model.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-teal-600/20 hover:bg-teal-600/30 text-teal-400 text-center py-2 px-4 rounded-lg border border-teal-500/30 hover:border-teal-500/50 transition-all duration-200 text-sm"
                    >
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent text-center mb-16">
            Research Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Computer Vision",
              "Natural Language Processing",
              "Machine Learning",
              "Deep Learning",
              "Reinforcement Learning",
              "Data Science",
              "AI Ethics",
              "Model Interpretability",
            ].map((area) => (
              <div
                key={area}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 text-center hover:border-teal-400/50 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
