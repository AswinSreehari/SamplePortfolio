import React from "react";
import BlurText from "../../reactBits/BlurText/BlurText";

const BlurTextElement = ({ text }) => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <div>
      <BlurText
        text= {text}
        delay={100}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-2xl mb-8 leading-10"
      />
    </div>
  );
};

export default BlurTextElement;
