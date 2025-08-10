"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import videoSrc from "../../assets/Videos/desktop.mp4";

const VideoAnimation = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
 
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 0.9, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 0.9, 1, 1]);
 
  return (
    <div className="w-full h-full relative my-8 sm:my-16 md:my-20 lg:my-40 min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <div 
        ref={containerRef}
        className="w-full sm:w-[95%] md:w-[90%] h-[70vh] sm:h-[75vh] md:h-[80vh] flex items-center justify-center"
      >
        <motion.div 
          className="w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg"
          style={{ 
            scale,
            opacity,
            transformOrigin: "center center"
          }}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoAnimation;
