"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import userRegisterImage from '../../../../../public/assets/authimages/userRegImg.png'
import api from '../../../../services/baseApi'
import { AxiosError } from 'axios'
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function page() {

  const [loginEmail,setloginEmail]=useState("")
  const [loginPassword,setloginPassword]=useState("")
  const [showPassword,setshowPassword]=useState(false)
  const Router=useRouter()

  async function userLoginDatas(e:React.FormEvent<HTMLFormElement>) {
    
    e.preventDefault()
    
    try{
      const res=await api.post('/user/login',{loginEmail,loginPassword}) 
      toast.success(res.data.message)
      setloginEmail("")
      setloginPassword("")
      Router.push('/')
    }
    catch(err){
      const error = err as AxiosError<{message:string}>
      toast.error( error.response?.data?.message ||   error.message);
    }
  }

  return (
   <>
   <section className='user-login-cf'>
   <div className="container user-login-container grid grid-cols-2 gap-0">
   
   <div className='user-reg-image-parent'>
   <Image src={userRegisterImage} alt='user-register-image' className='user-register-image' unoptimized/>
   </div>

   <div className='flex justify-center items-center'>
   <form className='user-login-form' onSubmit={(e)=>userLoginDatas(e)}>
   
   <div className='text-center'>
   <h6 className='welcome-back-text'>Welcome Back</h6>
   </div>

   <div className='input-parent'>
   <label>Enter Your Email:</label>
   <input type="email" className='input' placeholder='Email' value={loginEmail} onChange={(e)=>setloginEmail(e.target.value)} autoComplete='off' required/>
   </div>

   <div className='input-parent'>
   <label>Enter Your Password:</label>
   <div className='password-parent'>
   <input type={showPassword ? "text" : "password"} className='input' placeholder='Password' value={loginPassword} onChange={(e)=>setloginPassword(e.target.value)} autoComplete='off' required/>
   <button className='eye-icon' onClick={()=>setshowPassword(!showPassword)} type='button'>
   {showPassword ? <FaEyeSlash /> : <FaEye />}
   </button>
   </div>
   <div className='flex justify-end'><u className='forget-password-text'>Forget Password?</u></div>
   </div>

   <div className="input-parent">
   <input type="submit" className='user-login-btn' />
   </div>

  <div className='text-center'>
  <p className='or-with-text'>OR LOGIN WITH</p>
  </div>

  <button type='button' className='google-btn'>
  <FcGoogle className='icon-size'/>
  <p>Continue With Google</p>
  </button>
   
   <Link href={'/user/auth/user-register'} className='dont-have-acc-reg-text'>Don't Have an Account <u>Register Here</u></Link>

   </form>
   </div>

   </div>
   </section>
   </>
  )
}

export default page