import React from 'react'
import Link from 'next/link'

function SideBarRecuirter() {
  return (
    <>
   <section className='recuirter-sidebar-cf'>
 
  <div className="recuirter-links-parent">

  <div className='brand'>
   <h2>HIREFELLA</h2>
   </div>
  
   <div>
   <Link href={'/'} className='recuirter-sidebar-links'>Post a New Job</Link>
   </div>

   <div>
   <Link href={'/'} className='recuirter-sidebar-links'>Posted Jobs</Link>
   </div>

   <div>
   <Link href={'/'} className='recuirter-sidebar-links'>Candidates</Link>
   </div>

   <div>
   <Link href={'/'} className='recuirter-sidebar-links'>Interviews</Link>
   </div>

   <div>
   <Link href={'/'} className='recuirter-sidebar-links'>Tools</Link>
   </div>
   </div>

   <div className='width-full'>
   <Link href={'/'} className='logout-btn'>LOGOUT</Link>
   </div>

   </section>
    </>
  )
}

export default SideBarRecuirter