import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';

export async function GET(req: NextRequest) {
  try {
    const getAllBestPosts = await prisma.diary.findMany({
      orderBy: {
        like: 'desc',
      },
      where: {
        isShare: true,
      },
      take: 5,
    });
    return NextResponse.json(JSON.stringify(getAllBestPosts), {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {},
      {
        status: 502,
      }
    );
  }
}
