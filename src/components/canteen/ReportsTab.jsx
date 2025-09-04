import React, { useState } from 'react';
import { Download, DollarSign, Users, TrendingUp } from 'lucide-react';

const ReportsTab = ({ 
  dailySummary, 
  departmentSummary, 
  selectedDate, 
  onFetchPaymentHistory, 
  onFetchAggregatedPayments 
}) => {
  const [reportType, setReportType] = useState('daily');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      if (reportType === 'history') {
        await onFetchPaymentHistory(startDate, endDate);
      } else if (reportType === 'aggregated') {
        await onFetchAggregatedPayments('department', startDate, endDate);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Generate Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily Summary</option>
              <option value="department">Department Summary</option>
              <option value="history">Payment History</option>
              <option value="aggregated">Aggregated Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleGenerateReport}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>

      {/* Daily Summary Report */}
      {reportType === 'daily' && dailySummary && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Daily Summary - {selectedDate}</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Collections</p>
                  <p className="text-2xl font-bold text-blue-900">₵{(dailySummary.totalAmount || 0).toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Students Paid</p>
                  <p className="text-2xl font-bold text-green-900">{dailySummary.uniqueStudents || 0}</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Payment Rate</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {dailySummary.totalStudents > 0 
                      ? Math.round((dailySummary.uniqueStudents / dailySummary.totalStudents) * 100)
                      : 0
                    }%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium mb-3">Fee Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Classes Fee:</span>
                  <span className="font-medium">₵{(dailySummary.totalClassesFee || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Canteen Fee:</span>
                  <span className="font-medium">₵{(dailySummary.totalCanteenFee || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Breakfast Fee:</span>
                  <span className="font-medium">₵{(dailySummary.totalBreakfastFee || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Other Fee:</span>
                  <span className="font-medium">₵{(dailySummary.totalOtherFee || 0).toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>₵{(dailySummary.totalAmount || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-md font-medium mb-3">Payment Statistics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Transactions:</span>
                  <span className="font-medium">{dailySummary.totalPayments || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students Paid:</span>
                  <span className="font-medium">{dailySummary.uniqueStudents || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students Remaining:</span>
                  <span className="font-medium">{dailySummary.studentsNotPaid || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Students:</span>
                  <span className="font-medium">{dailySummary.totalStudents || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Department Summary Report */}
      {reportType === 'department' && departmentSummary.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Department Summary - {selectedDate}</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average per Student
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departmentSummary.map(dept => (
                  <tr key={dept.department} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dept.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dept.totalPayments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₵{dept.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₵{dept.totalPayments > 0 ? Math.round(dept.totalAmount / dept.totalPayments) : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!dailySummary && !departmentSummary.length && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-gray-500">
            <p className="text-lg font-medium">No data available</p>
            <p className="text-sm mt-2">Select a report type and date range to generate reports</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsTab;
