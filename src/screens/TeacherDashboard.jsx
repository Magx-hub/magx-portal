import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, BarChart3, Clock, Users, BookOpen, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';

const TeacherDashboard = () => {
  const { user } = useAuth();

  const teacherModules = [
    { 
      path: '/students', 
      icon: <GraduationCap size={24} />, 
      name: 'Students', 
      description: 'View and manage student records',
      color: 'bg-blue-500'
    },
    { 
      path: '/performance', 
      icon: <BarChart3 size={24} />, 
      name: 'Performance Monitor', 
      description: 'Track student performance and analytics',
      color: 'bg-green-500'
    },
  ];

  const quickStats = [
    { label: 'Classes Today', value: '4', color: 'text-blue-600' },
    { label: 'Students Present', value: '28/30', color: 'text-green-600' },
    { label: 'Attendance Rate', value: '93%', color: 'text-purple-600' },
    { label: 'This Week', value: '5 Days', color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-4 sm:p-6 text-center">
            <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Today's Schedule */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
          Today's Schedule
        </h2>
        <div className="grid gap-4">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Mathematics - Grade 10A</h3>
                  <p className="text-gray-600 text-sm">8:00 AM - 9:00 AM</p>
                </div>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle size={20} className="mr-2" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Physics Lab - Grade 11B</h3>
                  <p className="text-gray-600 text-sm">10:00 AM - 11:30 AM</p>
                </div>
              </div>
              <div className="flex items-center text-blue-600">
                <Clock size={20} className="mr-2" />
                <span className="text-sm font-medium">Next Class</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Available Modules */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
          Available Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {teacherModules.map((module) => (
            <NavLink
              key={module.path}
              to={module.path}
              className="group block"
            >
              <Card 
                hover
                className="h-full transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg border border-gray-200"
              >
                <div className="p-4 sm:p-6">
                  {/* Icon and Title */}
                  <div className="flex items-start mb-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${module.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}>
                      <div className="text-white">
                        {module.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {module.name}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {module.description}
                  </p>
                  
                  {/* Action Indicator */}
                  <div className="mt-4 flex items-center text-purple-600 text-sm font-medium group-hover:text-purple-700">
                    <span>Open</span>
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
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">View Students</h3>
                <p className="text-gray-600 text-sm">Access student records and information</p>
              </div>
              <NavLink 
                to="/students"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View
              </NavLink>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Performance Analytics</h3>
                <p className="text-gray-600 text-sm">Check student performance and reports</p>
              </div>
              <NavLink 
                to="/performance"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Analyze
              </NavLink>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;