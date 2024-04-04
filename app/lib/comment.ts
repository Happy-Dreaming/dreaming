type Comment = {
  diaryId: string;
  writerId: string;
  comment: string;
};

import prisma from '../../prisma/client';
import { toKoreanTimeStamp } from '../../utils';

const getCommentById = async (commentId: string) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    return comment;
  } catch (e) {
    console.error(e);
  }
};
const createCommentByDiaryId = async ({
  diaryId,
  writerId,
  comment,
}: Comment) => {
  try {
    await prisma.comment.create({
      data: {
        diaryId,
        writerId: writerId + '',
        comment,
        created_At: toKoreanTimeStamp(new Date()),
        updated_At: toKoreanTimeStamp(new Date()),
      },
    });
  } catch (e) {
    console.error(e);
  }
};

const deleteCommentById = async (commentId: string, userId: string) => {
  try {
    //댓글 작성자가 현재 로그인 한 유저와 동일하다면
    //해당 댓글을 부모로 갖는 모든 자식 댓글들

    const childComments = await prisma.comment.findMany({
      where: {
        parentId: commentId,
        writerId: userId + '',
      },
    });

    childComments.forEach(async (comment) => {
      await deleteCommentById(comment.id, userId + '');
    });

    await prisma.comment.delete({
      where: {
        id: commentId,
        writerId: userId + '',
      },
    });
  } catch (e) {
    console.error(e);
  }
};

const patchCommentByCommentId = async ({
  commentId,
  userId,
  comment,
}: {
  comment: string;
  commentId: string;
  userId: string;
}) => {
  try {
    const getComment = await getCommentById(commentId);
    await prisma.comment.update({
      where: {
        id: commentId,
        writerId: userId,
      },
      data: {
        ...getComment,
        comment,
        updated_At: toKoreanTimeStamp(new Date()),
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export {
  getCommentById,
  patchCommentByCommentId,
  deleteCommentById,
  createCommentByDiaryId,
};
