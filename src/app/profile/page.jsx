'use client'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
    const router = useRouter();
    const [data, setData] = useState('');

    const getUserDetails = async (e) => {
        const res = await axios.get('/api/me');
        console.log(res.data);
        setData(res.data.data._id);
    }
    const logOut = async (e) => {
        try {
            await axios.get('/api/logout');
            toast.success("Logout success");
            router.push("/");
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center space-y-5'>
            <h1 className='text-4xl font-semibold'>Profile page</h1>
            <h2>
                
                {data === '' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr />
            <button onClick={logOut} className='px-10 py-2 bg-red-500 text-white'>Logout</button>

            <button onClick={getUserDetails} className='px-10 py-2 bg-blue-600 text-white'>user details</button>
        </div>
    )
}

export default page