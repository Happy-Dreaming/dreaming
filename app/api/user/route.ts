import { NextRequest } from 'next/server';

import { cookies } from 'next/headers';
import { verifyToken } from '../../lib/token';
import { getUserByUserId } from '../../lib/user';

export async function GET(req: NextRequest) {
  try {
    const userId = verifyToken(
      cookies().get('dreaming_accessToken')?.value ?? ''
    ).userId;
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: '토큰이 만료되었습니다.',
      }),
      {
        status: 401,
      }
    );
  }
  const userId = verifyToken(
    cookies().get('dreaming_accessToken')?.value ?? ''
  ).userId;
  const user = await getUserByUserId(userId + '');
  if (user) {
    return new Response(
      JSON.stringify({
        user,
      }),
      {
        status: 200,
      }
    );
  }
  return new Response(
    JSON.stringify({
      error: '사용자를 찾을 수 없습니다.',
    }),
    {
      status: 404,
    }
  );
}
