import { useState } from 'react';
import StudentList from './StudentList';

const StudentSearch = ({ onSearch, searching, results, onClear, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search students by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={searching}>
            {searching ? 'Searching...' : 'Search'}
          </button>
          <button type="button" className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>

      {searching ? (
        <div className="text-center py-8 text-black">Searching...</div>
      ) : (
        <StudentList
          students={results}
          loading={false}
          error={null}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default StudentSearch;