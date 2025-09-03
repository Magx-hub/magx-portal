import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import useScreenSize from '../hooks/useScreenSize';
import BottomNav from './BottomNav';
import SideNav from './SideNav';
import Dashboard from '../screens/Dashboard';

// Lazy load large components
const TeacherModuleScreen = lazy(() => import('../screens/TeacherModuleScreen'));
const StudentModuleScreen = lazy(() => import('../screens/StudentModuleScreen'));
const AllowanceModuleScreen = lazy(() => import('../screens/AllowanceModuleScreen'));

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
  const isMobile = width < 768;

  return (
    <Router>
      <div className="flex h-screen">
        {!isMobile && <SideNav />}
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/teachers" element={<TeacherModuleScreen />} />
              <Route path="/students" element={<StudentModuleScreen />} />
              <Route path="/attendance" element={<AttendanceModuleScreen />} />
              <Route path="/allowance" element={<AllowanceModuleScreen />} />
              <Route path="/canteen" element={<CanteenModuleScreen />} />
            </Routes>
          </Suspense>
        </main>
        {isMobile && <BottomNav />}
      </div>
    </Router>
  );
};

export default Navigation;
