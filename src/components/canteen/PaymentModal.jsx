import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  studentsNotPaid, 
  selectedStudent = null,
  calculateFee 
}) => {
  const [paymentData, setPaymentData] = useState({
    studentId: '',
    classesFee: '',
    canteenFee: '',
    breakfastFee: '',
    otherFee: 0,
    paymentMethod: 'Cash',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  // Auto-calculate fees when student is selected
  useEffect(() => {
    if (paymentData.studentId && calculateFee) {
      const loadFees = async () => {
        try {
          setLoading(true);
          const feeCalculation = await calculateFee(paymentData.studentId, paymentData.otherFee);
          setPaymentData(prev => ({
            ...prev,
            classesFee: feeCalculation.classesFee,
            canteenFee: feeCalculation.canteenFee,
            breakfastFee: feeCalculation.breakfastFee
          }));
        } catch (error) {
          console.error('Error calculating fees:', error);
        } finally {
          setLoading(false);
        }
      };
      loadFees();
    }
  }, [paymentData.studentId, paymentData.otherFee, calculateFee]);

  // Set selected student when modal opens
  useEffect(() => {
    if (selectedStudent) {
      setPaymentData(prev => ({
        ...prev,
        studentId: selectedStudent.id
      }));
    }
  }, [selectedStudent]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit(paymentData);
      setPaymentData({
        studentId: '',
        classesFee: '',
        canteenFee: '',
        breakfastFee: '',
        otherFee: 0,
        paymentMethod: 'Cash',
        notes: ''
      });
      onClose();
    } catch (error) {
      console.error('Error recording payment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Record Payment</h3>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentData.studentId}
              onChange={(e) => setPaymentData({ ...paymentData, studentId: e.target.value })}
              disabled={loading}
            >
              <option value="">Select Student</option>
              {studentsNotPaid.map(student => (
                <option key={student.id} value={student.id}>
                  {student.fullname} - {student.department}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Classes Fee</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={paymentData.classesFee}
                onChange={(e) => setPaymentData({ ...paymentData, classesFee: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Canteen Fee</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={paymentData.canteenFee}
                onChange={(e) => setPaymentData({ ...paymentData, canteenFee: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Breakfast Fee</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={paymentData.breakfastFee}
                onChange={(e) => setPaymentData({ ...paymentData, breakfastFee: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Fee</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={paymentData.otherFee}
                onChange={(e) => setPaymentData({ ...paymentData, otherFee: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentData.paymentMethod}
              onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
              disabled={loading}
            >
              <option value="Cash">Cash</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Card</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={paymentData.notes}
              onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
              placeholder="Optional notes..."
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
              disabled={loading || !paymentData.studentId}
            >
              {loading ? 'Recording...' : 'Record Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
