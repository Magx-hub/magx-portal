import React from 'react';

const ReportsTab = ({ dateFilter, setDateFilter, dailySummary, departmentSummary, unpaidStudents }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Reports</h2>
    <div className="mb-4 bg-white p-4 rounded-lg shadow">
      <label className="block mb-2 font-medium">Filter by Date:</label>
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="p-2 border rounded focus:ring-2 focus:ring-purple-500 w-full md:w-auto"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <h3 className="font-bold mb-3 text-lg">Daily Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Revenue:</span>
            <span className="font-semibold text-green-600">GH₵{dailySummary?.totalAmount || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Unique Students:</span>
            <span className="font-semibold">{dailySummary?.uniqueStudents || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Students:</span>
            <span className="font-semibold">{dailySummary?.totalStudents || 0}</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <h3 className="font-bold mb-3 text-lg">Department Summary</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {departmentSummary.length > 0 ? (
            departmentSummary.map((dept) => (
              <div key={dept.department} className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600 truncate mr-2">{dept.department}</span>
                <span className="font-semibold text-sm">GH₵{dept.totalAmount}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No data available</p>
          )}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <h3 className="font-bold mb-3 text-lg">Unpaid Students</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {unpaidStudents.length > 0 ? (
            unpaidStudents.slice(0, 10).map((student) => (
              <div key={student.id} className="text-sm text-gray-600 py-1">
                {student.fullname || student.studentId}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">All students paid</p>
          )}
          {unpaidStudents.length > 10 && (
            <p className="text-xs text-gray-400">...and {unpaidStudents.length - 10} more</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ReportsTab;
