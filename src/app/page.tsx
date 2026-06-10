import React from 'react'
import Navbar from '../app/user/Components/Comman/Navbar'
import Herosec from '../app/user/Components/Herosec'
import ClientArray from '../app/user/Components/ClientArray'
import PlatformImpact from '../app/user/Components/PlatformImpact'

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