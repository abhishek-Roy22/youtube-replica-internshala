const ChannelBanner = ({ channel }) => {
  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden">
      <img
        src={channel?.channelBanner}
        alt="youtube_banner"
        className="w-full object-contain"
      />
    </div>
  );
};

export default ChannelBanner;
