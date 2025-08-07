"use client";
import React, { useRef } from "react";
import { CardBody, CardContainer, CardItem } from "../../ui/3d-card";
import ThreeDCard from "../../ThreeDCard/ThreeDCard";
import ButtonComponent from "@/Components/ButtonComponent/ButtonComponent";
import Image from "../../../assets/Images/4.png";
import BlurTextElement from "@/Components/BlurTextElement";
import { motion, useInView } from "framer-motion";


const LearningAndDevelopment = () => {
const headingRef = useRef(null);
const isInView  = useInView(headingRef,{
  once: true,
  threshold: 0.1,
})

  const text = `Interactive 3D platforms to drive enterprise-wide innovation, collaboration,
and engagement. From showcasing solutions and delivering impactful executive 
briefings to enabling real-time co-creation across teams and stakeholders,
these experiences are designed to reflect brand identity while fostering 
dynamic knowledge exchange and ideation.`

const headingVariants = {
  hidden: {
    x: -100,
    opacity: 0
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
}

  return (
       <div className="flex flex-row justify-between min-h-screen mt-0">
             <div className="flex flex-col">
             <motion.h4 
             ref={headingRef}
             initial="hidden"
             animate= { isInView ? "visible" : "hidden" }
             variants={headingVariants}
             className="text-6xl relative font-6rem font-bold text-white top-15 m-5 left-8 text-shadow-lg/10" >Learning & Development</motion.h4>
              <div className="text-3xl w-200 m-5 top-15 text-white relative ml-20 font-medium text-shadow-sm">
                 <BlurTextElement text={text} />
              </div>
              <div className="mt-5 relative left-20 top-15">
            <ButtonComponent buttonText={"View Solutions "} />
          </div>
             </div>
              <div  className=" w-50% relative right-15">
              <ThreeDCard headingText={"Virtual Innovation Center"} imageSrc={Image} />
              </div>
           </div>
  )
}

export default LearningAndDevelopment