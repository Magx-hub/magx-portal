import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

const subjectsList = ['math', 'science', 'english'];
const behaviorMetrics = ['participation', 'collaboration', 'discipline', 'criticalThinking'];

const DataInput = ({
  students,
  onAddStudent,
  onAddScore,
  onAddBehavior
}) => {
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showBehaviorModal, setShowBehaviorModal] = useState(false);

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

  // Handle student submission
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddStudent({
        name: studentForm.name,
        class: studentForm.class,
        attendance: studentForm.attendance ? parseInt(studentForm.attendance) : undefined
      });
      setShowStudentModal(false);
      setStudentForm({
        name: '',
        class: '',
        attendance: ''
      });
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  // Handle score submission
  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddScore({
        studentId: scoreForm.studentId,
        subject: scoreForm.subject,
        score: parseInt(scoreForm.score),
        type: scoreForm.type,
        assessmentName: scoreForm.assessmentName || `${scoreForm.type} Assessment`
      });
      setShowScoreModal(false);
      setScoreForm({
        studentId: '',
        subject: 'math',
        score: '',
        type: 'test',
        assessmentName: ''
      });
    } catch (error) {
      console.error('Failed to add score:', error);
    }
  };

  // Handle behavior submission
  const handleBehaviorSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddBehavior({
        studentId: behaviorForm.studentId,
        participation: parseInt(behaviorForm.participation),
        collaboration: parseInt(behaviorForm.collaboration),
        discipline: parseInt(behaviorForm.discipline),
        criticalThinking: parseInt(behaviorForm.criticalThinking),
        notes: behaviorForm.notes
      });
      setShowBehaviorModal(false);
      setBehaviorForm({
        studentId: '',
        participation: 3,
        collaboration: 3,
        discipline: 3,
        criticalThinking: 3,
        notes: ''
      });
    } catch (error) {
      console.error('Failed to add behavior assessment:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Input Student Data</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button
            onClick={() => setShowStudentModal(true)}
            variant="primary"
            className="w-full"
          >
            Add Student
          </Button>
          <Button
            onClick={() => setShowScoreModal(true)}
            variant="outline"
            className="w-full"
          >
            Add Academic Score
          </Button>
          <Button
            onClick={() => setShowBehaviorModal(true)}
            variant="secondary"
            className="w-full"
          >
            Add Behavior Assessment
          </Button>
        </div>

        <div className="text-center text-gray-600">
          <p>Use the buttons above to add students, academic scores, or behavioral assessments.</p>
        </div>
      </div>

      {/* Student Modal */}
      <Modal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        title="Add Student"
      >
        <form onSubmit={handleStudentSubmit} className="p-6 space-y-4">
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

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              onClick={() => setShowStudentModal(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Student
            </Button>
          </div>
        </form>
      </Modal>

      {/* Score Modal */}
      <Modal
        isOpen={showScoreModal}
        onClose={() => setShowScoreModal(false)}
        title="Add Academic Score"
      >
        <form onSubmit={handleScoreSubmit} className="p-6 space-y-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Type</label>
            <select 
              value={scoreForm.type}
              onChange={(e) => setScoreForm({...scoreForm, type: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="test">Test</option>
              <option value="assignment">Assignment</option>
              <option value="quiz">Quiz</option>
              <option value="project">Project</option>
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Name (Optional)</label>
            <Input
              type="text"
              value={scoreForm.assessmentName}
              onChange={(e) => setScoreForm({...scoreForm, assessmentName: e.target.value})}
              placeholder="e.g., Midterm Exam, Chapter 5 Quiz"
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button"
              onClick={() => setShowScoreModal(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Score
            </Button>
          </div>
        </form>
      </Modal>

      {/* Behavior Modal */}
      <Modal 
        isOpen={showBehaviorModal} 
        onClose={() => setShowBehaviorModal(false)}
        title="Add Behavior Assessment"
      >
        <form onSubmit={handleBehaviorSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
            <select 
              value={behaviorForm.studentId}
              onChange={(e) => setBehaviorForm({...behaviorForm, studentId: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a student</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
          </div>
          
          {behaviorMetrics.map(metric => (
            <div key={metric}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {metric.charAt(0).toUpperCase() + metric.slice(1).replace(/([A-Z])/g, ' $1').trim()} (1-5)
              </label>
              <select 
                value={behaviorForm[metric]}
                onChange={(e) => setBehaviorForm({...behaviorForm, [metric]: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                {[1, 2, 3, 4, 5].map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          ))}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              value={behaviorForm.notes}
              onChange={(e) => setBehaviorForm({...behaviorForm, notes: e.target.value})}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Additional observations or comments..."
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button"
              onClick={() => setShowBehaviorModal(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Assessment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DataInput;
