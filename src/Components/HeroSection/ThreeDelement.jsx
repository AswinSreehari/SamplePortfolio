import React, { useEffect, useRef } from "react";

 
const ThreeDelement = () => {
  const splineRef = useRef(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Prevent double loading
    if (isLoadedRef.current) return;
    
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js"]');
    
    if (existingScript) {
       createSplineViewer();
    } else {
       const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.38/build/spline-viewer.js';
      
      script.onload = () => {
        createSplineViewer();
      };
      
      document.head.appendChild(script);
    }

    function createSplineViewer() {
      if (splineRef.current && !splineRef.current.querySelector('spline-viewer')) {
        // Clear any existing content first
        splineRef.current.innerHTML = '';
        
        const splineViewer = document.createElement('spline-viewer');
        splineViewer.setAttribute('url', 'https://prod.spline.design/U0kI9-ntXEkC6fzk/scene.splinecode');
        
        // Add styling
        // splineViewer.style.width = '50px';
        // splineViewer.style.height = '50px';
        
        splineRef.current.appendChild(splineViewer);
        isLoadedRef.current = true;
      }
    }

    // Cleanup function
    return () => {
      if (splineRef.current) {
        splineRef.current.innerHTML = '';
      }
      isLoadedRef.current = false;
    };
  }, []);

  return (
    <div 
    className="w-50 h-1 flex items-center justify-center"
      ref={splineRef} 
      style={{ maxWidth: '200px', maxHeight: '200px' }}
    >
       <div className="text-gray-500">Loading 3D Scene...</div>
    </div>
  );
};

export default ThreeDelement;