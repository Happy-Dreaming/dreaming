import { NextRequest } from "next/server";
import { isLengthInRange } from "../../../utils";

import { getDiariesBySearchKeyword } from "../../lib/diaries";
import prisma from "../../../prisma/client";

export async function GET(req: NextRequest) {
    const searchKeyword = req.nextUrl.searchParams.get("search");
    const page = req.nextUrl.searchParams.get("page");

    try {
        const allKeywords = await getDiariesBySearchKeyword(
            searchKeyword ?? "",
            (Number(page) - 1) * 7
        );

        const likesPromises = allKeywords.diaries.map((diary) =>
            prisma.like.count({
                where: { diaryId: diary.id },
            })
        );

        if (allKeywords.diaries.length === 0) {
            return new Response(
                JSON.stringify({
                    data: "찾는 다이어리가 존재하지 않아요!",
                }),
                {
                    status: 404,
                }
            );
        }

        const likes = await Promise.all(likesPromises);

        const diariesWithLikes = allKeywords.diaries.map((diary, index) => ({
            ...diary,
            likes: likes[index],
        }));

        return new Response(
            JSON.stringify({
                diaries: diariesWithLikes,
                total: allKeywords.total,
            }),
            {
                status: 200,
            }
        );
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify(e), {
            status: 500,
        });
    }
}
