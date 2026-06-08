"use client"

import { TypeAnimation } from "react-type-animation";
import React from 'react'
import Registerbtn from "./Registerbtn";
import FindjobBtn from "./FindjobBtn";

import heroSecBg from '../../../public/hero-sec-bg-banner.png'
import HiringEcosystem from "./Animation/HiringEcosystem";

function Herosec() {

  let heroBgStyle={
    background:`url(${heroSecBg.src})`,
    minHeight:"100vh",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover"
  }
 
  return (
   <>
   <section className='hero-sec-cf'>
   
   <div className="container grid grid-cols-1 lg:grid-cols-2" id='hero-sec-container'>
  
   <div className="hero-sec-content">
   <h1>The Future Of Hiring <br /> Starts Here</h1>
   <TypeAnimation
      sequence={[
        "Connecting Better Talent.",
        2000,
        "Creating Better Opportunities.",
        2000,
        "Building Better Futures.",
        2000,
      ]}
      wrapper="h6"
      speed={50}
      repeat={Infinity} className="animation-text"/>
   <div className="flex flex-col gap-2">
   <p className="lg:text-gray-700 para-content">From Job Discovery to Career Growth and Intelligent Hiring, HireFella Brings Everything Professionals and Recruiters Need Into One Powerful Ecosystem.</p>
   <p className="lg:text-gray-700 para-content">Empowering Careers and Transforming Hiring through Intelligent Technology, Meaningful Connections, and Limitless Opportunities.</p>
   <p className="lg:text-gray-700 para-content">Connecting talent, opportunities, and innovation to shape the future of work.</p>
   </div>
   <div className='flex items-center gap-4' style={{marginTop:"7px"}}>
   <Registerbtn/>
   <FindjobBtn/>
   </div>
   </div>

   <div>
   <HiringEcosystem/>
   </div>
   
   </div>
   </section>
   </>
  )
}

export default Herosec