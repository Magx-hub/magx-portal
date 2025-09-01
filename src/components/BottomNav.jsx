import React from 'react';
import { NavLink } from 'react-router-dom';
import { House, Users, Calendar, Money, ForkKnife } from 'phosphor-react';

const BottomNav = () => {
  const navItems = [
    { path: '/', icon: <House size={24} />, name: 'Dashboard' },
    { path: '/teachers', icon: <Users size={24} />, name: 'Teachers' },
    { path: '/students', icon: <Users size={24} />, name: 'Students' },
    { path: '/attendance', icon: <Calendar size={24} />, name: 'Attendance' },
    { path: '/canteen', icon: <ForkKnife size={24} />, name: 'Canteen' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around p-2 md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${isActive ? 'text-blue-400' : ''}`
          }
        >
          {item.icon}
          <span className="text-xs">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
