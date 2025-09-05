import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStudents } from '../hooks/useStudents';

const StudentForm = ({ student, onClose, onSave }) => {
  const [fullname, setFullname] = useState('');
  const [department, setDepartment] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { addStudent, updateStudent } = useStudents();

  useEffect(() => {
    if (student) {
      setFullname(student.fullname);
      setDepartment(student.department);
      setGender(student.gender);
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (student) {
        await updateStudent(student.id, fullname, department, gender);
      } else {
        await addStudent(fullname, department, gender);
      }
      onSave();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-black">
            {student ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6 mt-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-black mb-1">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-black mb-1">
              Department
            </label>
            <input
              id="department"
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-black mb-1">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-black bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : (student ? 'Update' : 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

StudentForm.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string,
    fullname: PropTypes.string,
    department: PropTypes.string,
    gender: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default StudentForm;