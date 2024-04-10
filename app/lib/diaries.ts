import prisma from '../../prisma/client';

const getDiariesBySearchKeyword = async (keyword: string, page: number) => {
  try {
    const getAllDiaries = await prisma.diary.count({
      where: {
        isShare: false,
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
    });
    const getDiariesFromKeyword = await prisma.diary.findMany({
      where: {
        isShare: false,
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
    return { diaries: getDiariesFromKeyword, total: getAllDiaries };
  } catch (e) {
    throw e;
  }
};

export { getDiariesBySearchKeyword };
