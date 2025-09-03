import React, { useEffect, useState } from 'react';
import { Clock, TrendingUp, Calendar, PieChart } from 'lucide-react';
import { getAllTeachersAttendanceSummary } from '../../services/attendanceService';
import TeacherSummaryCard from './TeacherSummaryCard';
import TeacherSummaryRow from './TeacherSummaryRow';

const AnalyticsView = ({ stats, getWeekNumber, date }) => {
  const [teacherSummaries, setTeacherSummaries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSummaries = async () => {
      setLoading(true);
      const summaries = await getAllTeachersAttendanceSummary();
      setTeacherSummaries(summaries);
      setLoading(false);
    };
    fetchSummaries();
  }, []);

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{stats.daily.totalRecords}</div>
            <div className="text-sm text-blue-600 font-medium">Total</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
            <div className="text-2xl font-bold text-green-600">{stats.daily.presentCount}</div>
            <div className="text-sm text-green-600 font-medium">Present</div>
          </div>
          <div className="bg-red-50 p-4 rounded-xl text-center border border-red-100">
            <div className="text-2xl font-bold text-red-600">{stats.daily.absentCount}</div>
            <div className="text-sm text-red-600 font-medium">Absent</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100">
            <div className="text-2xl font-bold text-yellow-600">{stats.daily.lateCount}</div>
            <div className="text-sm text-yellow-600 font-medium">Late</div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-purple-600" />
              <span className="font-medium text-purple-900">Average Hours</span>
            </div>
            <span className="text-xl font-bold text-purple-600">{stats.daily.avgWorkHours.toFixed(1)}h</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-100">
            <div className="flex items-center gap-3">
              <TrendingUp size={20} className="text-cyan-600" />
              <span className="font-medium text-cyan-900">Half Days</span>
            </div>
            <span className="text-xl font-bold text-cyan-600">{stats.daily.halfDayCount}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-indigo-600" />
              <span className="font-medium text-indigo-900">Week Number</span>
            </div>
            <span className="text-xl font-bold text-indigo-600">{getWeekNumber(date)}</span>
          </div>
        </div>
      </div>

      {teacherSummaries.map(summary => (
        <TeacherSummaryCard key={summary.id} summary={summary} />
      ))}

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Teachers Summary</h2>
        {loading ? (
          <div className="text-gray-500 text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {teacherSummaries.map(summary => (
              <TeacherSummaryRow key={summary.id} summary={summary} />
            ))}
          </div>
        )}
      </div>

      {/* Chart Placeholders */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h2>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-48 rounded-xl flex items-center justify-center border border-blue-200">
          <div className="text-center">
            <TrendingUp size={32} className="mx-auto mb-2 text-blue-500" />
            <p className="text-blue-700 font-medium">Line Chart Visualization</p>
            <p className="text-blue-600 text-sm">Coming Soon</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h2>
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 h-48 rounded-xl flex items-center justify-center border border-green-200">
          <div className="text-center">
            <PieChart size={32} className="mx-auto mb-2 text-green-500" />
            <p className="text-green-700 font-medium">Pie Chart Visualization</p>
            <p className="text-green-600 text-sm">Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;