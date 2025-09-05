import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { House, Users, Calendar, ForkKnife } from 'lucide-react';

const BottomNav = ({ navItems = [] }) => {
  const { userRole } = useAuth();

  // Show only the first 5 items for mobile to prevent overcrowding
  const mobileNavItems = navItems.slice(0, 5);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white flex justify-around p-2 mt-2 md:hidden rounded-t-lg shadow-lg border-t border-blue-500">
      {mobileNavItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg min-w-0 flex-1 transition-colors duration-200 ${
                isActive ? 'text-blue-200 bg-blue-700' : 'text-white hover:text-blue-200'
              }`
            }
          >
            <IconComponent size={20} />
            <span className="text-xs mt-1 truncate w-full text-center">{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;
