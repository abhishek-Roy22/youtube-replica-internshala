import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });

  // Cookie options for production
  const cookieOptions = {
    httpOnly: true, // Prevents client-side access to the cookie
    secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
    sameSite: 'None', // Required for cross-origin requests
    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expires in 30 days
    path: '/', // Cookie is accessible across all routes
  };

  res.cookie('jwt', token, cookieOptions);
};

export default generateToken;
