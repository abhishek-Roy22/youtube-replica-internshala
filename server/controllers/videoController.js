import Video from '../models/videoModel.js';
import Channel from '../models/channelModel.js';

// Create a new video
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnail, channelId } = req.body;

    // Check if channel exists
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    // Create new video
    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnail,
      channel: channelId,
    });

    // Add video to channel's videos array
    channel.videos.push(video._id);
    await channel.save();

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
