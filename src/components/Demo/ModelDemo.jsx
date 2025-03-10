import React, { useState, useEffect } from 'react';

const ModelDemo = ({ model }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasWebGPU, setHasWebGPU] = useState(null);
  const [demoHeight, setDemoHeight] = useState(600);
  
  // Check for WebGPU support
  useEffect(() => {
    const checkWebGPU = async () => {
      try {
        // Check if navigator.gpu exists (WebGPU API)
        if (!navigator.gpu) {
          setHasWebGPU(false);
          return;
        }
        
        // Try to request an adapter
        const adapter = await navigator.gpu.requestAdapter();
        setHasWebGPU(!!adapter);
      } catch (error) {
        console.error("Error checking WebGPU support:", error);
        setHasWebGPU(false);
      }
    };
    
    checkWebGPU();
  }, []);

  // Handle demo loading
  const handleFrameLoad = () => {
    setIsLoading(false);
  };
  
  // Handle browser compatibility warning
  const renderWebGPUWarning = () => {
    if (hasWebGPU === null) {
      return null; // Still checking
    }
    
    if (hasWebGPU === false && model.id.includes('webgpu')) {
      return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">
                <strong>WebGPU not supported:</strong> This demo requires WebGPU, which is not available in your browser. 
                For best results, use Chrome 113+ or Edge 113+. You can still view the demo, but it may not function correctly.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="model-demo">
      {renderWebGPUWarning()}
      
      <div className="relative demo-container rounded-lg overflow-hidden border border-gray-200 bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-yellow-500"></div>
              <p className="mt-4 text-gray-600">Loading demo...</p>
              <p className="text-sm text-gray-500">This may take a few moments depending on the model size</p>
            </div>
          </div>
        )}
        
        <iframe
          src={model.demoUrl}
          title={`${model.name} Demo`}
          className="w-full rounded-lg"
          style={{ height: `${demoHeight}px` }}
          onLoad={handleFrameLoad}
          allow="camera; microphone; fullscreen; accelerometer; autoplay; clipboard-write"
        />
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <button 
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setDemoHeight(demoHeight + 200)}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
              Expand frame
            </span>
          </button>
        </div>
        
        <a 
          href={model.demoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-yellow-600 hover:text-yellow-800 font-medium"
        >
          Open in new tab for best experience
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ModelDemo;
