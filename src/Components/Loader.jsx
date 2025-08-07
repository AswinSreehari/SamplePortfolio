import React from "react";
import logo from "../assets/Images/KPMG_logo.png";
import bg from "../assets/Images/loadingBG.jpg";

const Loader = () => {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center" // Fixed for full-screen, flex for centering
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="flex flex-col items-center">  
        <img 
          src={logo} 
          alt="KPMG Logo" 
          className="mb-4 w-60 h-auto" 
        />
        <div 
          className=" border-white flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-t-transparent"
        ></div> 
      </div>
    </div>
  );
};

export default Loader;
