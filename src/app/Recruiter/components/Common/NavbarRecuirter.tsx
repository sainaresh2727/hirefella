import { div } from 'framer-motion/client'
import React from 'react'
import Link from 'next/link'
import RecuriterLoginBtn from '../Buttons/RecuriterLoginBtn'
import RecuirterRegBtn from '../Buttons/RecuirterRegBtn'

function NavbarRecuirter() {
  return (
    <>
    <div className='recuirter-navbar-container'>

    <div>
    <h1 className='recuirter-dashboard-text'>Recuirter Dashboard</h1>
    </div>

    <div className='flex items-center justify-center gap-4'>
    <RecuriterLoginBtn/>
    <RecuirterRegBtn/>
    </div>

    </div>
    </>
  )
}

export default NavbarRecuirter