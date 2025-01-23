import React from 'react';

const AboutChannel = ({ data, error, loading }) => {
  if (loading) {
    return <div>Loading channel information...</div>;
  }

  if (error) {
    return <div>Error loading channel information</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        <img
          src={data?.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{data?.userName}</h2>
          <p className="text-gray-600">
            {`@${data?.channel?.channelName.toLowerCase()}`}
          </p>
          <p className="text-gray-600">{data?.channel?.description}</p>
          {/* <p className="text-sm text-gray-500">
            {channel.videos?.length || 0} videos
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default AboutChannel;
