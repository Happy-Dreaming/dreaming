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
}: {
  writer: Number;
  title: string;
  content: string;
  isShare: boolean;
  like?: number;
}) => {
  try {
    const getWriterInfo = await prisma.member.findUnique({
      where: {
        id: writer + '',
      },
    });
    const newDiary = await prisma.diary.create({
      data: {
        writerId: writer + '',
        isShare,
        title: title,
        contents: content,
        comments: {
          create: [],
        },
        created_At: toKoreanTimeStamp(new Date()),
        updated_At: toKoreanTimeStamp(new Date()),
        like: 0,
        writerName: getWriterInfo?.name,
        writerPicture: getWriterInfo?.picture,
      },
    });
    return newDiary;
  } catch (e) {
    throw e;
  }
};

const getDiaryById = async (diaryId: string) => {
  try {
    const diary = await prisma.diary.findUnique({
      where: {
        id: diaryId,
      },
      include: {
        comments: true,
      },
    });

    return diary;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
};

const getAllDiaryByUser = async (
  userId: string,
  skip?: number,
  take?: number
) => {
  try {
    const allDiary = await prisma.diary.findMany({
      where: {
        writerId: userId + '',
      },
      skip,
      take,
    });
    const totalDiaries = await prisma.diary.count({
      where: {
        writerId: userId,
      },
    });
    console.log(allDiary, totalDiaries);

    return {
      diaries: allDiary,
      total: totalDiaries,
    };
  } catch (e) {
    throw new Error(JSON.stringify(e));
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
    throw new Error(JSON.stringify(e));
  }
};

//TODO - 댓글 업데이트 시 Diary도 업데이트하는 로직 필요.
const patchDiaryById = async (
  diaryId: string,
  args: Parameters<typeof createNewDiary>
) => {
  const { title, content, like, isShare } = args[0];
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
    throw new Error(JSON.stringify(e));
  }
};
export {
  createNewDiary,
  deleteDiaryById,
  patchDiaryById,
  getAllDiaryByUser,
  getDiaryById,
};
