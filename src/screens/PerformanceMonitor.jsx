import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
// Note: The 'Performance.css' import has been removed as all styles are now handled by Tailwind CSS.

// Sample data remains the same
const initialStudents = [
  { 
    id: 1, 
    name: 'Emma Johnson', 
    class: 'Grade 5A', 
    attendance: 95,
    subjects: {
      math: { scores: [85, 92, 78, 88], assignments: [90, 85] },
      science: { scores: [92, 88, 95, 90], assignments: [94, 89] },
      english: { scores: [78, 85, 82, 88], assignments: [80, 85] }
    },
    behavior: {
      participation: 4,
      collaboration: 5,
      discipline: 4,
      criticalThinking: 3
    }
  },
  { 
    id: 2, 
    name: 'James Smith', 
    class: 'Grade 5A', 
    attendance: 88,
    subjects: {
      math: { scores: [72, 68, 75, 70], assignments: [65, 70] },
      science: { scores: [85, 82, 88, 84], assignments: [80, 82] },
      english: { scores: [90, 92, 88, 94], assignments: [91, 89] }
    },
    behavior: {
      participation: 3,
      collaboration: 4,
      discipline: 3,
      criticalThinking: 5
    }
  },
  { 
    id: 3, 
    name: 'Sophia Williams', 
    class: 'Grade 5B', 
    attendance: 92,
    subjects: {
      math: { scores: [95, 98, 92, 96], assignments: [97, 94] },
      science: { scores: [88, 92, 90, 94], assignments: [90, 92] },
      english: { scores: [85, 82, 88, 84], assignments: [86, 83] }
    },
    behavior: {
      participation: 5,
      collaboration: 4,
      discipline: 5,
      criticalThinking: 4
    }
  }
];

