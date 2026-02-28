import React from 'react'
import backgroundImg from "../public/background2.png"
import batsman from "../public/batsman.png"
import batsman2 from "../public/batsman2.png"
import pitch from "../public/pitch.png"
import wicket from "../public/wicket.png"
import ball from "../public/ball.png"
import { useState, useEffect } from 'react'

function Background() {
    const [position, setPosition] = useState(38);
    const [bat, setBat] = useState(true);
    const [ballLeft, setBallLeft] = useState(51);
    const [ballTop, setBallTop] = useState(45);
    const [ballWidth, setBallWidth] = useState(1);
    const [circle, setCircle] = useState(false);
    const [impactX, setImpactX] = useState(50);
    const [impactY, setImpactY] = useState(60);
    const [score, setScore] = useState(0);
    const [ballArrivalTime, setBallArrivalTime] = useState(null);
    const [batSwingTime, setBatSwingTime] = useState(null);

    const runPositions = {
        6: [
            { left: 20, top: 10 },  // Deep mid-wicket (huge hit)
            { left: 80, top: 8 },   // Long off big six
        ],

        4: [
            { left: 15, top: 40 },  // Cover drive boundary
            { left: 85, top: 45 },  // Square leg boundary
        ],

        2: [
            { left: 30, top: 60 },  // Deep inside field (left)
            { left: 70, top: 60 },  // Deep inside field (right)
        ],

        1: [
            { left: 45, top: 75 },  // Soft tap leg side
            { left: 55, top: 75 },  // Soft tap off side
        ],

        0: [
            { left: 51, top: 95 },  // Straight to wicket keeper
            { left: 50, top: 92 },  // Slight variation (dot ball)
        ]
    };
    const dropSpots = [
        { left: 50, top: 68 },  // Good length middle
        { left: 53, top: 70 },  // Slight leg side
        { left: 56, top: 67 },  // Outside off
        { left: 51, top: 73 },  // Yorker
        { left: 54, top: 64 },  // Slight short
    ];
    // next logic to miss ball and wicket to wicket ball for later version
    const finalSpots = [
        { left: 51, top: 95 },
        { left: 51, top: 95 },
        { left: 51, top: 95 },
        { left: 51, top: 95 },
        { left: 51, top: 95 },
    ];


    useEffect(() => {
        const handlePosition = (e) => {

            if (e.key === "Shift") {
                const now = Date.now();
                setBatSwingTime(now);
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


    const balldrop = () => {
        const val = Math.floor(Math.random() * 5);
        const spot = dropSpots[val];
        const finalPos = finalSpots[val];
        setCircle(true);
        setImpactX(spot.left);
        setImpactY(spot.top);

        setBallLeft(51);
        setBallTop(45);
        setBallWidth(1);

        setTimeout(() => {
            setBallLeft(spot.left);
            setBallTop(spot.top);
            setBallWidth(2);

        }, 100)
        setTimeout(() => {
            setBallTop(spot.top - 5);
        }, 900)
        setTimeout(() => {
            setBallLeft(finalPos.left);
            setBallTop(finalPos.top);
            setBallWidth(2.5);
            setBallArrivalTime(Date.now());
        }, 1300)
        setTimeout(() => {
            setBallLeft(51);
            setBallTop(45);
            setBallWidth(1);
            setCircle(false);
            setBallArrivalTime(null);
            setBatSwingTime(null);
        }, 2500);
    }


    useEffect(() => {
        if (ballArrivalTime && batSwingTime) {
            const diff = Math.abs(ballArrivalTime - batSwingTime);
            const indx=Math.floor(Math.random()*2);
            let runs = 0;
            if (diff < 100) runs = 6;
            else if (diff < 200) {
                runs = 4;

            }
            else if (diff < 350) {
                runs = 2;
            }
            else if (diff < 500) {
                runs = 1;

            }
            else {
                runs = 0;

            }
            if(runs>0){
                const possibleSpots=runPositions[runs];
                const randidx=Math.floor(Math.random()*2);
                const shot=possibleSpots[randidx];

                setTimeout(()=>{
                    setBallLeft(shot.left);
                    setBallTop(shot.top);
                    setBallWidth(runs==6?0.5:0.8);
                },300)

            }
            setScore(prev => prev + runs);
            console.log("Timing diff: ", diff, runs);
        }
    }, [ballArrivalTime])



    return (
        <div
            className="relative overflow-hidden w-screen h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div className="absolute top-10 left-10 text-white text-3xl font-bold">
                Score: {score}
            </div>
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
            <img src={ball} style={{ left: `${ballLeft}%`, top: `${ballTop}%`, width: `${ballWidth}%`, transform: "translate(-50%, -50%)", transition: "all 0.8s cubic-bezier(.55,.085,.68,.53)" }} alt="" className='absolute bg-transparent h-auto' />
            {bat && <img src={batsman} style={{ left: `${position}%` }} className='absolute  top-95 bg-transparent w-90 h-auto  transition-all duration-75' alt="" />}
            {
                !bat && <img src={batsman2} style={{ left: `${position}%` }} className='absolute  top-90 bg-transparent w-100 h-auto transition-all duration-75' alt="" />
            }
            <img src={wicket} className='absolute top-120 left-172 bg-transparent w-50 h-auto' alt="" />
            <button onClick={balldrop} className="bg-red-300 p-5 rounded-2xl absolute flex top-11/13 left-1/2">PLAY</button>
        </div>
    )
}

export default Background;
