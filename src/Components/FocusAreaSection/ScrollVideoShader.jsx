import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

// Enhanced vertex shader with smoother wave distortion
const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uScrollProgress;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Smooth wave layers with varying frequencies
    float wave1 = sin(pos.x * 4.0 + uTime * 1.2) * uIntensity * 0.15;
    float wave2 = sin(pos.y * 3.0 + uTime * 0.8) * uIntensity * 0.12;
    float wave3 = sin((pos.x + pos.y) * 2.5 + uTime * 1.5) * uIntensity * 0.08;
    
    // Gentle ripple effect from center
    float dist = length(pos.xy);
    float ripple = sin(dist * 6.0 - uTime * 2.0) * uIntensity * 0.06;
    
    // Combine all distortions with smooth falloff
    float totalWave = (wave1 + wave2 + wave3 + ripple) * smoothstep(0.0, 1.0, uScrollProgress);
    pos.z += totalWave;
    
    // Subtle X and Y distortion for organic movement
    pos.x += sin(pos.y * 3.0 + uTime * 0.7) * uIntensity * 0.02;
    pos.y += cos(pos.x * 2.5 + uTime * 0.9) * uIntensity * 0.02;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Enhanced fragment shader with smoother UV distortion
const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uOpacity;
  uniform float uScrollProgress;
  
  void main() {
    vec2 uv = vUv;
    
    // Smooth UV distortion with gentle waves
    float wave1 = sin(uv.x * 8.0 + uTime * 1.0) * uIntensity * 0.02;
    float wave2 = sin(uv.y * 6.0 + uTime * 0.8) * uIntensity * 0.015;
    float wave3 = sin((uv.x + uv.y) * 5.0 + uTime * 1.2) * uIntensity * 0.012;
    
    // Radial distortion from center with smooth falloff
    vec2 center = vec2(0.5, 0.5);
    vec2 toCenter = uv - center;
    float dist = length(toCenter);
    float radialWave = sin(dist * 12.0 - uTime * 1.8) * uIntensity * 0.008;
    
    // Apply distortions with smooth interpolation
    float distortionFactor = smoothstep(0.0, 1.0, uScrollProgress);
    uv.x += (wave1 + radialWave * toCenter.x) * distortionFactor;
    uv.y += (wave2 + wave3 + radialWave * toCenter.y) * distortionFactor;
    
    // Subtle chromatic aberration during transition
    vec2 offset = vec2(uIntensity * 0.001, 0.0);
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
  containerHeight = "400vh" // Increased for smoother transition
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
  const [isSticky, setIsSticky] = useState(false);

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

    // Camera with better field of view
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);
    cameraRef.current = camera;

    // High-quality renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = THREE.sRGBEncoding;
    rendererRef.current = renderer;

    // High-quality video texture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;
    videoTexture.flipY = true; // Fix upside down video
    videoTexture.generateMipmaps = false;
    videoTexture.wrapS = THREE.ClampToEdgeWrap;
    videoTexture.wrapT = THREE.ClampToEdgeWrap;

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
      side: THREE.FrontSide
    });
    materialRef.current = material;

    // High-resolution geometry for ultra-smooth distortion
    const geometry = new THREE.PlaneGeometry(5, 2.8125, 128, 128);
    const mesh = new THREE.Mesh(geometry, material);
    
    // Start position - far left and smaller
    mesh.position.set(-6, 0, 0);
    mesh.scale.set(0.4, 0.4, 1);
    
    scene.add(mesh);
    meshRef.current = mesh;

    setIsInitialized(true);
  }, [isInitialized]);

  // Smooth animation loop
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    const time = Date.now() * 0.8; // Slower time progression for smoother waves
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Smooth scroll handling with extended sticky behavior
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top;
    const containerHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Calculate raw scroll progress
    const scrollStart = 0;
    const scrollEnd = -containerHeight + windowHeight;
    const scrollRange = scrollEnd - scrollStart;
    const currentScroll = containerTop - scrollStart;
    
    let rawProgress = Math.max(0, Math.min(1, -currentScroll / Math.abs(scrollRange)));
    
    // Extended sticky behavior for smoother transition
    const stickyStart = 0.15; // Start sticky earlier
    const stickyEnd = 0.85;   // End sticky later
    const wasSticky = isSticky;
    
    let progress = rawProgress;
    
    if (rawProgress >= stickyStart && rawProgress <= stickyEnd) {
      if (!wasSticky) {
        setIsSticky(true);
        document.body.style.overflow = 'hidden';
      }
      // Smooth easing during sticky phase
      const stickyProgress = (rawProgress - stickyStart) / (stickyEnd - stickyStart);
      // Apply easing function for ultra-smooth transition
      progress = stickyProgress * stickyProgress * (3.0 - 2.0 * stickyProgress); // Smoothstep
    } else {
      if (wasSticky) {
        setIsSticky(false);
        document.body.style.overflow = 'auto';
      }
      if (rawProgress < stickyStart) progress = 0;
      if (rawProgress > stickyEnd) progress = 1;
    }

    setScrollProgress(progress);

    // Start playing video early in the transition
    if (progress > 0.05 && !isPlaying && videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [isPlaying, isSticky]);

  // Handle resize with quality preservation
  const handleResize = useCallback(() => {
    if (!rendererRef.current || !cameraRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  // Smooth animation values with easing
  useEffect(() => {
    if (!materialRef.current || !meshRef.current) return;

    const progress = scrollProgress;
    
    // Smooth easing functions
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    // Position: ultra-smooth transition from left to center
    const easedProgress = easeInOutCubic(progress);
    const xPosition = -6 + (easedProgress * 6);
    
    // Scale: gradual, smooth growth
    const scaleProgress = easeOutQuart(progress);
    const scale = 0.4 + (scaleProgress * 0.8); // From 0.4 to 1.2
    
    // Wave intensity: gentle build-up, peak, then settle
    let intensity;
    if (progress < 0.3) {
      // Gentle build-up
      intensity = Math.sin(progress * Math.PI * 5) * 2 * progress;
    } else if (progress < 0.7) {
      // Peak intensity
      intensity = Math.sin((progress - 0.3) * Math.PI * 2.5 + Math.PI) * 4 + 4;
    } else {
      // Gentle settle
      intensity = Math.sin((1 - progress) * Math.PI * 3) * 2;
    }
    
    // Opacity: smooth fade in
    const opacity = Math.min(1, progress * 3);

    // Apply smooth transforms
    meshRef.current.position.x = xPosition;
    meshRef.current.scale.set(scale, scale, 1);

    // Update shader uniforms
    materialRef.current.uniforms.uIntensity.value = Math.max(0, intensity);
    materialRef.current.uniforms.uOpacity.value = opacity;
    materialRef.current.uniforms.uScrollProgress.value = progress;
  }, [scrollProgress]);

  // Initialize when video is ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoReady = () => {
      // Ensure video quality
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      initThreeJS();
    };

    if (video.readyState >= 2) {
      handleVideoReady();
    } else {
      video.addEventListener('loadeddata', handleVideoReady);
      video.addEventListener('canplaythrough', handleVideoReady);
    }

    return () => {
      video.removeEventListener('loadeddata', handleVideoReady);
      video.removeEventListener('canplaythrough', handleVideoReady);
    };
  }, [initThreeJS]);

  // Start animation loop
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
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
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
        materialRef.current.dispose();
      }
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: containerHeight }}
    >
      {/* High-quality video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        webkit-playsinline=""
        className="hidden"
        crossOrigin="anonymous"
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Canvas with high-quality rendering */}
      <div className={`${isSticky ? 'fixed' : 'absolute'} inset-0 z-10`}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ 
            background: 'transparent',
            imageRendering: 'auto'
          }}
        />
      </div>
    </div>
  );
};

export default ScrollVideoShader;