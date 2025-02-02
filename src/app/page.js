import React from 'react'
import LoginForm from './loginpage/page'
import Link from 'next/link'

const page = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center space-y-5'>
      <Link href="/signuppage" className='px-10 py-4 bg-blue-600 text-white rounded-md text-lg'>Go to signup page</Link>
    </div>
  )
}

export default page