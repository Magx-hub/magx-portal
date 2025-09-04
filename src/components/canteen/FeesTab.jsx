import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const FeesTab = ({ 
  feeStructures, 
  onShowFeeModal, 
  onEditFeeStructure, 
  onDeleteFeeStructure 
}) => {
  return (
    <div className="space-y-6">
      {/* Add Fee Structure Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Fee Structures</h2>
        <button
          onClick={() => onShowFeeModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Structure</span>
        </button>
      </div>

      {/* Fee Structures List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feeStructures.length > 0 ? (
          feeStructures.map(structure => (
            <div key={structure.id} className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{structure.department}</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onEditFeeStructure(structure)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit Fee Structure"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteFeeStructure(structure.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Fee Structure"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Classes Fee:</span>
                    <span className="text-sm font-medium">₵{structure.classesFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Canteen Fee:</span>
                    <span className="text-sm font-medium">₵{structure.canteenFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Breakfast Fee:</span>
                    <span className="text-sm font-medium">₵{structure.breakfastFee}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-medium">
                    <span className="text-sm">Total:</span>
                    <span className="text-sm">₵{Number(structure.classesFee) + Number(structure.canteenFee) + Number(structure.breakfastFee)}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    Effective: {structure.effectiveDate 
                      ? new Date(structure.effectiveDate).toLocaleDateString()
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500">
              <p className="text-lg font-medium">No fee structures found</p>
              <p className="text-sm mt-2">Create your first fee structure to get started</p>
              <button
                onClick={() => onShowFeeModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Fee Structure
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeesTab;
