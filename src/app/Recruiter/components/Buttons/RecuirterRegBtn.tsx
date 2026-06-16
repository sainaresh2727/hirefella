import React from 'react'
import Link from 'next/link'

function RecuirterRegBtn() {
  return (
    <>
     <Link href={'/Recruiter/auth/recruiter-register'} className='register-btn'>REGISTER</Link>
    </>
  )
}

export default RecuirterRegBtn