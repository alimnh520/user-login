'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        console.log('Toke : ', token);
        const userToken = async () => {
            try {
                const res = await fetch('/api/verification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                const data = await res.json();
                setMessage(data.isVerified);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        userToken();
    }, []);

    return (
        <div>
            <h2>Email Verification</h2>
            <p>{message || "Verifying..."}</p>
            <Link href="/loginpage" className={`px-10 py-2 text-white text-lg font-semibold ${message ? 'bg-blue-600 pointer-events-auto' : 'bg-blue-300 pointer-events-none'}`}>Go to login</Link>
        </div>
    );
};

export default page;
