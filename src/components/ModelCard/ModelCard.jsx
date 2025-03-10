import React from 'react';
import { Link } from 'react-router-dom';

// Value ranking badge component
const ValueBadge = ({ value, label }) => {
  let bgColor = 'bg-gray-100 text-gray-800';
  
  if (value >= 9) {
    bgColor = 'bg-yellow-100 text-yellow-800';
  } else if (value >= 7) {
    bgColor = 'bg-blue-100 text-blue-800';
  } else if (value >= 5) {
    bgColor = 'bg-green-100 text-green-800';
  } else if (value >= 3) {
    bgColor = 'bg-orange-100 text-orange-800';
  } else {
    bgColor = 'bg-red-100 text-red-800';
  }

  return (
    <span className={`${bgColor} text-xs font-medium px-2 py-1 rounded`}>
      {label} Value
    </span>
  );
};

// Feature tag component
const FeatureTag = ({ feature }) => (
  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2">
    {feature}
  </span>
);

// Main ModelCard component
const ModelCard = ({ model, featured = false }) => {
  const {
    id,
    name,
    description,
    category,
    valueRanking,
    valueLabel,
    thumbnailUrl,
    tags,
    features
  } = model;

  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${featured ? 'featured-card' : 'model-card'}`}>
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img 
          src={thumbnailUrl || `/api/placeholder/400/200`}
          alt={name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 truncate">{name}</h3>
          <ValueBadge value={valueRanking} label={valueLabel} />
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        
        {/* Features */}
        <div className="mb-4">
          {features && features.slice(0, 3).map((feature, index) => (
            <FeatureTag key={index} feature={feature} />
          ))}
          {features && features.length > 3 && (
            <span className="text-xs text-gray-500">+{features.length - 3} more</span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 capitalize">{category}</span>
          <div className="flex space-x-2">
            <Link 
              to={`/models/${id}`} 
              className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              Details
            </Link>
            <a 
              href={`/demo/${id}`}
              className="text-sm px-3 py-1 bg-yellow-500 text-white hover:bg-yellow-600 rounded transition"
            >
              Try It
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
