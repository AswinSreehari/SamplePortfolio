import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

// Enhanced vertex shader with proper wavy effect timing
const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uScrollProgress;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // More dramatic wave effects that are visible during entrance
    float wave1 = sin(pos.x * 6.0 + uTime * 1.5) * uIntensity * 0.3;
    float wave2 = sin(pos.y * 4.0 + uTime * 1.0) * uIntensity * 0.25;
    float wave3 = sin((pos.x + pos.y) * 3.0 + uTime * 2.0) * uIntensity * 0.2;
    
    // Ripple effect from center - more pronounced
    float dist = length(pos.xy);
    float ripple = sin(dist * 8.0 - uTime * 3.0) * uIntensity * 0.15;
    
    // Combine all distortions - stronger effect during entrance
    float entranceMultiplier = smoothstep(0.0, 0.5, uScrollProgress) * (1.0 - smoothstep(0.5, 1.0, uScrollProgress)) + 0.3;
    float totalWave = (wave1 + wave2 + wave3 + ripple) * entranceMultiplier;
    pos.z += totalWave;
    
    // More noticeable X and Y distortion
    pos.x += sin(pos.y * 4.0 + uTime * 1.2) * uIntensity * 0.05;
    pos.y += cos(pos.x * 3.0 + uTime * 1.5) * uIntensity * 0.05;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Enhanced fragment shader with more visible UV distortion
const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uOpacity;
  uniform float uScrollProgress;
  
  void main() {
    vec2 uv = vUv;
    
    // More pronounced UV distortion
    float wave1 = sin(uv.x * 12.0 + uTime * 1.5) * uIntensity * 0.04;
    float wave2 = sin(uv.y * 10.0 + uTime * 1.2) * uIntensity * 0.035;
    float wave3 = sin((uv.x + uv.y) * 8.0 + uTime * 1.8) * uIntensity * 0.03;
    
    // Stronger radial distortion
    vec2 center = vec2(0.5, 0.5);
    vec2 toCenter = uv - center;
    float dist = length(toCenter);
    float radialWave = sin(dist * 15.0 - uTime * 2.5) * uIntensity * 0.02;
    
    // Apply distortions with entrance emphasis
    float entranceMultiplier = smoothstep(0.0, 0.4, uScrollProgress) * (1.0 - smoothstep(0.6, 1.0, uScrollProgress)) + 0.2;
    float distortionFactor = entranceMultiplier;
    
    uv.x += (wave1 + radialWave * toCenter.x) * distortionFactor;
    uv.y += (wave2 + wave3 + radialWave * toCenter.y) * distortionFactor;
    
    // Enhanced chromatic aberration
    vec2 offset = vec2(uIntensity * 0.003, 0.0);
    float r = texture2D(uTexture, uv + offset * distortionFactor).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - offset * distortionFactor).b;
    
    vec4 color = vec4(r, g, b, 1.0);
    gl_FragColor = vec4(color.rgb, color.a * uOpacity);
  }
