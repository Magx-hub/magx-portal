import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Menu, Users, Calendar, WalletCards, ForkKnife, BarChart3, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const MobileDrawer = ({ isOpen, onClose, navItems }) => {
  const { logout, userRole } = useAuth();
  
  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-drawer')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;
      
      if (event.key === 'Escape') {
        onClose();
      }
      
      // Tab trapping
      if (event.key === 'Tab') {
        const drawer = document.querySelector('.mobile-drawer');
        const focusableElements = drawer?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the first focusable element when drawer opens
      setTimeout(() => {
        const drawer = document.querySelector('.mobile-drawer');
        const firstFocusable = drawer?.querySelector('button, [href]');
        firstFocusable?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = () => {
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div 
        className={`mobile-drawer fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-describedby="drawer-description"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-blue-600 text-white">
          <div>
            <h2 id="drawer-title" className="text-xl font-bold">MagX Portal</h2>
            <p id="drawer-description" className="text-blue-100 text-sm capitalize">{userRole} Dashboard</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6" role="navigation" aria-label="Main navigation">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isActive ? 'bg-blue-100 text-blue-600 font-medium' : ''
                  }`
                }
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                <div className="w-6 h-6 mr-4 flex-shrink-0" aria-hidden="true">
                  {item.icon}
                </div>
                <span className="text-base">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Sign out of your account"
          >
            <LogOut size={20} className="mr-4" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
