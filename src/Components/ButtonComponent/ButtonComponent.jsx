import React from 'react'
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";


const ButtonComponent = ({ buttonText }) => {
  return (
    <div>
        <InteractiveHoverButton>{buttonText}</InteractiveHoverButton>
    </div>
  )
}

export default ButtonComponent