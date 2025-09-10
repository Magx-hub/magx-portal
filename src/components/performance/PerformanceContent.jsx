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
            <p className="text-gray-600 mb-2">Loading performance data...</p>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </Card>
        </div>
      );
    }

    if (error) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 text-center border-red-200 bg-red-50">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Error Loading Performance Data</h3>
              <p className="text-red-600 mb-4">{error}</p>
            </div>
            <div className="flex justify-center space-x-3">
              <Button onClick={() => window.location.reload()} variant="outline">
                Retry
              </Button>
              <Button onClick={onMigrateData} variant="primary">
                Load Sample Data
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    if (students.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">No Performance Data Found</h2>
            <p className="text-gray-600 mb-6">
              It looks like you don't have any student performance data yet.
              Get started by adding students and their academic scores, or load sample data to explore the features.
            </p>
            <div className="flex justify-center space-x-3">
              <Button
                onClick={onDataInputClick}
                variant="primary"
              >
                Add Students
              </Button>
              <Button
                onClick={onMigrateData}
                variant="outline"
              >
                Load Sample Data
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        const classAnalytics = getClassAnalytics();
        return (
          <PerformanceDashboard
            analytics={classAnalytics}
            classAverages={classAnalytics?.subjectAverages || {}}
            studentComparison={students.map(student => ({
              name: student.name.split(' ')[0], // First name only for chart
              average: getStudentAnalytics(student.id)?.overallAverage || 0,
              fullStudent: student // Include full student object for selection
            }))}
            onMigrateData={onMigrateData}
            onStudentSelect={onStudentSelect}
            onDataInputClick={onDataInputClick}
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