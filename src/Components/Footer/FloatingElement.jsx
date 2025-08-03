import React from "react";
import FallingText from "../../../reactBits/FallingText/FallingText";

const FloatingElement = () => {
  return (
    <div className="h-screen z-0 relative top-20">
      <FallingText
        text={`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`}
        highlightWords={["React", "Bits", "animated", "components", "simplify"]}
        highlightClass="highlighted"
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.9}
      />
    </div>
  );
};

export default FloatingElement;
