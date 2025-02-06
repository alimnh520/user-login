'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [disableBtn, setDisableBtn] = useState(false);
    const router = useRouter();
    const [error, setError] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();
            setError(data.message);

            if (data.success) {
                setTimeout(() => {
                    router.push('/userVerify');
                }, 500);
            }
            setUserName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (username.length > 0 && email.length > 0 && password.length > 0) {
            setDisableBtn(true);
        } else {
            setDisableBtn(false);
        }
    })

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center space-y-5'>
            <h1 className='text-4xl font-semibold'>Login User</h1>

            <form className='w-80 h-auto px-4 py-6 rounded-md bg-gray-300 flex flex-col items-center justify-center space-y-5' onSubmit={handleSubmit}>

                <input type="text" name='username' className='w-full px-4 py-1.5 outline-none text-lg placeholder:text-sm' placeholder='enter your username...' value={username} onChange={(e) => setUserName(e.target.value)} />

                <input type="email" name='email' className='w-full px-4 py-1.5 outline-none text-lg placeholder:text-sm' placeholder='enter your email address...' value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" name='password' className='w-full px-4 py-1.5 outline-none text-lg placeholder:text-sm' placeholder='enter your password...' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className={` px-10 py-2 text-white text-lg font-semibold ' type='submit ${disableBtn ? 'bg-blue-600 pointer-events-auto' : 'bg-blue-300 pointer-events-none'}`}>Signup</button>

                {error && <p className='px-4 py-1 bg-red-500 text-white text-sm'>{error}</p>}

                <div className="w-full flex flex-col items-center">
                    <p className=''>Or</p>
                    <Link href="/loginpage" className='font-semibold underline'>login user</Link>
                </div>
            </form>
        </div>
    )
}

export default page