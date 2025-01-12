import React from 'react';
import { categories, menuItems } from '../utils/staticData';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`${
        isOpen
          ? 'w-20 sticky top-20 px-2 py-4 overflow-y-auto border-r h-[89vh]'
          : 'w-64 sticky top-20 px-2 py-4 overflow-y-auto border-r h-[89vh]'
      }`}
    >
      <div className="space-y-1">
        {menuItems.map(({ icon: Icon, label, active }) => (
          <Link
            to="/"
            key={label}
            className={`
                 flex items-center w-full px-3 py-2 text-sm rounded-lg text-slate-100
             ${
               active
                 ? 'bg-slate-600 font-medium text-slate-300'
                 : 'hover:bg-slate-600 hover:text-slate-300'
             }`}
          >
            <Icon className="w-5 h-5 mr-4 text-slate-200" />
            {!isOpen && label}
          </Link>
        ))}
      </div>

      {!isOpen && (
        <div className="mt-8">
          <h3 className="px-3 text-md font-medium text-slate-400 mb-2">
            Categories
          </h3>
          <div className="space-y-1">
            {categories.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-slate-800 hover:text-slate-300 text-slate-100"
              >
                <Icon className="w-5 h-5 mr-4 text-slate-200" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
