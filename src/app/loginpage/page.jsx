'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [disableBtn, setDisableBtn] = useState(false);
    const router = useRouter();
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email, pass: user.password })
            });
            
            const data = await res.json();
            console.log(data)
            if (data.success) {
                setTimeout(() => {
                    router.push('/homepage');
                }, 500);
            }
            setError(data.message);
            setUser({
                email: '',
                password: ''
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setDisableBtn(true);
        } else {
            setDisableBtn(false);
        }
    }, [user]);

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center space-y-5'>
            <h1 className='text-4xl font-semibold'>Login User</h1>

            <form className='w-80 h-auto px-4 py-6 rounded-md bg-gray-300 flex flex-col items-center justify-center space-y-5 relative' onSubmit={handleSubmit}>

                <input type="email" name='email' className='w-full px-4 py-1.5 outline-none text-lg placeholder:text-sm' placeholder='enter your email address...' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

                <input type="password" name='password' className='w-full px-4 py-1.5 outline-none text-lg placeholder:text-sm' placeholder='enter your password...' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />

                <button className={` px-10 py-2 text-white text-lg font-semibold ' type='submit ${disableBtn ? 'bg-blue-600 pointer-events-auto' : 'bg-blue-300 pointer-events-none'}`}>Login</button>

                {error && <p className='px-4 py-1 bg-red-500 text-white text-sm'>{error}</p>}

                <div className="w-full flex flex-col items-center">
                    <p className=''>Or</p>
                    <Link href="/signuppage" className='font-semibold underline'>signup user</Link>
                </div>
            </form>
        </div>
    )
}

export default page