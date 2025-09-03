
import React from 'react';
import { Calendar, Search, ChevronDown } from 'lucide-react';

const SearchAndFilters = ({ date, setDate, search, setSearch, showFilters, setShowFilters }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronDown size={20} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <div className={`space-y-3 ${!showFilters ? 'hidden' : ''}`}>
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <Calendar size={18} className="text-gray-500 mr-2" />
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="bg-transparent border-none outline-none w-full text-gray-900" 
          />
        </div>
        
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-500 mr-2" />
          <input 
            placeholder="Search by name or department" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-500" 
          />
        </div>
      </div>

      {/* Always visible date and search on mobile */}
      <div className={`space-y-3 ${showFilters ? 'hidden' : ''}`}>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <Calendar size={18} className="text-gray-500 mr-2" />
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="bg-transparent border-none outline-none w-full text-gray-900" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
