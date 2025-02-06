import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {

    const path = request.nextUrl.pathname

    const isPublicPath = path === '/loginpage' || path === '/signuppage' || path === '/userVerify' || path === '/';

    const token = request.cookies.get('token')?.value;
    console.log('The middleware token is : ', token);

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/homepage', request.url));
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
        '/homepage',
        '/userVerify',
    ],
}