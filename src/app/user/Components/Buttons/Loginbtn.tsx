import Link from 'next/link';
import React from 'react'
import { LuLogIn } from "react-icons/lu";

function Loginbtn() {
  return (
   <>
    <Link className='login-btn' href={'/user/auth/user-login'}>LOGIN <LuLogIn className='icon-size'/></Link>
   </>
  )
}

export default Loginbtn