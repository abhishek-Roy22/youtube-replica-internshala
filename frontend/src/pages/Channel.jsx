import ChannelBanner from '../components/ChannelBanner';
import AboutChannel from '../components/AboutChannel';
import { ChannelMenus } from '../utils/staticData';
import useFetchProfile from '../Hooks/usefetchProfile';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Channel = () => {
  const {
    data,
    error: profileError,
    loading: profileLoading,
  } = useFetchProfile('/api/users/profile');
  const channelId = data?.channel?._id;

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      if (!channelId) return; // Exit early if channelId is undefined

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/videos/channel/${channelId}`);
        console.log(response.data);
        setVideos(response.data.videos); // Assuming API response contains a `videos` array
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchChannelVideos();
  }, [channelId]);

  return (
    <div className="w-full min-h-screen px-2 py-4">
      {/* Banner */}
      <ChannelBanner />
      {/* About Channel */}
      <AboutChannel data={data} error={profileError} loading={profileLoading} />

      {/* Menus */}
      <ul className="list-none flex items-center gap-10">
        {ChannelMenus.map((menu, i) => (
          <li
            key={i}
            className="text-xl font-semibold text-slate-300 pb-2 cursor-pointer"
          >
            {menu}
          </li>
        ))}
      </ul>
      <hr className="bg-slate-600" />
      {/* Videos card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))} */}
      </div>
    </div>
  );
};

export default Channel;
