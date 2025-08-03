import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const GLBModel = ({
  modelPath, // Path to your GLB file (required)
  width = 600,
  height = 600,
  className = "",
  style = {},
  autoRotate = true,
  rotationSpeed = 0.005,
  scale = 1,
  position = { x: 0, y: 0, z: 0 },
  cameraDistance = 5,
  enableMouseControls = true
}) => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const frameId = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!modelPath || !mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true // Transparent background
    });

    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Clear and append renderer
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;

    scene.add(ambientLight);
    scene.add(directionalLight);

    // Camera position
    camera.position.set(0, 0, cameraDistance);

    // Mouse controls
    let controls = null;
    if (enableMouseControls) {
      controls = setupControls(camera, renderer.domElement);
    }

    // Load GLB model
    loadGLBModel(scene, modelPath, scale, position);

    // Animation loop
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);

      if (autoRotate && modelRef.current) {
        modelRef.current.rotation.y += rotationSpeed;
      }

      if (controls) {
        controls.update();
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (controls && controls.dispose) {
        controls.dispose();
      }
      
      if (renderer) {
        renderer.dispose();
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelPath, width, height, scale, position, cameraDistance, autoRotate, rotationSpeed, enableMouseControls]);

  const loadGLBModel = async (scene, path, scale, position) => {
    try {
      setLoading(true);
      setError(null);

      // Dynamic import of GLTFLoader
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const loader = new GLTFLoader();

      loader.load(
        path,
        // onLoad
        (gltf) => {
          const model = gltf.scene;

          // Apply scale and position
          model.scale.set(scale, scale, scale);
          model.position.set(position.x, position.y, position.z);

          // Enable shadows
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              // Ensure materials are properly set up
              if (child.material) {
                child.material.needsUpdate = true;
              }
            }
          });

          // Center the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);
          model.position.add(new THREE.Vector3(position.x, position.y, position.z));

          scene.add(model);
          modelRef.current = model;
          setLoading(false);
          console.log('GLB model loaded successfully');
        },
        // onProgress
        (progress) => {
          if (progress.lengthComputable) {
            const percentComplete = (progress.loaded / progress.total) * 100;
            setLoadingProgress(Math.round(percentComplete));
          }
        },
        // onError
        (error) => {
          console.error('Error loading GLB model:', error);
          setError(`Failed to load model: ${error.message || 'Unknown error'}`);
          setLoading(false);
        }
      );
    } catch (err) {
      console.error('Error setting up GLB loader:', err);
      setError(`Setup error: ${err.message}`);
      setLoading(false);
    }
  };

  const setupControls = (camera, domElement) => {
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let rotationX = 0;
    let rotationY = 0;

    const onMouseDown = (event) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseMove = (event) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onWheel = (event) => {
      const scale = event.deltaY > 0 ? 1.1 : 0.9;
      cameraRef.current.position.multiplyScalar(scale);
    };

    domElement.addEventListener('mousedown', onMouseDown);
    domElement.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('mousemove', onMouseMove);
    domElement.addEventListener('wheel', onWheel);

    return {
      update: () => {
        rotationX += (targetRotationX - rotationX) * 0.1;
        rotationY += (targetRotationY - rotationY) * 0.1;

        if (modelRef.current) {
          modelRef.current.rotation.x = rotationX;
          modelRef.current.rotation.y = rotationY;
        }
      },
      dispose: () => {
        domElement.removeEventListener('mousedown', onMouseDown);
        domElement.removeEventListener('mouseup', onMouseUp);
        domElement.removeEventListener('mousemove', onMouseMove); 
        domElement.removeEventListener('wheel', onWheel);
      }
    };
  };

  if (!modelPath) {
    return (
      <div 
        className={`flex items-center justify-center  relative right-0 bg-gray-200 ${className}`}
        style={{ width, height, ...style }}
      >
        <p className="text-gray-500">No model to show now!</p>
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{ width, height, ...style }}
    >
      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full"
        style={{ width, height }}
      />
      
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-700 text-sm">Loading 3D Model...</p>
          {loadingProgress > 0 && (
            <p className="text-gray-500 text-xs mt-1">{loadingProgress}%</p>
          )}
        </div>
      )}
      
      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 bg-opacity-90">
          <div className="text-red-600 text-sm text-center p-4">
            <p className="font-semibold mb-2">Failed to Load Model</p>
            <p className="text-xs">{error}</p>
            <p className="text-xs mt-2 text-gray-500">Check the file path and format</p>
          </div>
        </div>
      )}
      
      {/* Controls Info */}
      {enableMouseControls && !loading && !error && (
        <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white bg-opacity-75 px-2 py-1 rounded">
          Drag: Rotate | Scroll: Zoom
        </div>
      )}
    </div>
  );
};

export default GLBModel;