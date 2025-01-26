import { useEffect, useState } from 'react';
import FilterCategories from '../components/FilterCategories';
import VideoCard from '../components/VideoCard';
import axios from 'axios';
// import { videos } from '../utils/staticData';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get('/api/videos/all');
      setVideos(res.data);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-slate-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 text-white px-2 py-4 overflow-hidden">
      <div className="w-full max-w-full">
        <FilterCategories />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
