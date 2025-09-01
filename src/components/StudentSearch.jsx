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
    <div>
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-input">
          <input
            type="text"
            placeholder="Search students by name or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={searching}>
            {searching ? 'Searching...' : 'Search'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </form>
      </div>

      {searching ? (
        <div className="loading">Searching...</div>
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