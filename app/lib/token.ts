import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY as string;
const makeToken = (userId: string) => {
  const token = jwt.sign(
    {
      userId,
    },
    JWT_KEY,
    {
      expiresIn: '1h',
    }
  );
  return token;
};

const makeRefreshToken = (userId: string) => {
  const refreshToken = jwt.sign(
    {
      userId,
    },
    JWT_KEY,
    {
      algorithm: 'HS256',
      expiresIn: '14d',
    }
  );
  return refreshToken;
};

const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_KEY) as JwtPayload;
};

export { makeRefreshToken, makeToken, verifyToken };
