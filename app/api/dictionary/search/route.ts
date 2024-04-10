import { NextRequest, NextResponse } from 'next/server';
import { getDictionaryFromSearch } from '../../../lib/dictionary';

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get('keyword');

  const page = req.nextUrl.searchParams.get('page');
  const pageSize = req.nextUrl.searchParams.get('pageSize');
  const skip = (Number(page) - 1) * Number(pageSize);

  try {
    const getAllDictionaries = await getDictionaryFromSearch(
      keyword ?? '',
      parseInt(skip + ''),
      parseInt(pageSize as string)
    );

    return new Response(
      JSON.stringify({
        dictionaries: getAllDictionaries.dictionary,
        total: getAllDictionaries.total,
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
