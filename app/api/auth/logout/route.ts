import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  cookies().delete('dreaming_accessToken');
  cookies().delete('dreaming_refreshToken');

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
}
