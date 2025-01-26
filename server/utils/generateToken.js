import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true, // Only use secure in production
    sameSite: 'None',
  });
};

export default generateToken;
