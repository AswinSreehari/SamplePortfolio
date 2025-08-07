"use client";
import React, { useEffect, useRef, useState } from "react";
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
    threshold: 0.5, // Trigger when 50% visible
  });

  // Delayed animation states
  const [animateHeading, setAnimateHeading] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    threshold: 0.5, // Trigger when 50% visible
  });

  const buttonRef = useRef(null);
  const isButtonInView = useInView(buttonRef, {
    once: true,
    threshold: 0.5, // Trigger when 50% visible
  });

  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, {
    once: true,
    threshold: 0.5, // Trigger when 50% visible
  });

  // Delay heading animation
  useEffect(() => {
    if (isHeadingInView) {
      const timer = setTimeout(() => {
        setAnimateHeading(true);
      }, 300); // 300ms delay after 50% visibility
      return () => clearTimeout(timer);
    }
  }, [isHeadingInView]);

  // Delay button animation
  useEffect(() => {
    if (isButtonInView) {
      const timer = setTimeout(() => {
        setAnimateButton(true);
      }, 500); // 500ms delay for staggered effect
      return () => clearTimeout(timer);
    }
  }, [isButtonInView]);

  // Delay card animation
  useEffect(() => {
    if (isCardInView) {
      const timer = setTimeout(() => {
        setAnimateCard(true);
      }, 200); // 200ms delay
      return () => clearTimeout(timer);
    }
  }, [isCardInView]);

  useEffect(() => {
    if (isFocusView) {
      addingAnimation();
    }
  }, [isFocusView]);

   

  const text = `Interactive 3D platforms to drive enterprise-wide innovation,
collaboration, and engagement. From showcasing solutions and delivering
impactful executive briefings to enabling real-time co-creation across
teams and stakeholders, these experiences are designed to reflect brand
identity while fostering dynamic knowledge exchange and ideation.`;

  // Animation variants for the heading and button (left to right)
  const leftToRightVariants = {
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

  // Animation variants for the card (right to left)
  const rightToLeftVariants = {
    hidden: {
      x: 100, // Start 100px to the right
      opacity: 0,
    },
    visible: {
      x: -30, // Move -30px to the left of original position
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
            animate={animateHeading ? "visible" : "hidden"} // Use delayed state
            variants={leftToRightVariants}
            className="text-6xl relative font-6rem font-bold text-white top-30 m-5 ml-15 text-shadow-lg/10"
          >
            Enterprise Innovation
          </motion.h4>
          <div className="text-2xl w-200 m-5 top-35 text-white relative ml-22 font-[lato, sans] font-light">
            <BlurText text={text} />
          </div>
          <motion.div
            ref={buttonRef}
            initial="hidden"
            animate={animateButton ? "visible" : "hidden"} // Use delayed state
            variants={leftToRightVariants}
            className="mt-5 relative left-15 top-30"
          >
            <ButtonComponent buttonText={"View Solutions "} />
          </motion.div>
        </div>
        <motion.div
          ref={cardRef}
          initial="hidden"
          animate={animateCard ? "visible" : "hidden"}  
          variants={rightToLeftVariants}
          className="w-50% relative top-15 text-shadow-sm right-20"
        >
          <ThreeDCard
            headingText={"Virtual Innovation Center"}
            imageSrc={Image}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default EnterpriseInnovation;
