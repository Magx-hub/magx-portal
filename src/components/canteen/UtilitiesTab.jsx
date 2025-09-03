import React from 'react';
import StudentSelector from '../StudentSelector';

const UtilitiesTab = ({ selectedUtilityStudent, setSelectedUtilityStudent, setStudentIdFilter, calculateFee, checkStudentPaymentStatus, bulkPaymentsData, setBulkPaymentsData, handleBulkPayments, progress }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Utilities</h2>
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Student:</label>
        <StudentSelector
          onSelect={(student) => {
            setSelectedUtilityStudent(student);
            setStudentIdFilter(student ? student.id : '');
          }}
          selectedStudent={selectedUtilityStudent}
          placeholder="Search and select a student..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={async () => {
            if (!selectedUtilityStudent) {
              alert('Please select a student first');
              return;
            }
            const fee = await calculateFee(selectedUtilityStudent.id);
            alert(`Calculated Fee for ${selectedUtilityStudent.fullname}: GH₵{fee.totalFee || fee}`);
          }}
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600 transition-colors font-medium"
          disabled={!selectedUtilityStudent}
        >
          Calculate Fee
        </button>
        <button
          onClick={async () => {
            if (!selectedUtilityStudent) {
              alert('Please select a student first');
              return;
            }
            const hasPaid = await checkStudentPaymentStatus(selectedUtilityStudent.id);
            alert(`${selectedUtilityStudent.fullname} ${hasPaid ? 'has paid today' : 'has not paid today'}`);
          }}
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600 transition-colors font-medium"
          disabled={!selectedUtilityStudent}
        >
          Check Payment Status
        </button>
      </div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-4 text-lg">Bulk Payments</h3>
      <textarea
        value={JSON.stringify(bulkPaymentsData, null, 2)}
        onChange={(e) => {
          try {
            setBulkPaymentsData(JSON.parse(e.target.value));
          } catch (err) {
            // Invalid JSON, keep current value
          }
        }}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 mb-4"
        placeholder="Paste JSON array of payments"
        rows="6"
      />
      <button
        onClick={handleBulkPayments}
        className="w-full bg-orange-500 text-white p-3 rounded hover:bg-orange-600 transition-colors font-medium"
      >
        Process Bulk Payments
      </button>
      {progress && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Processing Progress</span>
            <span className="text-sm text-gray-600">
              {progress.completed}/{progress.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progress.completed / progress.total) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2">
            Current: {progress.currentStudent}
          </p>
          <p className={`text-sm font-medium ${progress.success ? 'text-green-600' : 'text-red-600'}`}>
            {progress.success ? '✓ Success' : `✗ Error: ${progress.error}`}
          </p>
        </div>
      )}
    </div>
  </div>
);

export default UtilitiesTab;
