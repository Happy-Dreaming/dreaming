import cheerio from 'cheerio';
import prisma from '../../prisma/client';
interface DictionaryResponse {
  title: string;
  content: string;
}

const getDreamingDictionary = async (
  category: string,
  skip: number,
  take: number
) => {
  try {
    const getDreamingDictionarytFromDB = await prisma.dictionary.findMany({
      where: {
        category: {
          contains: category,
        },
      },
      skip,
      take,
    });
    if (getDreamingDictionarytFromDB.length > 0) {
      return getDreamingDictionarytFromDB;
    }
    const newDreamingDictionary = await createDreamingContent(category);

    return newDreamingDictionary;
  } catch (e) {
    throw e;
  }
};

//카테고리에 대한 모든 꿈 키워드 반환
const getDreamingKeywordByCategory = async (category: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DICTIONARY_URL}/${encodeURIComponent(
        category
      )}`
    );
    if (!response.ok) {
      throw new Error('네트워크 오류가 발생했어요.');
    }
    const data = await response.text();
    const $ = cheerio.load(data);

    // 전체 꿈 카테고리 추출
    const pageTitle = $('.recommend li').text();
    const dreamCategories = pageTitle
      .split('꿈')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    return dreamCategories;
    //카테고리에 맞는 꿈 추출
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getDreamingContentsByCategory = async (category: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DICTIONARY_URL}/search/${encodeURIComponent(
        category
      )}`
    );
    if (!response.ok) {
      throw new Error('네트워크 오류가 발생했어요.');
    }
    const data = await response.text();
    const $ = cheerio.load(data);
    const dreamingContent = $('.articletitle')
      .map((index, el) => {
        const findContent = $('.articlecontent p')[index];
        return {
          title: $(el).text().trim(),
          content: $(findContent).text().trim(),
        } as DictionaryResponse;
      })
      .get();

    return dreamingContent;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createDreamingContent = async (category: string) => {
  try {
    const dreamKeywords = await getDreamingKeywordByCategory(category);
    const promises = dreamKeywords.map((keyword) =>
      getDreamingContentsByCategory(keyword)
    );
    const results = await Promise.allSettled(promises);

    console.log(results);
    const successfulResults = results
      .filter(
        (result): result is PromiseFulfilledResult<DictionaryResponse[]> =>
          result.status === 'fulfilled'
      )
      .flatMap(({ value }) =>
        value.map((content) => ({
          category,
          title: content.title,
          contents: content.content,
        }))
      );

    console.log(successfulResults);

    await prisma.dictionary.createMany({
      data: successfulResults,
      skipDuplicates: true,
    });

    return successfulResults;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export {
  getDreamingContentsByCategory,
  getDreamingKeywordByCategory,
  createDreamingContent,
  getDreamingDictionary,
};
