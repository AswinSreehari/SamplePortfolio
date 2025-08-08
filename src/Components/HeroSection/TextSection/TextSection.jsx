"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import GlobeElement from "../GlobeElement";

const TextSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const [animationReady, setAnimationReady] = useState(false);

  // Delay animation start by 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationReady(true);
    }, 6000); 

    return () => clearTimeout(timer);
  }, []);

  const welcomeTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Animation for "Intelligent Solutions" - slides from left to right
  const intelligentVariants = {
    hidden: { opacity: 0, x: -200 },  
    visible: { 
      opacity: 1, 
      x: 0,  
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        delay: 0.2 
      }
    },
  };

  // Animation for "Infinite Possibilities" - slides from right to left
  const infiniteVariants = {
    hidden: { opacity: 0, x: 200 },  
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        delay: 0.2 // Slight delay after intelligent solutions
      }
    },
  };

   const shouldAnimate = isInView && animationReady;

  return (
    <div
      ref={sectionRef}
      className="relative h-[120vh] top-15 pt-0 w-full flex items-center justify-center overflow-hidden"
    >
      {/* Spline Scene as Background */}
      <div className="absolute inset-0 w-full h-full">
        <GlobeElement />
      </div>

      {/* Text Content Centered on Top */}
      <div className="relative z-10 text-center text-white mt-0 px-8 bottom-20 max-w-6xl">
        <motion.h2
          variants={welcomeTextVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl mb-6 pl-5 text-shadow-lg/10"
        >
          Welcome to KPMG
        </motion.h2>
        
         <div className="text-[8vh] font-medium text-center w-full flex flex-wrap justify-center items-center gap-4">
          <motion.span
            variants={intelligentVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            className="text-shadow-lg/10"
          >
            Intelligent Solutions
          </motion.span>
          <span className="text-shadow-lg/10">-</span>
          <motion.span
            variants={infiniteVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            className="text-shadow-lg/10"
          >
            Infinite Possibilities
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default TextSection;