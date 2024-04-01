import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const jwt = cookies().get('dreaming_accessToken');

  if (!jwt) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/signIn`);
  }
}

//NOTE - 바뀔 필요가 있음.
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
};
