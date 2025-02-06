import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <h1>Check your email to verify</h1>
            <Link href="/loginpage">Go to Login</Link>
        </div>
    )
}

export default page