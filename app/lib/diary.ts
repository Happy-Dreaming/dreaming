interface Comment {
  content: string;
  writerId: string;
}

import prisma from '../../prisma/client';
import { toKoreanTimeStamp } from '../../utils';
const createNewDiary = async ({
  title,
  content,
  isShare,
  writer,
  like,
  comments,
}: {
  writer: Number;
  title: string;
  content: string;
  isShare: boolean;
  like?: number;
  comments?: Comment[];
}) => {
  try {
    const newDiary = await prisma.diary.create({
      data: {
        writerId: writer + '',
        isShare,
        title: title,
        contents: content,
        created_At: toKoreanTimeStamp(new Date()),
        updated_At: toKoreanTimeStamp(new Date()),
        like: 0,
      },
    });
    return newDiary;
  } catch (e) {
    console.log(e);
  }
};

const getDiaryById = async (diaryId: string) => {
  try {
    const diary = await prisma.diary.findUnique({
      where: {
        id: diaryId,
      },
    });

    return diary;
  } catch (e) {
    console.error(e);
  }
};

const getAllDiaryByUser = async (
  userId: string,
  skip: number,
  take: number
) => {
  try {
    const allDiary = await prisma.diary.findMany({
      where: {
        writerId: userId + '',
      },
      skip,
      take,
    });
    return allDiary;
  } catch (e) {
    console.error(e);
  }
};

const deleteDiaryById = async (diaryId: string) => {
  try {
    await prisma.diary.delete({
      where: {
        id: diaryId,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

//TODO - 댓글 업데이트 시 Diary도 업데이트하는 로직 필요.
const patchDiaryById = async (
  diaryId: string,
  args: Parameters<typeof createNewDiary>
) => {
  const { title, content, like, comments, isShare } = args[0];
  try {
    await prisma.diary.update({
      where: {
        id: diaryId,
      },
      data: {
        updated_At: toKoreanTimeStamp(new Date()),
        like,
        contents: content,
        title,
        isShare,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
export {
  createNewDiary,
  deleteDiaryById,
  patchDiaryById,
  getAllDiaryByUser,
  getDiaryById,
};
