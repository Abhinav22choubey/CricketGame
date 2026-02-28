import React from 'react'
import backgroundImg from "../public/background2.png"
import batsman from "../public/batsman.png"
import batsman2 from "../public/batsman2.png"
import pitch from "../public/pitch.png"
import wicket from "../public/wicket.png"
import ball from "../public/ball.png"
import { useState, useEffect } from 'react'

function Background() {
    useEffect(() => {
        const handlePosition = (e) => {

            if (e.code === "Space") {
                setBat(false);
                setTimeout(() => {
                    setBat(true);
                }, 300);
            }

            if (e.key === "ArrowLeft") {

                setPosition((prev) => {
                    console.log(prev);
                    if (prev > 32) {
                        return prev - 2;
                    }
                    else return prev;
                });

            }
            if (e.key === "ArrowRight") {
                setPosition((prev) => {
                    console.log(prev);
                    if (prev < 44) {
                        return prev + 2;
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
    const [bat, setBat] = useState(true);
    const [ballLeft,setBallLeft]=useState(51);
    const [ballTop,setBallTop]=useState(45);
    const [ballWidth,setBallWidth]=useState(1);
    return (
        <div
            className="relative w-screen h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <img src={pitch} alt="" className='absolute top-70 w-120 h-auto left-136 bg-transparent' />
            <img src={wicket} className='absolute top-95 left-191 bg-transparent w-10 h-auto' alt="" />
            <img src={ball} style={{left:`${ballLeft}%` , top:`${ballTop}%`, width:`${ballWidth}%`}} alt="" className='absolute bg-transparent h-auto' />
            {bat && <img src={batsman} style={{ left: `${position}%` }} className='absolute  top-95 bg-transparent w-90 h-auto  transition-all duration-75' alt="" />}
            {
                !bat && <img src={batsman2} style={{ left: `${position}%` }} className='absolute  top-90 bg-transparent w-100 h-auto transition-all duration-75' alt="" />
            }
            <img src={wicket} className='absolute top-120 left-172 bg-transparent w-50 h-auto' alt="" />
            <button  className="bg-red-300 p-5 rounded-2xl absolute flex top-11/13 left-1/2">PLAY</button>
        </div>
    )
}

export default Background;
