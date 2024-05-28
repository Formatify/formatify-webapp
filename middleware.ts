import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

debugger;
export default withAuth(function middleware(req) {

    if (!req.nextauth.token) {
        const url = req.nextUrl.clone();
        console.log({url})
        url.pathname = "/login";
        return NextResponse.rewrite(url);
    }
    return NextResponse.next();
});

export const config = {
    matcher: ["/dashboard"],// Routes you want to protect
};