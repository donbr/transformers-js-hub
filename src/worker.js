import { pipeline, env } from '@huggingface/transformers';

// Enable WebGPU
env.backends.onnx.wasm.numThreads = 1;
env.backends.onnx.wasm.proxy = false;

if (env.backends.webgpu.isAvailable) {
  console.log('WebGPU is available!');
  env.useBrowserCache = true;
  env.useWebGPU = true;
} else {
  console.warn('WebGPU not available - falling back to WebGL or WASM');
}

// Registry of model types and their respective handlers
const modelHandlers = {
  'text-generation': async (modelId) => {
    postMessage({ status: 'initiate', type: 'text-generation' });
    try {
      const generator = await pipeline('text-generation', modelId);
      postMessage({ status: 'ready', type: 'text-generation' });
      
      // Handle incoming generation requests
      self.onmessage = async (event) => {
        if (event.data.text) {
          try {
            const result = await generator(event.data.text, event.data.options || {});
            postMessage({ status: 'complete', result });
          } catch (error) {
            postMessage({ status: 'error', error: error.message });
          }
        }
      };
    } catch (error) {
      postMessage({ status: 'error', error: error.message });
    }
  },
  
  'speech-recognition': async (modelId) => {
    postMessage({ status: 'initiate', type: 'speech-recognition' });
    try {
      const recognizer = await pipeline('automatic-speech-recognition', modelId);
      postMessage({ status: 'ready', type: 'speech-recognition' });
      
      self.onmessage = async (event) => {
        if (event.data.audio) {
          try {
            const result = await recognizer(event.data.audio, event.data.options || {});
            postMessage({ status: 'complete', result });
          } catch (error) {
            postMessage({ status: 'error', error: error.message });
          }
        }
      };
    } catch (error) {
      postMessage({ status: 'error', error: error.message });
    }
  },
  
  'image-classification': async (modelId) => {
    postMessage({ status: 'initiate', type: 'image-classification' });
    try {
      const classifier = await pipeline('image-classification', modelId);
      postMessage({ status: 'ready', type: 'image-classification' });
      
      self.onmessage = async (event) => {
        if (event.data.image) {
          try {
            const result = await classifier(event.data.image, event.data.options || {});
            postMessage({ status: 'complete', result });
          } catch (error) {
            postMessage({ status: 'error', error: error.message });
          }
        }
      };
    } catch (error) {
      postMessage({ status: 'error', error: error.message });
    }
  },
  
  'depth-estimation': async (modelId) => {
    postMessage({ status: 'initiate', type: 'depth-estimation' });
    try {
      const estimator = await pipeline('depth-estimation', modelId);
      postMessage({ status: 'ready', type: 'depth-estimation' });
      
      self.onmessage = async (event) => {
        if (event.data.image) {
          try {
            const result = await estimator(event.data.image, event.data.options || {});
            postMessage({ status: 'complete', result });
          } catch (error) {
            postMessage({ status: 'error', error: error.message });
          }
        }
      };
    } catch (error) {
      postMessage({ status: 'error', error: error.message });
    }
  },
  
  'feature-extraction': async (modelId) => {
    postMessage({ status: 'initiate', type: 'feature-extraction' });
    try {
      const extractor = await pipeline('feature-extraction', modelId);
      postMessage({ status: 'ready', type: 'feature-extraction' });
      
      self.onmessage = async (event) => {
        if (event.data.text) {
          try {
            const result = await extractor(event.data.text, event.data.options || {});
            postMessage({ status: 'complete', result });
          } catch (error) {
            postMessage({ status: 'error', error: error.message });
          }
        }
      };
    } catch (error) {
      postMessage({ status: 'error', error: error.message });
    }
  },
  
  'zero-shot-classification': async (modelId) => {
    postMessage({ status: 'initiate', type: 'zero-shot-classification' });
    try {
      const classifier = await pipeline('zero-shot-classification', modelId);
      postMessage({ status: 'ready', type: 'zero-shot-classification' });
      
      self.onmessage = async (event) => {
        if (event.data.text && event.data.labels) {
          try {
            const result = await classifier(event.data.text, event.data.labels, event.data.options || {});
            postMessage({ status: 'complete', result });
          } catch (error) {
            postMessage({ status: 'error', error: error.message });
          }
        }
      };
    } catch (error) {
      postMessage({ status: 'error', error: error.message });
    }
  },
  
  'text-to-speech': async (modelId) => {
    postMessage({ status: 'initiate', type: 'text-to-speech' });
    try {
      const synthesizer = await pipeline('text-to-speech', modelId);
      postMessage({ status: 'ready', type: 'text-to-speech' });
      
      self.onmessage = async (event) => {
        if (event.data.text) {
          try {
            const result = await synthesizer(event.data.text, event.data.options || {});
            postMessage({ status: 'complete', result });
          } catch (error) {
            postMessage({ status: 'error', error: error.message });
          }
        }
      };
    } catch (error) {
      postMessage({ status: 'error', error: error.message });
    }
  }
};

// Listen for messages from the main thread
self.onmessage = async (event) => {
  const { modelId, modelType } = event.data;
  
  if (modelId && modelType && modelHandlers[modelType]) {
    try {
      await modelHandlers[modelType](modelId);
    } catch (error) {
      postMessage({ status: 'error', error: error.message });
    }
  } else {
    postMessage({ 
      status: 'error', 
      error: `Invalid model type "${modelType}" or handler not implemented` 
    });
  }
};
