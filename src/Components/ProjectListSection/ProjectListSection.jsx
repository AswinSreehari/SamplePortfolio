"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import image_1 from "../../assets/Images/1.png"
import image_2 from "../../assets/Images/2.png"
import image_3 from "../../assets/Images/3.png"
import image_4 from "../../assets/Images/4.png"
import image_5 from "../../assets/Images/5.png"
import image_6 from "../../assets/Images/6.png"
import image_7 from "../../assets/Images/7.png"
import image_8 from "../../assets/Images/8.png"
import image_9 from "../../assets/Images/9.png"
import image_10 from "../../assets/Images/10.png"

const ProjectListSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Sample project data with imported images
  const projects = [
    {
      id: "enterprise_innovation",
      title: "Enterprise Innovation",
      subtitle: "Virtual Innovation Center",
      category: "WEB • DESIGN • DEVELOPMENT • 3D",
      href: "/projects/enterprise-innovation",
      image: image_1,
    },
    {
      id: "customer_engagement",
      title: "Customer Engagement",
      subtitle: "Digital Experience Platform",
      category: "CONCEPT • 3D ILLUSTRATION • MOGRAPH • VIDEO",
      href: "/projects/customer-engagement",
      image: image_2,
    },
    {
      id: "employee_experience",
      title: "Employee Experience",
      subtitle: "Workplace Solutions",
      category: "WEB • DESIGN • DEVELOPMENT • 3D",
      href: "/projects/employee-experience",
      image: image_3,
    },
    {
      id: "knowledge_management",
      title: "Knowledge Management",
      subtitle: "Smart Learning Hub",
      category: "WEB • DESIGN • DEVELOPMENT • AI",
      href: "/projects/knowledge-management",
      image: image_4,
    },
    {
      id: "learning_development",
      title: "Learning & Development",
      subtitle: "Training Platform",
      category: "WEB • DESIGN • DEVELOPMENT • 3D • WEB3",
      href: "/projects/learning-development",
      image: image_5,
    },
    {
      id: "digital_transformation",
      title: "Digital Transformation",
      subtitle: "Future Workspace",
      category: "WEB • DESIGN • DEVELOPMENT • 3D",
      href: "/projects/digital-transformation",
      image: image_6,
    }
  ];

  // Function to create animated letter spans like Lusion
  const createAnimatedText = (text, isHovered = false) => {
    return text.split('').map((char, index) => {
      if (char === ' ') {
        return (
          <div 
            key={index}
            className="inline-block"
            style={{ width: '0.3em' }}
          />
        );
      }
      return (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            x: isHovered ? 15 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: index * 0.02 // Stagger animation
          }}
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* 2 columns layout */}
      <div className="project-list grid grid-cols-1 lg:grid-cols-2 gap-12">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="project-item block group cursor-pointer"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Project Image Card - Clean with no text overlay */}
            <motion.div 
              className="project-image-container h-[60vh] relative overflow-hidden rounded-2xl bg-white shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-110 object-cover"
              />
              
              {/* Subtle hover overlay */}
              <motion.div
                className="absolute inset-0 bg-black/10"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredProject === project.id ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Text Content Outside the Card */}
            <div className="project-content mt-6 space-y-3">
              {/* Category */}
              <div className="category text-sm font-medium text-white tracking-wider">
                {project.category}
              </div>

              {/* Project Title with Animation */}
              <div className="project-title">
                <motion.div
                  className="project-title-icon inline-block w-2 h-2 bg-white rounded-full mr-4"
                  animate={{
                    x: hoveredProject === project.id ? 10 : 0
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                
                <h3 className="inline text-2xl md:text-3xl font-bold text-white">
                  {createAnimatedText(project.title, hoveredProject === project.id)}
                </h3>
              </div>

              {/* Subtitle */}
              <motion.p 
                className="text-white text-base pl-6"
                animate={{
                  x: hoveredProject === project.id ? 10 : 0,
                  color: hoveredProject === project.id ? "#000000" : "#6B7280"
                }}
                transition={{ duration: 0.3 }}
              >
                {project.subtitle}
              </motion.p>

              {/* Optional: View Project Link */}
              <motion.a
                href={project.href}
                className="inline-flex items-center text-sm font-medium text-white hover:text-grey-500 transition-colors pl-6 mt-2"
                animate={{
                  x: hoveredProject === project.id ? 10 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                View Project
                <motion.span 
                  className="ml-2"
                  animate={{
                    x: hoveredProject === project.id ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectListSection;
