import { NextRequest } from 'next/server';
import prisma from '../../../prisma/client';
import { cookies } from 'next/headers';
import { verifyToken } from '../../lib/token';
import {
  createCommentByDiaryId,
  deleteCommentById,
  updateCommentByCommentId,
} from '../../lib/comment';

export async function POST(req: NextRequest) {
  const { diaryId, comment } = await req.json();
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
    const userId = verifyToken(
      cookies().get('dreaming_accessToken')?.value ?? ''
    ).userId;
    const newComment = await createCommentByDiaryId({
      diaryId,
      writerId: userId + '',
      comment,
    });

    return new Response(JSON.stringify(newComment), {
      status: 200,
      statusText: '댓글이 작성되었습니다!',
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: e,
      }),
      {
        status: 502,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { commentId } = await req.json();
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
    const userId = verifyToken(
      cookies().get('dreaming_accessToken')?.value ?? ''
    ).userId;

    await deleteCommentById(commentId, userId);
    return new Response(
      JSON.stringify({ data: '성공적으로 댓글을 삭제했어요' }),
      {
        status: 200,
      }
    );
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 502,
      statusText: '댓글을 삭제할 수 없어요!',
    });
  }
}

export async function PATCH(req: NextRequest) {
  const { commentId, comment } = await req.json();
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
    const userId = verifyToken(
      cookies().get('dreaming_accessToken')?.value ?? ''
    ).userId;
    const newComment = await updateCommentByCommentId({ comment, commentId });

    return new Response(JSON.stringify(newComment), {
      status: 200,
      statusText: '댓글이 수정되었습니다!',
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: e,
      }),
      {
        status: 502,
      }
    );
  }
}
