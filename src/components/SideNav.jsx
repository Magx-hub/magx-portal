import React from 'react';
import { NavLink } from 'react-router-dom';
import { House, Users, Calendar, WalletCards, ForkKnife } from 'lucide-react';

const SideNav = () => {
  const navItems = [
    { path: '/', icon: <House size={24} />, name: 'Dashboard' },
    { path: '/teachers', icon: <Users size={24} />, name: 'Teachers' },
    { path: '/students', icon: <Users size={24} />, name: 'Students' },
    { path: '/attendance', icon: <Calendar size={24} />, name: 'Attendance' },
    { path: '/allowance', icon: <WalletCards size={24} />, name: 'Allowance' },
    { path: '/canteen', icon: <ForkKnife size={24} />, name: 'Canteen' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-blue-600 text-white rounded-r-lg">
      <div className="p-4 font-bold text-xl">MagX Portal</div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md ${isActive ? 'bg-blue-700' : ''}`
            }
          >
            {item.icon}
            <span className="ml-4">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
