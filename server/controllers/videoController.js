import Video from '../models/videoModel.js';
import Channel from '../models/channelModel.js';
import User from '../models/userModel.js';

// Create a new video
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnail } = req.body;
    const userId = req.user._id; // Get user ID from auth middleware

    // Find channel associated with user
    const user = await User.findById(userId).populate('channel');
    if (!user.channel) {
      return res
        .status(404)
        .json({ message: 'Please create a channel before adding videos' });
    }

    // Create new video
    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnail,
      channel: user.channel._id,
    });

    // Add video to channel's videos array
    user.channel.videos.push(video._id);
    await user.channel.save();

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('channel', 'channelName')
      .sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single video
export const getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id)
      .populate('channel', 'channelName')
      .populate('comments');

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Increment views
    video.views += 1;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update video
export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.title = title || video.title;
    video.description = description || video.description;

    const updatedVideo = await video.save();
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete video
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Remove video from channel's videos array
    await Channel.findByIdAndUpdate(video.channel, { $pull: { videos: id } });

    await Video.findByIdAndDelete(id);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like video
export const likeVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.likes += 1;
    await video.save();

    res.status(200).json({ message: 'Video liked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search videos
export const searchVideos = async (req, res) => {
  try {
    const { q } = req.query; // q is the search query parameter

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Search videos with basic text matching
    const videos = await Video.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    }).populate('channel');

    res.status(200).json(videos);
  } catch (error) {
    console.error('Search error:', error); // Add error logging
    res.status(500).json({ message: 'Error searching videos' });
  }
};
