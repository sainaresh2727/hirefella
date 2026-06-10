import React from 'react'
import SideBarRecuirter from '../components/Common/SideBarRecuirter'
import NavbarRecuirter from '../components/Common/NavbarRecuirter'
import '../Recuirter.css'

function layout({ children }: { children: React.ReactNode }) {
  return (
  <>
  <section className='recuirter-main-section'>
  
   {/* Side Bar [LEFT] */}
  <SideBarRecuirter/>

   {/* Main Layout [RIGHT] */}
   <div className='outlet-section-main'>
  <NavbarRecuirter/>
  <main className='outlet-section-parent'>
  {children}
  </main>
   </div>

  </section>
  </>
  )
}

export default layout