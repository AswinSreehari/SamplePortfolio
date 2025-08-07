"use client";
import React, { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../../ui/3d-card";
import ThreeDCard from "../../ThreeDCard/ThreeDCard";
import ButtonComponent from "@/Components/ButtonComponent/ButtonComponent";
import Image from "../../../assets/Images/4.png";
import BlurText from "../../BlurTextElement";

const EnterpriseInnovation = () => {
  const focusTextRef = useRef(null);

  const isFocusView = useInView(focusTextRef, {
    once: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (isFocusView) {
      addingAnimation();
    }
  }, [isFocusView]);

  const headingRef = useRef(null);
  const isInView = useInView(headingRef, {
    once: true, // Animation triggers only once
    threshold: 0.1, // Trigger when 10% of element is visible
  });

  const addingAnimation = async () => {
    await animate(
      "#focus-text",
      {
        opacity: 1,
      },
      {
        duration: 1,
        ease: "easeOut",
      }
    );
  };

  const text = `Interactive 3D platforms to drive enterprise-wide innovation,
collaboration, and engagement. From showcasing solutions and delivering
impactful executive briefings to enabling real-time co-creation across
teams and stakeholders, these experiences are designed to reflect brand
identity while fostering dynamic knowledge exchange and ideation.`;

  // Animation variants for the Enterprise Innovation heading
  const headingVariants = {
    hidden: {
      x: -100, // Start 100px to the left
      opacity: 0,
    },
    visible: {
      x: 30, // Move 30px to the right of original position
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 80,
      },
    },
  };

  return (
    <div>
       
      <div id="focus-text" className="flex flex-row justify-between min-h-screen mt-60">
        <div className="flex flex-col">
          <motion.h4
            ref={headingRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headingVariants}
            className="text-6xl relative font-6rem font-bold text-white top-30 m-5 ml-15 text-shadow-lg/10"
          >
            Enterprise Innovation
          </motion.h4>
          <div className="text-2xl w-200 m-5 top-35 text-white relative ml-22 font-[lato, sans] font-light">
            <BlurText text={text} />
          </div>
          <motion.div className="mt-5 relative left-25 top-30">
            <ButtonComponent buttonText={"View Solutions "} />
          </motion.div>
        </div>
        <div className=" w-50% relative top-15 text-shadow-sm right-20">
          <ThreeDCard
            headingText={"Virtual Innovation Center"}
            imageSrc={Image}
          />
        </div>
      </div>
    </div>
  );
};

export default EnterpriseInnovation;
