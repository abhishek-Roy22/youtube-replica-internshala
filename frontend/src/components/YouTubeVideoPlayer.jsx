import ReactPlayer from 'react-player';

const YouTubeVideoPlayer = ({ videoUrl }) => {
  return (
    <div>
      <ReactPlayer
        url={videoUrl} // YouTube video link
        controls={true} // Enable player controls
        width="100%"
        height="480px"
      />
    </div>
  );
};

export default YouTubeVideoPlayer;
