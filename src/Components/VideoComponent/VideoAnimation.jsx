"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import videoSrc from "../../assets/Videos/desktop.mp4"

const VideoAnimation = ({ src, className = "" }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // useInView with higher threshold and once: true to trigger only after 70% visible
  const isInView = useInView(containerRef, { once: true, threshold: 0.7 }); // Updated for stricter 70% visibility trigger

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress (0 to 1) to animation values
  const x = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.5], [-800, -600, -100, 300]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.5], [0.4, 0.7, 0.98, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.5], [45, 35, 5, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.5], [-25, -15, -5, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [4, 16]);
  
  // New: Animate width and height increase as it moves to center
  const width = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.5], [300, 400, 500, 600]); // From 300px to 600px
  const height = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.5], [200, 267, 333, 400]); // From 200px to 400px (maintaining ~3:2 aspect ratio; adjust as needed)
  
  // Color transformation based on scroll progress (unconditionally define all transforms)
  const hueRotate = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.5], [270, 200, 50, 0]);
  const saturate = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.5], [1.5, 1.3, 1.1, 1]);
  const brightness = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.5], [0.8, 0.85, 0.95, 1]);
  const filterTransform = useTransform(
    [hueRotate, saturate, brightness],
    ([h, s, b]) => `hue-rotate(${h}deg) saturate(${s}) brightness(${b})`
  );

  return (
    <div 
      ref={containerRef}
      className='relative h-[200vh] w-full flex items-center justify-start pl-8'
      style={{ perspective: "1200px" }}
    >
      <div className="sticky top-1/2 -translate-y-1/2">
        <motion.video
          ref={videoRef}
          className={`shadow-2xl ${className}`}
          style={{ 
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            x: isInView ? x : 0, // Apply only if in view (otherwise, no movement)
            scale: isInView ? scale : 1,
            rotateX: isInView ? rotateX : 0,
            rotateY: isInView ? rotateY : 0,
            borderRadius: isInView ? borderRadius : 0,
            filter: isInView ? filterTransform : "none",
            width: isInView ? width : 600, // Start at final width if not in view; animate when in view
            height: isInView ? height : 400 // Start at final height if not in view; animate when in view
          }}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      </div>
    </div>
  );
};

const VideoComponent = () => {
  return <VideoAnimation />;
}

export default VideoComponent;
