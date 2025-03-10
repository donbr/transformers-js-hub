import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModelDemo from '../components/Demo/ModelDemo';

const ModelDetailPage = ({ models, categories }) => {
  const { modelId } = useParams();
  const [model, setModel] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedModels, setRelatedModels] = useState([]);

  useEffect(() => {
    // Find the current model
    const foundModel = models.find(m => m.id === modelId);
    setModel(foundModel);

    if (foundModel) {
      // Find the category
      const foundCategory = categories.find(c => c.id === foundModel.category);
      setCategory(foundCategory);

      // Find related models
      if (foundModel.relatedModels && foundModel.relatedModels.length > 0) {
        const related = models.filter(m => 
          foundModel.relatedModels.includes(m.id) && m.id !== foundModel.id
        ).slice(0, 3);
        setRelatedModels(related);
      } else {
        // If no related models specified, show models from the same category
        const sameCategoryModels = models.filter(m => 
          m.category === foundModel.category && m.id !== foundModel.id
        ).slice(0, 3);
        setRelatedModels(sameCategoryModels);
      }
    }
  }, [modelId, models, categories]);

  if (!model) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Model not found</h2>
        <div className="text-center">
          <Link to="/" className="text-yellow-500 hover:text-yellow-700">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-yellow-600">Home</Link>
        {' > '}
        <Link to={`/category/${model.category}`} className="hover:text-yellow-600">
          {category ? category.name : model.category}
        </Link>
        {' > '}
        <span className="text-gray-700">{model.name}</span>
      </div>

      {/* Model Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{model.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{model.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Value badge */}
              <span className={`${
                model.valueRanking >= 9 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : model.valueRanking >= 7 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              } px-3 py-1 rounded-full text-sm font-medium`}>
                {model.valueLabel} Value
              </span>
              
              {/* Category badge */}
              <span className={`bg-${category?.color || 'gray'}-100 text-${category?.color || 'gray'}-800 px-3 py-1 rounded-full text-sm font-medium`}>
                {category ? category.name : model.category}
              </span>
              
              {/* Model size badge */}
              {model.modelSize && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {model.modelSize}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href={model.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              View Source
            </a>
            
            <a
              href={model.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600"
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Open Original Demo
            </a>
          </div>
        </div>
      </div>

      {/* Model Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="col-span-2">
          {/* Screenshots */}
          {model.screenshotUrls && model.screenshotUrls.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Screenshots</h3>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {model.screenshotUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${model.name} Screenshot ${index + 1}`}
                    className="rounded shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/FFECD1/FFA726?text=Screenshot+${index + 1}`;
                    }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* Description */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">About this Model</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-700 leading-relaxed">{model.longDescription || model.description}</p>
            </div>
          </div>

          {/* Features */}
          {model.features && model.features.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Key Features</h3>
              </div>
              <div className="p-4">
                <ul className="list-disc list-inside space-y-2">
                  {model.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div>
          {/* Technical Details */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Technical Details</h3>
            </div>
            <div className="p-4">
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-gray-500">Model Name</dt>
                  <dd className="mt-1 text-gray-700">{model.modelName}</dd>
                </div>
                
                {model.modelSize && (
                  <div>
                    <dt className="font-medium text-gray-500">Model Size</dt>
                    <dd className="mt-1 text-gray-700">{model.modelSize}</dd>
                  </div>
                )}
                
                {model.performance && (
                  <>
                    {model.performance.loadTime && (
                      <div>
                        <dt className="font-medium text-gray-500">Typical Load Time</dt>
                        <dd className="mt-1 text-gray-700">{model.performance.loadTime}</dd>
                      </div>
                    )}
                    
                    {model.performance.memoryUsage && (
                      <div>
                        <dt className="font-medium text-gray-500">Memory Usage</dt>
                        <dd className="mt-1 text-gray-700">{model.performance.memoryUsage}</dd>
                      </div>
                    )}
                    
                    {model.performance.browserSupport && (
                      <div>
                        <dt className="font-medium text-gray-500">Browser Support</dt>
                        <dd className="mt-1 text-gray-700">
                          {model.performance.browserSupport.join(', ')}
                        </dd>
                      </div>
                    )}
                  </>
                )}
              </dl>
            </div>
          </div>

          {/* Tags */}
          {model.tags && model.tags.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Tags</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Interactive Demo</h2>
        <ModelDemo model={model} />
      </div>

      {/* Related Models */}
      {relatedModels.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedModels.map(relatedModel => (
              <div 
                key={relatedModel.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={relatedModel.thumbnailUrl}
                  alt={relatedModel.name}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400/E7F5FF/5AA9E6?text=Related+Model';
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{relatedModel.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{relatedModel.description}</p>
                  <Link
                    to={`/models/${relatedModel.id}`}
                    className="text-yellow-500 hover:text-yellow-700 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelDetailPage;
