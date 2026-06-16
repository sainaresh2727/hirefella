"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import loginImg from '../../../../../public/assets/authimages/recruiter-reg-img.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { AxiosError } from 'axios'
import api from '../../../../services/baseApi'
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

function RecuirterLogin() {
  const [showPassword,setshowPassword]=useState(false)
  const [recuirterLoginEmail,setrecuirterLoginEmail]=useState("")
  const[recuirterLoginPassword,setrecuirterLoginPassword]=useState("")
  const Router=useRouter()


  async function recruiterLoginFun(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try{
      const res=await api.post('/recruiter/login',{recuirterLoginEmail,recuirterLoginPassword})
      toast.success(res.data.message)
      Router.push('/Recruiter/dashboard')
    }
    catch(err){
      const error = err as AxiosError<{message:string}>
      toast.error( error.response?.data?.message ||   error.message);
    }
  }


  return (
    <>
    <section className='recruiter-login-cf'>
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-0" id='recruiter-login-container'>
    
    <div className='flex justify-center items-center recruiter-side-img'>
    <Image src={loginImg} alt='recruiter-login-img' className='user-register-image'/>
    </div>

    <div className='form-div flex items-center justify-center'>
    <form id='recruiter-login-form' onSubmit={(e)=>recruiterLoginFun(e)}>

    <div className='text-center'>
    <h6 className='welcome-back-text'>Welcome Back</h6>
    </div>

    <div className='input-parent'>
    <label>Enter Your Email:</label>
    <input type="email" placeholder='Email' className='input' onChange={(e)=>setrecuirterLoginEmail(e.target.value)} />
    </div>

   <div className='input-parent'>
   <label>Enter Your Password:</label>
   <div className='password-parent'>
   <input type={showPassword ? "text" : "password"} className='input' placeholder='Password' autoComplete='off' onChange={(e)=>setrecuirterLoginPassword(e.target.value)} required/>
   <button className='eye-icon' onClick={()=>setshowPassword(!showPassword)} type='button'>
   {showPassword ? <FaEyeSlash /> : <FaEye />}
   </button>
   </div>
   <div className='flex justify-end'><u className='forget-password-text'>Forget Password?</u></div>
   </div>

   <div>
   <input type="submit" className='recruiter-login-submit-btn' />
   </div>

   <div className='text-center'>
   <p className='or-with-text'>OR LOGIN WITH</p>
   </div>

   <button type='button' className='google-btn'>
  <FcGoogle className='icon-size'/>
  <p>Continue With Google</p>
  </button>

  <Link href={'/Recruiter/auth/recruiter-register'} className='dont-have-acc-reg-text'>Don't Have an Account <u>Register Here</u></Link>

    </form>
    </div>

     </div>
    </section>
    </>
  )
}

export default RecuirterLogin