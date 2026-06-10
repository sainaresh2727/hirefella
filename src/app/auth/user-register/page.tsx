// ====================================USER REGISTER=======================================================

import React from 'react'
import Image from 'next/image'
import userRegisterImage from '../../../../public/assets/authimages/userRegImg.png'

function page() {
  return (
    <>
    <section className='user-register-cf'>
    <div className="container grid grid-cols-1 grid-cols-2 gap-0" id='user-register-container'>

    <div className='user-reg-image-parent'>
    <Image src={userRegisterImage} alt='user-register-image' className='user-register-image' unoptimized/>
    </div>

    <div className="user-reg-form-div">
    <form className='user-reg-form'>
    
    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your Name:</label>
    <input type="text" className='input' placeholder='Name' />
    </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your Email:</label>
    <input type="email" className='input' placeholder='Email' />
    </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your PhoneNo:</label>
    <input type="number" className='input' placeholder='Number' />
    </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Enter Your Age:</label>
    <input type="number" className='input' placeholder='Age' />
    </div>

    <div className='input-parent'>
    <label className='text-gray-700'>Select Your Role:</label>
    <div className='grid grid-cols-2 gap-5'>
    <button className='role-div' type='button'>
    <h6 className='text-gray-700'>I'm Fresher</h6>
    <p className='text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, iusto?</p>
    </button>
    <button className='role-div' type='button'>
    <h6 className='text-gray-700'>I'm Experienced</h6>
    <p className='text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, voluptas?</p>
    </button>
    </div>
    </div>

    </form>
    </div>

    </div>
    </section>
    </>
  )
}

export default page