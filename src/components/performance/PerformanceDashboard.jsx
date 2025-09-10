import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/Button';

const subjectsList = ['math', 'science', 'english'];

const PerformanceDashboard = ({ 
  analytics, 
  classAverages, 
  studentComparison, 
  onMigrateData,
  onStudentSelect,
  onDataInputClick
}) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-700">Class Performance Overview</h2>
        <div className="flex space-x-3">
          <Button 
            onClick={onDataInputClick}
            variant="primary"
            size="sm"
          >
            Add Data
          </Button>
          <Button 
            onClick={onMigrateData}
            variant="outline"
            size="sm"
          >
            Sample Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Class Average', 
            value: analytics ? `${analytics.overallAverage}%` : '0%'
          },
          { 
            title: 'Top Performer', 
            value: analytics?.topPerformer?.name?.split(' ')[0] || 'N/A', 
            subValue: analytics ? `${Math.round(analytics.topPerformer.average)}%` : '0%'
          },
          { 
            title: 'Attendance Rate', 
            value: analytics ? `${analytics.attendanceAverage}%` : '0%'
          },
          { 
            title: 'Total Students', 
            value: analytics?.totalStudents || 0
          }
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
            <BarChart data={subjectsList.map(subject => ({ 
              subject: subject.charAt(0).toUpperCase() + subject.slice(1), 
              average: classAverages[subject] || 0 
            }))}>
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
            <BarChart data={studentComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow-lg">
                        <p className="font-semibold">{label}</p>
                        <p className="text-blue-600">
                          Average: {payload[0].value}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Click to view details
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="average" 
                fill="#10b981"
                onClick={(data) => {
                  if (data && onStudentSelect) {
                    // Find the full student object by name
                    const studentData = studentComparison.find(s => s.name === data.name);
                    if (studentData && studentData.fullStudent) {
                      onStudentSelect(studentData.fullStudent);
                    }
                  }
                }}
                style={{ cursor: 'pointer' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
