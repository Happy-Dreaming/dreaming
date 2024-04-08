//토큰이 만료된 경우 + refresh_token이 유효한 경우 refresh_token으로 새 access_token 발급 + 이전 주소로 리다이렉트
//그렇지 않은 경우(refresh_token)이 유효하지 않은 경우 로그인 페이지(/auth/signIn)로 리다이렉트
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { makeToken, verifyToken } from '../../lib/token';
import prisma from '../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    const getRefreshToken = cookies().get('dreaming_refreshToken')?.value;
    const getRefreshTokenFromDB = await prisma.member.findUnique({
      where: {
        refreshToken: getRefreshToken,
      },
    });
    if (
      getRefreshToken &&
      verifyToken(getRefreshToken) &&
      getRefreshTokenFromDB
    ) {
      const user = { id: verifyToken(getRefreshToken).userId };
      cookies().set('dreaming_accessToken', makeToken(user.id), {
        sameSite: 'strict',
        secure: true,
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });

      return NextResponse.redirect(req.nextUrl);
    } else {
      return NextResponse.redirect('/auth/signIn');
    }
  } catch (e) {
    return NextResponse.redirect('/auth/signIn');
  }
}
