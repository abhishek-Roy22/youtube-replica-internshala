import ChannelBanner from '../components/ChannelBanner';
import AboutChannel from '../components/AboutChannel';
import { ChannelMenus } from '../utils/staticData';

const Channle = () => {
  return (
    <div className="w-full min-h-screen px-2 py-4">
      {/* Banner */}
      <ChannelBanner />
      {/* About Channel */}
      <AboutChannel />

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
    </div>
  );
};

export default Channle;
