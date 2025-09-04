import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  PieChart, 
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Card, Button } from '../ui';

const EnhancedAnalyticsView = ({ stats, records, loading }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('attendance');

  // Calculate enhanced statistics
  const calculateEnhancedStats = () => {
    if (!records || records.length === 0) {
      return {
        totalTeachers: 0,
        presentCount: 0,
        absentCount: 0,
        lateCount: 0,
        attendanceRate: 0,
        avgWorkHours: 0,
        totalWorkHours: 0,
        departmentStats: {},
        weeklyTrend: []
      };
    }

    const totalTeachers = new Set(records.map(r => r.teacherId)).size;
    const presentCount = records.filter(r => r.status === 'Present').length;
    const absentCount = records.filter(r => r.status === 'Absent').length;
    const lateCount = records.filter(r => r.status === 'Late').length;
    const attendanceRate = records.length > 0 ? Math.round((presentCount / records.length) * 100) : 0;
    const totalWorkHours = records.reduce((sum, r) => sum + (r.workHours || 0), 0);
    const avgWorkHours = records.length > 0 ? totalWorkHours / records.length : 0;

    // Department-wise statistics
    const departmentStats = records.reduce((acc, record) => {
      const dept = record.department || 'Unknown';
      if (!acc[dept]) {
        acc[dept] = { total: 0, present: 0, absent: 0, late: 0, workHours: 0 };
      }
      acc[dept].total++;
      if (record.status === 'Present') acc[dept].present++;
      if (record.status === 'Absent') acc[dept].absent++;
      if (record.status === 'Late') acc[dept].late++;
      acc[dept].workHours += record.workHours || 0;
      return acc;
    }, {});

    return {
      totalTeachers,
      presentCount,
      absentCount,
      lateCount,
      attendanceRate,
      avgWorkHours,
      totalWorkHours,
      departmentStats
    };
  };

  const enhancedStats = calculateEnhancedStats();

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend }) => (
    <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg bg-${color}-100`}>
              <Icon size={20} className={`text-${color}-600`} />
            </div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          
          <div className="mb-1">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</span>
          </div>
          
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={12} className={trend < 0 ? 'rotate-180' : ''} />
              <span>{Math.abs(trend)}% vs last period</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Period Selector */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">Attendance insights and trends</p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['day', 'week', 'month'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                    selectedPeriod === period
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Teachers"
          value={enhancedStats.totalTeachers}
          subtitle="Active in system"
          icon={Users}
          color="blue"
        />
        
        <StatCard
          title="Attendance Rate"
          value={`${enhancedStats.attendanceRate}%`}
          subtitle={`${enhancedStats.presentCount} present today`}
          icon={CheckCircle}
          color="green"
          trend={5}
        />
        
        <StatCard
          title="Average Hours"
          value={enhancedStats.avgWorkHours.toFixed(1)}
          subtitle="Hours per day"
          icon={Clock}
          color="purple"
          trend={-2}
        />
        
        <StatCard
          title="Late Arrivals"
          value={enhancedStats.lateCount}
          subtitle="This period"
          icon={AlertTriangle}
          color="yellow"
        />
      </div>

      {/* Department Breakdown */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Department Breakdown</h3>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <BarChart3 size={16} />
            View Chart
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Department</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Total</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Present</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Absent</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Rate</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Avg Hours</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(enhancedStats.departmentStats).map(([dept, stats]) => {
                const rate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
                const avgHours = stats.total > 0 ? (stats.workHours / stats.total).toFixed(1) : '0.0';
                
                return (
                  <tr key={dept} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <span className="font-medium text-gray-900 capitalize">{dept}</span>
                    </td>
                    <td className="text-center py-3 px-2 text-gray-600">{stats.total}</td>
                    <td className="text-center py-3 px-2">
                      <span className="text-green-600 font-medium">{stats.present}</span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className="text-red-600 font-medium">{stats.absent}</span>
                    </td>
                    <td className="text-center py-3 px-2">
                      <span className={`font-medium ${rate >= 90 ? 'text-green-600' : rate >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {rate}%
                      </span>
                    </td>
                    <td className="text-center py-3 px-2 text-gray-600">{avgHours}h</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {Object.keys(enhancedStats.departmentStats).length === 0 && (
          <div className="text-center py-8">
            <PieChart size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No department data available</p>
          </div>
        )}
      </Card>

      {/* Quick Insights */}
      <Card className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={20} className="text-blue-600" />
              <h4 className="font-medium text-blue-900">Performance</h4>
            </div>
            <p className="text-sm text-blue-800">
              {enhancedStats.attendanceRate >= 90 
                ? 'Excellent attendance rate this period!' 
                : enhancedStats.attendanceRate >= 70 
                ? 'Good attendance, room for improvement.' 
                : 'Attendance needs attention.'}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-green-600" />
              <h4 className="font-medium text-green-900">Trends</h4>
            </div>
            <p className="text-sm text-green-800">
              {enhancedStats.avgWorkHours >= 8 
                ? 'Teachers are maintaining good work hours.' 
                : 'Average work hours are below target.'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedAnalyticsView;
