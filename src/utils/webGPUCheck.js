// Utility function to check if WebGPU is supported
export const checkWebGPUSupport = async () => {
  try {
    // Check if navigator.gpu exists (WebGPU API)
    if (!navigator.gpu) {
      return false;
    }
    
    // Try to request an adapter
    const adapter = await navigator.gpu.requestAdapter();
    return !!adapter;
  } catch (error) {
    console.error("Error checking WebGPU support:", error);
    return false;
  }
};

// Get browser-specific WebGPU information
export const getWebGPUInfo = () => {
  const browserInfo = {
    name: 'Unknown',
    version: 'Unknown',
    webGPUSupported: false,
    recommendedBrowsers: ['Chrome 113+', 'Edge 113+', 'Safari TP'],
  };
  
  // Detect browser
  const userAgent = navigator.userAgent;
  let browserName;
  let browserVersion;
  
  if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
    browserVersion = userAgent.match(/Chrome\/([0-9]+)/)[1];
  } else if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
    browserVersion = userAgent.match(/Firefox\/([0-9]+)/)[1];
  } else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
    browserName = "Safari";
    browserVersion = userAgent.match(/Version\/([0-9]+)/)?.[1] || "Unknown";
  } else if (userAgent.indexOf("Edg") > -1) {
    browserName = "Edge";
    browserVersion = userAgent.match(/Edg\/([0-9]+)/)[1];
  }
  
  browserInfo.name = browserName || 'Unknown';
  browserInfo.version = browserVersion || 'Unknown';
  
  return browserInfo;
};
