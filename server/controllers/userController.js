import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Create new user
export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exist' });
    }

    const newUser = await User.create({
      userName,
      email,
      password,
    });

    if (newUser) {
      generateToken(res, newUser._id);

      res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token and set cookie
    generateToken(res, user._id);

    // Send response after setting cookie
    return res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// logout user
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true, // Add secure flag for production
      sameSite: 'none', // Required for cross-site cookie clearing
    });
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('channel');
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
      channel: user.channel,
    });
  } catch (error) {
    console.log(error.message); // Add logging
    return res.status(500).json({ error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      userName: updatedUser.userName,
      email: updatedUser.email,
    });
  } catch (error) {
    console.log(error.message); // Add logging
    return res.status(500).json({ error: error.message });
  }
};
