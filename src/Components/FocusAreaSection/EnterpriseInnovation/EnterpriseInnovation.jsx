"use client";
import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../../ui/3d-card";
import ThreeDCard from "../../ThreeDCard/ThreeDCard";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
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
  const [animateMobileCard, setAnimateMobileCard] = useState(false);
  const [animateDesktopCard, setAnimateDesktopCard] = useState(false);

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

  // Separate refs for mobile and desktop cards
  const mobileCardRef = useRef(null);
  const desktopCardRef = useRef(null);

  const isMobileCardInView = useInView(mobileCardRef, {
    once: true,
    threshold: 0.5,
  });

  const isDesktopCardInView = useInView(desktopCardRef, {
    once: true,
    threshold: 0.5,
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

  useEffect(() => {
    if (isFocusView) {
      // addingAnimation(); // Uncomment if needed
    }
  }, [isFocusView]);

  const text = `Interactive 3D platforms to drive enterprise-wide innovation,
collaboration, and engagement. From showcasing solutions and delivering
impactful executive briefings to enabling real-time co-creation across
teams and stakeholders, these experiences are designed to reflect brand
identity while fostering dynamic knowledge exchange and ideation.`;

  // Animation variants for the heading and button (left to right) - responsive
  const leftToRightVariants = {
    hidden: {
      x: -100, // Start 100px to the left
      opacity: 0,
    },
    visible: {
      x: 0, // No offset for mobile, 30px for larger screens
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 80,
      },
    },
  };

  // Animation variants for the card (right to left) - responsive
  const rightToLeftVariants = {
    hidden: {
      x: 100, // Start 100px to the right
      opacity: 0,
    },
    visible: {
      x: 0, // No offset for mobile, -30px for larger screens
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
      <div
        id="focus-text"
        className="flex lg:flex-row flex-col justify-between min-h-screen mt-8 sm:mt-12 md:mt-20 lg:mt-40 px-4 sm:px-6 md:px-8"
      >
        {/* Main content container with reduced gaps for small devices */}
        <div className="flex flex-col lg:order-1 order-2 gap-1 sm:gap-2 md:gap-6 lg:gap-8">
          {/* Heading - Order 1 for all screens */}
          <motion.h4
            ref={headingRef}
            initial="hidden"
            animate={animateHeading ? "visible" : "hidden"}
            variants={leftToRightVariants}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl 
                       ml-2 sm:ml-4 md:ml-25 lg:ml-20 
                       lg:mt-10  
                       relative font-6rem font-bold text-white 
                       text-shadow-lg/10 
                       text-center sm:text-left
                       order-1"
          >
            Enterprise Innovation
          </motion.h4>

          {/* Mobile Card - Fixed visibility and separate ref */}
          <motion.div
            ref={mobileCardRef}
            initial="hidden"
            animate={animateMobileCard ? "visible" : "hidden"}
            variants={rightToLeftVariants}
            className="block lg:hidden 
                       w-full sm:w-80 md:w-full 
                       mx-auto sm:mx-auto md:ml-10 
                       relative 
                       text-shadow-sm 
                       order-2 
                       scale-75 sm:scale-90 md:scale-100"
          >
            <ThreeDCard
              headingText={"Virtual Innovation Center"}
              imageSrc={Image}
            />
          </motion.div>

          {/* Text content - Order 3 */}
          <div
            className="text-lg sm:text-xl md:text-3xl lg:text-4xl 
                         w-full sm:w-full md:w-200 lg:w-230 
                         mx-2 sm:mx-4 md:ml-30 lg:ml-20 
                         relative 
                         text-white 
                         font-[lato, sans] font-light 
                         order-3
                         px-2 sm:px-0
                         md:top-5 
                          
                         "
          >
            <BlurText text={text} />
          </div>

          {/* Button - Order 4 */}
          <motion.div
            ref={buttonRef}
            initial="hidden"
            animate={animateButton ? "visible" : "hidden"}
            variants={leftToRightVariants}
            className="relative 
                       left-2 sm:left-4 md:left-15 
                       ml-2 sm:ml-4 md:ml-10 lg:ml-5
                       md:top-0   
                       order-4
                       flex justify-center sm:justify-start"
          >
            <ButtonComponent buttonText={"View Solutions "} />
          </motion.div>
        </div>

        {/* Desktop Card - Separate ref */}
        <motion.div
          ref={desktopCardRef}
          initial="hidden"
          animate={animateDesktopCard ? "visible" : "hidden"}
          variants={rightToLeftVariants}
          className="lg:block hidden w-50% relative top-15 text-shadow-sm right-20 lg:order-2"
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
