"use client";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import React from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import Image from "../../assets/Images/4.png"

const ThreeDCard = ({ headingText, imageSrc }) => {
  return (
    <div>
      <CardContainer className="inter-var">
        <CardBody className="bg-white relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black  w-auto sm:w-[30rem] h-auto rounded-xl p-6    ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {headingText}
          </CardItem>
          {/* <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            Hover over this card to unleash the power of CSS perspective
          </CardItem> */}
          <CardItem translateZ="150" className="w-full mt-4">
            <img
              src={Image}
              height="1200"
              width="1200"
              className="h-80 w-full object-cover rounded-xl group-hover/card:shadow-gray-300"
              alt="thumbnail"
            />
          </CardItem>
          <div className="mt-5">
            <ButtonComponent buttonText={"View more "} />
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default ThreeDCard;
