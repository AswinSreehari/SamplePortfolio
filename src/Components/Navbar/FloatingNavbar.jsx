"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import logo from "../../assets/Images/KPMG_Logo.png";
import { GiHamburgerMenu } from "react-icons/gi";

// export function NavbarDemo() {
//   return (
//     <div className="relative w-full flex items-center justify-center">
//       <Navbar className="top-2" />
//       <p className="text-black dark:text-white">
//         The Navbar will show on top of the page
//       </p>
//     </div>
//   );
// }

const FloatingNavbar = ({ className }) => {
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn(
        "relative top-5 inset-x-0 max-w-7xl mx-auto z-50",
        className
      )}
    >
      <div className="flex items-center justify-between w-full px-6 py-0 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Company Logo"
            className="h-15 w-auto cursor-pointer"
            onClick={() => (window.location.href = "/")}
          />
        </div>

        {/* Menu items on the right side */}
        <div className="flex items- text-white space-x-4 text-2xl [&_*]:text-white [&_*]:!text-white">
          <Menu setActive={setActive} className="text-white text-2xl text-bold">
            <MenuItem
              item="Home"
              className="text-white hover:text-white"
            ></MenuItem>
            <MenuItem
              // setActive={setActive}
              // active={active}
              item="Focus area"
              className="text-white button hover:text-white"
              onClick={() => {
                console.log("Focus CLicked!!!");
                const element = document.getElementById("focus-area");
                element?.scrollIntoView({ behavior: "smooth" }, 100);
              }}
            ></MenuItem>
            <MenuItem
              item="Solutions"
              className="text-white hover:text-white"
            ></MenuItem>
            <MenuItem
              item={<GiHamburgerMenu size={25} className="mt-1 ml-4" />}
              className="text-white hover:text-white cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            ></MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default FloatingNavbar;

{
  /* <div className="text-sm grid grid-cols-2 gap-10 p-4 bg-transparent">
                <ProductItem
                  title="Algochurn"
                  href="https://algochurn.com"
                  src="https://assets.aceternity.com/demos/algochurn.webp"
                  description="Prepare for tech interviews like never before."
                />
                <ProductItem
                  title="Tailwind Master Kit"
                  href="https://tailwindmasterkit.com"
                  src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                  description="Production ready Tailwind css components for your next project"
                />
                <ProductItem
                  title="Moonbeam"
                  href="https://gomoonbeam.com"
                  src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                  description="Never write from scratch again. Go from idea to blog in minutes."
                />
                <ProductItem
                  title="Rogue"
                  href="https://userogue.com"
                  src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                  description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                />
              </div> */
}
