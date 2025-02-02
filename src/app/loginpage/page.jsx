'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {
    const router = useRouter();
    const [disableButton, setDisableButton] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onSubmitUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            const response = await axios.post("/api/login", user);

            console.log('Sign up success', response.data);
            router.push('/profile');
            setLoading(false);
        } catch (error) {
            console.log('Sign up failed : ', error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setDisableButton(true);
        } else setDisableButton(false);
    },[user]);

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center space-y-8'>
            <h1 className='text-3xl font-bold'>login user</h1>
            { loading ? (<p className='text-xl font-semibold'>Logging form....</p>) :
                (
                    <form onSubmit={onSubmitUser} className='w-80 h-auto bg-gray-200 rounded-md flex flex-col px-4 py-6 space-y-4'>

                <input type="text" className='w-full px-4 py-1.5 outline-none border border-gray-300 rounded-md text-lg' placeholder='enter your user email....' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>

                <input type="text" className='w-full px-4 py-1.5 outline-none border border-gray-300 rounded-md text-lg' placeholder='enter your user password....' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>

                <button type='submit' className={`px-10 self-center py-2 text-lg font-semibold text-white rounded-md ${disableButton ? 'pointer-events-auto bg-blue-600' : 'pointer-events-none bg-blue-300'}`}>Login</button>

                <Link href="/signuppage" className='text-sm underline self-end text-blue-600'>signup user</Link>

            </form>
                )
            }
        </div>
    )
}

export default page