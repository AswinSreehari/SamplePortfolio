import React from "react";
import { ContainerScroll } from "../../ui/container-scroll-animation";
import ThreeDCard from "@/Components/ThreeDCard/ThreeDCard";
// import CometCard from "@/Components/CometCard";
import CustomerImage from "../../../assets/Images/1.png";
import BlurTextElement from "@/Components/BlurTextElement";

const CustomerEngagement = () => {

  const text = `Interactive 3D platforms to drive enterprise-wide innovation,
collaboration, and engagement. From showcasing solutions and delivering
impactful executive briefings to enabling real-time co-creation across
teams and stakeholders, these experiences are designed to reflect brand
identity while fostering dynamic knowledge exchange and ideation.`

  return (
    <div className="flex flex-row items-center justify-between  mt-14">
      <div  className=" w-50% absolute top-505 left-20">
        <ThreeDCard
          headingText={"Virtual Experience Store"}
          imageSrc={CustomerImage}
        />
      </div>

      <h4 className="text-7xl absolute font-6rem font-bold font-[lato, sans] text-black top-525 right-25 m-5 shadow-2s">
        Customer Engagement
      </h4>
      <div className="text-3xl w-200 m-5 text-gray-500 absolute top-550 right-10 font-[lato, sans] font-bold">
        <BlurTextElement text={text} />
      </div>
    </div>
  );
};

export default CustomerEngagement;
