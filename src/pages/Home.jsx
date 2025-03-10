import React from 'react';
import { Link } from 'react-router-dom';
import ModelCard from '../components/ModelCard/ModelCard';
import CategoryFilter from '../components/Categories/CategoryFilter';

const HomePage = ({ models, categories }) => {
  // Get featured models (those with high value rankings)
  const featuredModels = models
    .filter(model => model.valueRanking >= 9)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Experience AI in Your Browser</h2>
              <p className="text-xl text-gray-600 mb-6">
                Explore 35+ transformative AI models that run entirely client-side using WebGPU acceleration - no server required.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#featured"
                  className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 transition"
                >
                  Explore Models
                </a>
                <a
                  href="https://huggingface.co/docs/transformers.js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  Documentation
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/hero-image.png" 
                alt="AI Models Visualization" 
                className="rounded-lg shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400/FFF9C4/FFB300?text=Transformers.js+Hub';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="text-4xl font-bold text-yellow-500 mb-2">35+</div>
              <div className="text-gray-600">AI Models</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="text-4xl font-bold text-yellow-500 mb-2">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="text-4xl font-bold text-yellow-500 mb-2">WebGPU</div>
              <div className="text-gray-600">Acceleration</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="text-4xl font-bold text-yellow-500 mb-2">100%</div>
              <div className="text-gray-600">Client-Side</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`w-16 h-16 bg-${category.color}-100 rounded-full flex items-center justify-center mb-4`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-8 w-8 text-${category.color}-500`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {category.icon === 'chat' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    )}
                    {/* Add other icon paths based on category.icon value */}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Models Section */}
      <section id="featured" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Featured Models</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Explore our highest-rated AI models running in your browser
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredModels.map((model) => (
              <ModelCard key={model.id} model={model} featured={true} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/all-models"
              className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              View All Models
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Experience AI directly in your browser without server calls
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Choose a Model</h3>
              <p className="text-gray-600">
                Browse our catalog of 35+ AI models across 9 categories
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Load and Run</h3>
              <p className="text-gray-600">
                Model weights are downloaded to your device and accelerated with WebGPU
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Interact</h3>
              <p className="text-gray-600">
                Enjoy privacy-preserving AI with no data sent to servers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
