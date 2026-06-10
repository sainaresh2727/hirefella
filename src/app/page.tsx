import React from 'react'
import Navbar from './Components/Comman/Navbar'
import Herosec from './Components/Herosec'
import ClientArray from './Components/ClientArray'
import PlatformImpact from './Components/PlatformImpact'

function page() {
  return (
    <>
    <Navbar/>
    <Herosec/>
    <ClientArray/>
    <PlatformImpact/>
    </>
  )
}

export default page