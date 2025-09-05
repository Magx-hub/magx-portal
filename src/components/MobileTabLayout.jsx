import { useState } from 'react';
import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import { Users, GraduationCap, Clock, DollarSign, Coffee, Menu, Bell, Search } from 'lucide-react';
import { Card } from './ui';

const MobileTabLayout = ({ children, defaultTab = 'dashboard' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Menu,
      title: 'MagX Portal Dashboard',
      subtitle: "Welcome back! Here's your overview"
    },
    {
      id: 'teachers',
      label: 'Teachers',
      icon: GraduationCap,
      title: 'Teacher Management',
      subtitle: 'Manage faculty and staff members'
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      title: 'Student Management',
      subtitle: 'Manage student records and enrollment'
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Clock,
      title: 'Attendance System',
      subtitle: 'Track and manage daily attendance'
    },
    {
      id: 'allowance',
      label: 'Allowance',
      icon: DollarSign,
      title: 'Allowance Management',
      subtitle: 'Process student allowances and payments'
    },
    {
      id: 'canteen',
      label: 'Canteen',
      icon: Coffee,
      title: 'Canteen System',
      subtitle: 'Manage meals and canteen operations'
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Trigger any additional navigation logic here
    if (window.history && window.history.pushState) {
      window.history.pushState({ tab: tabId }, '', `#${tabId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dynamic Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-4">
          {/* Page Title Section */}
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {currentTab?.title || 'MagX Portal'}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {currentTab?.subtitle || 'Educational Management System'}
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${currentTab?.label.toLowerCase()}...`}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 sm:w-64"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation - Top Position */}
          <div className="flex overflow-x-auto scrollbar-hide">
            <div className="flex bg-gray-100 rounded-lg p-1 min-w-full">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex-1 min-w-0 px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-md ${activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm ring-1 ring-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <IconComponent size={18} />
                      <span className="truncate text-xs leading-tight">{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 pb-6">
          {/* Tab Content */}
          <div className="space-y-4">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    {currentTab && <currentTab.icon size={20} />}
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

            {/* Dynamic Content Area */}
            <Card className="p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {currentTab && <currentTab.icon size={32} className="text-gray-400" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentTab?.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {currentTab?.subtitle}
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </Card>

            {/* Additional Content Placeholder */}
            {children && (
              <div className="space-y-4">
                {children}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Optional: Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center">
          <span className="text-2xl font-light">+</span>
        </button>
      </div>
    </div>
  );
};

MobileTabLayout.propTypes = {
  children: PropTypes.node,
  defaultTab: PropTypes.string,
};

export default MobileTabLayout;
