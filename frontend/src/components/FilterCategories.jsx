import { filterCategories } from '../utils/staticData';

const FilterCategories = () => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hidden">
      <div className="flex items-center gap-2 md:gap-4 mb-6 min-w-max">
        {filterCategories.map((category) => (
          <button
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
              category === 'All'
                ? 'bg-slate-100 text-slate-600'
                : 'bg-gray-800 hover:bg-slate-700'
            }`}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterCategories;
