import Link from 'next/link'
import React from 'react'

function RecuriterLoginBtn() {
  return (
    <>
    <Link href={'/Recruiter/auth/recruiter-login'} className='login-btn'>LOGIN</Link>
    </>
  )
}

export default RecuriterLoginBtn