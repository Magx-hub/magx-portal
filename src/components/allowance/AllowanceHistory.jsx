
import React, { useMemo, useState } from 'react';
import { History, Search } from 'lucide-react';

const AllowanceHistory = ({ allowances, loading }) => {
  const [search, setSearch] = useState('');

  const filteredAllowances = useMemo(() => {
    if (!search) return allowances;
    const q = search.toLowerCase();
    return allowances.filter(allowance =>
      allowance.weekNumber.toString().includes(q) ||
      allowance.totalSum.toString().includes(q)
    );
  }, [allowances, search]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Calculation History</h2>
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 ml-4 max-w-xs">
            <Search size={16} className="text-gray-500 mr-2" />
            <input
              placeholder="Search by week..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-gray-500 text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAllowances.map(record => (
              <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Week {record.weekNumber}</h3>
                    <p className="text-sm text-gray-600">{new Date(record.createdAt?.toDate?.() || record.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Total</p>
                    <p className="font-medium text-gray-900">GHS {record.totalSum?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Each Teacher</p>
                    <p className="font-medium text-gray-900">GHS {record.eachTeacher?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Each JHS</p>
                    <p className="font-medium text-gray-900">GHS {record.eachJHSTeacher?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            {filteredAllowances.length === 0 && (
              <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                <History size={32} className="mx-auto mb-2 text-gray-400" />
                <p>No calculations found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllowanceHistory;
