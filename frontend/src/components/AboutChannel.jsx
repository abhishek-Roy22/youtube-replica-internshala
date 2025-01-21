import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutChannel = ({ channel }) => {
  const navigate = useNavigate();

  if (!channel) {
    return <div>Loading channel information...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        {channel.channelBanner && (
          <img
            src={channel.channelBanner}
            alt={channel.channelName}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold">{channel.channelName}</h2>
          <p className="text-gray-600">{channel.description}</p>
          <p className="text-sm text-gray-500">
            {channel.videos?.length || 0} videos
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutChannel;
