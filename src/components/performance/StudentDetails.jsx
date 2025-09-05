import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const StudentDetails = ({ 
  students, 
  selectedStudent, 
  onStudentSelect, 
  getAcademicData, 
  getBehaviorData, 
  getProgressData 
}) => {
  const [activeTab, setActiveTab] = useState('academic');

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

  if (!selectedStudent) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No student selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700">Student Details</h2>
        <select 
          className="mt-2 md:mt-0 w-full md:w-auto p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedStudent.id} 
          onChange={(e) => onStudentSelect(students.find(s => s.id === e.target.value))}
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
                  {getBehaviorData(selectedStudent).map(item => (
                    <li key={item.metric} className="flex justify-between items-center">
                      <span className="font-medium">{item.metric}:</span>
                      <span className="font-bold text-lg text-indigo-600 bg-indigo-100 rounded-full px-3 py-1">
                        {item.score}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
