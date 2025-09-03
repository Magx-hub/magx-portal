import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Lazy load components
const StudentModuleScreen = lazy(() => import('./StudentModuleScreen'));
const PerformanceMonitor = lazy(() => import('./PerformanceMonitor'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

const TeacherDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
              <p className="text-blue-100">Welcome, {user?.name}</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <a
              href="#/teacher-dashboard/students"
              className="border-b-2 border-transparent hover:border-blue-500 px-1 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Students
            </a>
            <a
              href="#/teacher-dashboard/performance"
              className="border-b-2 border-transparent hover:border-blue-500 px-1 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Performance Monitor
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<StudentModuleScreen />} />
            <Route path="/students" element={<StudentModuleScreen />} />
            <Route path="/performance" element={<PerformanceMonitor />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default TeacherDashboard;