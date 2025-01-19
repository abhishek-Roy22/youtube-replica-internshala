import { Schema, model } from 'mongoose';

const videoSchema = new Schema(
  {
    videoTitle: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true, // URL of the actual video file
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Users who liked the video
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Users who disliked the video
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment', // References to comments
      },
    ],
  },
  { timestamps: true }
);

const Video = model('Video', videoSchema);
export default Video;
