"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../../ui/3d-card";
import ThreeDCard from "../../ThreeDCard/ThreeDCard";
import ButtonComponent from "@/Components/ButtonComponent/ButtonComponent";
import Image from "../../../assets/Images/4.png";
import BlurTextElement from "@/Components/BlurTextElement";

const EmployeeExperience = () => {

  const text = `Interactive 3D platforms to drive enterprise-wide innovation, collaboration,
and engagement. From showcasing solutions and delivering impactful executive 
briefings to enabling real-time co-creation across teams and stakeholders,
these experiences are designed to reflect brand identity while fostering 
dynamic knowledge exchange and ideation.`
  return (
    <div className="flex flex-row items-center justify-between  mt-14">
      <h4 className="text-7xl absolute font-6rem font-bold font-[lato, sans] text-black top-650 left-20 m-5 shadow-2s" >Employee Experience</h4>
       <div className="text-3xl w-200 m-5 text-gray-500 absolute top-680 left-20 font-[lato, sans] font-bold">
          <BlurTextElement text={text} />
       </div>
       <div  className=" w-50% absolute top-630 right-20">
       <ThreeDCard headingText={"Virtual Innovation Center"} imageSrc={Image} />
       </div>
    </div>
  )
}

export default EmployeeExperience