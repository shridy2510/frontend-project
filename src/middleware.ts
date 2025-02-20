import {NextRequest, NextResponse} from "next/server";
export function middleware(request: NextRequest) {
    const hasToken= request.cookies.has('access_token')
    const pathname= request.nextUrl.pathname;
    if (pathname==='/' && hasToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }


    if ( pathname!=='/login'&& !hasToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (pathname==='/login'&& hasToken){
        request.cookies.delete("access_token")
        request.cookies.delete("refresh_token")

    }

    return NextResponse.next();

}
export const config = {
    matcher: ['/', '/dashboard', '/((?!api|_next/static|_next/image).*)'], // Không áp dụng cho API hoặc static assets
};