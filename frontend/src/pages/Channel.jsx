import ChannelBanner from '../components/ChannelBanner';
import AboutChannel from '../components/AboutChannel';
import { ChannelMenus } from '../utils/staticData';
import useFetchProfile from '../Hooks/useFetchProfile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import VideoCard from '../components/VideoCard';

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
        const channelResponse = await axios.get('/api/channel', {
          withCredentials: true,
        });
        setChannel(channelResponse.data);
        setVideos(channelResponse.data?.videos);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Error fetching channel data';
        toast.error(errorMessage);
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (data) {
      fetchChannelData();
    }
  }, [channelId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-center text-slate-300 font-bold text-2xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-center text-slate-300 font-bold text-2xl">
        Error fetching channel data
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-2 py-4">
      {/* Banner */}
      <ChannelBanner channel={channel} />
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
      <hr className="bg-slate-600 mb-3" />
      {/* Videos card */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-xl font-semibold text-slate-300">
            This Channel has no videos yet
          </p>
        </div>
      )}
    </div>
  );
};

export default Channel;
