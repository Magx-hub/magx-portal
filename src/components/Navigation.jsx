import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Users, Calendar, WalletCards, ForkKnife, BarChart3, GraduationCap, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SideNav from './SideNav';
import EnhancedBottomNav from './EnhancedBottomNav';
import ProtectedRoute from './ProtectedRoute';
import LoadingSpinner from './LoadingSpinner';
import LoginScreen from '../screens/LoginScreen';

// Lazy loaded screens
const Dashboard = React.lazy(() => import('../screens/Dashboard'));
const TeacherDashboard = React.lazy(() => import('../screens/TeacherDashboard'));
const TeacherModuleScreen = React.lazy(() => import('../screens/TeacherModuleScreen'));
const StudentModuleScreen = React.lazy(() => import('../screens/StudentModuleScreen'));
const AttendanceModuleScreen = React.lazy(() => import('../screens/AttendanceModuleScreen'));
const AllowanceModuleScreen = React.lazy(() => import('../screens/AllowanceModuleScreen'));
const CanteenModuleScreen = React.lazy(() => import('../screens/CanteenModuleScreen'));
const PerformanceScreen = React.lazy(() => import('../screens/PerformanceMonitor'));

const Navigation = () => {
  const { isAuthenticated, userRole } = useAuth();

  // Admin navigation items - full access
  const adminNavItems = [
    { 
      id: 'dashboard',
      path: '/', 
      icon: Home, 
      label: 'Dashboard',
      title: 'MagX Portal Dashboard',
      subtitle: 'Welcome back! Here\'s your overview',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'teachers',
      path: '/teachers', 
      icon: Users, 
      label: 'Teachers',
      title: 'Teacher Management',
      subtitle: 'Manage faculty and staff members',
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 'students',
      path: '/students', 
      icon: GraduationCap, 
      label: 'Students',
      title: 'Student Management',
      subtitle: 'Student enrollment and management',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'attendance',
      path: '/attendance', 
      icon: Calendar, 
      label: 'Attendance',
      title: 'Attendance System',
      subtitle: 'Track daily attendance records',
      color: 'from-indigo-500 to-indigo-600'
    },
    { 
      id: 'allowance',
      path: '/allowance', 
      icon: WalletCards, 
      label: 'Allowance',
      title: 'Allowance Management',
      subtitle: 'Manage staff allowances and payments',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      id: 'canteen',
      path: '/canteen', 
      icon: ForkKnife, 
      label: 'Canteen',
      title: 'Canteen System',
      subtitle: 'Canteen management and billing',
      color: 'from-pink-500 to-pink-600'
    },
    { 
      id: 'performance',
      path: '/performance', 
      icon: BarChart3, 
      label: 'Performance',
      title: 'Performance Analytics',
      subtitle: 'Analytics and performance metrics',
      color: 'from-red-500 to-red-600'
    },
  ];

  // Teacher navigation items - limited access to students and performance only
  const teacherNavItems = [
    { 
      id: 'dashboard',
      path: '/', 
      icon: Home, 
      label: 'Dashboard',
      title: 'Teacher Portal Dashboard',
      subtitle: 'Welcome back! Here\'s your overview',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'students',
      path: '/students', 
      icon: GraduationCap, 
      label: 'Students',
      title: 'Student Management',
      subtitle: 'View and manage student records',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'performance',
      path: '/performance', 
      icon: BarChart3, 
      label: 'Performance',
      title: 'Performance Monitor',
      subtitle: 'Track student performance and analytics',
      color: 'from-green-500 to-green-600'
    },
  ];

  // Get navigation items based on user role
  const navItems = userRole === 'admin' ? adminNavItems : teacherNavItems;

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<LoginScreen />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <SideNav navItems={navItems} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 pb-20 md:pb-4">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Role-based dashboard routing */}
                <Route 
                  path="/" 
                  element={
                    userRole === 'admin' ? <Dashboard /> : <TeacherDashboard />
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
                      <PerformanceScreen />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch-all route - redirect to home */}
                <Route 
                  path="*" 
                  element={
                    userRole === 'admin' ? <Dashboard /> : <TeacherDashboard />
                  } 
                />
              </Routes>
            </Suspense>
          </main>
        </div>
        <EnhancedBottomNav navItems={navItems} />
      </div>
    </Router>
  );
};

export default Navigation;
