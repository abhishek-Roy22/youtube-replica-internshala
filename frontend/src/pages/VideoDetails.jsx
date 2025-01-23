import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import YouTubeVideoPlayer from '../components/YouTubeVideoPlayer';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import Comment from '../components/Comment';

const VideoDetails = () => {
  const [video, setVideo] = useState(null);
  const [similarVideos, setSimilarVideos] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const { id } = useParams();
  //   const { userInfo } = useSelector((state) => state.auth);
  //   console.log(video);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const { data } = await axios.get(`/api/videos/${id}`);
        setVideo(data);

        // Fetch similar videos
        const { data: allVideos } = await axios.get('/api/videos/all');
        const filtered = allVideos.filter((v) => v._id !== id);
        setSimilarVideos(filtered);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setIsDisliked(false);
    try {
      await axios.put(`/api/videos/like/${id}`);
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    setIsLiked(false);
  };

  if (!video) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Video Section */}
        <div className="lg:col-span-2">
          <div className="aspect-video w-full">
            <YouTubeVideoPlayer videoUrl={video.videoUrl} />
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold text-slate-100">{video.title}</h1>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.channel.channelName}`}
                    alt={video.channel.channelName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-slate-100">
                    {video.channel.channelName}
                  </h3>
                  <p className="text-sm text-gray-500">{video.views} views</p>
                </div>
                <button className="ml-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
                  Subscribe
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-full"
                >
                  {isLiked ? (
                    <>
                      <ThumbsUp className="text-xl text-white" fill="white" />
                      <span>{video.likes}</span>
                    </>
                  ) : (
                    <ThumbsUp className="text-xl text-white" />
                  )}
                  <span className="text-white">Like</span>
                </button>
                <button
                  onClick={handleDislike}
                  className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-full"
                >
                  {isDisliked ? (
                    <ThumbsDown className="text-xl text-white" fill="white" />
                  ) : (
                    <ThumbsDown className="text-xl text-white" />
                  )}
                  <span className="text-white">Dislike</span>
                </button>
              </div>
            </div>
            <div className="mt-4 bg-slate-800 rounded-xl p-4">
              <p className="text-slate-300">{video.description}</p>
            </div>
            <Comment videoId={video._id} />
          </div>
        </div>

        {/* Similar Videos Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-100 mb-4">
            Similar Videos
          </h2>
          {similarVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
