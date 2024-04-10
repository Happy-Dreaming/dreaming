import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';
import {
  deleteDiaryById,
  getDiaryById,
  patchDiaryById,
} from '../../../lib/diary';
import { isLengthInRange } from '../../../../utils';
import { DIARY } from '../../../../constants';
import { verifyToken } from '../../../lib/token';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const urlArray = new URL(req.url).pathname.split('/');
  const id = urlArray[urlArray.length - 1];
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

  try {
    const diary = await getDiaryById(id);
    const likes = await prisma.like.count({
      where: {
        diaryId: id,
      },
    });
    const diaryResponse = Object.assign({}, diary, { likes });
    if (diary) {
      return new Response(JSON.stringify(diaryResponse), {
        status: 200, // HTTP 상태 코드 200 (OK)
        headers: {
          'Content-Type': 'application/json', // 컨텐츠 타입을 명시합니다.
        },
      });
    }
  } catch (e) {
    console.error(e, '다이어리를 찾을 수 없어요');
    return NextResponse.json(
      {
        error: '다이어리를 찾을 수 없어요!',
      },
      {
        status: 404,
      }
    );
  }
}
export async function DELETE(req: NextRequest) {
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

  const urlArray = new URL(req.url).pathname.split('/');
  const id = urlArray[urlArray.length - 1];

  try {
    await deleteDiaryById(id);
    return new NextResponse(
      JSON.stringify({ data: '성공적으로 다이어리를 삭제했어요!' }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ error: '다이어리 삭제 중 오류가 발생했어요.' }),
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
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

  const urlArray = new URL(req.url).pathname.split('/');
  const id = urlArray[urlArray.length - 1];
  const { title, content, isShare } = await req.json();

  if (!isLengthInRange(title, DIARY.TITLE.MIN_LENGTH, DIARY.TITLE.MAX_LENGTH)) {
    return new NextResponse(
      JSON.stringify({
        error: '0글자 이상 1000글자 이하의 제목을 입력해주세요',
      }),
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
    return new NextResponse(
      JSON.stringify({
        error: '0글자 이상 5000글자 이하의 글을 입력해주세요',
      }),
      {
        status: 400,
      }
    );
  }

  try {
    // 토큰 검증 로직 추가
    const decodedToken = verifyToken(
      req.cookies.get('dreaming_accessToken')?.value ?? ''
    );

    const updatedDiary = await patchDiaryById(id, [
      {
        title,
        content,
        isShare,
        writer: Number(decodedToken?.userId),
      },
    ]);

    return new Response(JSON.stringify(updatedDiary), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ error: '다이어리를 수정할 수 없어요' }),
      {
        status: 502,
      }
    );
  }
}
