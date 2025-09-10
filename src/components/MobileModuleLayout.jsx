import React, { useState } from 'react';
import { Plus, Filter, Download, Grid, List } from 'lucide-react';
import MobileFirstLayout from './MobileFirstLayout';
import { Button, Card } from './ui';

const MobileModuleLayout = ({
  title,
  subtitle,
  children,
  tabs = [],
  activeTab,
  onTabChange,
  showAddButton = false,
  onAddClick,
  showExportButton = false,
  onExportClick,
  showViewToggle = false,
  viewMode = 'list',
  onViewModeChange,
  searchPlaceholder = "Search...",
  onSearch,
  className = ""
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // Action buttons for the header
  const actions = [
    ...(showViewToggle ? [{
      icon: viewMode === 'list' ? <Grid size={20} /> : <List size={20} />,
      onClick: () => onViewModeChange && onViewModeChange(viewMode === 'list' ? 'grid' : 'list'),
      label: `Switch to ${viewMode === 'list' ? 'grid' : 'list'} view`,
      variant: 'secondary'
    }] : []),
    ...(showExportButton ? [{
      icon: <Download size={20} />,
      onClick: onExportClick,
      label: 'Export data',
      variant: 'secondary'
    }] : []),
    {
      icon: <Filter size={20} />,
      onClick: () => setShowFilters(!showFilters),
      label: 'Toggle filters',
      variant: 'secondary'
    },
    ...(showAddButton ? [{
      icon: <Plus size={20} />,
      onClick: onAddClick,
      label: 'Add new item',
      variant: 'primary'
    }] : [])
  ];

  return (
    <MobileFirstLayout
      title={title}
      subtitle={subtitle}
      showSearch={true}
      searchPlaceholder={searchPlaceholder}
      onSearch={onSearch}
      actions={actions}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      className={className}
    >
      {/* Quick Stats Cards - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Card className="p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1">
            150+
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Total Items</div>
        </Card>
        <Card className="p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1">
            25
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Active</div>
        </Card>
        <Card className="p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">
            98%
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
        </Card>
        <Card className="p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-2xl font-bold text-orange-600 mb-1">
            12
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Categories</div>
        </Card>
      </div>

      {/* Filters Panel - Collapsible on Mobile */}
      {showFilters && (
        <Card className="p-4 mb-6 bg-gray-50 border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Categories</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Main Content */}
      <div className="space-y-4">
        {children}
      </div>
    </MobileFirstLayout>
  );
};

export default MobileModuleLayout;
