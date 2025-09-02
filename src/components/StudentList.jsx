const StudentList = ({ students, loading, error, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 text-gray-600">
        Loading students...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No students found
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {students.map((student) => (
        <li key={student.id} className="py-4 px-4 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-black truncate">
                {student.fullname}
              </h3>
              <p className="text-sm text-gray-600">
                {student.department} • {student.gender}
              </p>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                onClick={() => onEdit(student)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                onClick={() => onDelete(student.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;