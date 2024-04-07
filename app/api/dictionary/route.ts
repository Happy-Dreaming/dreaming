import { NextRequest, NextResponse } from 'next/server';
import { getDreamingDictionary } from '../../lib/dictionary';
import { isLengthInRange } from '../../../utils';

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') ?? '';
  try {
    if (!isLengthInRange(category, 1, 100)) {
      return new Response(
        JSON.stringify({
          error: '유효한 키워드의 길이가 아닙니다',
        }),
        {
          status: 502,
        }
      );
    }
    const getKeyword = await getDreamingDictionary(category ?? '');

    return NextResponse.json(
      {
        keyword: getKeyword,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        error: '키워드를 찾을 수 없어요!',
      }),
      {
        status: 404,
      }
    );
  }
}
