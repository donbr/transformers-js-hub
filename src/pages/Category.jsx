import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModelCard from '../components/ModelCard/ModelCard';
import SearchBar from '../components/UI/SearchBar';

const CategoryPage = ({ models, categories }) => {
  const { categoryId } = useParams();
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    // Find the current category
    const category = categories.find(cat => cat.id === categoryId);
    setCurrentCategory(category);

    // Filter models by category and search term
    const filtered = models.filter(model => {
      const matchesCategory = model.category === categoryId;
      
      if (!searchTerm) return matchesCategory;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        matchesCategory &&
        (model.name.toLowerCase().includes(searchLower) ||
          model.description.toLowerCase().includes(searchLower) ||
          (model.tags && model.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
          (model.features && model.features.some(feature => feature.toLowerCase().includes(searchLower))))
      );
    });

    setFilteredModels(filtered);
  }, [categoryId, models, categories, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Category not found</h2>
        <div className="text-center">
          <Link to="/" className="text-yellow-500 hover:text-yellow-700">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Category Header */}
      <div className="mb-12">
        <div className="flex items-center justify-center mb-2">
          <div
            className={`w-16 h-16 bg-${currentCategory.color}-100 rounded-full flex items-center justify-center mr-4`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 text-${currentCategory.color}-500`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Icon paths based on category.icon */}
              {currentCategory.icon === 'chat' && (
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
          <h1 className="text-4xl font-bold text-gray-800">{currentCategory.name}</h1>
        </div>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          {currentCategory.description}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Model Grid */}
      {filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map(model => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">No models found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? `No models match "${searchTerm}" in this category.`
              : `No models found in the ${currentCategory.name} category.`}
          </p>
          {searchTerm && (
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={() => setSearchTerm('')}
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Back to Home Link */}
      <div className="text-center mt-12">
        <Link to="/" className="text-yellow-500 hover:text-yellow-700">
          ← Back to all categories
        </Link>
      </div>
    </div>
  );
};

export default CategoryPage;
