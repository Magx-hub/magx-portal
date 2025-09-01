import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useScreenSize from '../hooks/useScreenSize';
import BottomNav from './BottomNav';
import SideNav from './SideNav';
import Dashboard from '../screens/Dashboard';
import TeacherModuleScreen from '../screens/TeacherModuleScreen';
import StudentModuleScreen from '../screens/StudentModuleScreen';
import AttendanceModuleScreen from '../screens/AttendanceModuleScreen';
import AllowanceModuleScreen from '../screens/AllowanceModuleScreen';
import CanteenModuleScreen from '../screens/CanteenModuleScreen';

const Navigation = () => {
  const { width } = useScreenSize();
  const isMobile = width < 768;

  return (
    <Router basename="/magx-portal">
      <div className="flex h-screen">
        {!isMobile && <SideNav />}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teachers" element={<TeacherModuleScreen />} />
            <Route path="/students" element={<StudentModuleScreen />} />
            <Route path="/attendance" element={<AttendanceModuleScreen />} />
            <Route path="/allowance" element={<AllowanceModuleScreen />} />
            <Route path="/canteen" element={<CanteenModuleScreen />} />
          </Routes>
        </main>
        {isMobile && <BottomNav />}
      </div>
    </Router>
  );
};

export default Navigation;
