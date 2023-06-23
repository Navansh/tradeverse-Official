import { Navbar, Sidebar, StartLiveVideo } from '@/components'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'

const Live = (roomId: string) => {
  return (
    <>
    <Navbar />
    <div className='flex items-start'>
        <Sidebar />
        <div className='flex-1 mx-[157px] mb-[64px] mt-[80px]'>
            <StartLiveVideo />
        </div>
    </div>
    </>
  )
}

export default Live
