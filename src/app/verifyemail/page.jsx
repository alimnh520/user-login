'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const page = () => {
    // const router = useRouter();
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/verifyemail', { token });
            setVerified(true);
            setError(false);
        } catch (error) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || '');

        // const { query } = router;
        // const urlTokenTwo = query.token;

    }, []);

    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUserEmail();
            console.log(token)
        }
    }, [token]);


    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <h1 className='text-4xl'>Verify your email</h1>
            <h1 className='p-2 bg-orange-500'>
                {token ? `${token}` : 'no token'}
            </h1>
            {
                verified && (
                    <div className="">
                        <h1>{error}</h1>
                    </div>
                )
            }
            {
                error && (
                    <div className="">
                        <h1>Verified</h1>
                        <Link href="/loginpage">Login</Link>
                    </div>
                )
            }
        </div>
    )
}

export default page