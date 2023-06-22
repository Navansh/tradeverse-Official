import { Navbar, Sidebar } from '@/components'
import StoreDetails from '@/components/StoreDetails'
import React from 'react'

const Store = () => {
  return (
    <>
    <Navbar />
    <div className='flex items-start'>
      <Sidebar />
      <div className='mx-[20px]'>
      <StoreDetails />
      </div>
    </div>
    </>
  )
}

export default Store