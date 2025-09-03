
import React from 'react';

const AttendanceTabs = ({ activeView, setActiveView }) => {
  return (
    <div className="flex mt-3 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setActiveView('records')}
        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
          activeView === 'records' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Records
      </button>
      <button
        onClick={() => setActiveView('analytics')}
        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
          activeView === 'analytics' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Analytics
      </button>
    </div>
  );
};

export default AttendanceTabs;
