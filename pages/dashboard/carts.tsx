import { CartSection, Navbar, Sidebar } from '@/components'
import React from 'react'

const carts = () => {
  return (
    <>
    <Navbar />
    <div className="flex h-screen overflow-hidden w-screen">
      <Sidebar />
      <CartSection />
    </div>
  </>
  )
}

export default carts