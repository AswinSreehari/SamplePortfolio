"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../../ui/3d-card";
import ThreeDCard from "../../ThreeDCard/ThreeDCard";
import ButtonComponent from "@/Components/ButtonComponent/ButtonComponent";
import Image from "../../../assets/Images/4.png";
import BlurTextElement from "@/Components/BlurTextElement";

const EmployeeExperience = () => {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, {
    once: true, // Changed from "true" to true (boolean)
    threshold: 0.1
  });

  const text = `Interactive 3D platforms to drive enterprise-wide innovation, collaboration,
and engagement. From showcasing solutions and delivering impactful executive 
briefings to enabling real-time co-creation across teams and stakeholders,
these experiences are designed to reflect brand identity while fostering 
dynamic knowledge exchange and ideation.`;

  const headingVariants = { // Fixed typo: headingVarients -> headingVariants
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      x: 30,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 80
      }
    }
  };

  return (
    <div className="flex flex-row justify-between min-h-screen mt-0">
      <div className="flex flex-col">
        <motion.h4
          ref={headingRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants} // Fixed typo: varients -> variants
          className="text-6xl relative font-6rem font-bold font-[lato, sans] text-white top-15 left-13 m-5 text-shadow-lg/10"
        >
          Employee Experience
        </motion.h4>
        <div className="text-3xl top-15 w-200 m-5 left-5 text-white relative ml-20 font-[lato, sans] font-medium text-shadow-sm">
          <BlurTextElement text={text} />
        </div>
        <div className="mt-5 relative left-25 top-15">
            <ButtonComponent buttonText={"View Solutions "} />
          </div>
      </div>
      <div className=" w-50% relative right-20">
        <ThreeDCard headingText={"Virtual Innovation Center"} imageSrc={Image} />
      </div>
    </div>
  );
};

export default EmployeeExperience;