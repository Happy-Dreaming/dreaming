import prisma from '../../prisma/client';

interface createNewUserParms {
  id: string;
  name: string;
  email: string;
  image: string;
  refreshToken: string;
}

const createNewUser = async ({
  id,
  name,
  email,
  image,
  refreshToken,
}: createNewUserParms) => {
  const findUniqueUser = await prisma.member.findUnique({
    where: { id },
  });

  if (findUniqueUser) {
    const updatedUser = await prisma.member.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
    return updatedUser;
  }

  const newUniqueUser = await prisma.member.create({
    data: {
      id,
      name,
      email,
      picture: image,
      point: 0,
      refreshToken,
    },
  });

  return newUniqueUser;
};

export { createNewUser };
