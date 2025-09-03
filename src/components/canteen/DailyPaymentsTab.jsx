import React from 'react';
import PaymentForm from './PaymentForm';

const DailyPaymentsTab = ({ dailyPayments, paymentFormData, handleInputChange, handleSubmitPayment, selectedStudent, setSelectedStudent, removeDailyPayment, setPaymentFormData, editingPaymentId, setEditingPaymentId }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Daily Payments</h2>
    <PaymentForm
      paymentFormData={paymentFormData}
      handleInputChange={handleInputChange}
      handleSubmitPayment={handleSubmitPayment}
      selectedStudent={selectedStudent}
      setSelectedStudent={setSelectedStudent}
      editingPaymentId={editingPaymentId}
      setEditingPaymentId={setEditingPaymentId}
      setPaymentFormData={setPaymentFormData}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dailyPayments.map((payment) => (
        <div key={payment.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg mb-2">{payment.studentName || payment.studentId}</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Total Amount:</span> GH₵{payment.totalFee}</p>
            <p><span className="font-medium">Classes Fee:</span> GH₵{payment.classesFee}</p>
            <p><span className="font-medium">Canteen Fee:</span> GH₵{payment.canteenFee}</p>
            {payment.breakfastFee > 0 && <p><span className="font-medium">Breakfast Fee:</span> GH₵{payment.breakfastFee}</p>}
            {payment.otherFee > 0 && <p><span className="font-medium">Other Fee:</span> GH₵{payment.otherFee}</p>}
            <p><span className="font-medium">Date:</span> {payment.paymentDate}</p>
            <p><span className="font-medium">Payment Method:</span> {payment.paymentMethod}</p>
            {payment.studentDepartment && <p><span className="font-medium">Department:</span> {payment.studentDepartment}</p>}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setSelectedStudent({ id: payment.studentId, fullname: payment.studentName });
                setPaymentFormData({
                  classesFee: payment.classesFee || 0,
                  canteenFee: payment.canteenFee || 0,
                  breakfastFee: payment.breakfastFee || 0,
                  otherFee: payment.otherFee || 0,
                  paymentMethod: payment.paymentMethod || 'cash',
                  notes: payment.notes || '',
                  paymentDate: payment.paymentDate,
                });
                setEditingPaymentId(payment.id);
              }}
              className="flex-1 bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => removeDailyPayment(payment.id)}
              className="flex-1 bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DailyPaymentsTab;