import { LOTTO } from './constants';
import prisma from '../../prisma/client';

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createNewLottoNumber = async (userId: string) => {
  try {
    const getUser = await prisma.member.findUnique({
      where: {
        id: userId,
      },
    });

    if (!getUser || getUser.point < LOTTO.POINT) {
      throw new Error('유저 포인트가 부족합니다.');
    }

    const newLottoNumber = Array.from({ length: LOTTO.NUM }).map(() =>
      generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM)
    );

    await prisma.member.update({
      where: {
        id: userId,
      },
      data: {
        point: getUser.point - LOTTO.POINT, // 포인트 차감
      },
    });

    console.log(
      `User ${userId}의 로또 번호가 ${newLottoNumber}로 업데이트 되었으며, 포인트가 차감되었습니다.`
    );
    return newLottoNumber;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default createNewLottoNumber;
