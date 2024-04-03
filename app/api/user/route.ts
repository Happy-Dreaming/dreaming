import { NextRequest } from 'next/server';

import { cookies } from 'next/headers';
import { verifyToken } from '../../lib/token';
import { getUserByUserId } from '../../lib/user';

export async function GET(req: NextRequest) {
  const userId = verifyToken(
    cookies().get('dreaming_accessToken')?.value ?? ''
  ).userId;

  if (!userId) {
    return new Response(
      JSON.stringify({
        error: '유효하지 않은 사용자입니다.',
      }),
      {
        status: 401,
      }
    );
  }
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
