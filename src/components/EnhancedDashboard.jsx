import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Calendar, WalletCards, ForkKnife, GraduationCap, BarChart3, TrendingUp, Clock } from 'lucide-react';
import { Card } from './ui';
import MobileFirstLayout from './MobileFirstLayout';

const EnhancedDashboard = ({ userRole = 'admin' }) => {
  const adminModules = [
    { 
      path: '/teachers', 
      icon: <Users size={24} />, 
      name: 'Teachers', 
      description: 'Manage teacher records and profiles',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      stats: '25 Active'
    },
    { 
      path: '/students', 
      icon: <GraduationCap size={24} />, 
      name: 'Students', 
      description: 'Student enrollment and management',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      stats: '150+ Enrolled'
    },
    { 
      path: '/attendance', 
      icon: <Calendar size={24} />, 
      name: 'Attendance', 
      description: 'Track daily attendance records',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      stats: '98% Today'
    },
    { 
      path: '/allowance', 
      icon: <WalletCards size={24} />, 
      name: 'Allowance', 
      description: 'Manage staff allowances and payments',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      stats: '₹45,000'
    },
    { 
      path: '/canteen', 
      icon: <ForkKnife size={24} />, 
      name: 'Canteen', 
      description: 'Canteen management and billing',
      color: 'bg-gradient-to-br from-pink-500 to-rose-500',
      stats: '120 Orders'
    },
    { 
      path: '/performance', 
      icon: <BarChart3 size={24} />, 
      name: 'Performance', 
      description: 'Analytics and performance metrics',
      color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      stats: 'View Reports'
    },
  ];

  const teacherModules = [
    { 
      path: '/students', 
      icon: <GraduationCap size={24} />, 
      name: 'Students', 
      description: 'View and manage student records',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      stats: '30 Students'
    },
    { 
      path: '/performance', 
      icon: <BarChart3 size={24} />, 
      name: 'Performance Monitor', 
      description: 'Track student performance and analytics',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      stats: 'View Analytics'
    },
  ];

  const modules = userRole === 'admin' ? adminModules : teacherModules;

  const quickStats = [
    { label: 'Total Students', value: '150+', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: <GraduationCap size={20} /> },
    { label: 'Active Teachers', value: '25', color: 'text-green-600', bgColor: 'bg-green-50', icon: <Users size={20} /> },
    { label: 'Attendance Rate', value: '98%', color: 'text-purple-600', bgColor: 'bg-purple-50', icon: <TrendingUp size={20} /> },
    { label: 'This Month', value: '22 Days', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: <Clock size={20} /> },
  ];

  const recentActivity = [
    { action: 'New student enrolled', time: '2 hours ago', type: 'success' },
    { action: 'Attendance marked for Grade 10A', time: '3 hours ago', type: 'info' },
    { action: 'Monthly report generated', time: '1 day ago', type: 'success' },
    { action: 'Teacher profile updated', time: '2 days ago', type: 'info' },
  ];

  return (
    <MobileFirstLayout
      title={userRole === 'admin' ? 'MagX Portal' : 'Teacher Portal'}
      subtitle={userRole === 'admin' ? 'School Management Dashboard' : 'Welcome back! Here\'s your overview'}
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Welcome Message */}
      <Card className="p-4 sm:p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {userRole === 'admin' 
                ? 'Choose a module to get started with managing your school.' 
                : 'Access your tools and manage your classes efficiently.'
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {modules.map((module) => (
          <NavLink
            key={module.path}
            to={module.path}
            className="group block"
          >
            <Card 
              hover
              className="h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                {/* Icon and Title */}
                <div className="flex items-start mb-4">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${module.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="text-white">
                      {module.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {module.name}
                    </h3>
                    <div className="text-xs sm:text-sm text-blue-600 font-medium">
                      {module.stats}
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                  {module.description}
                </p>
                
                {/* Action Indicator */}
                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                  <span>Manage</span>
                  <svg 
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Card>
          </NavLink>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <span className="text-sm sm:text-base text-gray-900">{activity.action}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </MobileFirstLayout>
  );
};

export default EnhancedDashboard;
