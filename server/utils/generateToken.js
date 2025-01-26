import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set cookie options
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // None for cross-origin, Lax for local development
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/', // Make cookie accessible across the app
  });
};

export default generateToken;
