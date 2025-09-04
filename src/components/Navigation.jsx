import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Users, Calendar, WalletCards, ForkKnife, BarChart3, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import useScreenSize from '../hooks/useScreenSize';
import EnhancedSideNav from './EnhancedSideNav';
import EnhancedBottomNav from './EnhancedBottomNav';
import ProtectedRoute from './ProtectedRoute';
import LoadingSpinner from './LoadingSpinner';
import LoginScreen from '../screens/LoginScreen';

// Lazy loaded screens
const Dashboard = React.lazy(() => import('../screens/Dashboard'));
const TeacherModuleScreen = React.lazy(() => import('../screens/TeacherModuleScreen'));
const StudentModuleScreen = React.lazy(() => import('../screens/StudentModuleScreen'));
const AttendanceModuleScreen = React.lazy(() => import('../screens/AttendanceModuleScreen'));
const AllowanceModuleScreen = React.lazy(() => import('../screens/AllowanceModuleScreen'));
const CanteenModuleScreen = React.lazy(() => import('../screens/CanteenModuleScreen'));
const PerformanceScreen = React.lazy(() => import('../screens/PerformanceMonitor'));

const Navigation = () => {
  const { width } = useScreenSize();
  const { isAuthenticated, userRole } = useAuth();
  const isMobile = width < 768;

  // Enhanced navigation items with descriptions
  const navItems = [
    { 
      path: '/teachers', 
      icon: <Users size={20} />, 
      name: 'Teachers', 
      description: 'Manage teacher records and profiles' 
    },
    { 
      path: '/students', 
      icon: <GraduationCap size={20} />, 
      name: 'Students', 
      description: 'Student enrollment and management' 
    },
    { 
      path: '/attendance', 
      icon: <Calendar size={20} />, 
      name: 'Attendance', 
      description: 'Track daily attendance records' 
    },
    { 
      path: '/allowance', 
      icon: <WalletCards size={20} />, 
      name: 'Allowance', 
      description: 'Manage staff allowances and payments' 
    },
    { 
      path: '/canteen', 
      icon: <ForkKnife size={20} />, 
      name: 'Canteen', 
      description: 'Canteen management and billing' 
    },
    { 
      path: '/performance', 
      icon: <BarChart3 size={20} />, 
      name: 'Performance', 
      description: 'Analytics and performance metrics' 
    },
  ];

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Enhanced Desktop Sidebar */}
        {userRole === 'admin' && !isMobile && (
          <EnhancedSideNav navItems={navItems} />
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
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
                  <ProtectedRoute allowedRoles={['admin']}>
                    <StudentModuleScreen />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/attendance" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher']}>
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
                  <ProtectedRoute allowedRoles={['admin']}>
                    <PerformanceScreen />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Suspense>
        </main>
        
        {/* Enhanced Mobile Bottom Navigation */}
        {userRole === 'admin' && isMobile && (
          <EnhancedBottomNav navItems={navItems} />
        )}
      </div>
    </Router>
  );
};

export default Navigation;
