import React from 'react'
import Link from 'next/link'

import Loginbtn from '../Buttons/Loginbtn'
import Registerbtn from '../Buttons/Registerbtn';
import PostjobBtn from '../Buttons/PostjobBtn';

function Navbar() {
  return (
    <>
    <section className='navbar-cf'>
    <div className="container" id='navbar-container'>
    
    {/* Brand Name */}
    <div className="brand">
    <h2>HIREFELLA</h2>
    </div>

    {/* Menus List */}
    <div className="lg-menu-list">
    <ul className='flex items-center justify-center gap-5'>
    <li><Link href={'/'} className='lg-menu-links'>Home</Link></li>
    <li><Link href={'/'} className='lg-menu-links'>About</Link></li>
    <li><Link href={'/'} className='lg-menu-links'>Jobs</Link></li>
    <li><Link href={'/'} className='lg-menu-links'>Enquriy</Link></li>
    <li><Link href={'/'} className='lg-menu-links'>Community</Link></li>
    <li><Link href={'/'} className='lg-menu-links'>Job-Portal</Link></li>
    </ul>
    </div>

    {/* Login and Register Buttons */}
    <div className='flex justify-center items-center gap-5'>
    <Loginbtn/>
    <Registerbtn/>
    <PostjobBtn/>
    </div>
    

    </div>
    </section>
    </>
  )
}

export default Navbar