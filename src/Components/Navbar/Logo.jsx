import React from 'react'
import kpmgLogo from "../../assets/Images/KPMG Logo.png"

const Logo = () => {
  return (
    <div>
        <img className='h-30 fixed' src={kpmgLogo} alt="Kpmg Logo" />
    </div>
  )
}

export default Logo