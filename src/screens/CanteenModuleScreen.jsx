import React, { useState, useEffect } from 'react';
import { 
  BarChart3,
  CreditCard,
  Settings,
  TrendingUp
} from 'lucide-react';
import { useCanteen } from '../hooks/useCanteen';

// Import the new components
import StatCard from '../components/canteen/StatCard';
import PaymentModal from '../components/canteen/PaymentModal';
import FeeStructureModal from '../components/canteen/FeeStructureModal';
import DashboardTab from '../components/canteen/DashboardTab';
import PaymentsTab from '../components/canteen/PaymentsTab';
import FeesTab from '../components/canteen/FeesTab';
import ReportsTab from '../components/canteen/ReportsTab';

const CanteenModuleScreen = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingFeeStructure, setEditingFeeStructure] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  const {
    // Data
    dailySummary,
    dailyPayments,
    feeStructures,
    unpaidStudents,
    departmentSummary,
    loading,
    error,

    // Operations
    recordPayment,
    createFeeStructure,
    modifyFeeStructure,
    removeFeeStructure,
    modifyDailyPayment,
    removeDailyPayment,
    calculateFee,
    fetchPaymentHistory,
    fetchAggregatedPayments,
    initializeCanteenData,
    refreshAllData
  } = useCanteen();

  // Initialize data on component mount and when date changes
  useEffect(() => {
    initializeCanteenData(selectedDate);
  }, [selectedDate, initializeCanteenData]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'fees', label: 'Fee Structures', icon: Settings },
    { id: 'reports', label: 'Reports', icon: TrendingUp }
  ];

  // Event handlers
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleRecordPayment = async (paymentData) => {
    await recordPayment({ ...paymentData, paymentDate: selectedDate });
    setSelectedStudent(null);
  };

  const handleCreateFeeStructure = async (feeData) => {
    await createFeeStructure(feeData);
  };

  const handleUpdateFeeStructure = async (id, feeData) => {
    await modifyFeeStructure(id, feeData);
    setEditingFeeStructure(null);
  };

  const handleDeleteFeeStructure = async (id) => {
    if (window.confirm('Are you sure you want to delete this fee structure?')) {
      await removeFeeStructure(id);
    }
  };

  const handleEditFeeStructure = (structure) => {
    setEditingFeeStructure(structure);
    setShowFeeModal(true);
  };

  const handleEditPayment = async (payment) => {
    // For now, we'll just log this - you could implement an edit payment modal
    console.log('Edit payment:', payment);
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      await removeDailyPayment(paymentId);
    }
  };

  const handleCloseFeeModal = () => {
    setShowFeeModal(false);
    setEditingFeeStructure(null);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedStudent(null);
  };

  if (loading && !dailySummary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading canteen data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error loading canteen data</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => refreshAllData(selectedDate)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Canteen Management</h1>
          <p className="mt-2 text-gray-600">Manage daily payments, fee structures, and generate reports</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'dashboard' && (
            <DashboardTab
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              dailySummary={dailySummary}
              unpaidStudents={unpaidStudents}
              dailyPayments={dailyPayments}
              onShowPaymentModal={setShowPaymentModal}
              onSelectStudent={setSelectedStudent}
              onSetActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentsTab
              dailyPayments={dailyPayments}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterDepartment={filterDepartment}
              onFilterChange={setFilterDepartment}
              onShowPaymentModal={setShowPaymentModal}
              onEditPayment={handleEditPayment}
              onDeletePayment={handleDeletePayment}
            />
          )}

          {activeTab === 'fees' && (
            <FeesTab
              feeStructures={feeStructures}
              onShowFeeModal={setShowFeeModal}
              onEditFeeStructure={handleEditFeeStructure}
              onDeleteFeeStructure={handleDeleteFeeStructure}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsTab
              dailySummary={dailySummary}
              departmentSummary={departmentSummary}
              selectedDate={selectedDate}
              onFetchPaymentHistory={fetchPaymentHistory}
              onFetchAggregatedPayments={fetchAggregatedPayments}
            />
          )}
        </div>

        {/* Modals */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={handleClosePaymentModal}
          onSubmit={handleRecordPayment}
          studentsNotPaid={unpaidStudents}
          selectedStudent={selectedStudent}
          calculateFee={calculateFee}
        />

        <FeeStructureModal
          isOpen={showFeeModal}
          onClose={handleCloseFeeModal}
          onSubmit={editingFeeStructure ? handleUpdateFeeStructure : handleCreateFeeStructure}
          editingStructure={editingFeeStructure}
        />
      </div>
    </div>
  );
};

export default CanteenModuleScreen;