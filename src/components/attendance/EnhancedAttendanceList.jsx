import React from 'react';
import { Users, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, SkeletonCard } from '../ui';

const EnhancedAttendanceList = ({ filtered, loading, error, getStatusColor }) => {
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'present': return <CheckCircle size={16} className="text-green-600" />;
      case 'absent': return <XCircle size={16} className="text-red-600" />;
      case 'late': return <AlertCircle size={16} className="text-yellow-600" />;
      case 'half-day': return <Clock size={16} className="text-purple-600" />;
      default: return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Today's Records</h2>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <div className="text-center py-8">
          <XCircle size={48} className="mx-auto mb-4 text-red-400" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Records</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Today's Records</h2>
        <span className="text-sm text-gray-500">{filtered.length} records</span>
      </div>
      
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
          <p className="text-gray-500">No attendance records for the selected date.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(record => (
            <Card 
              key={record.id} 
              className="p-4 hover:shadow-md transition-shadow border border-gray-200"
              hover
            >
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{record.fullname}</h3>
                    <p className="text-sm text-gray-600 truncate">{record.department}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {getStatusIcon(record.status)}
                    <span>{record.status || 'Unknown'}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">Check-in</p>
                    <p className="font-medium text-gray-900">{record.checkInTime || '-'}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">Check-out</p>
                    <p className="font-medium text-gray-900">{record.checkOutTime || '-'}</p>
                  </div>
                </div>
                
                <div className="mt-2 bg-blue-50 p-2 rounded-lg">
                  <p className="text-blue-600 text-xs mb-1">Work Hours</p>
                  <p className="font-semibold text-blue-900">{(record.workHours || 0).toFixed(1)}h</p>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:block">
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{record.fullname}</h3>
                      <p className="text-sm text-gray-600 truncate">{record.department}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Check-in</p>
                      <p className="font-medium text-gray-900">{record.checkInTime || '-'}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Check-out</p>
                      <p className="font-medium text-gray-900">{record.checkOutTime || '-'}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Hours</p>
                      <p className="font-semibold text-blue-600">{(record.workHours || 0).toFixed(1)}h</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ml-4 ${getStatusColor(record.status)}`}>
                    {getStatusIcon(record.status)}
                    <span>{record.status || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};

export default EnhancedAttendanceList;