const subjectsList = ['math', 'science', 'english'];
const behaviorMetrics = ['participation', 'collaboration', 'discipline', 'criticalThinking'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function PerformanceMonitor() {
  const [students] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState(initialStudents[0]);
  const [view, setView] = useState('dashboard'); // dashboard, student, input
  const [activeTab, setActiveTab] = useState('academic'); // academic, behavioral

  // All calculation functions remain the same
  const calculateAverages = (student) => {
    const averages = {};
    for (const subject in student.subjects) {
      const allScores = [...student.subjects[subject].scores, ...student.subjects[subject].assignments];
      const sum = allScores.reduce((a, b) => a + b, 0);
      averages[subject] = Math.round(sum / allScores.length);
    }
    return averages;
  };

  const getAcademicData = (student) => {
    return subjectsList.map(subject => ({
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      score: calculateAverages(student)[subject],
      max: 100
    }));
  };

  const getBehaviorData = (student) => {
    return behaviorMetrics.map(metric => ({
      metric: metric.charAt(0).toUpperCase() + metric.slice(1).replace(/([A-Z])/g, ' $1').trim(),
      score: student.behavior[metric],
      max: 5
    }));
  };

  const getProgressData = (student) => {
    return student.subjects.math.scores.map((score, index) => ({
      name: `Test ${index + 1}`,
      math: score,
      science: student.subjects.science.scores[index],
      english: student.subjects.english.scores[index]
    }));
  };

  const getClassAverages = () => {
    const classAverages = {};
    subjectsList.forEach(subject => {
      const allScores = students.flatMap(student => [
        ...student.subjects[subject].scores,
        ...student.subjects[subject].assignments
      ]);
      const sum = allScores.reduce((a, b) => a + b, 0);
      classAverages[subject] = Math.round(sum / allScores.length);
    });
    return classAverages;
  };

  const classAverages = getClassAverages();

  const NavButton = ({ targetView, children }) => (
    <button
      className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
        view === targetView 
        ? 'bg-indigo-600 text-white shadow-md' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      onClick={() => setView(targetView)}
    >
      {children}
    </button>
  );

  const TabButton = ({ targetTab, children }) => (
    <button
      className={`py-2 px-4 font-medium transition-colors duration-200 ${
        activeTab === targetTab 
        ? 'border-b-2 border-indigo-600 text-indigo-600' 
        : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={() => setActiveTab(targetTab)}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-700">
            Student Performance Monitor 📈
          </h1>
          <nav className="flex space-x-2 mt-4 md:mt-0">
            <NavButton targetView="dashboard">Dashboard</NavButton>
            <NavButton targetView="student">Student Details</NavButton>
            <NavButton targetView="input">Input Data</NavButton>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {view === 'dashboard' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-700">Class Performance Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Class Average', value: `${Math.round(Object.values(classAverages).reduce((a, b) => a + b, 0) / subjectsList.length)}%` },
                { title: 'Top Performer', value: 'Sophia W.', subValue: '94%' },
                { title: 'Attendance Rate', value: `${Math.round(students.reduce((sum, student) => sum + student.attendance, 0) / students.length)}%` },
                { title: 'Needs Improvement', value: 'James S.', subValue: '78%' }
              ].map(stat => (
                <div key={stat.title} className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
                  <p className="text-3xl font-bold text-indigo-600 mt-2">{stat.value}</p>
                  {stat.subValue && <p className="text-xl font-semibold text-gray-500">{stat.subValue}</p>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Subject Averages</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectsList.map(subject => ({ subject: subject.charAt(0).toUpperCase() + subject.slice(1), average: classAverages[subject] }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="average" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Student Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                   <BarChart data={students.map(student => ({ name: student.name.split(' ')[0], average: Math.round(Object.values(calculateAverages(student)).reduce((a, b) => a + b, 0) / subjectsList.length) }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="average" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {view === 'student' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-700">Student Details</h2>
              <select 
                className="mt-2 md:mt-0 w-full md:w-auto p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedStudent.id} 
                onChange={(e) => setSelectedStudent(students.find(s => s.id === parseInt(e.target.value)))}
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>{student.name} - {student.class}</option>
                ))}
              </select>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
              <p className="text-gray-600">Class: {selectedStudent.class}</p>
              <p className="text-gray-600">Attendance: {selectedStudent.attendance}%</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                  <TabButton targetTab="academic">Academic Performance</TabButton>
                  <TabButton targetTab="behavioral">Behavioral Metrics</TabButton>
                </nav>
              </div>

              <div className="mt-6">
                {activeTab === 'academic' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4 text-center">Subject Scores</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getAcademicData(selectedStudent)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="subject" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="score" fill="#4f46e5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                     <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4 text-center">Progress Over Time</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={getProgressData(selectedStudent)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="math" stroke="#8884d8" />
                          <Line type="monotone" dataKey="science" stroke="#82ca9d" />
                          <Line type="monotone" dataKey="english" stroke="#ffc658" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
                {activeTab === 'behavioral' && (
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4 text-center">Behavioral Assessment</h3>
                       <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={getBehaviorData(selectedStudent)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="score"
                              label={({ metric, score }) => `${metric.split(' ')[0]}: ${score}`}
                            >
                              {getBehaviorData(selectedStudent).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-xl font-semibold mb-4">Detailed Ratings (1-5 scale)</h4>
                      <ul className="space-y-3 text-gray-700">
                        {behaviorMetrics.map(metric => (
                          <li key={metric} className="flex justify-between items-center">
                            <span className="font-medium">{metric.charAt(0).toUpperCase() + metric.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="font-bold text-lg text-indigo-600 bg-indigo-100 rounded-full px-3 py-1">{selectedStudent.behavior[metric]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'input' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Input Student Data</h2>
            <form className="space-y-6">
              {[
                { label: 'Student', type: 'select', options: students.map(s => ({ value: s.id, name: s.name })) },
                { label: 'Subject', type: 'select', options: subjectsList.map(s => ({ value: s, name: s.charAt(0).toUpperCase() + s.slice(1) })) },
                { label: 'Assessment Type', type: 'select', options: ['Quiz', 'Test', 'Assignment', 'Project'].map(o => ({ value: o.toLowerCase(), name: o })) },
                { label: 'Score', type: 'number' },
                { label: 'Behavioral Notes', type: 'textarea', placeholder: 'Observations about participation, collaboration, etc.' },
                { label: 'Feedback/Comments', type: 'textarea', placeholder: 'Strengths, areas for improvement, etc.' },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  {field.type === 'select' ? (
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea placeholder={field.placeholder} rows="3" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                  ) : (
                    <input type="number" min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  )}
                </div>
              ))}
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md font-bold hover:bg-indigo-700 transition-colors duration-200 shadow-md">
                Save Data
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default PerformanceMonitor;