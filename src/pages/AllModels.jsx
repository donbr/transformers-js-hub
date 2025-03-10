import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModelCard from '../components/ModelCard/ModelCard';
import SearchBar from '../components/UI/SearchBar';
import CategoryFilter from '../components/Categories/CategoryFilter';

const AllModelsPage = ({ models, categories }) => {
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('value'); // 'value', 'name', 'category'

  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...models];

    // Filter by category if not 'all'
    if (activeCategory !== 'all') {
      filtered = filtered.filter(model => model.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(model => 
        model.name.toLowerCase().includes(searchLower) ||
        model.description.toLowerCase().includes(searchLower) ||
        (model.tags && model.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
        (model.features && model.features.some(feature => feature.toLowerCase().includes(searchLower)))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'value':
        filtered.sort((a, b) => b.valueRanking - a.valueRanking);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    setFilteredModels(filtered);
  }, [models, searchTerm, activeCategory, sortBy]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">All Models</h1>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-4xl mx-auto">
        Browse our complete catalog of AI models that run directly in your browser using WebGPU acceleration.
      </p>

      {/* Search and Filters */}
      <div className="mb-12">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow">
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onChange={handleCategoryChange} 
          />

          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-gray-700 font-medium">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="value">Value (High to Low)</option>
              <option value="name">Name (A-Z)</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredModels.length} of {models.length} models
          {activeCategory !== 'all' && (
            <>
              {' '}in <span className="font-medium">{categories.find(c => c.id === activeCategory)?.name}</span>
            </>
          )}
          {searchTerm && (
            <>
              {' '}matching <span className="font-medium">"{searchTerm}"</span>
            </>
          )}
        </p>
      </div>

      {/* Model Grid */}
      {filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map(model => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">No models found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-4"
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('all');
            }}
          >
            Clear all filters
          </button>
          <Link
            to="/"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Return to homepage
          </Link>
        </div>
      )}

      {/* Return to Home */}
      <div className="text-center mt-12">
        <Link to="/" className="text-yellow-500 hover:text-yellow-700">
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
};

export default AllModelsPage;
