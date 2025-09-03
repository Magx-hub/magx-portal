import React, { useState, useEffect } from 'react';
import { useCanteen } from '../hooks/useCanteen';
import FeeStructuresTab from '../components/canteen/FeeStructuresTab';
import DailyPaymentsTab from '../components/canteen/DailyPaymentsTab';
import ReportsTab from '../components/canteen/ReportsTab';
import UtilitiesTab from '../components/canteen/UtilitiesTab';

const CanteenModuleScreen = () => {
  const {
    loading,
    error,
    feeStructures,
    dailyPayments,
    unpaidStudents,
    dailySummary,
    departmentSummary,
    paymentHistory,
    canteenStats,
    fetchAllFeeStructures,
    createFeeStructure,
    modifyFeeStructure,
    removeFeeStructure,
    recordPayment,
    fetchDailyPayments,
    fetchUnpaidStudents,
    fetchDailySummary,
    fetchDepartmentSummary,
    fetchPaymentHistory,
    calculateFee,
    checkStudentPaymentStatus,
    bulkRecordPayments,
    modifyDailyPayment,
    removeDailyPayment,
    initializeCanteenData,
    clearError,
  } = useCanteen();

  const [activeTab, setActiveTab] = useState('feeStructures');
  const [formData, setFormData] = useState({
    department: '',
    classesFee: 0,
    canteenFee: 0,
    breakfastFee: 0,
    effectiveDate: new Date().toISOString().split('T')[0],
  });
  const [paymentFormData, setPaymentFormData] = useState({
    classesFee: 0,
    canteenFee: 0,
    breakfastFee: 0,
    otherFee: 0,
    paymentMethod: 'cash',
    notes: '',
    paymentDate: new Date().toISOString().split('T')[0],
  });
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [studentIdFilter, setStudentIdFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedUtilityStudent, setSelectedUtilityStudent] = useState(null);
  const [bulkPaymentsData, setBulkPaymentsData] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    initializeCanteenData();
  }, []);

  const handleInputChange = (e, formType = 'fee') => {
    const { name, value } = e.target;
    if (formType === 'fee') {
      setFormData({ ...formData, [name]: value });
    } else {
      setPaymentFormData({ ...paymentFormData, [name]: value });
    }
  };

  const handleSubmitFeeStructure = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await modifyFeeStructure(formData.id, formData);
      } else {
        await createFeeStructure(formData);
      }
      setFormData({
        department: '',
        classesFee: 0,
        canteenFee: 0,
        breakfastFee: 0,
        effectiveDate: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      alert('Please select a student first');
      return;
    }
    try {
      const paymentData = {
        studentId: selectedStudent.id,
        classesFee: Number(paymentFormData.classesFee),
        canteenFee: Number(paymentFormData.canteenFee),
        breakfastFee: Number(paymentFormData.breakfastFee),
        otherFee: Number(paymentFormData.otherFee),
        paymentMethod: paymentFormData.paymentMethod,
        notes: paymentFormData.notes,
        paymentDate: paymentFormData.paymentDate,
      };

      if (editingPaymentId) {
        await modifyDailyPayment(editingPaymentId, paymentData);
      } else {
        await recordPayment(paymentData);
      }

      setPaymentFormData({
        classesFee: 0,
        canteenFee: 0,
        breakfastFee: 0,
        otherFee: 0,
        paymentMethod: 'cash',
        notes: '',
        paymentDate: new Date().toISOString().split('T')[0],
      });
      setSelectedStudent(null);
      setEditingPaymentId(null);
    } catch (err) {
      console.error(err);
      alert(`Error ${editingPaymentId ? 'updating' : 'recording'} payment: ${err.message}`);
    }
  };

  const handleBulkPayments = async () => {
    try {
      const result = await bulkRecordPayments(bulkPaymentsData, (progress) => {
        setProgress(progress);
      });
      console.log('Bulk operation result:', result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">Canteen Management System</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={clearError} className="text-red-500 hover:underline font-medium">
              Dismiss
            </button>
          </div>
        )}

        {loading && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg border border-blue-200 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
            Loading...
          </div>
        )}

        <div className="mb-6">
          <div className="flex flex-wrap gap-1 md:gap-0 md:flex-nowrap">
            {['feeStructures', 'dailyPayments', 'reports', 'utilities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-t-lg text-sm md:text-base font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white shadow-md text-gray-800 border-b-2 border-blue-500'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {tab.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-b-lg shadow-lg">
          {activeTab === 'feeStructures' && (
            <FeeStructuresTab
              feeStructures={feeStructures}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmitFeeStructure={handleSubmitFeeStructure}
              setFormData={setFormData}
              removeFeeStructure={removeFeeStructure}
            />
          )}
          {activeTab === 'dailyPayments' && (
            <DailyPaymentsTab
              dailyPayments={dailyPayments}
              paymentFormData={paymentFormData}
              handleInputChange={handleInputChange}
              handleSubmitPayment={handleSubmitPayment}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              removeDailyPayment={removeDailyPayment}
              setPaymentFormData={setPaymentFormData}
              editingPaymentId={editingPaymentId}
              setEditingPaymentId={setEditingPaymentId}
            />
          )}
          {activeTab === 'reports' && (
            <ReportsTab
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              dailySummary={dailySummary}
              departmentSummary={departmentSummary}
              unpaidStudents={unpaidStudents}
            />
          )}
          {activeTab === 'utilities' && (
            <UtilitiesTab
              selectedUtilityStudent={selectedUtilityStudent}
              setSelectedUtilityStudent={setSelectedUtilityStudent}
              setStudentIdFilter={setStudentIdFilter}
              calculateFee={calculateFee}
              checkStudentPaymentStatus={checkStudentPaymentStatus}
              bulkPaymentsData={bulkPaymentsData}
              setBulkPaymentsData={setBulkPaymentsData}
              handleBulkPayments={handleBulkPayments}
              progress={progress}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CanteenModuleScreen;
