import React from 'react';
import { 
  Calendar, 
  CreditCard, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Plus, 
  Download, 
  AlertCircle 
} from 'lucide-react';
import StatCard from './StatCard';

const DashboardTab = ({ 
  selectedDate, 
  onDateChange, 
  dailySummary, 
  unpaidStudents, 
  dailyPayments, 
  onShowPaymentModal, 
  onSelectStudent, 
  onSetActiveTab 
}) => {
  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <Calendar className="h-5 w-5 text-gray-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Update
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Payments"
          value={dailySummary?.totalPayments || 0}
          subtitle="transactions today"
          icon={CreditCard}
          color="blue"
        />
        <StatCard
          title="Total Amount"
          value={`₵${(dailySummary?.totalAmount || 0).toLocaleString()}`}
          subtitle="collected today"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Students Paid"
          value={dailySummary?.uniqueStudents || 0}
          subtitle={`${dailySummary?.studentsNotPaid || 0} remaining`}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Collection Rate"
          value={dailySummary?.totalStudents > 0 
            ? `${Math.round((dailySummary.uniqueStudents / dailySummary.totalStudents) * 100)}%`
            : '0%'
          }
          subtitle="of total students"
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onShowPaymentModal(true)}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5" />
          <span>Record Payment</span>
        </button>
        <button
          onClick={() => onSetActiveTab('reports')}
          className="flex items-center justify-center space-x-2 bg-green-600 text-white rounded-lg p-4 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <Download className="h-5 w-5" />
          <span>Download Report</span>
        </button>
      </div>

      {/* Students Not Paid */}
      {unpaidStudents.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-medium">Students Not Paid Today</h3>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                {unpaidStudents.length}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {unpaidStudents.slice(0, 5).map(student => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{student.fullname}</p>
                    <p className="text-sm text-gray-500">{student.department}</p>
                  </div>
                  <button
                    onClick={() => {
                      onSelectStudent(student);
                      onShowPaymentModal(true);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Pay Now
                  </button>
                </div>
              ))}
              {unpaidStudents.length > 5 && (
                <button
                  onClick={() => onSetActiveTab('payments')}
                  className="w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2"
                >
                  View all {unpaidStudents.length} students
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recent Payments */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Today's Payments</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {dailyPayments.slice(0, 5).map(payment => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{payment.studentName}</p>
                  <p className="text-sm text-gray-500">{payment.studentDepartment}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">₵{payment.totalFee}</p>
                  <p className="text-sm text-gray-500">{payment.paymentMethod}</p>
                </div>
              </div>
            ))}
            {dailyPayments.length > 5 && (
              <button
                onClick={() => onSetActiveTab('payments')}
                className="w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2"
              >
                View all payments
              </button>
            )}
            {dailyPayments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No payments recorded today</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
