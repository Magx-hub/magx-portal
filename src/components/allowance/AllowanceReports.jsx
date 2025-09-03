
import { useState } from 'react';
import { FileText, BarChart3, TrendingUp, Download } from 'lucide-react';
import { generatePdfReport, generateWeeklyPdf, generateDateRangePdf, generateDetailPdf } from './AllowancePDF';

const AllowanceReports = ({ allowances, loading }) => {
  const [loadingState, setLoadingState] = useState(false);
  const [weekNumber, setWeekNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGeneratePdfReport = () => {
    generatePdfReport(setLoadingState);
  };

  const handleGenerateWeeklyPdf = () => {
    generateWeeklyPdf(weekNumber, setLoadingState);
  };

  const handleGenerateDateRangePdf = () => {
    generateDateRangePdf(startDate, endDate, setLoadingState);
  };

  const handleGenerateDetailPdf = (record) => {
    generateDetailPdf(record, setLoadingState);
  };

  return (
    <div className="space-y-4">
      {/* Report Type Selection */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Reports</h2>

        <div className="grid grid-cols-1 gap-4">
          {/* Full Report */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-blue-500" />
                <div>
                  <p className="text-blue-700 font-medium">Full Report</p>
                  <p className="text-blue-600 text-sm">All calculations and welfare payments</p>
                </div>
              </div>
              <button
                onClick={handleGeneratePdfReport}
                disabled={loadingState}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
              >
                {loadingState ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Weekly Report */}
          <div className="bg-white border border-gray-200 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <BarChart3 size={24} className="text-green-500" />
                <div>
                  <p className="text-gray-900 font-medium">Weekly Report</p>
                  <p className="text-gray-600 text-sm">Generate report for specific week</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Week number (1-52)"
                value={weekNumber}
                onChange={(e) => setWeekNumber(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              />
              <button
                onClick={handleGenerateWeeklyPdf}
                disabled={loadingState || !weekNumber}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
              >
                <Download size={16} />
                <span>Generate</span>
              </button>
            </div>
          </div>

          {/* Date Range Report */}
          <div className="bg-white border border-gray-200 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <TrendingUp size={24} className="text-purple-500" />
                <div>
                  <p className="text-gray-900 font-medium">Date Range Report</p>
                  <p className="text-gray-600 text-sm">Generate report for date range</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateDateRangePdf}
              disabled={loadingState || !startDate || !endDate}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
            >
              <Download size={16} />
              <span>Generate Date Range Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Calculations with Detail View */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Calculations</h2>

        {loading ? (
          <div className="text-gray-500 text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {allowances.slice(0, 10).map(record => (
              <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Week {record.weekNumber}</h3>
                    <p className="text-sm text-gray-600">{new Date(record.createdAt?.toDate?.() || record.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleGenerateDetailPdf(record)}
                    disabled={loadingState}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-1 rounded-lg flex items-center gap-1 font-medium transition-colors text-sm"
                  >
                    <Download size={14} />
                    <span>Detail PDF</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Total</p>
                    <p className="font-medium text-gray-900">GHS {record.totalSum?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Each Teacher</p>
                    <p className="font-medium text-gray-900">GHS {record.eachTeacher?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            {allowances.length === 0 && (
              <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                <FileText size={32} className="mx-auto mb-2 text-gray-400" />
                <p>No calculations found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllowanceReports;
