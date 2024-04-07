import prisma from '../../prisma/client';

const getDiariesBySearchKeyword = async (keyword: string, page: number) => {
  try {
    const getDiariesFromKeyword = await prisma.diary.findMany({
      where: {
        isShare: true,
        OR: [
          {
            title: {
              contains: keyword,
            },
            contents: {
              contains: keyword,
            },
          },
        ],
      },
      skip: page,
      take: 15,
    });
    return getDiariesFromKeyword;
  } catch (e) {
    throw e;
  }
};

export { getDiariesBySearchKeyword };
