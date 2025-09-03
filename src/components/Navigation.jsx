import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useScreenSize from '../hooks/useScreenSize';
import BottomNav from './BottomNav';
import SideNav from './SideNav';
import ProtectedRoute from './ProtectedRoute';
import LoginScreen from '../screens/LoginScreen';

// Lazy load large components
const Dashboard = lazy(() => import('../screens/Dashboard'));
const TeacherModuleScreen = lazy(() => import('../screens/TeacherModuleScreen'));
const StudentModuleScreen = lazy(() => import('../screens/StudentModuleScreen'));
const AllowanceModuleScreen = lazy(() => import('../screens/AllowanceModuleScreen'));
const PerformanceMonitor = lazy(() => import('../screens/PerformanceMonitor'));
const TeacherDashboard = lazy(() => import('../screens/TeacherDashboard'));

// Regular imports for smaller components
import AttendanceModuleScreen from '../screens/AttendanceModuleScreen';
import CanteenModuleScreen from '../screens/CanteenModuleScreen';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

const Navigation = () => {
  const { width } = useScreenSize();
  const { isAuthenticated, userRole } = useAuth();
  const isMobile = width < 768;

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <Router>
      <div className="flex h-screen">
        {/* Show navigation only for admin users */}
        {userRole === 'admin' && !isMobile && <SideNav />}
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginScreen />} />

              {/* Admin routes - protected */}
              <Route
                path="/"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teachers"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <TeacherModuleScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/students"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                    <StudentModuleScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AttendanceModuleScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/allowance"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AllowanceModuleScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/canteen"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <CanteenModuleScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/performance"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                    <PerformanceMonitor />
                  </ProtectedRoute>
                }
              />

              {/* Teacher routes */}
              <Route
                path="/teacher-dashboard/*"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Redirect teacher to their dashboard */}
              {userRole === 'teacher' && (
                <Route
                  path="*"
                  element={<TeacherDashboard />}
                />
              )}
            </Routes>
          </Suspense>
        </main>
        {/* Show bottom nav only for admin users */}
        {userRole === 'admin' && isMobile && <BottomNav />}
      </div>
    </Router>
  );
};

export default Navigation;
