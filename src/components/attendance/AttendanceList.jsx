
import React from 'react';
import { Users } from 'lucide-react';

const AttendanceList = ({ filtered, loading, error, getStatusColor }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Today's Records</h2>
      </div>
      
      {loading ? (
        <div className="text-gray-500 text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(record => (
            <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{record.fullname}</h3>
                  <p className="text-sm text-gray-600">{record.department}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                  {record.status || 'Unknown'}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Check-in</p>
                  <p className="font-medium text-gray-900">{record.checkInTime || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Check-out</p>
                  <p className="font-medium text-gray-900">{record.checkOutTime || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Hours</p>
                  <p className="font-medium text-gray-900">{(record.workHours || 0).toFixed(1)}h</p>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
              <Users size={32} className="mx-auto mb-2 text-gray-400" />
              <p>No records found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
