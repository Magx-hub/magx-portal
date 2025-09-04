import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const EnhancedSideNav = ({ navItems }) => {
  const { logout, userRole } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav 
      className="hidden md:flex flex-col w-72 bg-white border-r border-gray-200 shadow-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3" aria-hidden="true">
            <Home size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold">MagX Portal</h1>
            <p className="text-blue-100 text-sm capitalize">{userRole} Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {/* Dashboard/Home Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isActive ? 'bg-blue-100 text-blue-600 font-medium shadow-sm' : ''
              }`
            }
            aria-current={({ isActive }) => isActive ? 'page' : undefined}
            aria-label="Go to dashboard"
          >
            <div className="w-6 h-6 mr-4 flex-shrink-0" aria-hidden="true">
              <Home size={20} />
            </div>
            <span className="text-base">Dashboard</span>
          </NavLink>

          {/* Divider */}
          <div className="my-4 border-t border-gray-200" role="separator" aria-hidden="true"></div>

          {/* Module Navigation Items */}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isActive ? 'bg-blue-100 text-blue-600 font-medium shadow-sm' : ''
                }`
              }
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
              aria-label={`Go to ${item.name.toLowerCase()}`}
            >
              <div className="w-6 h-6 mr-4 flex-shrink-0" aria-hidden="true">
                {item.icon}
              </div>
              <div className="flex-1">
                <span className="text-base">{item.name}</span>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-0.5 group-hover:text-blue-500 transition-colors">
                    {item.description}
                  </p>
                )}
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Sign out of your account"
        >
          <LogOut size={20} className="mr-4" aria-hidden="true" />
          <span className="text-base">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default EnhancedSideNav;
