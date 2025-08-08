import React from "react";
import ScrollVideoShader from "./ScrollVideoShader";
import EnterpriseInnovation from "./EnterpriseInnovation/EnterpriseInnovation";
import CustomerEngagement from "./CustomerEngagement/CustomerEngagement";
import customerImage from "../../assets/Images/4.png";
import EmployeeExperience from "./EmployeeExperience/EmployeeExperience";
import KnowledgeManagement from "./KnowledgeManagement/KnowledgeManagement";
import LearningAndDevelopment from "./LearningAndDevelopment/LearningAndDevelopment";
import bgLines from "../../assets/svg/file.svg";
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

 
