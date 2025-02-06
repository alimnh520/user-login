'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const router = useRouter();
    const [userData, setUserData] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/get-user', { method: 'GET' });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    const logoutUser = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-screen flex items-center justify-center flex-col'>
            <p>Home page</p>
            <Link href="/loginpage" onClick={logoutUser}>Log out</Link>
        </div>
    )
}

export default page