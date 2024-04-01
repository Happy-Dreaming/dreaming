import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';

export async function GET(req: NextRequest) {
  const id = new URL(req.url).pathname.replace(/[^0-9]/g, '');
  try {
    const getDiaryById = await prisma.diary.findUnique({
      where: {
        id,
      },
    });

    if (getDiaryById) {
      return NextResponse.json(JSON.stringify(getDiaryById), {
        status: 200,
        statusText: '다이어리를 성공적으로 찾았어요!',
      });
    }
  } catch (e) {
    console.error(e, '다이어리를 찾을 수 없어요');
    return NextResponse.json(
      {
        status: '다이어리를 찾을 수 없어요!',
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
}
