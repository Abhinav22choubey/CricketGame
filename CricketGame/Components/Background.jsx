import React from 'react'
import backgroundImg from "../public/background2.png"
import batsman from "../public/batsman4.png"
import pitch from "../public/pitch.png"
import wicket from "../public/wicket.png"
import { useState, useEffect } from 'react'

function Background() {
    useEffect(() => {
        const handlePosition = (e) => {
            if (e.key === "ArrowLeft") {
            
                setPosition((prev) => {
                    console.log(prev);
                    if(prev>32){
                        return prev-2;
                    }
                    else return prev;
                });
                
            }
            if (e.key === "ArrowRight") {
                setPosition((prev) => {
                     console.log(prev);
                    if(prev<44){
                        return prev+2;
                    }
                    else return prev
                });
                
            }
        }
        window.addEventListener("keydown", handlePosition)
        return () => {
            window.removeEventListener("keydown", handlePosition);
        };
    }, [])


    const [position, setPosition] = useState(38);
    return (
        <div
            className="relative w-screen h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <img src={pitch} alt="" className='absolute top-70 w-120 h-auto left-136 bg-transparent' />
            <img src={wicket} className='absolute top-95 left-191 bg-transparent w-10 h-auto' alt="" />

            <img src={batsman} style={{ left: `${position}%` }} className='absolute  top-90 bg-transparent w-100 h-auto' alt="" />
            <img src={wicket} className='absolute top-120 left-172 bg-transparent w-50 h-auto' alt="" />

        </div>
    )
}

export default Background
