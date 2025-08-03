import React from "react";
import Logo from "../Navbar/Logo";
import Navbar from "../Navbar/FloatingNavbar";
import ThreeDComponent from "./ThreeDComponent";
import TextSection from "./TextSection/TextSection";
 
const HeroSection = () => {
  return (
    <div
      className="h-100 bg- bg-cover bg-center "
      // style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div>
        <Logo />
        <Navbar />
        <div className="flex gap-x-5">
          <TextSection />
           {/* <ThreeDComponent /> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
