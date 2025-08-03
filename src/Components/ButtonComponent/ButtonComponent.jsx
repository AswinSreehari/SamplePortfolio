import React from 'react'
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";


const ButtonComponent = ({ buttonText }) => {
  return (
    <div>
        <InteractiveHoverButton>{buttonText}</InteractiveHoverButton>
    </div>
  )
}

export default ButtonComponent