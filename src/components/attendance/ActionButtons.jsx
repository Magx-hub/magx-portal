
import React from 'react';
import { Plus, Download, X } from 'lucide-react';

const ActionButtons = ({ showAddForm, setShowAddForm, handleExport }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`p-2 rounded-lg transition-colors ${
            showAddForm 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}
        >
          {showAddForm ? <X size={20} /> : <Plus size={20} />}
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={18} />
          <span className="text-sm font-medium">Mark Attendance</span>
        </button>
        <button
          onClick={handleExport}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Download size={18} />
          <span className="text-sm font-medium">Export</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
