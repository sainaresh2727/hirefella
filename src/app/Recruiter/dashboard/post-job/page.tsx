"use client"

import React, { useState } from 'react'
import { Country,State,City } from 'country-state-city'

function page() {

  const country=Country.getAllCountries()
  const [countryCode,setcountryCode]=useState("")
  const [stateCode,setstateCode]=useState("")
  const [city,setCity]=useState("")
 
  return (
    <>
    <section className='post-new-job-main'>
    <form id='post-job-form'>
    
    <div className='text-center' style={{marginBottom:"12px"}}>
    <h6>Create a New Jobs Here</h6>
    </div>


    <div className='post-job-input-parent'>
    <label>Enter Job Name:</label>
    <input type="text" placeholder='Job Name' className='input' />
    </div>

    <div className='post-job-input-parent'>
    <label>Enter Department:</label>
    <input type="text" placeholder='Department Name' className='input' />
    </div>
 
    
   
    
    <div className='post-job-input-parent'>
    <label>Enter Number Of Openings:</label>
    <input type="number" placeholder='Openings' className='input' />
    </div>

    <div className='post-job-input-parent'>
    <label>Enter Salary:</label>
    <input type="number" placeholder='Salary' className='input' />
    </div>
    

 
    <div className='post-job-input-parent'>
    <label>Enter Minimum Experience:</label>
    <input type='number' name="" id="" className='input' placeholder='Minimum Experience'/>
    </div>

    <div className='post-job-input-parent'>
    <label>Enter Maximum Experience:</label>
    <input type='number' name="" id="" className='input' placeholder='Maximum Experience'/>
    </div>
    

 
    <div className='post-job-input-parent'>
    <label>Enter Qualification:</label>
    <input type='number' name="" id="" className='input' placeholder='Minimum Experience'/>
    </div>
    <div className='post-job-input-parent'>
    <label>Enter Required Skills:</label>
    <input type='text' name="" id="" className='input' placeholder='Required Skills'/>
    </div>
   

   
    <div className='post-job-input-parent'>
    <label>Enter Job Description:</label>
    <textarea name="" id="" className='input' placeholder='Description' rows={5}></textarea>
    </div>

    <div className='post-job-input-parent'>
    <label>Enter Job Requirements:</label>
    <textarea name="" id="" className='input' placeholder='Requirements' rows={5}></textarea>
    </div>
    
    <div className='post-job-input-parent'>
    <label>Select Employement Type:</label>
    <select  className='input'>
    <option hidden>Select Here</option>  
    <option value="Full Time">Full Time</option>  
    <option value="Part Time">Part Time</option>  
    <option value="Internship">Internship</option>  
    <option value="Contract">Contract</option>  
    </select> 
    </div>

    <div className='post-job-input-parent'>
    <label>Select Work Mode:</label>
    <select  className='input'>
    <option hidden>Select Here</option>  
    <option value="Remote">Remote</option>  
    <option value="Hybrid">Hybrid</option>  
    <option value="Onsite">Onsite</option>  
    </select> 
    </div>

    <div className='post-job-input-parent'>
    <label>Perks and Benefits:</label>
    
    </div>
    

    <div className='grid grid-cols-3 gap-8'>
    
    <div className='post-job-input-parent'>
    <label>Select Country:</label>
    <select name="" className='input' onChange={(e)=>setcountryCode(e.target.value)}>
    <option hidden>Select Here</option>
    {
      country.map((x,y)=>{
        return(
          <>
          <option value={x.isoCode} key={x.isoCode}>{x.name}</option>
          </>
        )
      })
    }
    </select>
    </div>
    
    <div className='post-job-input-parent'>
    <label>Select State:</label>
    <select name="" className='input' onChange={(e)=>setstateCode(e.target.value)}>
    <option hidden>Select Here</option>
    {
      State.getStatesOfCountry(countryCode).map((x,y)=>{
        return(
          <>
          <option value={x.isoCode} key={x.isoCode}>{x.name}</option>
          </>
        )
      })
    }
    </select>
    </div>

    <div className='post-job-input-parent'>
    <label>Select City:</label>
    <select className="input" value={city} onChange={(e) => setCity(e.target. value)}>
    <option hidden>Select Here</option>
  {City.getCitiesOfState(countryCode,stateCode).map((x) => (
  <option key={x.name} value={x.name}>
    {x.name}
  </option>))}
  </select>
    </div>  
    </div>

     <div>
    <input type="submit" className='post-job-submit-btn' value={"POST A JOB"} />
    </div>

    </form>
    </section>
    </>
  )
}

export default page