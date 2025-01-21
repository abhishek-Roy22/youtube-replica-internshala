import ChannelBanner from '../components/ChannelBanner';
import AboutChannel from '../components/AboutChannel';
import { ChannelMenus } from '../utils/staticData';
import useFetchProfile from '../Hooks/usefetchProfile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Channel = () => {
  const {
    data,
    error: profileError,
    loading: profileLoading,
  } = useFetchProfile('/api/users/profile');
  const channelId = data?.channel?._id;

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        // Fetch channel details
        const channelResponse = await axios.get(`/api/channels/${channelId}`);
        setChannel(channelResponse.data);

        // Fetch channel videos
        const videosResponse = await axios.get(`/api/videos/user`);
        setVideos(videosResponse.data.videos);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Error fetching channel data';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
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
