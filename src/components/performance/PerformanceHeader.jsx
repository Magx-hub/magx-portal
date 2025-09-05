import React from 'react';
import { ArrowLeft, Upload, Download, BarChart3, Users } from 'lucide-react';
import { Button } from '../ui/Button';

const PerformanceHeader = ({
  currentView,
  selectedStudent,
  students,
  onBackToDashboard,
  onDataInputView,
  onMigrateData
}) => {
  const renderHeader = () => (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {currentView !== 'dashboard' && (
              <Button
                onClick={onBackToDashboard}
                variant="ghost"
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentView === 'dashboard' && 'Performance Dashboard'}
                  {currentView === 'student' && `${selectedStudent?.name} - Performance Details`}
                  {currentView === 'input' && 'Data Input'}
                </h1>
                <p className="text-sm text-gray-500">
                  {currentView === 'dashboard' && 'Monitor and analyze student performance'}
                  {currentView === 'student' && 'Academic scores and behavioral assessments'}
                  {currentView === 'input' && 'Add scores and behavioral data'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {currentView === 'dashboard' && (
              <>
                <Button
                  onClick={onDataInputView}
                  variant="outline"
                  className="hidden sm:flex"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Add Data
                </Button>
                <Button
                  onClick={onMigrateData}
                  variant="outline"
                  className="hidden sm:flex"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Sample Data
                </Button>
              </>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {students.length} Students
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return renderHeader();
};

export default PerformanceHeader;