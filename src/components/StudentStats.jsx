// Enhanced StudentStats Component

import { useState } from 'react';
import { RefreshCcw, BarChart3, Users, UserCheck, TrendingUp, Building } from 'lucide-react';

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
            <RefreshCcw size={16} />
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
export default StudentStats;