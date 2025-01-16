import { model, Schema } from 'mongoose';

const channelSchema = new Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    channelBanner: {
      type: String,
      default: '',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
  },
  { timestamps: true }
);

const Channel = model('Channel', channelSchema);
export default Channel;
