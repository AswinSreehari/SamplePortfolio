"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../../ui/3d-card";
import ThreeDCard from "../../ThreeDCard/ThreeDCard";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import Image from "../../../assets/Images/4.png";
import BlurTextElement from "../../BlurTextElement";

const KnowledgeManagement = () => {
  // Delayed animation states - separate states for mobile and desktop cards
  const [animateHeading, setAnimateHeading] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  const [animateMobileCard, setAnimateMobileCard] = useState(false);
  const [animateDesktopCard, setAnimateDesktopCard] = useState(false);

  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    threshold: 0.3, // Reduced threshold for better mobile triggering
  });

  const buttonRef = useRef(null);
  const isButtonInView = useInView(buttonRef, {
    once: true,
    threshold: 0.3, // Reduced threshold for better mobile triggering
  });

  // Separate refs for mobile and desktop cards
  const mobileCardRef = useRef(null);
  const desktopCardRef = useRef(null);

  const isMobileCardInView = useInView(mobileCardRef, {
    once: true,
    threshold: 0.3, // Reduced threshold for better mobile triggering
  });

  const isDesktopCardInView = useInView(desktopCardRef, {
    once: true,
    threshold: 0.3, // Reduced threshold for better mobile triggering
  });

  // Force animation on mount for mobile devices
  useEffect(() => {
    const forceAnimationOnMobile = () => {
      if (window.innerWidth < 1024) {
        // Below lg breakpoint
        setTimeout(() => {
          setAnimateMobileCard(true);
        }, 500);
      }
    };

    forceAnimationOnMobile();
  }, []);

  // Delay heading animation
  useEffect(() => {
    if (isHeadingInView) {
      const timer = setTimeout(() => {
        setAnimateHeading(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isHeadingInView]);

  // Delay button animation
  useEffect(() => {
    if (isButtonInView) {
      const timer = setTimeout(() => {
        setAnimateButton(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isButtonInView]);

  // Mobile card animation
  useEffect(() => {
    if (isMobileCardInView) {
      const timer = setTimeout(() => {
        setAnimateMobileCard(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isMobileCardInView]);

  // Desktop card animation
  useEffect(() => {
    if (isDesktopCardInView) {
      const timer = setTimeout(() => {
        setAnimateDesktopCard(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isDesktopCardInView]);

  const text = `Interactive 3D platforms to drive enterprise-wide innovation, collaboration,
and engagement. From showcasing solutions and delivering impactful executive 
briefings to enabling real-time co-creation across teams and stakeholders,
these experiences are designed to reflect brand identity while fostering 
dynamic knowledge exchange and ideation.`;

  // Animation variants for heading and button (responsive)
  const rightToLeftVariants = {
    hidden: {
      x: 120,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 80,
      },
    },
  };

  // Animation variants for the card (responsive)
  const leftToRightVariants = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
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
    <div className="flex lg:flex-row flex-col justify-between min-h-screen mt-30 sm:mt-30 md:mt-16 lg:mt-0 px-4 sm:px-6 md:px-8">
      {/* Text Content Container with reduced gaps */}
      <div className="flex flex-col lg:order-2 order-1 gap-1 sm:gap-2 md:gap-4 lg:gap-8">
        {/* Heading - Order 1 for all screens */}
        <motion.h4
          ref={headingRef}
          initial="hidden"
          animate={animateHeading ? "visible" : "hidden"}
          variants={rightToLeftVariants}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl 
                     ml-2 sm:ml-4 md:ml-8 lg:ml-30 
                     relative
                     font-6rem font-bold text-white 
                     text-shadow-lg/10 lg:-mt-5
                     text-center sm:text-left
                     order-1"
        >
          Knowledge Management
        </motion.h4>

        {/* Mobile Card - Fixed visibility and separate ref */}
        <motion.div
          ref={mobileCardRef}
          initial="hidden"
          animate={animateMobileCard ? "visible" : "hidden"}
          variants={leftToRightVariants}
          className="lg:hidden block
                     w-full sm:w-80 md:w-96
                     mx-auto sm:mx-auto 
                     relative 
                     order-2
                     scale-75 sm:scale-85 md:scale-95"
        >
          <ThreeDCard
            headingText={"Virtual Innovation Center"}
            imageSrc={Image}
          />
        </motion.div>

        {/* Text Content - Order 3 */}
        <div
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl 
                       text-shadow-sm 
                       w-full sm:w-full md:w-200 lg:w-200 
                       mx-2 sm:mx-4 md:mx-6 lg:ml-20 
                       lg:left-10
                       relative 
                       text-white 
                       font-[lato, sans] font-medium
                       px-2 sm:px-0
                       order-3
                       md:top-3 lg:top-0"
        >
          <BlurTextElement text={text} />
        </div>

        {/* Button - Order 4 */}
        <motion.div
          ref={buttonRef}
          initial="hidden"
          animate={animateButton ? "visible" : "hidden"}
          variants={rightToLeftVariants}
          className="relative 
                     left-2 sm:left-4 md:left-8 lg:left-30 
                     order-4
                     flex justify-center sm:justify-start
                     md:top-0 lg:-top-5"
        >
          <ButtonComponent buttonText={"View Solutions "} />
        </motion.div>
      </div>

      {/* Desktop Card - Separate ref */}
      <motion.div
        ref={desktopCardRef}
        initial="hidden"
        animate={animateDesktopCard ? "visible" : "hidden"}
        variants={leftToRightVariants}
        className="lg:block hidden
                   lg:w-50% 
                   relative lg:left-15 
                   order-1 lg:order-1"
      >
        <ThreeDCard
          headingText={"Virtual Innovation Center"}
          imageSrc={Image}
        />
      </motion.div>
    </div>
  );
};

export default KnowledgeManagement;
