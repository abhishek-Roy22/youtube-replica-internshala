import useFetchProfile from '../Hooks/usefetchProfile';

const AboutChannel = () => {
  const { data, error, loading } = useFetchProfile();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-4xl text-green-600 font-bold text-center">
          Loading...
        </h1>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="w-full flex flex-col items-center md:flex-row p-4 space-y-2 space-x-5">
      <div className="w-32 h-32 rounded-full bg-slate-400 overflow-hidden">
        <img src="" alt="" className="w-full object-cover" />
      </div>
      <div className="flex flex-col gap-3 justify-start">
        <h1 className="text-5xl font-bold text-slate-300">Tips Official</h1>
        <div>
          <span className="font-semibold text-slate-300 text-2xl">
            @tipsofficial{' '}
          </span>
          <span className="font-normal text-slate-400 text-2xl">
            || 71.8M ||
          </span>
          <span className="font-normal text-slate-400 text-2xl">
            {' '}
            7K videos
          </span>
        </div>
        <p className="text-slate-400 text-2xl">description</p>
        <button className="py-2 px-3 bg-slate-700 text-slate-300 hover:bg-slate-800 rounded-full font-bold text-lg">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default AboutChannel;
