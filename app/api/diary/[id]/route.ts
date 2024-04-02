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

export async function GET(req: NextRequest) {
  const id = new URL(req.url).pathname.replace(/[^0-9]/g, '');
  try {
    const diary = await getDiaryById(id);
    if (diary) {
      return NextResponse.json(diary, {
        status: 200,
        statusText: '다이어리를 성공적으로 찾았어요!',
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
  const id = new URL(req.url).pathname.replace(/[^0-9]/g, '');

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
  const id = new URL(req.url).pathname.replace(/[^0-9]/g, '');
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

    return new NextResponse(JSON.stringify(updatedDiary), {
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
