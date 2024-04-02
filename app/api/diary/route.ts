import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../lib/token';
import { DIARY } from '../../../constants';
import { isLengthInRange } from '../../../utils';
import prisma from '../../../prisma/client';
import { NextApiRequest } from 'next';
import { createNewDiary, getAllDiaryByUser } from '../../lib/diary';
import { cookies } from 'next/headers';
import { JwtPayload } from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const userId = verifyToken(
    cookies().get('dreaming_accessToken')?.value ?? ''
  ).userId;

  try {
    const getAllPosts = await getAllDiaryByUser(userId);

    if (userId && getAllPosts) {
      return NextResponse.json(getAllPosts, {
        status: 200,
      });
    }
  } catch (e) {
    return NextResponse.json(
      {
        error: '유저의 다이어리를 불러올 수 없어요',
      },
      {
        status: 502,
      }
    );
  }

  const getAllPosts = await getAllDiaryByUser(userId);
  return NextResponse.json(getAllPosts, {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const { title, content, isShare } = await req.json();
  if (!isLengthInRange(title, DIARY.TITLE.MIN_LENGTH, DIARY.TITLE.MAX_LENGTH)) {
    return NextResponse.json(
      {
        error: '0글자 이상 1000글자 이하의 제목을 입력해주세요',
      },
      {
        status: 400,
      }
    );
  }

  if (
    !isLengthInRange(
      content,
      DIARY.CONTENT.MIN_LENGTH,
      DIARY.CONTENT.MAX_LENGTH
    )
  ) {
    return NextResponse.json(
      {
        error: '0글자 이상 5000글자 이하의 글을 입력해주세요',
      },
      {
        status: 400,
      }
    );
  }
  try {
    const decodedToken = verifyToken(
      cookies().get('dreaming_accessToken')?.value ?? ''
    );

    const newPost = await createNewDiary({
      title,
      content,
      isShare,
      writer: Number(decodedToken?.userId),
    });
    return NextResponse.json(newPost, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      { error: '새로운 다이어리를 생성할 수 없어요' },
      {
        status: 502,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {}

export async function PUT(req: NextRequest) {}
