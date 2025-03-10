import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
      <div className="mt-6 text-xl text-gray-700 font-medium">Loading AI Models...</div>
      <p className="mt-2 text-gray-500">Preparing your AI experience</p>
    </div>
  );
};

export default LoadingIndicator;
