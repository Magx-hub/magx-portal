import React, { useState, useEffect } from 'react';
import { useStudentSearch } from '../hooks/useStudents';

const StudentSelector = ({ onSelect, selectedStudent, placeholder = "Search and select a student..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { searchResults, searching, error, searchStudents, clearSearch } = useStudentSearch();

  useEffect(() => {
    if (searchTerm.length > 1) {
      const timeoutId = setTimeout(() => {
        searchStudents(searchTerm);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      clearSearch();
    }
  }, [searchTerm, searchStudents, clearSearch]);

  const handleSelect = (student) => {
    onSelect(student);
    setIsOpen(false);
    setSearchTerm('');
    clearSearch();
  };

  const handleClear = () => {
    onSelect(null);
    setSearchTerm('');
    clearSearch();
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={selectedStudent ? `${selectedStudent.fullname} (${selectedStudent.id})` : searchTerm}
            onChange={(e) => {
              if (selectedStudent) {
                setSearchTerm(e.target.value);
                onSelect(null);
              } else {
                setSearchTerm(e.target.value);
              }
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            readOnly={!!selectedStudent}
          />
          {selectedStudent && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
        {!selectedStudent && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-2 bg-gray-100 border rounded hover:bg-gray-200"
          >
            ▼
          </button>
        )}
      </div>

      {isOpen && !selectedStudent && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searching ? (
            <div className="p-3 text-center text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mx-auto mb-2"></div>
              Searching...
            </div>
          ) : error ? (
            <div className="p-3 text-center text-red-500">
              Error: {error}
            </div>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((student) => (
                <li
                  key={student.id}
                  onClick={() => handleSelect(student)}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                >
                  <div className="font-medium">{student.fullname}</div>
                  <div className="text-sm text-gray-600">
                    {student.department} • {student.gender} • ID: {student.id}
                  </div>
                </li>
              ))}
            </ul>
          ) : searchTerm.length > 1 ? (
            <div className="p-3 text-center text-gray-500">
              No students found
            </div>
          ) : (
            <div className="p-3 text-center text-gray-500">
              Type at least 2 characters to search
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentSelector;