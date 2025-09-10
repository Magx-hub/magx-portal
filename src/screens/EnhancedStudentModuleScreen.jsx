import { useState } from 'react';
import { Users, BarChart3, Search, UserPlus } from 'lucide-react';
import { 
  useStudents, 
  useStudentsByDepartment, 
  useStudentSearch, 
  useStudentStats 
} from '../hooks/useStudents';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import EnhancedStudentStats from '../components/EnhancedStudentStats';
import MobileModuleLayout from '../components/MobileModuleLayout';
import { Card, Button } from '../components/ui';

const EnhancedStudentModuleScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

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
        refreshStats();
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
    refreshStats();
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchStudents(query);
    } else {
      clearSearch();
    }
  };

  // Handle export
  const handleExport = () => {
    // Export functionality
    console.log('Exporting student data...');
  };

  // Tab configuration
  const tabs = [
    { id: 'all', label: 'All Students', icon: <Users size={16} /> },
    { id: 'department', label: 'By Department', icon: <Users size={16} /> },
    { id: 'search', label: 'Search', icon: <Search size={16} /> },
    { id: 'stats', label: 'Statistics', icon: <BarChart3 size={16} /> }
  ];

  // Render tab content with mobile-optimized layouts
  const renderTabContent = () => {
    switch (activeTab) {
      case 'all':
        return (
          <div className="space-y-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map((student) => (
                  <Card key={student.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name?.charAt(0) || 'S'}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.department}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={() => handleEdit(student)}
                        className="flex-1"
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => handleDelete(student.id)}
                        className="flex-1"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <StudentList 
                students={students} 
                loading={loading} 
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        );

      case 'department':
        return (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label htmlFor="department-select" className="text-sm font-medium text-gray-700">
                  Filter by Department:
                </label>
                <select 
                  id="department-select"
                  value={selectedDepartment} 
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </Card>
            
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
          <div className="space-y-4">
            {searchQuery && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Search results for: <strong>"{searchQuery}"</strong>
                  </span>
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    onClick={() => {
                      setSearchQuery('');
                      clearSearch();
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </Card>
            )}
            
            <StudentList 
              students={searchResults} 
              loading={searching} 
              error={error}
              onEdit={handleEdit}
              onDelete={handleDelete}
              emptyMessage={searchQuery ? "No students found matching your search." : "Enter a search term to find students."}
            />
          </div>
        );

      case 'stats':
        return (
          <EnhancedStudentStats
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
    <>
      <MobileModuleLayout
        title="Student Management"
        subtitle="Manage student records and information"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showAddButton={true}
        onAddClick={() => setShowForm(true)}
        showExportButton={true}
        onExportClick={handleExport}
        showViewToggle={activeTab === 'all'}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchPlaceholder="Search students by name, ID, or department..."
        onSearch={handleSearch}
      >
        {renderTabContent()}
      </MobileModuleLayout>

      {showForm && (
        <StudentForm
          student={editingStudent}
          onClose={handleFormClose}
          onSave={handleFormClose}
        />
      )}
    </>
  );
};

export default EnhancedStudentModuleScreen;
