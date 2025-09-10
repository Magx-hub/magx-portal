import React, { useState } from 'react';
import { usePerformance } from '../../hooks/usePerformance';
import { MobileModuleLayout } from '../MobileModuleLayout';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, TrendingUp, Award, BookOpen, Plus, BarChart3 } from 'lucide-react';

const subjectsList = ['math', 'science', 'english'];
const behaviorMetrics = ['participation', 'collaboration', 'discipline', 'criticalThinking'];

const EnhancedPerformanceScreen = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('student'); // student, score, behavior
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

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

  // Form states
  const [studentForm, setStudentForm] = useState({
    name: '',
    class: '',
    attendance: ''
  });

  const [scoreForm, setScoreForm] = useState({
    studentId: '',
    subject: 'math',
    score: '',
    type: 'test',
    assessmentName: ''
  });

  const [behaviorForm, setBehaviorForm] = useState({
    studentId: '',
    participation: 3,
    collaboration: 3,
    discipline: 3,
    criticalThinking: 3,
    notes: ''
  });

  const classAnalytics = getClassAnalytics();
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: BarChart3,
      color: 'blue'
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      color: 'green'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const quickStats = [
    {
      title: 'Total Students',
      value: students.length,
      icon: Users,
      color: 'blue',
      change: '+2 this week'
    },
    {
      title: 'Class Average',
      value: classAnalytics ? `${Math.round(classAnalytics.overallAverage)}%` : '0%',
      icon: Award,
      color: 'green',
      change: classAnalytics?.overallAverage > 75 ? 'Above target' : 'Below target'
    },
    {
      title: 'Top Performer',
      value: classAnalytics?.topPerformer?.name?.split(' ')[0] || 'N/A',
      icon: TrendingUp,
      color: 'purple',
      change: classAnalytics ? `${Math.round(classAnalytics.topPerformer?.average || 0)}%` : '0%'
    },
    {
      title: 'Attendance',
      value: classAnalytics ? `${Math.round(classAnalytics.attendanceAverage)}%` : '0%',
      icon: BookOpen,
      color: 'orange',
      change: 'This month'
    }
  ];

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      if (addType === 'student') {
        await addStudent({
          name: studentForm.name,
          class: studentForm.class,
          attendance: studentForm.attendance ? parseInt(studentForm.attendance) : undefined
        });
        setStudentForm({ name: '', class: '', attendance: '' });
      } else if (addType === 'score') {
        await addScore({
          studentId: scoreForm.studentId,
          subject: scoreForm.subject,
          score: parseInt(scoreForm.score),
          type: scoreForm.type,
          assessmentName: scoreForm.assessmentName || `${scoreForm.type} Assessment`
        });
        setScoreForm({
          studentId: '',
          subject: 'math',
          score: '',
          type: 'test',
          assessmentName: ''
        });
      } else if (addType === 'behavior') {
        await addBehavior({
          studentId: behaviorForm.studentId,
          participation: parseInt(behaviorForm.participation),
          collaboration: parseInt(behaviorForm.collaboration),
          discipline: parseInt(behaviorForm.discipline),
          criticalThinking: parseInt(behaviorForm.criticalThinking),
          notes: behaviorForm.notes
        });
        setBehaviorForm({
          studentId: '',
          participation: 3,
          collaboration: 3,
          discipline: 3,
          criticalThinking: 3,
          notes: ''
        });
      }
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add data:', error);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Subject Averages Chart */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Subject Performance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={subjectsList.map(subject => ({ 
            subject: subject.charAt(0).toUpperCase() + subject.slice(1), 
            average: classAnalytics?.subjectAverages?.[subject] || 0 
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="average" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {students.slice(0, 3).map(student => (
            <div key={student.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-gray-500">{student.class}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {Math.round(getStudentAnalytics(student.id)?.overallAverage || 0)}%
                </p>
                <p className="text-xs text-gray-500">Average</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => {
            setAddType('student');
            setShowAddModal(true);
          }}
          variant="outline"
          className="h-16 flex flex-col items-center justify-center"
        >
          <Users className="h-5 w-5 mb-1" />
          <span className="text-sm">Add Student</span>
        </Button>
        <Button
          onClick={() => {
            setAddType('score');
            setShowAddModal(true);
          }}
          variant="outline"
          className="h-16 flex flex-col items-center justify-center"
        >
          <Award className="h-5 w-5 mb-1" />
          <span className="text-sm">Add Score</span>
        </Button>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-4">
      {/* Search */}
      <Input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />

      {/* Students List */}
      <div className="space-y-3">
        {filteredStudents.map(student => {
          const analytics = getStudentAnalytics(student.id);
          return (
            <Card
              key={student.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setSelectedStudent(student);
                setActiveTab('analytics');
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{student.name}</h4>
                  <p className="text-sm text-gray-500">{student.class}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    {Math.round(analytics?.overallAverage || 0)}%
                  </p>
                  <p className="text-xs text-gray-500">Average</p>
                </div>
              </div>
              
              {/* Subject breakdown */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {subjectsList.map(subject => (
                  <div key={subject} className="text-center">
                    <p className="text-xs text-gray-500 capitalize">{subject}</p>
                    <p className="text-sm font-medium">
                      {Math.round(analytics?.subjectAverages?.[subject] || 0)}%
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderAnalytics = () => {
    if (selectedStudent) {
      const studentAnalytics = getStudentAnalytics(selectedStudent.id);
      const studentScores = getStudentScores(selectedStudent.id);
      const studentBehaviors = getStudentBehaviors(selectedStudent.id);

      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
              <p className="text-sm text-gray-500">{selectedStudent.class}</p>
            </div>
            <Button
              onClick={() => setSelectedStudent(null)}
              variant="outline"
              size="sm"
            >
              Back to Overview
            </Button>
          </div>

          {/* Student Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(studentAnalytics?.overallAverage || 0)}%
              </p>
              <p className="text-sm text-gray-500">Overall Average</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {studentScores.length}
              </p>
              <p className="text-sm text-gray-500">Total Assessments</p>
            </Card>
          </div>

          {/* Performance Trend */}
          <Card className="p-4">
            <h4 className="font-semibold mb-4">Performance Trend</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={studentScores.slice(-10).map((score, index) => ({
                assessment: `${index + 1}`,
                score: score.score
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="assessment" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Scores */}
          <Card className="p-4">
            <h4 className="font-semibold mb-4">Recent Scores</h4>
            <div className="space-y-2">
              {studentScores.slice(-5).map(score => (
                <div key={score.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium capitalize">{score.subject}</p>
                    <p className="text-sm text-gray-500">{score.assessmentName}</p>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{score.score}%</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      );
    }

    // Class analytics view
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Class Analytics</h3>
        
        {/* Student Comparison Chart */}
        <Card className="p-4">
          <h4 className="font-semibold mb-4">Student Comparison</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={students.map(student => ({
              name: student.name.split(' ')[0],
              average: getStudentAnalytics(student.id)?.overallAverage || 0
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance Distribution */}
        <Card className="p-4">
          <h4 className="font-semibold mb-4">Grade Distribution</h4>
          <div className="space-y-3">
            {['A (90-100%)', 'B (80-89%)', 'C (70-79%)', 'D (60-69%)', 'F (0-59%)'].map((grade, index) => {
              const ranges = [[90, 100], [80, 89], [70, 79], [60, 69], [0, 59]];
              const [min, max] = ranges[index];
              const count = students.filter(student => {
                const avg = getStudentAnalytics(student.id)?.overallAverage || 0;
                return avg >= min && avg <= max;
              }).length;
              const percentage = students.length > 0 ? (count / students.length) * 100 : 0;

              return (
                <div key={grade} className="flex items-center justify-between">
                  <span className="text-sm">{grade}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  };

  const renderAddModal = () => (
    <Modal
      isOpen={showAddModal}
      onClose={() => setShowAddModal(false)}
      title={`Add ${addType.charAt(0).toUpperCase() + addType.slice(1)}`}
    >
      <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
        {addType === 'student' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <Input
                type="text"
                value={studentForm.name}
                onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                placeholder="Enter student name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <Input
                type="text"
                value={studentForm.class}
                onChange={(e) => setStudentForm({...studentForm, class: e.target.value})}
                placeholder="e.g., Basic 5, JHS 1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Rate (Optional)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={studentForm.attendance}
                onChange={(e) => setStudentForm({...studentForm, attendance: e.target.value})}
                placeholder="e.g., 95"
              />
            </div>
          </>
        )}

        {addType === 'score' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
              <select 
                value={scoreForm.studentId}
                onChange={(e) => setScoreForm({...scoreForm, studentId: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select a student</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>{student.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select 
                value={scoreForm.subject}
                onChange={(e) => setScoreForm({...scoreForm, subject: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                {subjectsList.map(subject => (
                  <option key={subject} value={subject}>
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Score (0-100)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={scoreForm.score}
                onChange={(e) => setScoreForm({...scoreForm, score: e.target.value})}
                required
              />
            </div>
          </>
        )}

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            onClick={() => setShowAddModal(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add {addType.charAt(0).toUpperCase() + addType.slice(1)}
          </Button>
        </div>
      </form>
    </Modal>
  );

  const renderContent = () => {
    if (loading && students.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading performance data...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-red-600 mb-4">{error}</p>
          </div>
          <div className="flex justify-center space-x-3">
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
            <Button onClick={migrateData} variant="primary">
              Load Sample Data
            </Button>
          </div>
        </div>
      );
    }

    if (students.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <BarChart3 className="w-16 h-16 mx-auto mb-3" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">No Performance Data</h3>
          <p className="text-gray-600 mb-6">
            Get started by adding students and their academic scores.
          </p>
          <div className="flex justify-center space-x-3">
            <Button
              onClick={() => {
                setAddType('student');
                setShowAddModal(true);
              }}
              variant="primary"
            >
              Add Students
            </Button>
            <Button onClick={migrateData} variant="outline">
              Load Sample Data
            </Button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'students':
        return renderStudents();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderDashboard();
    }
  };

  return (
    <>
      <MobileModuleLayout
        title="Performance Monitor"
        subtitle="Track student academic progress"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        quickStats={quickStats}
        searchPlaceholder="Search students..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddNew={() => {
          setAddType('student');
          setShowAddModal(true);
        }}
        onExport={() => {
          // Export functionality
          console.log('Export performance data');
        }}
        showViewToggle={activeTab === 'students'}
        showAddButton={true}
        showExportButton={students.length > 0}
      >
        {renderContent()}
      </MobileModuleLayout>
      
      {renderAddModal()}
    </>
  );
};

export default EnhancedPerformanceScreen;
