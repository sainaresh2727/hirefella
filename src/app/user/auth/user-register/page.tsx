// ====================================USER REGISTER=======================================================

"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import userRegisterImage from '../../../../../public/assets/authimages/userRegImg.png'
import api from '../../../../services/baseApi'
import { AxiosError } from 'axios'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import toast from "react-hot-toast";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function page() {

  const [registerForm,setRegisterForm]=useState({
    registerName:"",
    registerAge:"",
    registerEmail:"",
    registerPassword:"",
    registerPhone:"",
    registerWorkStatus:"",
    reEnterPassword:""
  })

  // Onchange Handling Function 
  function handleChangeFun(e:React.ChangeEvent<HTMLInputElement>){
      const {name,value}=e.target
      setRegisterForm((prev) => ({
        ...prev,
        [name]: value
      }));
  }

  // Reset Function
  function Reset(){
    setRegisterForm({
      registerName:"",
      registerAge:"",
      registerEmail:"",
      registerPassword:"",
      registerPhone:"",
      registerWorkStatus:"",
      reEnterPassword:""
    })
   
  }

  // For Adding User Register Datas
  const Router=useRouter()
  async function addUserRegisterDatas(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try{
      const res=await api.post('/user/register/add',registerForm)
      // alert(res.data.message)
      toast.success(res.data.message);
      Router.push('/auth/user-login')
    }
    catch(err){
      const error = err as AxiosError<{message:string}>
      toast.error( error.response?.data?.message ||   error.message);
     // alert(error.response?.data?.message || error.message)
   
    }
  }

  const [showPassword,setshowPassword]=useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  return (
    <>
    <section className='user-register-cf'>
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-0" id='user-register-container'>

    <div className='user-reg-image-parent'>
    <Image src={userRegisterImage} alt='user-register-image' className='user-register-image' unoptimized/>
    </div>

    <div className="user-reg-form-div">
    <form className='user-reg-form' onSubmit={(e)=>addUserRegisterDatas(e)}>
    
    <div className="grid grid-cols-2 gap-5">
    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your Name:</label>
    <input type="text" className='input' placeholder='Name' name='registerName' onChange={(e)=>handleChangeFun(e)} value={registerForm.registerName} required/>
    </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your Email:</label>
    <input type="email" className='input' placeholder='Email' name='registerEmail' onChange={(e)=>handleChangeFun(e)} value={registerForm.registerEmail} required />
    </div>
    </div>

    <div className=" grid grid-cols-2 gap-5">
    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your PhoneNo:</label>
    <input type="number" className='input' placeholder='Number' name='registerPhone' onChange={(e)=>handleChangeFun(e)} value={registerForm.registerPhone} required />
    </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your Age:</label>
    <input type="number" className='input' placeholder='Age' name='registerAge' onChange={(e)=>handleChangeFun(e)} value={registerForm.registerAge} required/>
    </div>
    </div>

   <div className=" grid grid-cols-2 gap-5">
   <div className='input-parent'>
    <label className='text-gray-700'>Enter Your Password:</label>
    <div className="password-parent">
    <input  type={showPassword ? "text" : "password"} className='input' placeholder='Password' name='registerPassword' onChange={(e)=>handleChangeFun(e)} value={registerForm.registerPassword} required/>
    <button className='eye-icon' onClick={()=>setshowPassword(!showPassword)} type='button'>
   {showPassword ? <FaEyeSlash /> : <FaEye />}
   </button>
    </div>
    </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Re-Enter Your Password:</label>
    <div className="password-parent">
    <input  type={showConfirmPassword  ? "text" : "password"}className='input' placeholder='Re-Enter Password' name='reEnterPassword' onChange={(e)=>handleChangeFun(e)} value={registerForm.reEnterPassword} required/>
    <button  type="button" className="eye-icon" onClick={() =>
    setShowConfirmPassword(!showConfirmPassword)}>
  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
</button>
    </div>
   </div>
   </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Select Your Role:</label>
    <div className='grid grid-cols-2 gap-5'>
    <button className={registerForm.registerWorkStatus === "Fresher" ? "active-role" : "role-div" } type='button' onClick={() =>
    setRegisterForm((prev) => ({
      ...prev,
      registerWorkStatus: "Fresher"
    }))
  } name='registerWorkStatus'>
    <h6 className='text-gray-700'>I'm Fresher</h6>
    <p className='text-gray-700'>I’m a fresher passionate about learning and building my skills in real-world projects.</p>
    </button>
    <button className={registerForm.registerWorkStatus === "Experienced" ? "active-role" : "role-div" }  type='button'onClick={() =>
    setRegisterForm((prev) => ({
      ...prev,
      registerWorkStatus: "Experienced"
    }))
  } name='registerWorkStatus'>
    <h6 className='text-gray-700'>I'm Experienced</h6>
    <p className='text-gray-700'>I’m an experienced professional with practical knowledge in building and delivering projects.</p>
    </button>
    </div>
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
    
    <Link href={'/user/auth/user-login'} className='dont-have-acc-reg-text'>Already Have an Account <u>Login Here</u></Link>

    </form>
    </div>

    </div>
    </section>
    </>
  )
}

export default page