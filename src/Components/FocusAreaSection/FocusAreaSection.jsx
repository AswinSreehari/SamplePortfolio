import React from "react";
import ScrollVideoShader from "./ScrollVideoShader";
import EnterpriseInnovation from "./EnterpriseInnovation/EnterpriseInnovation";
import CustomerEngagement from "./CustomerEngagement/CustomerEngagement";
import { ContainerScroll } from "../ui/container-scroll-animation";
import customerImage from "../../assets/Images/4.png";
import EmployeeExperience from "./EmployeeExperience/EmployeeExperience";
import KnowledgeManagement from "./KnowledgeManagement/KnowledgeManagement";
import LearningAndDevelopment from "./LearningAndDevelopment/LearningAndDevelopment";
import bgLines from "../../assets/svg/file.svg";
import VideoElement from "./VideoElement";
import VideoComponent from "../VideoComponent/VideoComponent";

const FocusAreaSection = () => {
  return (
    <div
      className="flex flex-col overflow-hidden mt-40 bg-center bg-no-repeat bg-transparent"
      // style={{
      //           backgroundImage:  `url(${bgLines})`,
      //           backgroundColor: "transparent",
      //         }}
    >
      {/* <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold mt-60 text-black dark:text-white">
               <span className="text-4xl text-white md:text-[6rem] font-bold mt-1 leading-none">
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
      </ContainerScroll> */}
      {/* <ScrollVideoShader /> */}
      {/* <VideoElement /> */}

      <VideoComponent />

    

      <EnterpriseInnovation />
      <CustomerEngagement />
      <EmployeeExperience />
      <KnowledgeManagement />
      <LearningAndDevelopment />
    </div>
  );
};

export default FocusAreaSection;

 
