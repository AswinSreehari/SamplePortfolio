import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ContainerScroll } from "../../ui/container-scroll-animation";
import ThreeDCard from "@/Components/ThreeDCard/ThreeDCard";
// import CometCard from "@/Components/CometCard";
import CustomerImage from "../../../assets/Images/1.png";
import BlurTextElement from "@/Components/BlurTextElement";
import ButtonComponent from "@/Components/ButtonComponent/ButtonComponent";

const CustomerEngagement = () => {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, {
    once: true,
    threshold: 0.1
  });

  const text = `Interactive 3D platforms to drive enterprise-wide innovation,
collaboration, and engagement. From showcasing solutions and delivering
impactful executive briefings to enabling real-time co-creation across
teams and stakeholders, these experiences are designed to reflect brand
identity while fostering dynamic knowledge exchange and ideation.`;

  const headingVariants = {
    hidden: {
      x: 100,
      opacity: 0
    },
    visible: {
      x: 30,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 80,
      }
    }
  };

  return (
    <div className="flex flex-row justify-between min-h-screen mt-0">
       <div className=" w-50% relative ml-15 ">
         <ThreeDCard headingText={"Virtual Innovation Center"} imageSrc={CustomerImage} />
       </div>
      <div className="flex flex-col">
        <motion.h4
          ref={headingRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-6xl relative top-10 font-6rem font-bold font-[lato, sans] text-white left-15 m-5 text-shadow-lg/20"
        >
          Customer Engagement
        </motion.h4>
        <div className="text-3xl text-shadow-sm w-200 m-5 top-15 text-white relative ml-28 font-[lato, sans] font-medium">
          <BlurTextElement text={text} />
        </div>
        <div className="mt-5 relative left-30 top-15">
            <ButtonComponent buttonText={"View Solutions "} />
          </div>
      </div>
    </div>
  );
};

export default CustomerEngagement;