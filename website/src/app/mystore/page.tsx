import React from 'react'
import { Title } from '@/components/typography';

const Overview = () => {
  return (
    <div className="flex-1 overflow-y-auto h-screen p-5 flex flex-col justify-start items-start">
      <h1 className='!font-outfit font-black text-5xl'>OverView</h1>
      <ul>
        <li>Views</li>
        <li>orders</li>
        <li>messages</li>
      </ul>
    </div>
  )
}

export default Overview