`;

const ScrollVideoShader = ({ 
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
  className = "",
  containerHeight = "300vh",
  uniqueId = "default" // Add unique ID for multiple instances
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const meshRef = useRef(null);
  const cameraRef = useRef(null);
  const animationIdRef = useRef(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Initialize Three.js scene
  const initThreeJS = useCallback(() => {
    if (!canvasRef.current || !videoRef.current || isInitialized) return;

    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const video = videoRef.current;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Video texture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;
    videoTexture.flipY = false;
    videoTexture.generateMipmaps = false;

    // Shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: videoTexture },
        uTime: { value: 0 },
        uIntensity: { value: 0 },
        uOpacity: { value: 0 },
        uScrollProgress: { value: 0 }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
    materialRef.current = material;

    // Geometry - higher resolution for smoother distortion
    const geometry = new THREE.PlaneGeometry(4, 2.25, 100, 100);
    const mesh = new THREE.Mesh(geometry, material);
    
    // Start position - left side of screen
    mesh.position.set(-8, 0, 0);
    mesh.scale.set(0.3, 0.3, 1);
    
    scene.add(mesh);
    meshRef.current = mesh;

    setIsInitialized(true);
  }, [isInitialized]);

  // Animation loop
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    const time = Date.now() * 0.001;
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Improved scroll handling
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top;
    const containerHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Check if container is in view
    const inView = containerTop < windowHeight && containerTop + containerHeight > 0;
    setIsInView(inView);

    // Calculate progress based on container position
    const scrollStart = windowHeight * 0.8; // Start animation when 80% visible
    const scrollEnd = -containerHeight * 0.5; // End when halfway scrolled past
    
    let progress = 0;
    if (containerTop <= scrollStart && containerTop >= scrollEnd) {
      progress = (scrollStart - containerTop) / (scrollStart - scrollEnd);
      progress = Math.max(0, Math.min(1, progress));
    } else if (containerTop < scrollEnd) {
      progress = 1;
    }

    setScrollProgress(progress);

    // Start video when in view
    if (inView && progress > 0.1 && !isPlaying && videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [isPlaying]);

  // Handle resize
  const handleResize = useCallback(() => {
    if (!rendererRef.current || !cameraRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  // Update animation based on scroll progress
  useEffect(() => {
    if (!materialRef.current || !meshRef.current) return;

    const progress = scrollProgress;
    
    // Smooth easing functions
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    // Position animation: slide from left to center, then stay
    let xPosition;
    if (progress <= 0.6) {
      // Entrance phase - slide from left to center
      const entranceProgress = progress / 0.6;
      const easedProgress = easeInOutCubic(entranceProgress);
      xPosition = -8 + (easedProgress * 8); // From -8 to 0
    } else {
      // Stay in center - don't move further
      xPosition = 0;
    }
    
    // Scale animation: grow during entrance, stay large
    let scale;
    if (progress <= 0.7) {
      const scaleProgress = easeOutQuart(progress / 0.7);
      scale = 0.3 + (scaleProgress * 0.9); // From 0.3 to 1.2
    } else {
      scale = 1.2; // Stay at full size
    }
    
    // Wave intensity: peak during entrance, then gentle waves
    let intensity;
    if (progress <= 0.5) {
      // Build up intensity during entrance
      intensity = progress * 8; // 0 to 4
    } else if (progress <= 0.8) {
      // Peak intensity with wavy effects
      intensity = 4 + Math.sin((progress - 0.5) * Math.PI * 4) * 2;
    } else {
      // Gentle ongoing waves
      intensity = 2 + Math.sin(Date.now() * 0.002) * 1;
    }
    
    // Opacity: fade in smoothly, stay visible
    const opacity = Math.min(1, progress * 2.5);

    // Apply transforms
    meshRef.current.position.x = xPosition;
    meshRef.current.scale.set(scale, scale, 1);

    // Update shader uniforms
    materialRef.current.uniforms.uIntensity.value = Math.max(0, intensity);
    materialRef.current.uniforms.uOpacity.value = opacity;
    materialRef.current.uniforms.uScrollProgress.value = progress;
  }, [scrollProgress]);

  // Initialize when video loads
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoReady = () => {
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.muted = true; // Ensure muted for autoplay
      initThreeJS();
    };

    // Add error handling
    const handleVideoError = (e) => {
      console.error(`Video error for ${uniqueId}:`, e);
    };

    if (video.readyState >= 2) {
      handleVideoReady();
    } else {
      video.addEventListener('loadeddata', handleVideoReady);
      video.addEventListener('canplaythrough', handleVideoReady);
      video.addEventListener('error', handleVideoError);
    }

    return () => {
      video.removeEventListener('loadeddata', handleVideoReady);
      video.removeEventListener('canplaythrough', handleVideoReady);
      video.removeEventListener('error', handleVideoError);
    };
  }, [initThreeJS, uniqueId]);

  // Start animation
  useEffect(() => {
    if (isInitialized) {
      animate();
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isInitialized, animate]);

  // Event listeners
  useEffect(() => {
    const throttledHandleScroll = (() => {
      let ticking = false;
      return () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    })();

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (materialRef.current) {
        if (materialRef.current.uniforms.uTexture.value) {
          materialRef.current.uniforms.uTexture.value.dispose();
        }
        materialRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Video element with unique key */}
      <video
        ref={videoRef}
        src={videoSrc}
        key={`${uniqueId}-${videoSrc}`} // Unique key for each instance
        muted
        loop
        playsInline
        className="hidden"
        crossOrigin="anonymous"
        preload="metadata"
        onError={(e) => console.error(`Video load error for ${uniqueId}:`, e)}
      />

      {/* Canvas container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ 
            background: 'transparent',
            display: isInView ? 'block' : 'none' // Only render when in view
          }}
        />
      </div>
    </div>
  );
};

// Demo component showing multiple videos
const MultiVideoDemo = () => {
  const videos = [
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      id: "video1"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", 
      id: "video2"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      id: "video3"
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Scroll Video Effects</h1>
          <p className="text-xl">Watch videos come alive with wavy shader effects</p>
        </div>
      </div>

      {/* Multiple video sections */}
      {videos.map((video, index) => (
        <div key={video.id}>
          <ScrollVideoShader
            videoSrc={video.src}
            uniqueId={video.id}
            containerHeight="300vh"
            className="bg-black"
          />
          
          {/* Spacer content */}
          <div className="h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-4">Video {index + 1} Complete</h2>
              <p className="text-lg">Scroll down for the next video experience</p>
            </div>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">The End</h2>
          <p className="text-lg">All videos completed with smooth transitions</p>
        </div>
      </div>
    </div>
  );
};

export default MultiVideoDemo;