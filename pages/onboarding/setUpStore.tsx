import { logo } from '@/assets'
import { Button } from '@/components'
import Image from 'next/image'
import React from 'react'

const setUpStore = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="min-w-[800px] min-h-[440px]  bg-[#253343] flex flex-col items-center justify-center px-[130px] py-[54.33px] rounded-[40px] space-y-[16px]">
      <Image
        src={logo}
        alt="logo"
        className="w-[80px] h-[61px] object-contain"
      />
      <h2 className="text-[4vw] md:text-[30px] text-center w-full leading-[6vh] font-semibold">
      Set up your store
      </h2>
      <p className="text-[2vw] md:text-[16px] leading-[3vh] w-[22.5rem] text-center font-semibold">
      You need to add a few details like Name, Bio, Profile and cover photo to get your store running.
      </p>
    <Button title="Continue" isLink link="/onboarding/Auth" />
    </div>
    </div>
  )
}

export default setUpStore