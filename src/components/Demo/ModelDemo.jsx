import React, { useState, useEffect, useRef } from 'react';
import { modelRegistry } from '../../utils/modelRegistry';
import { checkWebGPUSupport } from '../../utils/webGPUCheck';

const ModelDemo = ({ model }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [hasWebGPU, setHasWebGPU] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [demoHeight, setDemoHeight] = useState(600);
  
  // For language models
  const [inputText, setInputText] = useState('');
  
  // For speech models
  const [isRecording, setIsRecording] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [audioData, setAudioData] = useState(null);
  
  // Reference to worker
  const workerRef = useRef(null);
  
  // Check WebGPU support
  useEffect(() => {
    const checkSupport = async () => {
      const supportsWebGPU = await checkWebGPUSupport();
      setHasWebGPU(supportsWebGPU);
    };
    
    checkSupport();
  }, []);
  
  // Determine if we should use direct loading or iframe embedding
  const useDirectLoading = model.modelType && model.modelName;
  
  // Load model when component mounts
  useEffect(() => {
    if (!useDirectLoading) {
      return; // Skip if using iframe
    }
    
    setIsModelLoading(true);
    
    const loadModel = async () => {
      try {
        workerRef.current = await modelRegistry.loadModel(
          model.modelName,
          model.modelType
        );
        
        // Set up message handler
        workerRef.current.onmessage = (event) => {
          const { status, result, error } = event.data;
          
          if (status === 'complete') {
            setResult(result);
            setIsModelLoading(false);
          } else if (status === 'error') {
            setError(error);
            setIsModelLoading(false);
          }
        };
        
        setIsModelLoading(false);
      } catch (err) {
        setError(err.message);
        setIsModelLoading(false);
      }
    };
    
    loadModel();
    
    // Cleanup worker on unmount
    return () => {
      if (model.modelName) {
        modelRegistry.unloadModel(model.modelName);
      }
    };
  }, [model.modelName, model.modelType, useDirectLoading]);

  // Handle iframe loading
  const handleFrameLoad = () => {
    setIsLoading(false);
  };
  
  // Render different UI based on model type
  const renderModelInterface = () => {
    switch (model.modelType) {
      case 'text-generation':
        return (
          <div className="text-generation-demo">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter text prompt..."
              rows={4}
            />
            <button
              className="px-4 py-2 mt-2 bg-yellow-500 text-white rounded"
              onClick={() => {
                setIsModelLoading(true);
                workerRef.current.postMessage({
                  text: inputText,
                  options: model.generationConfig
                });
              }}
              disabled={isModelLoading}
            >
              {isModelLoading ? 'Generating...' : 'Generate Text'}
            </button>
            
            {result && (
              <div className="mt-4 p-4 bg-gray-50 border rounded">
                <p className="font-medium">Generated Output:</p>
                <p>{Array.isArray(result) ? result[0].generated_text : JSON.stringify(result)}</p>
              </div>
            )}
          </div>
        );
        
      case 'speech-recognition':
        return (
          <div className="speech-recognition-demo">
            <button
              className={`px-4 py-2 rounded ${
                isRecording ? 'bg-red-500' : 'bg-yellow-500'
              } text-white`}
              onClick={() => {
                // Toggle recording logic
                if (!isRecording) {
                  startRecording();
                } else {
                  stopRecording();
                }
              }}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            
            {isModelLoading && <p className="mt-2">Processing audio...</p>}
            
            {result && (
              <div className="mt-4 p-4 bg-gray-50 border rounded">
                <p className="font-medium">Transcription:</p>
                <p>{typeof result === 'string' ? result : (result.text || JSON.stringify(result))}</p>
              </div>
            )}
          </div>
        );
        
      case 'image-classification':
        return (
          <div className="image-classification-demo">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setIsModelLoading(true);
                    workerRef.current.postMessage({
                      image: event.target.result
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="mb-4"
            />
            
            {isModelLoading && <p>Processing image...</p>}
            
            {result && (
              <div className="mt-4 p-4 bg-gray-50 border rounded">
                <p className="font-medium">Classification Results:</p>
                <ul className="list-disc pl-5">
                  {Array.isArray(result) ? 
                    result.map((item, i) => (
                      <li key={i}>
                        {item.label}: {(item.score * 100).toFixed(2)}%
                      </li>
                    )) : 
                    <li>{JSON.stringify(result)}</li>
                  }
                </ul>
              </div>
            )}
          </div>
        );
        
      case 'depth-estimation':
        return (
          <div className="depth-estimation-demo">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setIsModelLoading(true);
                    workerRef.current.postMessage({
                      image: event.target.result
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="mb-4"
            />
            
            {isModelLoading && <p>Processing image...</p>}
            
            {result && result.depth && (
              <div className="mt-4">
                <p className="font-medium mb-2">Depth Map:</p>
                <img 
                  src={result.depth} 
                  alt="Depth map" 
                  className="max-w-full h-auto border rounded"
                />
              </div>
            )}
          </div>
        );
        
      // Add cases for other model types
        
      default:
        // If no direct loading, or unknown model type, use iframe
        return (
          <div className="iframe-demo">
            <iframe
              src={model.demoUrl}
              title={`${model.name} Demo`}
              className="w-full rounded-lg border"
              style={{ height: `${demoHeight}px` }}
              onLoad={handleFrameLoad}
              allow="camera; microphone; fullscreen; accelerometer; autoplay; clipboard-write"
            />
          </div>
        );
    }
  };
  
  // Functions for speech recognition
  const startRecording = async () => {
    try {
      // Initialize audio context
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(audioCtx);
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];
      
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        const reader = new FileReader();
        reader.onload = () => {
          setIsModelLoading(true);
          workerRef.current.postMessage({
            audio: reader.result
          });
        };
        reader.readAsArrayBuffer(audioBlob);
      });
      
      mediaRecorder.start();
      setIsRecording(true);
      setAudioData({ mediaRecorder, stream });
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Could not access microphone. Please ensure you have granted permission.');
    }
  };
  
  const stopRecording = async () => {
    if (audioData && audioData.mediaRecorder) {
      audioData.mediaRecorder.stop();
      audioData.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="model-demo">
      {/* WebGPU warning */}
      {model.modelType && model.modelType.includes('webgpu') && hasWebGPU === false && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>
            <strong>WebGPU not available:</strong> This demo works best with WebGPU,
            which is not supported in your browser. For best results, use Chrome 113+
            or Edge 113+.
          </p>
        </div>
      )}
      
      {/* Error display */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}
      
      {/* Loading indicator for iframe demos */}
      {!useDirectLoading && isLoading && (
        <div className="relative demo-container rounded-lg overflow-hidden border border-gray-200 bg-white mb-4">
          <div className="inset-0 flex items-center justify-center bg-gray-50 h-24">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-yellow-500"></div>
              <p className="mt-4 text-gray-600">Loading demo...</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Demo interface */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Interactive Demo</h3>
        {renderModelInterface()}
      </div>
      
      {/* Original demo link */}
      <div className="mt-4 text-right">
        <a
          href={model.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-600 hover:text-yellow-800"
        >
          Open original demo in new tab →
        </a>
      </div>
    </div>
  );
};

export default ModelDemo;
