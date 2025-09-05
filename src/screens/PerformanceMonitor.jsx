import React, { useState } from 'react';
import { usePerformance } from '../hooks/usePerformance';
import PerformanceHeader from '../components/performance/PerformanceHeader';
import PerformanceContent from '../components/performance/PerformanceContent';
import MigrationModal from '../components/performance/MigrationModal';

const PerformanceMonitor = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showMigrationModal, setShowMigrationModal] = useState(false);

  const {
    students,
    scores,
    behaviors,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    addScore,
    updateScore,
    deleteScore,
    addBehavior,
    updateBehavior,
    deleteBehavior,
    migrateData,
    clearAllData,
    getStudentScores,
    getStudentBehaviors,
    getClassAnalytics,
    getStudentAnalytics
  } = usePerformance();

  const handleMigrateData = async () => {
    await migrateData();
    setShowMigrationModal(false);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setCurrentView('student');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedStudent(null);
  };

  const handleDataInputView = () => {
    setCurrentView('input');
  };

  const handleMigrateDataClick = () => {
    setShowMigrationModal(true);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <PerformanceHeader
        currentView={currentView}
        selectedStudent={selectedStudent}
        students={students}
        onBackToDashboard={handleBackToDashboard}
        onDataInputView={handleDataInputView}
        onMigrateData={handleMigrateDataClick}
      />
      <PerformanceContent
        currentView={currentView}
        selectedStudent={selectedStudent}
        students={students}
        scores={scores}
        behaviors={behaviors}
        loading={loading}
        error={error}
        onStudentSelect={handleStudentSelect}
        onDataInputClick={handleDataInputView}
        getClassAnalytics={getClassAnalytics}
        getStudentScores={getStudentScores}
        getStudentBehaviors={getStudentBehaviors}
        getStudentAnalytics={getStudentAnalytics}
        addStudent={addStudent}
        updateStudent={updateStudent}
        deleteStudent={deleteStudent}
        addScore={addScore}
        updateScore={updateScore}
        deleteScore={deleteScore}
        addBehavior={addBehavior}
        updateBehavior={updateBehavior}
        deleteBehavior={deleteBehavior}
        clearAllData={clearAllData}
        onMigrateData={handleMigrateDataClick}
      />

      <MigrationModal
        isOpen={showMigrationModal}
        onClose={() => setShowMigrationModal(false)}
        onMigrate={handleMigrateData}
        loading={loading}
      />
    </div>
  );
};

export default PerformanceMonitor;