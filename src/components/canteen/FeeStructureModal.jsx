import React, { useState } from 'react';
import { X } from 'lucide-react';

const FeeStructureModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingStructure = null 
}) => {
  const [feeData, setFeeData] = useState({
    department: editingStructure?.department || '',
    classesFee: editingStructure?.classesFee || '',
    canteenFee: editingStructure?.canteenFee || '',
    breakfastFee: editingStructure?.breakfastFee || '',
    effectiveDate: editingStructure?.effectiveDate 
      ? new Date(editingStructure.effectiveDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (editingStructure) {
        await onSubmit(editingStructure.id, feeData);
      } else {
        await onSubmit(feeData);
      }
      setFeeData({
        department: '',
        classesFee: '',
        canteenFee: '',
        breakfastFee: '',
        effectiveDate: new Date().toISOString().split('T')[0]
      });
      onClose();
    } catch (error) {
      console.error('Error saving fee structure:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">
            {editingStructure ? 'Edit Fee Structure' : 'Add Fee Structure'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={feeData.department}
              onChange={(e) => setFeeData({ ...feeData, department: e.target.value })}
              placeholder="e.g., Computer Science"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Classes Fee</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={feeData.classesFee}
                onChange={(e) => setFeeData({ ...feeData, classesFee: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Canteen Fee</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={feeData.canteenFee}
                onChange={(e) => setFeeData({ ...feeData, canteenFee: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Breakfast Fee</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={feeData.breakfastFee}
                onChange={(e) => setFeeData({ ...feeData, breakfastFee: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Effective Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={feeData.effectiveDate}
              onChange={(e) => setFeeData({ ...feeData, effectiveDate: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={loading || !feeData.department || !feeData.classesFee || !feeData.canteenFee || !feeData.breakfastFee}
            >
              {loading ? 'Saving...' : editingStructure ? 'Update Structure' : 'Add Structure'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeStructureModal;
