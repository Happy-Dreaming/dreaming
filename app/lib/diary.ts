import prisma from '../../prisma/client';
import { toKoreanTimeStamp } from '../../utils';
const createNewDiary = async ({
  title,
  content,
  isShare,
  writer,
}: {
  writer: Number;
  title: string;
  content: string;
  isShare: boolean;
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

const getAllDiaryByUser = async (userId: string) => {
  try {
    const allDiary = await prisma.diary.findMany({
      where: {
        writerId: userId + '',
      },
    });
    return allDiary;
  } catch (e) {
    console.error(e);
  }
};

export { createNewDiary, getAllDiaryByUser };
