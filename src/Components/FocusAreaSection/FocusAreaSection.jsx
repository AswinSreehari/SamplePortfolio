import React from "react";
import { TextReveal } from "@/components/magicui/text-reveal";
import ScrollVideoShader from "./ScrollVideoShader";
import EnterpriseInnovation from "./EnterpriseInnovation/EnterpriseInnovation";
import CustomerEngagement from "./CustomerEngagement/CustomerEngagement";
import { ContainerScroll } from "../ui/container-scroll-animation";
import customerImage from "../../assets/Images/4.png";
import EmployeeExperience from "./EmployeeExperience/EmployeeExperience";
import KnowledgeManagement from "./KnowledgeManagement/KnowledgeManagement";
import LearningAndDevelopment from "./LearningAndDevelopment/LearningAndDevelopment";

const FocusAreaSection = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold mt-60 text-black dark:text-white">
              {/* Unleash the power of <br /> */}
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Focus Areas
              </span>
            </h1>
          </>
        }
      >
        <img
          src={customerImage}
          alt="hero"
          height={500}
          width={1000}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
      <EnterpriseInnovation />
      <CustomerEngagement />
      <EmployeeExperience />
      <KnowledgeManagement />
      <LearningAndDevelopment />
    </div>
  );
};

export default FocusAreaSection;

{
  /* <TextReveal> Focus Areas</TextReveal>
{/* <CustomerEngagement /> */
}

{
  /* <ScrollVideoShader
videoSrc="/src/assets/Videos/desktop.mp4"
className="bg-gradient-to-b from-black to-gray-900"
containerHeight="250vh"  
/> */
}
