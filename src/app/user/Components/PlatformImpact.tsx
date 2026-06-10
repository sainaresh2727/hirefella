"use client"
import React from 'react'
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FindjobBtn from './Buttons/FindjobBtn';
import { IoArrowRedoSharp } from "react-icons/io5";
import { FaBriefcase, FaUsers, FaUserTie, FaTrophy } from "react-icons/fa";

function PlatformImpact() {
   const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const counterArray = [
    {
      id: 1,
      value: 50000,
      title: "Active Opportunities",
      suffix: "+",
      icon: <FaBriefcase/>,
    },
    {
      id: 2,
      value: 100000,
      title: "Professionals",
      suffix: "+",
      icon: <FaUsers/>,
    },
    {
      id: 3,
      value: 10000,
      title: "Recruiters",
      suffix: "+",
      icon: <FaUserTie/>,
    },
    {
      id: 4,
      value: 25000,
      title: "Successful Placements",
      suffix: "+",
      icon: <FaTrophy/>,
    },
  ];
  return (
   <>
   <section className='platform-impact-cf'>
   <div className="container grid grid-cols-1 lg:grid-cols-2" id='platform-impact-container'>
   
   {/* Impact Content Section */}
   <div className='impact-content'>
   <div className="sub-heading-parent-2">
   <p className="sub-heading">OUR IMPACT</p>
   </div>
   <div className='flex flex-col gap-2'>
   <p className='text-gray-700 para-content min-width-card '><IoArrowRedoSharp className='arrow-right-icon' /> HireFella is Helping Professionals and Organizations Achieve Meaningful Results Through Intelligent Hiring, Career Growth, and Opportunity Discovery.</p>
  <p className='text-gray-700 para-content min-width-card'>  <IoArrowRedoSharp className='arrow-right-icon' /> Our Growing Ecosystem Connects Talent with the Right Opportunities While Enabling Businesses to Find, Engage, and Hire Top-Performing Candidates with Confidence.</p>
  <p  className='text-gray-700 para-content min-width-card'> <IoArrowRedoSharp className='arrow-right-icon' /> Connecting Skilled Professionals With Meaningful Opportunities And Enabling Organizations To Build High-Performing Teams.</p>
  <p className='text-gray-700 para-content min-width-card'>  <IoArrowRedoSharp className='arrow-right-icon' /> Transforming The Future Of Work Through Smarter Hiring, Career Development, And Meaningful Professional Connections.</p>
   </div>
   <FindjobBtn/>
   </div>

    {/* Impact Numbers Div */}
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 impact-grid" ref={ref}>
   
   {counterArray.map((x, y) => (
    <div key={y} className="impact-box">
    <div className="icon-parent">
    <span>{x.icon}</span>
    </div>
   <h6 className="">
   {inView ? (
   <CountUp end={x.value} duration={2.5}separator="," suffix={x.suffix}/>
   ) : (
    0
   )}
   </h6>
  <p className="text-gary-700">
   {x.title}
   </p>
   </div>
    ))}
   </div>

   </div>
   </section>
   </>
  )
}

export default PlatformImpact