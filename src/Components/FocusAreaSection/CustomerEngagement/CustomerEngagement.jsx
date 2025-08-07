import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ContainerScroll } from "../../ui/container-scroll-animation";
import ThreeDCard from "@/Components/ThreeDCard/ThreeDCard";
// import CometCard from "@/Components/CometCard";
import CustomerImage from "../../../assets/Images/1.png";
import BlurTextElement from "@/Components/BlurTextElement";
import ButtonComponent from "@/Components/ButtonComponent/ButtonComponent";

const CustomerEngagement = () => {
  // Delayed animation states
  const [animateHeading, setAnimateHeading] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    threshold: 0.5 // Trigger when 50% visible
  });

  const buttonRef = useRef(null);
  const isButtonInView = useInView(buttonRef, {
    once: true,
    threshold: 0.5 // Trigger when 50% visible
  });

  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, {
    once: true,
    threshold: 0.5 // Trigger when 50% visible
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

  const text = `Interactive 3D platforms to drive enterprise-wide innovation,
collaboration, and engagement. From showcasing solutions and delivering
impactful executive briefings to enabling real-time co-creation across
teams and stakeholders, these experiences are designed to reflect brand
identity while fostering dynamic knowledge exchange and ideation.`;

  // Animation variants for heading and button (right to left)
  const rightToLeftVariants = {
    hidden: {
      x: 100, // Start 100px to the right
      opacity: 0
    },
    visible: {
      x: 30, // Move 30px to the right of original position
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 80,
      }
    }
  };

  // Animation variants for the card (left to right)
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

  return (
    <div className="flex flex-row justify-between min-h-screen mt-0">
      <motion.div
        ref={cardRef}
        initial="hidden"
        animate={animateCard ? "visible" : "hidden"}
        variants={leftToRightVariants}
        className="w-50% relative ml-15"
      >
        <ThreeDCard headingText={"Virtual Innovation Center"} imageSrc={CustomerImage} />
      </motion.div>
      <div className="flex flex-col">
        <motion.h4
          ref={headingRef}
          initial="hidden"
          animate={animateHeading ? "visible" : "hidden"}
          variants={rightToLeftVariants}
          className="text-6xl relative top-10 font-6rem font-bold font-[lato, sans] text-white left-15 m-5 text-shadow-lg/20"
        >
          Customer Engagement
        </motion.h4>
        <div className="text-3xl text-shadow-sm w-200 m-5 top-15 text-white relative ml-28 font-[lato, sans] font-medium">
          <BlurTextElement text={text} />
        </div>
        <motion.div
          ref={buttonRef}
          initial="hidden"
          animate={animateButton ? "visible" : "hidden"}
          variants={rightToLeftVariants}
          className="mt-5 relative left-22 top-15"
        >
          <ButtonComponent buttonText={"View Solutions "} />
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerEngagement;
