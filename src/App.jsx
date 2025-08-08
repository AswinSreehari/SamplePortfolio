import React, { useEffect, useState } from 'react';
import './App.css';
import HeroSection from './Components/HeroSection/HeroSection';
import FocusAreaSection from './Components/FocusAreaSection/FocusAreaSection';
import Footer from './Components/Footer/Footer';
import FloatingElement from './Components/Footer/FloatingElement';
import bg from './assets/Images/BG.png';
import Loader from './Components/Loader';
import ProjectListSection from './Components/ProjectListSection/ProjectListSection';

const App = () => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative"> {/* Relative wrapper for positioning the loader overlay */}
      {/* Main content always renders */}
      <div 
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bg})`
        }}
      >
        <HeroSection />
        <div id="Focus-area-section">
        <FocusAreaSection />
        </div>
        <div id="Solution-section">
        <ProjectListSection />
        </div>
      </div>
      {/* <FloatingElement /> */}

      <div id="contact-section">
      <Footer />
      </div>

      {/* Loader overlay: Shows on top until loading is false */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"> {/* Semi-transparent overlay; adjust opacity/color */}
          <Loader />
        </div>
      )}
    </div>
  );
};

export default App;
