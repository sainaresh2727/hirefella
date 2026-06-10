import Link from 'next/link';
import React from 'react'
import { GiArchiveRegister } from "react-icons/gi";


function Registerbtn() {
  return (
    <>
    <Link href={'/user/auth/user-register'} className='register-btn'>REGISTER <GiArchiveRegister className='icon-size'/></Link>
    </>
  )
}

export default Registerbtn