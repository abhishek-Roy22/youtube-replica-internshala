import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(payload.userId).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Not authorized, Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, No token' });
  }
};

export { authMiddleware };
