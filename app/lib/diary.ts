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
        title,
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

export { createNewDiary };
