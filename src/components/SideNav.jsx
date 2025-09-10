import { NavLink } from 'react-router-dom';
import { House, Users, Calendar, WalletCards, ForkKnife, PenSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SideNav = ({ navItems = [] }) => {
  const { userRole } = useAuth();

  // Use the navItems directly since Navigation.jsx already filters based on role
  const filteredNavItems = navItems;

  return (
    <div className="hidden md:flex flex-col w-64 bg-blue-600 text-white rounded-r-lg">
      <div className="p-4 font-bold text-xl">MagX Portal</div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {filteredNavItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md transition-colors duration-200 hover:bg-blue-700 ${
                  isActive ? 'bg-blue-700 shadow-md' : ''
                }`
              }
            >
              <IconComponent size={20} />
              <span className="ml-4">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      
      {/* User Role Indicator */}
      <div className="p-4 border-t border-blue-500">
        <div className="text-xs text-blue-200 uppercase tracking-wide">
          {userRole === 'admin' ? 'Administrator' : 'Teacher Portal'}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
