import FilterCategories from '../components/FilterCategories';
import VideoCard from '../components/VideoCard';
import { videos } from '../utils/staticData';

const Home = () => {
  return (
    <div className="flex-1 text-white px-2 py-4 overflow-hidden">
      <div className="w-full max-w-full">
        <FilterCategories />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
