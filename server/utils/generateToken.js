import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true, // Always use secure cookies since frontend is deployed
    sameSite: 'none', // Allow cross-site cookie access
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  });
};

export default generateToken;
