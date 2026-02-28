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


    const dropSpots = [
        { left: 50, top: 68 },  // Good length middle
        { left: 53, top: 70 },  // Slight leg side
        { left: 56, top: 67 },  // Outside off
        { left: 51, top: 73 },  // Yorker
        { left: 54, top: 64 },  // Slight short
    ];


    const balldrop = () => {
        setTimeout(() => {
            const val = Math.floor(Math.random() * 5);
            setImpactX(dropSpots[val].left);
            setImpactY(dropSpots[val].top);
        }, 3);
    }


    const [position, setPosition] = useState(38);
    const [bat, setBat] = useState(true);
    const [ballLeft, setBallLeft] = useState(51);
    const [ballTop, setBallTop] = useState(45);
    const [ballWidth, setBallWidth] = useState(1);
    const [circle, setCircle] = useState(true);
    const [impactX, setImpactX] = useState(50);
    const [impactY, setImpactY] = useState(60);
    return (
        <div
            className="relative w-screen h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <img src={pitch} alt="" className='absolute top-70 w-120 h-auto left-136 bg-transparent' />
            {circle && (<div
                className="absolute pointer-events-none"
                style={{
                    top: `${impactY}%`,
                    left: `${impactX}%`,
                    transform: "translate(-50%, -50%) perspective(500px) rotateX(65deg)",
                }}
            >
                <div className="relative w-18 h-14">
                    <div className="absolute inset-0 rounded-[50%] border-[3px] border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.7)]"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-6 rounded-b-full bg-gradient-to-t from-yellow-500/60 to-transparent blur-sm"></div>
                    <div className="absolute inset-0 rounded-[50%] border-2 border-yellow-300 animate-spin-slow opacity-70"></div>
                    <div className="absolute inset-0 rounded-[50%] border-2 border-yellow-200 animate-ripple-3d"></div>
                </div>
            </div>)}
            <img src={wicket} className='absolute top-95 left-191 bg-transparent w-10 h-auto' alt="" />
            <img src={ball} style={{ left: `${ballLeft}%`, top: `${ballTop}%`, width: `${ballWidth}%` }} alt="" className='absolute bg-transparent h-auto' />
            {bat && <img src={batsman} style={{ left: `${position}%` }} className='absolute  top-95 bg-transparent w-90 h-auto  transition-all duration-75' alt="" />}
            {
                !bat && <img src={batsman2} style={{ left: `${position}%` }} className='absolute  top-90 bg-transparent w-100 h-auto transition-all duration-75' alt="" />
            }
            <img src={wicket} className='absolute top-120 left-172 bg-transparent w-50 h-auto' alt="" />
            <button onClick={() => { balldrop() }} className="bg-red-300 p-5 rounded-2xl absolute flex top-11/13 left-1/2">PLAY</button>
        </div>
    )
}

export default Background;
