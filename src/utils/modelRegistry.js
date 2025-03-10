/**
 * Model Registry for managing worker instances and model loading status.
 * Acts as a singleton to ensure consistent model state across the application.
 */
export class ModelRegistry {
  constructor() {
    this.workers = new Map();
    this.modelStatus = new Map();
  }
  
  /**
   * Load a model with the specified modelId and modelType.
   * @param {string} modelId - The HuggingFace model ID.
   * @param {string} modelType - The type of model (e.g., 'text-generation', 'speech-recognition').
   * @returns {Promise<Worker>} A promise that resolves to the worker instance when the model is ready.
   */
  async loadModel(modelId, modelType) {
    // Check if model is already loaded
    if (this.workers.has(modelId)) {
      return this.workers.get(modelId);
    }
    
    // Create new worker
    const worker = new Worker(new URL('../worker.js', import.meta.url), { type: 'module' });
    
    // Setup promise to track loading status
    const modelReadyPromise = new Promise((resolve, reject) => {
      worker.onmessage = (event) => {
        const { status, error } = event.data;
        
        if (status === 'ready') {
          this.modelStatus.set(modelId, 'ready');
          resolve(worker);
        } else if (status === 'error') {
          this.modelStatus.set(modelId, 'error');
          reject(new Error(error));
        }
      };
    });
    
    // Store worker
    this.workers.set(modelId, worker);
    this.modelStatus.set(modelId, 'loading');
    
    // Initiate model loading
    worker.postMessage({ modelId, modelType });
    
    return modelReadyPromise;
  }
  
  /**
   * Get the current status of a model.
   * @param {string} modelId - The HuggingFace model ID.
   * @returns {string} The status of the model ('not-loaded', 'loading', 'ready', 'error').
   */
  getModelStatus(modelId) {
    return this.modelStatus.get(modelId) || 'not-loaded';
  }
  
  /**
   * Unload a model to free up resources.
   * @param {string} modelId - The HuggingFace model ID.
   */
  unloadModel(modelId) {
    if (this.workers.has(modelId)) {
      const worker = this.workers.get(modelId);
      worker.terminate();
      this.workers.delete(modelId);
      this.modelStatus.delete(modelId);
    }
  }
}

// Create singleton instance
export const modelRegistry = new ModelRegistry();
