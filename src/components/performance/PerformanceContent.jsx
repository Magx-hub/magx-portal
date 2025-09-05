import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import PerformanceDashboard from './PerformanceDashboard';
import StudentDetails from './StudentDetails';
import DataInput from './DataInput';

const PerformanceContent = ({
  currentView,
  selectedStudent,
  students,
  scores,
  behaviors,
  loading,
  error,
  onStudentSelect,
  onDataInputClick,
  getClassAnalytics,
  getStudentScores,
  getStudentBehaviors,
  getStudentAnalytics,
  addStudent,
  updateStudent,
  deleteStudent,
  addScore,
  updateScore,
  deleteScore,
  addBehavior,
  updateBehavior,
  deleteBehavior,
  clearAllData,
  onMigrateData
}) => {
  const renderContent = () => {
    if (loading && students.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading performance data...</p>
          </Card>
        </div>
      );
    }

    if (error) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 text-center border-red-200 bg-red-50">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </Card>
        </div>
      );
    }

    if (students.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 text-center">
            <h2 className="text-xl font-bold text-gray-700 mb-4">No Performance Data Found</h2>
            <p className="text-gray-600 mb-6">
              It looks like you don't have any student performance data yet.
              Would you like to migrate some sample data to get started?
            </p>
            <Button
              onClick={onMigrateData}
              variant="primary"
            >
              Migrate Sample Data
            </Button>
          </Card>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return (
          <PerformanceDashboard
            students={students}
            scores={scores}
            behaviors={behaviors}
            onStudentSelect={onStudentSelect}
            onDataInputClick={onDataInputClick}
            getClassAnalytics={getClassAnalytics}
          />
        );

      case 'student':
        return (
          <StudentDetails
            student={selectedStudent}
            scores={getStudentScores(selectedStudent?.id)}
            behaviors={getStudentBehaviors(selectedStudent?.id)}
            analytics={getStudentAnalytics(selectedStudent?.id)}
          />
        );

      case 'input':
        return (
          <DataInput
            students={students}
            onAddStudent={addStudent}
            onUpdateStudent={updateStudent}
            onDeleteStudent={deleteStudent}
            onAddScore={addScore}
            onUpdateScore={updateScore}
            onDeleteScore={deleteScore}
            onAddBehavior={addBehavior}
            onUpdateBehavior={updateBehavior}
            onDeleteBehavior={deleteBehavior}
            onClearAllData={clearAllData}
          />
        );

      default:
        return null;
    }
  };

  return renderContent();
};

export default PerformanceContent;