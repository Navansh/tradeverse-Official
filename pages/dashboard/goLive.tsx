import { Navbar, Sidebar, StartLiveVideo } from '@/components'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'


// export const getServerSideProps: GetServerSideProps<{
//   roomId: string;
// }> = async () => {
//   const { data } = await axios.post(
//     'https://api.huddle01.com/api/v1/create-room',
//     {
//       title: 'Huddle01-SDK-Test',
//       roomLock: false,
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': "a7XSoEa7jnMJufnlJzZuHxF7bDjS0OcP",
//       },
//     }
//   );
 
//   return {
//     props: {
//       roomId: data.roomId,
//     },
//   };
// };

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
