import { NavLink } from 'react-router-dom';
import { Users, Calendar, WalletCards, ForkKnife, House, GraduationCap, BarChart3 } from 'lucide-react';
import { Card } from '../components/ui';

const Dashboard = () => {
  const modules = [
    { 
      path: '/teachers', 
      icon: <Users size={24} />, 
      name: 'Teachers', 
      description: 'Manage teacher records and profiles',
      color: 'bg-blue-500'
    },
    { 
      path: '/students', 
      icon: <GraduationCap size={24} />, 
      name: 'Students', 
      description: 'Student enrollment and management',
      color: 'bg-green-500'
    },
    { 
      path: '/attendance', 
      icon: <Calendar size={24} />, 
      name: 'Attendance', 
      description: 'Track daily attendance records',
      color: 'bg-purple-500'
    },
    { 
      path: '/allowance', 
      icon: <WalletCards size={24} />, 
      name: 'Allowance', 
      description: 'Manage staff allowances and payments',
      color: 'bg-yellow-500'
    },
    { 
      path: '/canteen', 
      icon: <ForkKnife size={24} />, 
      name: 'Canteen', 
      description: 'Canteen management and billing',
      color: 'bg-orange-500'
    },
    { 
      path: '/performance', 
      icon: <BarChart3 size={24} />, 
      name: 'Performance', 
      description: 'Analytics and performance metrics',
      color: 'bg-indigo-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">MagX Portal</h1>
              <p className="text-blue-100 mt-1 text-sm sm:text-base">School Management Dashboard</p>
            </div>
            <div className="hidden sm:block">
              <House size={32} className="text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Choose a module to get started with managing your school.
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
            {modules.map((module) => (
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
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {module.name}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {module.description}
                    </p>
                    
                    {/* Action Indicator */}
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
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

          {/* Quick Stats or Recent Activity could go here */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600 text-sm sm:text-base">Students</div>
            </Card>
            <Card className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-gray-600 text-sm sm:text-base">Teachers</div>
            </Card>
            <Card className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600 text-sm sm:text-base">Attendance</div>
            </Card>
            <Card className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">12</div>
              <div className="text-gray-600 text-sm sm:text-base">Departments</div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Mobile bottom spacing for bottom nav */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default Dashboard;
