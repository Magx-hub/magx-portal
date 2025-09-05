import { useState } from 'react';
import { 
  useStudents, 
  useStudentsByDepartment, 
  useStudentSearch, 
  useStudentStats 
} from '../hooks/useStudents';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import StudentStats from '../components/StudentStats';
import StudentSearch from '../components/StudentSearch';

const StudentModuleScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Hook calls
  const { students, loading, error, deleteStudent } = useStudents();
  const { students: deptStudents, loading: deptLoading } = useStudentsByDepartment(selectedDepartment);
  const { searchResults, searching, searchStudents, clearSearch } = useStudentSearch();
  const { studentStats, departmentStats, genderStats, summary, loading: statsLoading, refreshStats } = useStudentStats();

  // Filter departments for the dropdown
  const departments = [...new Set(students.map(student => student.department))];

  // Handle student deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        refreshStats(); // Refresh stats after deletion
      } catch (err) {
        console.error('Failed to delete student:', err);
      }
    }
  };

  // Handle student edit
  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  // Handle form close
  const handleFormClose = () => {
    setShowForm(false);
    setEditingStudent(null);
    refreshStats(); // Refresh stats after any changes
  };

  // Render appropriate content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'all':
        return (
          <StudentList 
            students={students} 
            loading={loading} 
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case 'department':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <label htmlFor="department-select" className="text-sm font-medium text-gray-700">
                Filter by Department:
              </label>
              <select 
                id="department-select"
                value={selectedDepartment} 
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <StudentList 
              students={selectedDepartment ? deptStudents : students} 
              loading={selectedDepartment ? deptLoading : loading} 
              error={error}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        );
      case 'search':
        return (
          <StudentSearch
            onSearch={searchStudents}
            searching={searching}
            results={searchResults}
            onClear={clearSearch}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case 'stats':
        return (
          <StudentStats
            studentStats={studentStats}
            departmentStats={departmentStats}
            genderStats={genderStats}
            summary={summary}
            loading={statsLoading}
            onRefresh={refreshStats}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-2 max-w-6xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
        <button 
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={() => setShowForm(true)}
        >
          Add New
        </button>
      </header>

      <nav className="flex space-x-1 border-b border-gray-200 mb-6">
        {['all', 'department', 'search', 'stats'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
              activeTab === tab
                ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' && 'All Students'}
            {tab === 'department' && 'By Department'}
            {tab === 'search' && 'Search'}
            {tab === 'stats' && 'Statistics'}
          </button>
        ))}
      </nav>

      <main className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        {renderTabContent()}
      </main>

      {showForm && (
        <StudentForm
          student={editingStudent}
          onClose={handleFormClose}
          onSave={handleFormClose}
        />
      )}
    </div>
  );
};

export default StudentModuleScreen;