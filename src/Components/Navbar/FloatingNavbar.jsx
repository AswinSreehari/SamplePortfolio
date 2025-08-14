import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
// import logo from "../../assets/images/KPMG_logo.png";
import logo from "/KPMG_logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion"; 
import { IoMdClose } from "react-icons/io";

const FloatingNavbar = ({ className }) => {
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll function to handle navigation - matches your App.js section IDs
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    } else {
      console.warn(`Section with id "${sectionId}" not found`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 20) {
        setIsVisible(true);
      }
      else if (currentScrollY > lastScrollY && !isHovered && !menuOpen) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || isHovered) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [lastScrollY, isHovered, menuOpen]);

  // Animation variants for the sliding menu
  const menuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }
    }
  };

  // Animation variants for navbar visibility
  const navbarVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <>
      {/* Invisible hover detection zone at the top */}
      <div
        className="fixed top-0 left-0 w-full h-20 z-40"
        onMouseEnter={() => {
          setIsHovered(true);
          setIsVisible(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
      />

      <motion.div
        className={cn(
          "fixed top-5 inset-x-0 max-w-7xl mx-auto z-50",
          className
        )}
        variants={navbarVariants}
        animate={isVisible ? "visible" : "hidden"}
        onMouseEnter={() => {
          setIsHovered(true);
          setIsVisible(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between w-full px-6 py-0 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Company Logo"
              className="h-15 w-auto cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Menu items on the right side - hide on small and medium devices */}
          <div className="hidden lg:flex items-center text-white space-x-4 text-2xl [&_*]:text-gray-400">
            <Menu setActive={setActive} className="text-white text-2xl text-bold">
              <MenuItem
                item="Home"
                className="text-white hover:[&_*]:text-white transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              ></MenuItem>
              <MenuItem
                item="Focus Area"
                className="text-white button hover:[&_*]:text-white transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
                onClick={() => scrollToSection("focus-text")}
              ></MenuItem>
              <MenuItem
                item="Solutions"
                className="text-white hover:[&_*]:text-white transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer"
                onClick={() => scrollToSection("Solution-section")}
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
      </motion.div>

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
              onClick={() => setMenuOpen(false)}
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
                    className="h-12 w-auto cursor-pointer"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setMenuOpen(false);
                    }}
                  />
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-gray-300 text-2xl cursor-pointer"
                  >
                    <IoMdClose size={25} />
                  </button>
                </div>

                {/* Menu items with scroll functionality */}
                <div className="flex-1 p-6">
                  <nav className="space-y-6">
                    {/* Main Navigation Items - Only show on small/medium screens */}
                    <div className="lg:hidden">
                      <motion.button
                        className="block text-white text-xl cursor-pointer font-medium hover:text-gray-300 transition-colors w-full text-left"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          setMenuOpen(false);
                        }}
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        Home
                      </motion.button>

                      <motion.button
                        className="block text-white text-xl cursor-pointer font-medium hover:text-gray-300 transition-colors w-full text-left mt-6"
                        onClick={() => {
                          scrollToSection("focus-text");
                          setMenuOpen(false);
                        }}
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        Focus Area
                      </motion.button>

                      <motion.button
                        className="block text-white text-xl cursor-pointer font-medium hover:text-gray-300 transition-colors w-full text-left mt-6"
                        onClick={() => {
                          scrollToSection("Solution-section");
                          setMenuOpen(false);
                        }}
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        Solutions
                      </motion.button>

                      {/* Divider - only show on small/medium screens */}
                      {/* <div className="border-t border-white/20 my-6"></div> */}
                    </div>

                    {/* Additional Menu Items - Show on all screens */}
                    <motion.button
                      className="block text-white text-xl cursor-pointer font-medium hover:text-gray-300 transition-colors w-full text-left"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Vision
                    </motion.button>
                    
                    <motion.button
                      className="block text-white text-xl cursor-pointer font-medium hover:text-gray-300 transition-colors w-full text-left"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Projects
                    </motion.button>
                    
                    <motion.button
                      className="block text-white text-xl cursor-pointer font-medium hover:text-gray-300 transition-colors w-full text-left"
                      onClick={() => {
                        // scrollToSection("contact-section");
                        scrollToSection("ContactSection");
                        setMenuOpen(false);
                      }}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Contact
                    </motion.button>
                  </nav>
                </div>

                {/* Footer section */}
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
