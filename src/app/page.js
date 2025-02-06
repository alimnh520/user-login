'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-300 space-y-5'>
      <Link href="/loginpage" className='px-10 py-2 bg-blue-600 text-white text-lg rounded-md'>Go to login</Link>
      <p>Or</p>
      <Link href="/signuppage" className='px-10 py-2 bg-blue-600 text-white text-lg rounded-md'>SignUp user</Link>
    </div>
  )
}

export default page