import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../lib/token';
import { DIARY } from '../../../constants';
import { isLengthInRange } from '../../../utils';
import { createNewDiary, getAllDiaryByUser } from '../../lib/diary';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const userId = verifyToken(
    cookies().get('dreaming_accessToken')?.value ?? ''
  ).userId;

  if (!userId) {
    return new Response(
      JSON.stringify({
        error: '토큰이 만료되었습니다.',
      }),
      {
        status: 401,
      }
    );
  }

  try {
    const getAllPosts = await getAllDiaryByUser(userId);

    if (userId && getAllPosts) {
      return new Response(JSON.stringify(getAllPosts), {
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
}

export async function POST(req: NextRequest) {
  const userId = verifyToken(
    cookies().get('dreaming_accessToken')?.value ?? ''
  ).userId;

  if (!userId) {
    return new Response(
      JSON.stringify({
        error: '토큰이 만료되었습니다.',
      }),
      {
        status: 401,
      }
    );
  }

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
    return new Response(JSON.stringify(newPost), {
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
