import React from "react";
import BlurText from "../../reactBits/BlurText/BlurText";

const BlurTextElement = ({ text }) => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  
  return (
    <div>
      <BlurText
        text={text}
        delay={100}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="relative text-sm  sm:w-100 md:w-160 lg:w-[85%] md:top-0 md:mt-0 sm:text-base md:text-2xl lg:text-xl xl:text-2xl mb-4 sm:mb-6 md:mb-8 leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-10 px-2 sm:px-0"
      />
    </div>
  );
};

export default BlurTextElement;