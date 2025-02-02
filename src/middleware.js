import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/loginpage' || path === '/signuppage' || path === '/verifyemail' || path === '/';

    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/loginpage', request.url));
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/loginpage',
        '/signuppage',
        '/profile',
        '/verifyemail'
    ],
}