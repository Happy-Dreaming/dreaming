import { NextRequest, NextResponse } from 'next/server';
import { getDictionaryFromSearch } from '../../../lib/dictionary';

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get('keyword');

  try {
    const getAllDictionaries = await getDictionaryFromSearch(keyword ?? '');

    return new Response(
      JSON.stringify({
        dictionaries: getAllDictionaries,
      }),
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: e,
      },
      {
        status: 502,
      }
    );
  }
}
