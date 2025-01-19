import Video from '../models/videoModel.js';
import Channel from '../models/channelModel.js';

export const createVideo = async (req, res) => {
  const { videoTitle, description, thumbnailUrl, videoUrl } = req.body;
  const userId = req.user._id;

  try {
    // Fetch the user's channel
    const channel = await Channel.findOne({ createdBy: userId });
    if (!channel) {
      return res.status(404).json({ message: 'You do not have a channel!' });
    }

    // Create the video
    const newVideo = await Video.create({
      videoTitle,
      description,
      thumbnailUrl,
      videoUrl,
      channelId: channel._id,
      createdBy: userId,
    });

    return res
      .status(201)
      .json({ message: 'Video created successfully', video: newVideo });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later.' });
  }
};

// get all channelVideos
export const getChannelVideos = async (req, res) => {
  const { channelId } = req.params;

  try {
    // Find all videos for the specified channel
    const videos = await Video.find({ channelId }).sort({ createdAt: -1 }); // Sorted by newest first

    if (!videos || videos.length === 0) {
      return res
        .status(404)
        .json({ message: 'No videos found for this channel.' });
    }

    return res.status(200).json({ videos });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later.' });
  }
};

// get user specific videos
export const getUserVideos = async (req, res) => {
  const userId = req.user._id; // Assuming req.user is set by authentication middleware

  try {
    // Find all videos uploaded by the authenticated user
    const videos = await Video.find({ createdBy: userId }).sort({
      createdAt: -1,
    }); // Sorted by newest first

    if (!videos || videos.length === 0) {
      return res
        .status(404)
        .json({ message: 'No videos found for this user.' });
    }

    return res.status(200).json({ videos });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later.' });
  }
};

// Delete videos
export const deleteVideo = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id; // Assuming req.user is set by authentication middleware

  try {
    // Find the video by ID
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found!' });
    }

    // Check if the video belongs to the authenticated user
    if (video.createdBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to delete this video!' });
    }

    // Delete the video
    await video.remove();

    return res.status(200).json({ message: 'Video deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later.' });
  }
};

export const getVideoById = async (req, res) => {
  const { videoId } = req.params;

  try {
    // Find the video by ID
    const video = await Video.findById(videoId).populate(
      'channelId',
      'channelName'
    ); // Optionally populate channel info
    if (!video) {
      return res.status(404).json({ message: 'Video not found!' });
    }

    return res.status(200).json({ video });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later.' });
  }
};
