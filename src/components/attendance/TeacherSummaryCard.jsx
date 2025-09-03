
import React from 'react';

const TeacherSummaryCard = ({ summary }) => {
  const attendancePercentage = summary.totalDays > 0 ? ((summary.presentDays / summary.totalDays) * 100).toFixed(1) : '0.0';
  const avgHours = summary.totalDays > 0 ? (summary.totalWorkHours / summary.presentDays).toFixed(1) : '0.0';

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Teacher Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
          <div className="text-2xl font-bold text-blue-600">{attendancePercentage}%</div>
          <div className="text-sm text-blue-600 font-medium">Attendance</div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
          <div className="text-2xl font-bold text-green-600">{avgHours}h</div>
          <div className="text-sm text-green-600 font-medium">Avg. Hours</div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl text-center border border-red-100">
          <div className="text-2xl font-bold text-red-600">{summary.absentCount}</div>
          <div className="text-sm text-red-600 font-medium">Absent</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100">
          <div className="text-2xl font-bold text-yellow-600">{summary.lateCount}</div>
          <div className="text-sm text-yellow-600 font-medium">Late</div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSummaryCard;
