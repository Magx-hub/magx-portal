import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, Clock, DollarSign, Coffee, Menu, Bell, Search, Home } from 'lucide-react';
import { Card, Button, Input } from './ui';
import { useScreenSize } from '../hooks/useScreenSize';

const EnhancedMobileLayout = ({ 
  children, 
  defaultTab = 'dashboard',
  onTabChange,
  customTabs = null,
  showStats = true,
  showSearch = true,
  showNotifications = true
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { width } = useScreenSize();
  const isMobile = width < 768;

  const defaultTabs = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home,
      title: 'MagX Portal Dashboard',
      subtitle: 'Welcome back! Here\'s your overview',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'teachers', 
      label: 'Teachers', 
      icon: GraduationCap,
      title: 'Teacher Management',
      subtitle: 'Manage faculty and staff members',
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 'students', 
      label: 'Students', 
      icon: Users,
      title: 'Student Management', 
      subtitle: 'Manage student records and enrollment',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'attendance', 
      label: 'Attendance', 
      icon: Clock,
      title: 'Attendance System',
      subtitle: 'Track and manage daily attendance',
      color: 'from-indigo-500 to-indigo-600'
    },
    { 
      id: 'allowance', 
      label: 'Allowance', 
      icon: DollarSign,
      title: 'Allowance Management',
      subtitle: 'Process student allowances and payments',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      id: 'canteen', 
      label: 'Canteen', 
      icon: Coffee,
      title: 'Canteen System',
      subtitle: 'Manage meals and canteen operations',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const tabs = customTabs || defaultTabs;
  const currentTab = tabs.find(tab => tab.id === activeTab);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // Call external handler if provided
    if (onTabChange) {
      onTabChange(tabId);
    }
    
    // Update URL hash for navigation state
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({ tab: tabId }, '', `#${tabId}`);
    }
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.tab) {
        setActiveTab(event.state.tab);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize from URL hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash && tabs.find(tab => tab.id === hash)) {
        setActiveTab(hash);
      }
    }
  }, [tabs]);

  const visibleTabs = isMobile ? tabs.slice(0, 5) : tabs;
  const overflowTabs = isMobile && tabs.length > 5 ? tabs.slice(5) : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header with Dynamic Content */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-4">
          {/* Dynamic Page Title */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              {currentTab?.icon && (
                <div className={`w-10 h-10 bg-gradient-to-r ${currentTab.color || 'from-blue-500 to-blue-600'} rounded-lg flex items-center justify-center`}>
                  <currentTab.icon size={20} className="text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight truncate">
                  {currentTab?.title || 'MagX Portal'}
                </h1>
                <p className="text-sm text-gray-600 truncate">
                  {currentTab?.subtitle || 'Educational Management System'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          {(showSearch || showNotifications) && (
            <div className="flex items-center justify-between mb-4">
              {showSearch && (
                <div className="flex-1 max-w-md">
                  <Input
                    type="text"
                    placeholder={`Search ${currentTab?.label.toLowerCase() || 'content'}...`}
                    className="w-full"
                    leftIcon={Search}
                  />
                </div>
              )}
              
              {showNotifications && (
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Bell size={20} />
                  </Button>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Navigation - Top Position */}
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide">
              <div className="flex bg-gray-100 rounded-lg p-1 min-w-full">
                {visibleTabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex-1 min-w-0 px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-md ${
                        activeTab === tab.id
                          ? 'bg-white text-blue-600 shadow-sm ring-1 ring-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      aria-current={activeTab === tab.id ? 'page' : undefined}
                      aria-label={`Switch to ${tab.label}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <IconComponent size={18} />
                        <span className="truncate text-xs leading-tight">{tab.label}</span>
                      </div>
                    </button>
                  );
                })}
                
                {/* Overflow Menu for Mobile */}
                {overflowTabs.length > 0 && (
                  <button
                    className="flex-shrink-0 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200"
                    aria-label="More options"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Menu size={18} />
                      <span className="text-xs">More</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 pb-6">
          {/* Quick Stats Cards */}
          {showStats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className={`p-4 bg-gradient-to-r ${currentTab?.color || 'from-blue-500 to-blue-600'} text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-opacity-80 text-sm">Total</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    {currentTab?.icon && <currentTab.icon size={20} />}
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Active</p>
                    <p className="text-2xl font-bold">987</p>
                  </div>
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Users size={20} />
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Today</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Pending</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <DollarSign size={20} />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Dynamic Content Area */}
          <div className="space-y-4">
            {children ? (
              children
            ) : (
              <Card className="p-6">
                <div className="text-center py-12">
                  <div className={`w-16 h-16 bg-gradient-to-r ${currentTab?.color || 'from-gray-100 to-gray-200'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {currentTab?.icon && <currentTab.icon size={32} className="text-white" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {currentTab?.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {currentTab?.subtitle}
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
            aria-label="Quick action"
          >
            <span className="text-2xl font-light">+</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default EnhancedMobileLayout;
