"use client"

import React, { useState } from 'react'
import regImg from '../../../../../public/assets/authimages/recruiter-reg-img.png'
import Image from 'next/image'
import api from '../../../../services/baseApi'
import { AxiosError } from 'axios'
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from "react-icons/fa";


function RecruiterRegister() {
  const [showPassword,setshowPassword]=useState(false)
  const [registerForm,setRegisterForm]=useState({
    recuriterName:"",
    recuriterEmail:"",
    CompanyName:"",
    recuriterPhoneNo:"",
    recuriterPassword:"",
    reenterRecuirterPass:"",
    recuriterDesignation:""
  })

  // Onchange Handling Function
  function handleChangeFun( e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement>){
    const {name,value}=e.target
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  
  // Reset Function
  function Reset(){
    setRegisterForm({
      recuriterName:"",
      recuriterEmail:"",
      CompanyName:"",
      recuriterPhoneNo:"",
      recuriterPassword:"",
      reenterRecuirterPass:"",
      recuriterDesignation:""
    })
   
  }
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const Router=useRouter()

  async function addRecruiterRegisterDatas(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try{
      const res=await api.post('/recruiter/add/data',registerForm)
      // alert(res.data.message)
      toast.success(res.data.message);
      Router.push('/Recruiter/auth/recruiter-login')
    }
    catch(err){
      const error = err as AxiosError<{message:string}>
      toast.error( error.response?.data?.message ||   error.message);
     // alert(error.response?.data?.message || error.message)
   
    }
  }
    return (
    <>
      <section className='user-register-cf'>
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-0" id='user-register-container'>

    <div className='user-reg-image-parent'>
    <Image src={regImg} alt='user-register-image' className='user-register-image' unoptimized/>
    </div>

    <div className="user-reg-form-div">
    <form className='user-reg-form' onSubmit={(e)=>addRecruiterRegisterDatas(e)}>
    
    <div className="grid grid-cols-2 gap-5">
    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your Name:</label>
    <input type="text" className='input' placeholder='Name' name='recuriterName' onChange={(e)=>handleChangeFun(e)} value={registerForm.recuriterName} required/>
    </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your Email:</label>
    <input type="email" className='input' placeholder='Email' name='recuriterEmail' onChange={(e)=>handleChangeFun(e)} value={registerForm.recuriterEmail} required />
    </div>
    </div>

    <div className=" grid grid-cols-2 gap-5">
    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your PhoneNo:</label>
    <input type="number" className='input' placeholder='Number' name='recuriterPhoneNo' onChange={(e)=>handleChangeFun(e)} value={registerForm.recuriterPhoneNo} required />
    </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Enter Company Name:</label>
    <input type="text" className='input' placeholder='Company Name' name='CompanyName' onChange={(e)=>handleChangeFun(e)} value={registerForm.CompanyName} required/>
    </div>
    </div>

   <div className=" grid grid-cols-2 gap-5">
   <div className='input-parent'>
    <label className='text-gray-700'>Enter Your Password:</label>
    <div className="password-parent">
    <input  type={showPassword ? "text" : "password"} className='input' placeholder='Password' name='recuriterPassword' onChange={(e)=>handleChangeFun(e)} value={registerForm.recuriterPassword} required/>
    <button className='eye-icon' onClick={()=>setshowPassword(!showPassword)} type='button'>
   {showPassword ? <FaEyeSlash /> : <FaEye />}
   </button>
    </div>
    </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Re-Enter Your Password:</label>
    <div className="password-parent">
    <input  type={showConfirmPassword  ? "text" : "password"}className='input' placeholder='Re-Enter Password' name='reenterRecuirterPass' onChange={(e)=>handleChangeFun(e)} value={registerForm.reenterRecuirterPass} required/>
    <button  type="button" className="eye-icon" onClick={() =>
    setShowConfirmPassword(!showConfirmPassword)}>
  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
    </div>
   </div>
   </div>

   <div className='input-parent'>
   <label className='text-gray-700'>Select Your Designation:</label>
   <select name="recuriterDesignation" id=""  onChange={(e)=>handleChangeFun(e)} value={registerForm.recuriterDesignation} className='input'>
   <option hidden>Select Here</option>
   <option value="Hr">Hr</option>
   <option value="Manager">Manager</option>
   <option value="Team Lead">Team Lead</option>
   <option value="Founder">Founder</option>
   <option value="CEO">CEO</option>
   <option value="Others">Others</option>
   </select>
   </div>

    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
    <div className="input-parent">
     <button type='button' className='rest-btn' onClick={()=>Reset()}>RESET VALUES</button>
    </div>

    <div className="input-parent">
    <input type="submit" value={"REGISTER HERE"} className='submit-input-btn'/>
    </div>
    </div>

    <div className='text-center'><p className='text-gray-700 or-with-text'>OR REGISTER WITH</p></div>

    

    <button type='button' className='google-btn'>
    <FcGoogle className='icon-size'/>
    <p>Continue With Google</p>
    </button>
    
    <Link href={'/Recruiter/auth/recruiter-login'} className='dont-have-acc-reg-text'>Already Have an Account <u>Login Here</u></Link>

    </form>
    </div>

    </div>
    </section>
    </>
  )
}

export default RecruiterRegister