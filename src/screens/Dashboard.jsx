import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Calendar, WalletCards, ForkKnife, House } from 'lucide-react';

const Dashboard = () => {
  const modules = [
    { path: '/teachers', icon: <Users size={32} />, name: 'Teachers', description: 'Manage teacher records' },
    { path: '/students', icon: <Users size={32} />, name: 'Students', description: 'Manage student records' },
    { path: '/attendance', icon: <Calendar size={32} />, name: 'Attendance', description: 'Track attendance' },
    { path: '/allowance', icon: <WalletCards size={32} />, name: 'Allowance', description: 'Manage allowances' },
    { path: '/canteen', icon: <ForkKnife size={32} />, name: 'Canteen management' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 rounded-b-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">MagX Portal</h1>
            <p className="text-blue-100 mt-1">School Management Dashboard</p>
          </div>
          <House size={40} className="text-blue-200" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-black mb-6">Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <NavLink
                key={module.path}
                to={module.path}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-black">{module.name}</h3>
                </div>
                <p className="text-gray-600">{module.description}</p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
