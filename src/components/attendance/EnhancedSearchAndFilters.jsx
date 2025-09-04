import React, { useState } from 'react';
import { Search, Calendar, Filter, X, Download } from 'lucide-react';
import { Button, Input, Card } from '../ui';

const EnhancedSearchAndFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedDate, 
  setSelectedDate, 
  onExport,
  totalRecords = 0,
  filteredCount = 0
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDate('');
    setDateRange({ start: '', end: '' });
    setStatusFilter('all');
    setDepartmentFilter('all');
    setShowAdvancedFilters(false);
  };

  const hasActiveFilters = searchTerm || selectedDate || dateRange.start || dateRange.end || 
                          statusFilter !== 'all' || departmentFilter !== 'all';

  return (
    <Card className="p-4 sm:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Search & Filters</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredCount} of {totalRecords} records shown
          </p>
        </div>
        
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Advanced</span>
          </Button>
          
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex items-center gap-2"
              disabled={filteredCount === 0}
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </Button>
          )}
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Search Input */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by teacher name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            aria-label="Search teachers"
          />
        </div>

        {/* Date Picker */}
        <div className="relative">
          <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="pl-10"
            aria-label="Select date"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex items-center gap-2 justify-center"
          >
            <X size={16} />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Advanced Filters</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                End Date
              </label>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="text-sm"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="half-day">Half Day</option>
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                <option value="mathematics">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="history">History</option>
                <option value="physical-education">Physical Education</option>
                <option value="arts">Arts</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          <span className="text-xs font-medium text-gray-500">Active filters:</span>
          
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Search: {searchTerm}
              <button onClick={() => setSearchTerm('')} className="hover:bg-blue-200 rounded-full p-0.5">
                <X size={12} />
              </button>
            </span>
          )}
          
          {selectedDate && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Date: {selectedDate}
              <button onClick={() => setSelectedDate('')} className="hover:bg-green-200 rounded-full p-0.5">
                <X size={12} />
              </button>
            </span>
          )}
          
          {statusFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Status: {statusFilter}
              <button onClick={() => setStatusFilter('all')} className="hover:bg-purple-200 rounded-full p-0.5">
                <X size={12} />
              </button>
            </span>
          )}
          
          {departmentFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
              Dept: {departmentFilter}
              <button onClick={() => setDepartmentFilter('all')} className="hover:bg-orange-200 rounded-full p-0.5">
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </Card>
  );
};

export default EnhancedSearchAndFilters;
