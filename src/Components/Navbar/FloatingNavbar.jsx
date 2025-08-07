"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import logo from "../../assets/Images/KPMG_Logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion"; 
import { IoMdClose } from "react-icons/io";

const FloatingNavbar = ({ className }) => {
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Add this state for menu toggle

  // Animation variants for the sliding menu
  const menuVariants = {
    hidden: {
      x: "100%", // Start completely off-screen to the right
      opacity: 0,
    },
    visible: {
      x: 0, // Slide to normal position
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      }
    },
    exit: {
      x: "100%", // Slide back off-screen to the right
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }
    }
  };

  return (
    <>
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

          {/* Menu items on the right side - hide on mobile */}
          <div className="hidden md:flex items-center text-white space-x-4 text-2xl [&_*]:text-white [&_*]:!text-white">
            <Menu setActive={setActive} className="text-white text-2xl text-bold">
              <MenuItem
                item="Home"
                className="text-white hover:text-white"
              ></MenuItem>
              <MenuItem
                item="Focus area"
                className="text-white button hover:text-white"
                onClick={() => {
                  console.log("Focus Clicked!!!");
                  const element = document.getElementById("focus-area");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              ></MenuItem>
              <MenuItem
                item="Solutions"
                className="text-white hover:text-white"
              ></MenuItem>
            </Menu>
          </div>

          {/* Hamburger menu - visible on all screens */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none cursor-pointer p-2"
            >
              <GiHamburgerMenu size={25} />
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMenuOpen(false)} // Close menu when clicking outside
            />
            
            {/* Sliding menu panel */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-80 bg-white/10 backdrop-blur-md border-l border-white/20 z-50"
            >
              <div className="flex flex-col h-full">
                {/* Header with close button */}
                <div className="flex justify-between items-center p-6 border-b border-white/20">
                  <img
                    src={logo}
                    alt="Company Logo"
                    className="h-12 w-auto"
                  />
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-gray-300 text-2xl"
                  >
                    <IoMdClose size={25} />
                  </button>
                </div>

                {/* Menu items */}
                <div className="flex-1 p-6">
                  <nav className="space-y-6">
                    <motion.a
                      href="/Contacts"
                      className="block text-white text-xl font-medium hover:text-gray-300 transition-colors"
                      onClick={() => setMenuOpen(false)}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Contacts
                    </motion.a>
                    <motion.a
                      href="/Contacts"
                      className="block text-white text-xl font-medium hover:text-gray-300 transition-colors"
                      onClick={() => setMenuOpen(false)}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Vision
                    </motion.a>
                    
                    {/* <motion.button
                      className="block text-white text-xl font-medium hover:text-gray-300 transition-colors w-full text-left"
                      onClick={() => {
                        console.log("Focus Clicked!!!");
                        const element = document.getElementById("focus-area");
                        element?.scrollIntoView({ behavior: "smooth" });
                        setMenuOpen(false);
                      }}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Focus Area
                    </motion.button> */}
                    
                    <motion.a
                      href="/solutions"
                      className="block text-white text-xl font-medium hover:text-gray-300 transition-colors"
                      onClick={() => setMenuOpen(false)}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Solutions
                    </motion.a>
                    
                    <motion.a
                      href="/contact"
                      className="block text-white text-xl font-medium hover:text-gray-300 transition-colors"
                      onClick={() => setMenuOpen(false)}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Contacts
                    </motion.a>
                    <motion.a
                      href="/Vision"
                      className="block text-white text-xl font-medium hover:text-gray-300 transition-colors"
                      onClick={() => setMenuOpen(false)}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Vision
                    </motion.a>
                  </nav>
                </div>

                {/* Footer section (optional) */}
                <div className="p-6 border-t border-white/20">
                  <p className="text-white/70 text-sm">
                    © 2025 KPMG. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavbar;
