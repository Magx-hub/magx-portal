import { useState } from 'react';
import { Search, X, RefreshCw, Users, Building, TrendingUp, Filter, BarChart3, UserCheck, Eye, Edit, Trash2 } from 'lucide-react';

// Enhanced StudentSearch Component
const StudentSearch = ({ onSearch, searching, results, onClear, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Student Search</h1>
            <p className="text-blue-100 text-sm">Find and manage student records</p>
          </div>
          <div className="flex items-center gap-2">
            <Search size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">Search Students</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Filter size={16} />
            <span className="text-sm">Filters</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, ID, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                disabled={searching || !searchTerm.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors flex items-center gap-2 min-w-[120px] justify-center"
              >
                {searching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Search</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleClear}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                <X size={16} />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters (Collapsible) */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-3 animate-in slide-in-from-top-2">
              <h3 className="text-md font-medium text-gray-800">Advanced Filters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Departments</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="english">English</option>
                  <option value="science">Science</option>
                </select>
                
                <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                
                <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Search Results</h2>
          {results && results.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </span>
          )}
        </div>
        
        <StudentList 
          students={results || []} 
          loading={searching}
          error={null}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

// Enhanced StudentStats Component
const StudentStats = ({ 
  studentStats, 
  departmentStats, 
  genderStats, 
  summary, 
  loading, 
  onRefresh 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading statistics...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Student Statistics</h1>
            <p className="text-green-100 text-sm">Analytics and insights</p>
          </div>
          <button 
            onClick={onRefresh}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 backdrop-blur-sm"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'overview' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 size={16} />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'departments' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Building size={16} />
            <span>Departments</span>
          </button>
          <button
            onClick={() => setActiveTab('demographics')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'demographics' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users size={16} />
            <span>Demographics</span>
          </button>
        </div>
      </div>

      {/* Content Sections */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Stats Grid */}
          {studentStats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users size={24} className="text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{studentStats.total || 0}</div>
                <div className="text-sm text-gray-600 font-medium">Total Students</div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <UserCheck size={24} className="text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{studentStats.male || 0}</div>
                <div className="text-sm text-gray-600 font-medium">Male Students</div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <UserCheck size={24} className="text-pink-600" />
                </div>
                <div className="text-3xl font-bold text-pink-600 mb-1">{studentStats.female || 0}</div>
                <div className="text-sm text-gray-600 font-medium">Female Students</div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users size={24} className="text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-1">{studentStats.other || 0}</div>
                <div className="text-sm text-gray-600 font-medium">Other Genders</div>
              </div>
            </div>
          )}

          {/* Summary Card */}
          {summary && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-green-600" />
                Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-gray-900">{summary.totalStudents}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600">{summary.maleCount}</div>
                  <div className="text-sm text-blue-600">Male Count</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-pink-600">{summary.femaleCount}</div>
                  <div className="text-sm text-pink-600">Female Count</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600">{summary.totalDepartments}</div>
                  <div className="text-sm text-green-600">Departments</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Departments Tab */}
      {activeTab === 'departments' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Building size={20} className="text-blue-600" />
            Students by Department
          </h3>
          
          {departmentStats && departmentStats.length > 0 ? (
            <div className="space-y-3">
              {departmentStats.map((dept, index) => (
                <div key={dept.department || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Building size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{dept.department}</div>
                      <div className="text-sm text-gray-600">Department</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{dept.count}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Building size={32} className="mx-auto mb-3 text-gray-400" />
              <p>No department data available</p>
            </div>
          )}
        </div>
      )}

      {/* Demographics Tab */}
      {activeTab === 'demographics' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Users size={20} className="text-purple-600" />
            Students by Gender
          </h3>
          
          {genderStats && genderStats.length > 0 ? (
            <div className="space-y-3">
              {genderStats.map((gender, index) => {
                const getGenderColor = (genderType) => {
                  switch (genderType?.toLowerCase()) {
                    case 'male': return 'bg-blue-100 text-blue-600';
                    case 'female': return 'bg-pink-100 text-pink-600';
                    default: return 'bg-purple-100 text-purple-600';
                  }
                };
                
                return (
                  <div key={gender.gender || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getGenderColor(gender.gender)}`}>
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 capitalize">{gender.gender}</div>
                        <div className="text-sm text-gray-600">Gender</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{gender.count}</div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users size={32} className="mx-auto mb-3 text-gray-400" />
              <p>No gender data available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Demo Component to show both components
const StudentManagement = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Mock data
  const mockStudentStats = {
    total: 1250,
    male: 680,
    female: 520,
    other: 50
  };

  const mockDepartmentStats = [
    { department: 'Computer Science', count: 350 },
    { department: 'Mathematics', count: 280 },
    { department: 'English Literature', count: 220 },
    { department: 'Physics', count: 180 },
    { department: 'Biology', count: 220 }
  ];

  const mockGenderStats = [
    { gender: 'Male', count: 680 },
    { gender: 'Female', count: 520 },
    { gender: 'Other', count: 50 }
  ];

  const mockSummary = {
    totalStudents: 1250,
    maleCount: 680,
    femaleCount: 520,
    totalDepartments: 5
  };

  const mockStudents = [
    { id: 1, name: 'John Doe', department: 'Computer Science', studentId: 'CS001', gender: 'Male' },
    { id: 2, name: 'Jane Smith', department: 'Mathematics', studentId: 'MA002', gender: 'Female' },
    { id: 3, name: 'Alex Johnson', department: 'English Literature', studentId: 'EN003', gender: 'Other' }
  ];

  const handleSearch = async (searchTerm) => {
    setSearching(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = mockStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setSearching(false);
    }, 1000);
  };

  const handleClear = () => {
    setSearchResults([]);
  };

  const handleEdit = (student) => {
    console.log('Edit student:', student);
  };

  const handleDelete = (studentId) => {
    console.log('Delete student:', studentId);
  };

  const handleRefresh = () => {
    console.log('Refreshing stats...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Student Search Component */}
      <div className="pb-8">
        <StudentSearch
          onSearch={handleSearch}
          searching={searching}
          results={searchResults}
          onClear={handleClear}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Student Stats Component */}
      <div className="border-t border-gray-200 pt-8">
        <StudentStats
          studentStats={mockStudentStats}
          departmentStats={mockDepartmentStats}
          genderStats={mockGenderStats}
          summary={mockSummary}
          loading={false}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
};

export default StudentManagement;