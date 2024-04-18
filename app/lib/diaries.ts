import prisma from "../../prisma/client";

const getDiariesBySearchKeyword = async (keyword: string, page: number) => {
    try {
        let skip = 0;
        const take = 7;
        // 페이지 번호를 기반으로 건너뛸 항목 수를 계산합니다.
        if (page > 1) {
            skip = (page - 1) * take;
        }

        // 키워드가 비어있는 경우의 로직
        if (keyword.length === 0) {
            const total = await prisma.diary.count({
                where: {
                    isShare: true,
                },
            });

            const diaries = await prisma.diary.findMany({
                where: {
                    isShare: true,
                },
                skip,
                take,
                orderBy: {
                    updated_At: "desc",
                },
            });

            return { diaries, total };
        }

        // 키워드가 있는 경우의 로직
        const total = await prisma.diary.count({
            where: {
                isShare: true,
                OR: [
                    {
                        title: {
                            contains: keyword,
                        },
                    },
                    {
                        contents: {
                            contains: keyword,
                        },
                    },
                ],
            },
        });

        const diaries = await prisma.diary.findMany({
            where: {
                isShare: true,
                OR: [
                    {
                        title: {
                            contains: keyword,
                        },
                    },
                    {
                        contents: {
                            contains: keyword,
                        },
                    },
                ],
            },
            skip,
            take,
            orderBy: {
                updated_At: "desc",
            },
        });

        return { diaries, total };
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export { getDiariesBySearchKeyword };
