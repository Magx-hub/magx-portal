
import React from 'react';

const TeacherSummaryRow = ({ summary }) => {
  const attendancePercentage = summary.totalDays > 0 ? ((summary.presentDays / summary.totalDays) * 100).toFixed(1) : '0.0';
  const avgHours = summary.totalDays > 0 ? (summary.totalWorkHours / summary.presentDays).toFixed(1) : '0.0';

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{summary.fullname}</h3>
          <p className="text-sm text-gray-600">{summary.department}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium`}>
          {attendancePercentage}%
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Present</p>
          <p className="font-medium text-gray-900">{summary.presentDays}</p>
        </div>
        <div>
          <p className="text-gray-500">Absent</p>
          <p className="font-medium text-gray-900">{summary.absentCount}</p>
        </div>
        <div>
          <p className="text-gray-500">Late</p>
          <p className="font-medium text-gray-900">{summary.lateCount}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherSummaryRow;
