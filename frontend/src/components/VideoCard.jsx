import { Link } from 'react-router-dom';

const VideoCard = ({ id, title, channel, thumbnail, views, timestamp }) => {
  return (
    <Link to={`/watch/${id}`} className="group cursor-pointer">
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full transform transition-transform group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {timestamp}
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <div className="h-9 w-9 rounded-full overflow-hidden">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${channel}`}
            alt={channel}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm line-clamp-2 leading-tight mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{channel}</p>
          <div className="w-full flex items-center gap-2 text-xs text-gray-600 mt-1">
            <span>{views} views</span>
            <span>•</span>
            <span>2 weeks ago</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
