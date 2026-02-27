import React from 'react'
import backgroundImg from "../public/background2.png"
import batsman from "../public/batsman4.png"
import pitch from "../public/pitch.png"
function Background() {
    return (
        <div
            className="relative w-screen h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <img src={pitch} alt="" className='absolute top-70 w-120 h-auto left-136 bg-transparent' />
           <img src={batsman} className='absolute  top-90 left-140 bg-transparent w-100 h-auto' alt="" />

        </div>
    )
}

export default Background
