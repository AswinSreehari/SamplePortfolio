'use client'
import React from "react";
import { SplineScene } from "@/components/ui/splite";
// import { Card } from "@/components/ui/card"
// import { Spotlight } from "@/components/ui/spotlight"


import SplitText from "./SplitText";

const TextSection = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  {/* text-[#00338D] */}
  return (
    <div className="relative top-10 flex items-center justify-between min-h-screen">
  <div className="flex-1 ml-10 z-1 pr-8">
    <SplitText
      text="Intelligent Solutions - Infinite Possibilities"
      className="text-8xl font-bold text-left w-full text-shadow-black-400"
      delay={100}
      duration={0.6}
      ease="power3.out"
      splitType="chars"
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="-100px"
      textAlign="left"
      onLetterAnimationComplete={handleAnimationComplete}
    />
  </div>
  
  <div className="flex-1 -z1 relative h-screen">
    <SplineScene 
      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
      className="w-full h-full"
    />
  </div>
</div>
  );
};

export default TextSection;


 