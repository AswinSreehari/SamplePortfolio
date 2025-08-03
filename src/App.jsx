import React from 'react'
import './App.css'
import HeroSection from './Components/HeroSection/HeroSection'
import FocusAreaSection from './Components/FocusAreaSection/FocusAreaSection'
import Footer from './Components/Footer/Footer'
import FloatingElement from './Components/Footer/FloatingElement'
// import Navbar from './Components/Navbar/Navbar'
// import Logo from './Components/Navbar/Logo'

const App = () => {
  return (
    <div>
      <HeroSection />
      <FocusAreaSection />
       <FloatingElement />
       <Footer />
    </div>
  )
}

export default App