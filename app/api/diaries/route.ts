import { NextRequest } from 'next/server';
import { isLengthInRange } from '../../../utils';

import { getDiariesBySearchKeyword } from '../../lib/diaries';
export async function GET(req: NextRequest) {
  const searchKeyword = req.nextUrl.searchParams.get('search');
  const page = req.nextUrl.searchParams.get('page');

  if (searchKeyword && !isLengthInRange(searchKeyword, 0, 500)) {
    return new Response(
      JSON.stringify({
        error: '다이어리 검색은 최대 500자까지 가능합니다',
      }),
      {
        status: 502,
      }
    );
  }

  try {
    const allKeywords = await getDiariesBySearchKeyword(
      searchKeyword ?? '',
      (Number(page) - 1) * 15
    );
    if (allKeywords.length === 0) {
      return new Response(
        JSON.stringify({
          data: '찾는 다이어리가 존재하지 않아요!',
        }),
        {
          status: 404,
        }
      );
    }
    return new Response(JSON.stringify(allKeywords), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 502,
    });
  }
}
