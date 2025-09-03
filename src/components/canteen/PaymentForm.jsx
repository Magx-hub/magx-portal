import React from 'react';
import StudentSelector from '../StudentSelector';

const PaymentForm = ({ paymentFormData, handleInputChange, handleSubmitPayment, selectedStudent, setSelectedStudent, editingPaymentId, setEditingPaymentId, setPaymentFormData }) => (
  <form onSubmit={handleSubmitPayment} className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow">
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Select Student</label>
        <StudentSelector
          onSelect={setSelectedStudent}
          selectedStudent={selectedStudent}
          placeholder="Search and select a student for payment..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Classes Fee</label>
          <input
            type="number"
            name="classesFee"
            placeholder="0"
            value={paymentFormData.classesFee}
            onChange={(e) => handleInputChange(e, 'payment')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Canteen Fee</label>
          <input
            type="number"
            name="canteenFee"
            placeholder="0"
            value={paymentFormData.canteenFee}
            onChange={(e) => handleInputChange(e, 'payment')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Breakfast Fee</label>
          <input
            type="number"
            name="breakfastFee"
            placeholder="0"
            value={paymentFormData.breakfastFee}
            onChange={(e) => handleInputChange(e, 'payment')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Other Fee</label>
          <input
            type="number"
            name="otherFee"
            placeholder="0"
            value={paymentFormData.otherFee}
            onChange={(e) => handleInputChange(e, 'payment')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            name="paymentMethod"
            value={paymentFormData.paymentMethod}
            onChange={(e) => handleInputChange(e, 'payment')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="cash">Cash</option>
            <option value="mobile">Mobile Money</option>
            <option value="card">Card</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment Date</label>
          <input
            type="date"
            name="paymentDate"
            value={paymentFormData.paymentDate}
            onChange={(e) => handleInputChange(e, 'payment')}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Amount:</span>
          <span className="text-lg font-bold text-green-600">
            GH₵{(Number(paymentFormData.classesFee) + Number(paymentFormData.canteenFee) + Number(paymentFormData.breakfastFee) + Number(paymentFormData.otherFee)).toFixed(2)}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
        <textarea
          name="notes"
          placeholder="Additional notes about this payment..."
          value={paymentFormData.notes}
          onChange={(e) => handleInputChange(e, 'payment')}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
          rows="3"
        />
      </div>
    </div>

    <div className="flex gap-2">
      <button
        type="submit"
        className="flex-1 bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors font-medium"
        disabled={!selectedStudent}
      >
        {editingPaymentId ? 'Update Payment' : 'Record Payment'}
      </button>
      {editingPaymentId && (
        <button
          type="button"
          onClick={() => {
            setEditingPaymentId(null);
            setSelectedStudent(null);
            setPaymentFormData({
              classesFee: 0,
              canteenFee: 0,
              breakfastFee: 0,
              otherFee: 0,
              paymentMethod: 'cash',
              notes: '',
              paymentDate: new Date().toISOString().split('T')[0],
            });
          }}
          className="px-4 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-medium"
        >
          Cancel
        </button>
      )}
    </div>
  </form>
);

export default PaymentForm;