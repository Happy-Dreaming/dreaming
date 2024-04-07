import prisma from '../../prisma/client';

const addUserPoints = async (userId: string) => {
  const user = await prisma.member.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  try {
    const updatedUser = await prisma.member.update({
      where: {
        id: userId,
      },
      data: {
        point: user.point + 100,
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error('포인트를 갱신할 수 없습니다');
  }
};

export { addUserPoints };
