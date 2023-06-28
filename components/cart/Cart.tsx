import { useTradeContext } from '@/context'
import React, { useState } from 'react'
import CartCard from './CartCard'

const Cart = () => {
  const { cartItems, handleRemoveFromCart } = useTradeContext()
  console.log(cartItems)
  return (
    <div className='ml-[38px] mt-[20px] grid grid-cols-2 items-center gap-[40px]'>
      <div className='flex flex-col items-start space-y-[16px]'>
      {cartItems.map((item: any, i: number) => (
        <CartCard key={i} {...item}  />
       ))}
      </div>
      
    </div>
  )
}

export default Cart