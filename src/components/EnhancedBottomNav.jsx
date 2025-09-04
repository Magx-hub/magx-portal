import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Home, MoreHorizontal } from 'lucide-react';
import MobileDrawer from './MobileDrawer';

const EnhancedBottomNav = ({ navItems }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide bottom nav on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Primary navigation items (most important 4)
  const primaryNavItems = navItems.slice(0, 4);
  const hasMoreItems = navItems.length > 4;

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <nav 
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30 md:hidden transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="navigation"
        aria-label="Bottom navigation"
      >
        <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
          {/* Home/Dashboard */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isActive 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`
            }
            aria-current={({ isActive }) => isActive ? 'page' : undefined}
            aria-label="Go to dashboard"
          >
            <Home size={20} aria-hidden="true" />
            <span className="text-xs mt-1 font-medium">Home</span>
          </NavLink>

          {/* Primary Navigation Items */}
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
              aria-label={`Go to ${item.name.toLowerCase()}`}
            >
              <div className="w-5 h-5" aria-hidden="true">
                {item.icon}
              </div>
              <span className="text-xs mt-1 font-medium truncate max-w-[50px]">
                {item.name}
              </span>
            </NavLink>
          ))}

          {/* More/Menu Button */}
          {hasMoreItems && (
            <button
              onClick={toggleDrawer}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isDrawerOpen
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              aria-label={isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={20} aria-hidden="true" />
              <span className="text-xs mt-1 font-medium">More</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navItems={navItems}
      />

      {/* Safe area spacer for content */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
};

export default EnhancedBottomNav;
