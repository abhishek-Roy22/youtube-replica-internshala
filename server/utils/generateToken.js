import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // use secure cookie in production
    sameSite: 'strict', // prevent CRF attack
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2days
  });
};

export default generateToken;
