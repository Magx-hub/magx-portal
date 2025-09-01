import React, { useState } from 'react';
import { useTeachers } from '../hooks/useTeachers';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer 
} from 'recharts';
import { 
  Search, 
  Menu, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  Building2,
  X,
  Save,
  Loader
} from 'lucide-react';

const TeacherModuleScreen = () => {
  const {
    teachers,
    loading,
    error,
    stats,
    fetchTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    searchTeachers,
  } = useTeachers();

  // State for modals and forms
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    department: ''
  });

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Handle form submission
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      await addTeacher(formData);
      setShowAddModal(false);
      setFormData({ fullname: '', department: '' });
    } catch (err) {
      console.error('Error adding teacher:', err);
    }
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    try {
      await updateTeacher(selectedTeacher.id, formData);
      setShowEditModal(false);
      setSelectedTeacher(null);
      setFormData({ fullname: '', department: '' });
    } catch (err) {
      console.error('Error updating teacher:', err);
    }
  };

  const handleDeleteTeacher = async () => {
    try {
      await deleteTeacher(selectedTeacher.id);
      setShowDeleteModal(false);
      setSelectedTeacher(null);
    } catch (err) {
      console.error('Error deleting teacher:', err);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    await searchTeachers(value);
  };

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      fullname: teacher.fullname || '',
      department: teacher.department || ''
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDeleteModal(true);
  };

  const openViewModal = () => {
    setShowViewModal(true);
  };

  // Prepare data for charts - using actual teacher data structure
  const departmentData = stats.departmentDistribution || [];
  
  // Create department distribution from actual teachers data
  const actualDepartmentData = teachers.reduce((acc, teacher) => {
    const dept = teacher.department || 'Unknown';
    const existing = acc.find(item => item.name === dept);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: dept, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Menu className="w-6 h-6 cursor-pointer" />
            <h1 className="text-xl font-bold">Teacher Module</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 rounded-lg border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-gray-600 text-sm">Total Teachers</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalTeachers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-gray-600 text-sm">Departments</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalDepartments}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Teacher Management</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Teacher</span>
            </button>
            <button
              onClick={openViewModal}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Eye className="w-5 h-5" />
              <span>View Teachers</span>
            </button>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Analytics</h2>
          <div className="space-y-6">
            {/* Department Distribution Chart */}
            <div>
              <h3 className="text-md font-medium mb-3 text-gray-700">Department Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={actualDepartmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {actualDepartmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Teachers by Department Bar Chart */}
            <div>
              <h3 className="text-md font-medium mb-3 text-gray-700">Teachers by Department</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={actualDepartmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Teacher</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  <span>{loading ? 'Adding...' : 'Add Teacher'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Teachers Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">All Teachers</h3>
              <button onClick={() => setShowViewModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-auto max-h-[70vh]">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader className="w-8 h-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-3">
                  {teachers.map((teacher) => (
                    <div key={teacher.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{teacher.fullname}</h4>
                        <p className="text-gray-600">{teacher.department}</p>
                        <p className="text-sm text-gray-500">
                          Created: {teacher.createdAt && new Date(teacher.createdAt.toDate?.() || teacher.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(teacher)}
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(teacher)}
                          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {showEditModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Teacher</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateTeacher} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  <span>{loading ? 'Updating...' : 'Update Teacher'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="text-center">
              <Trash2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Delete Teacher</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {selectedTeacher.fullname}? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleDeleteTeacher}
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherModuleScreen;