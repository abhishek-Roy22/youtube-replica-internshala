import Channel from '../models/channelModel.js';
import User from '../models/userModel.js';

export const createChannel = async (req, res) => {
  const userId = req.user._id;
  const { channelName, description, channelBanner } = req.body;

  try {
    const existingUser = await User.findById(userId).populate('channel');
    if (existingUser.channel) {
      return res
        .status(400)
        .json({ message: 'You have already created a channel.' });
    }

    const newChannel = await Channel.create({
      channelName,
      description,
      channelBanner,
      createdBy: userId,
    });

    existingUser.channel = newChannel._id;
    await existingUser.save();

    return res
      .status(201)
      .json({ message: 'Channel Created Successfully', channel: newChannel });
  } catch (error) {
    console.error('Channel creation error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later' });
  }
};

export const getChannel = async (req, res) => {
  const userId = req.user._id;

  try {
    const channel = await Channel.findOne({ createdBy: userId })
      .populate('createdBy')
      .populate('videos');
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    return res.status(200).json(channel);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later' });
  }
};

export const updateChannel = async (req, res) => {
  const { channelId } = req.params;
  const updates = req.body;

  try {
    const updatedChannel = await Channel.findByIdAndUpdate(
      channelId,
      { $set: updates },
      { new: true }
    );

    if (!updatedChannel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    return res.status(200).json({
      message: 'Channel updated successfully',
      channel: updatedChannel,
    });
  } catch (error) {
    console.error('Channel update error:', error);
    return res
      .status(500)
      .json({ message: 'Server error. Please try again later' });
  }
};

export const deleteChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const deletedChannel = await Channel.findByIdAndDelete(channelId);

    if (!deletedChannel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    return res.status(200).json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later' });
  }
};
