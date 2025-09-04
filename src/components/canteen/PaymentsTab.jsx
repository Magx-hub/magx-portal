import React from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

const PaymentsTab = ({ 
  dailyPayments, 
  searchTerm, 
  onSearchChange, 
  filterDepartment, 
  onFilterChange, 
  onShowPaymentModal, 
  onEditPayment, 
  onDeletePayment 
}) => {
  // Filter payments based on search and department filter
  const filteredPayments = dailyPayments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.studentDepartment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || payment.studentDepartment === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Get unique departments for filter dropdown
  const departments = [...new Set(dailyPayments.map(p => p.studentDepartment))].sort();

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <button
            onClick={() => onShowPaymentModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Payment</span>
          </button>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">
            Today's Payments ({filteredPayments.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.length > 0 ? (
                filteredPayments.map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.studentName}</div>
                        <div className="text-sm text-gray-500">{payment.studentDepartment}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₵{payment.totalFee}</div>
                      <div className="text-xs text-gray-500">
                        Classes: ₵{payment.classesFee} | Canteen: ₵{payment.canteenFee} | Breakfast: ₵{payment.breakfastFee}
                        {payment.otherFee > 0 && ` | Other: ₵${payment.otherFee}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {payment.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.createdAt ? new Date(payment.createdAt).toLocaleTimeString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => onEditPayment(payment)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit Payment"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => onDeletePayment(payment.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Payment"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    {searchTerm || filterDepartment ? 'No payments match your search criteria' : 'No payments recorded today'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTab;
