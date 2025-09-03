
import React from 'react';
import { Calculator, Download, Plus, X } from 'lucide-react';

const AllowanceDashboard = ({ summary, allowances, loading, showCalculator, setShowCalculator, generatePdfReport }) => {
  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{summary?.totalRecords || 0}</div>
            <div className="text-sm text-blue-600 font-medium">Total Records</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
            <div className="text-2xl font-bold text-green-600">GHS {(summary?.totalAmount || 0).toFixed(2)}</div>
            <div className="text-sm text-green-600 font-medium">Total Amount</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className={`p-2 rounded-lg transition-colors ${
              showCalculator
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            {showCalculator ? <X size={20} /> : <Plus size={20} />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => setShowCalculator(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Calculator size={18} />
            <span className="text-sm font-medium">New Calculation</span>
          </button>
          <button
            onClick={generatePdfReport}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Download size={18} />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Recent Calculations */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Calculations</h2>
        {loading ? (
          <div className="text-gray-500 text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {allowances.slice(0, 5).map(record => (
              <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Week {record.weekNumber}</h3>
                    <p className="text-sm text-gray-600">{new Date(record.createdAt?.toDate?.() || record.createdAt).toLocaleDateString()}</p>
                  </div>
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
                <Calculator size={32} className="mx-auto mb-2 text-gray-400" />
                <p>No calculations found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllowanceDashboard;
