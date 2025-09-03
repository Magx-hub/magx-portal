
import { useState } from 'react';
import { useCanteenDashboard, useFeeStructures, useCanteenReports, usePaymentProcessor } from '../hooks/useCanteen';
import { useStudents } from '../hooks/useStudents';
import { Plus, Edit, Trash2, Search, Download, BarChart, PieChart, DollarSign, Users, BookOpen, X } from 'lucide-react';

const CanteenModuleScreen = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'feeStructures':
        return <FeeStructuresTab />;
      case 'reports':
        return <ReportsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="bg-white shadow-sm border-b border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Canteen Management</h1>
        </div>
        <nav className="flex space-x-1 border-b border-gray-200 mt-4">
          {['dashboard', 'feeStructures', 'reports'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                activeTab === tab
                  ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </header>
      <main>{renderTabContent()}</main>
    </div>
  );
};

const DashboardTab = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { payments, summary, departmentSummary, loading, error, addPayment, deletePayment } = useCanteenDashboard(date);
  const [showAddPayment, setShowAddPayment] = useState(false);

  return (
    <div className="space-y-4">
       <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                <button
                  onClick={() => setShowAddPayment(!showAddPayment)}
                  className={`p-2 rounded-lg transition-colors ${
                    showAddPayment
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {showAddPayment ? <X size={20} /> : <Plus size={20} />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setShowAddPayment(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus size={18} />
                  <span className="text-sm font-medium">Add Payment</span>
                </button>
                <button
                  onClick={() => {}}
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={18} />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>
              {showAddPayment && <AddPaymentForm onClose={() => setShowAddPayment(false)} />}
            </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Summary for {date}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{summary?.totalPayments || 0}</div>
            <div className="text-sm text-blue-600 font-medium">Total Payments</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
            <div className="text-2xl font-bold text-green-600">GHS {(summary?.totalAmount || 0).toFixed(2)}</div>
            <div className="text-sm text-green-600 font-medium">Total Amount</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100">
            <div className="text-2xl font-bold text-yellow-600">{summary?.uniqueStudents || 0}</div>
            <div className="text-sm text-yellow-600 font-medium">Unique Students</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Payments</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-3">
          {payments.map(payment => (
            <div key={payment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">{payment.studentName}</h3>
                <p className="text-sm text-gray-600">{payment.studentDepartment}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">GHS {payment.totalFee.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{payment.paymentMethod}</p>
              </div>
              <button onClick={() => deletePayment(payment.id)} className="ml-4 p-2 text-red-500 hover:bg-red-100 rounded-full">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AddPaymentForm = ({ onClose }) => {
    const { students } = useStudents();
    const { processPayment, processing, error } = usePaymentProcessor();
    const [studentId, setStudentId] = useState('');
    const [otherFee, setOtherFee] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [notes, setNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!studentId) return;
        try {
            await processPayment(studentId, { otherFee, paymentMethod, notes });
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Add Payment</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-light">×</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className="w-full p-3 border rounded-lg" required>
                        <option value="">Select Student</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.fullname}</option>
                        ))}
                    </select>
                    <input type="number" value={otherFee} onChange={(e) => setOtherFee(e.target.value)} placeholder="Other Fee" className="w-full p-3 border rounded-lg" />
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-3 border rounded-lg">
                        <option value="cash">Cash</option>
                        <option value="momo">Mobile Money</option>
                    </select>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" className="w-full p-3 border rounded-lg"></textarea>
                    <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white p-3 rounded-lg">
                        {processing ? 'Processing...' : 'Add Payment'}
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
};

const FeeStructuresTab = () => {
  const { feeStructures, loading, error, addFeeStructure, updateFeeStructure, deleteFeeStructure } = useFeeStructures();
  const [showAddFee, setShowAddFee] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Fee Structures</h2>
            <button onClick={() => setShowAddFee(true)} className="p-2 bg-blue-600 text-white rounded-full"><Plus size={16} /></button>
        </div>
        {showAddFee && <AddFeeForm onClose={() => setShowAddFee(false)} addFeeStructure={addFeeStructure} />}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-3">
        {feeStructures.map(fee => (
          <div key={fee.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center">
            <div>
                <h3 className="font-semibold text-gray-900">{fee.department}</h3>
                <p>Classes Fee: GHS {fee.classesFee.toFixed(2)}</p>
                <p>Breakfast Fee: GHS {fee.breakfastFee.toFixed(2)}</p>
                <p>Effective Date: {new Date(fee.effectiveDate).toLocaleDateString()}</p>
            </div>
            <div>
                <button onClick={() => {}} className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"><Edit size={16} /></button>
                <button onClick={() => deleteFeeStructure(fee.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddFeeForm = ({ onClose, addFeeStructure }) => {
    const [department, setDepartment] = useState('');
    const [classesFee, setClassesFee] = useState('');
    const [breakfastFee, setBreakfastFee] = useState('');
    const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addFeeStructure({ department, classesFee, breakfastFee, effectiveDate });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Add Fee Structure</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-light">×</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" className="w-full p-3 border rounded-lg" required />
                    <input type="number" value={classesFee} onChange={(e) => setClassesFee(e.target.value)} placeholder="Classes Fee" className="w-full p-3 border rounded-lg" required />
                    <input type="number" value={breakfastFee} onChange={(e) => setBreakfastFee(e.target.value)} placeholder="Breakfast Fee" className="w-full p-3 border rounded-lg" required />
                    <input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} className="w-full p-3 border rounded-lg" required />
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg">Add Fee Structure</button>
                </form>
            </div>
        </div>
    );
};

const ReportsTab = () => {
  const { generateReport, loading, error } = useCanteenReports();
  const [reportType, setReportType] = useState('daily');
  const [reportData, setReportData] = useState(null);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const handleGenerateReport = async () => {
    const params = { date: startDate, startDate, endDate, groupBy: 'day' };
    const data = await generateReport(reportType, params);
    setReportData(data);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Reports</h2>
      <div className="flex space-x-2 mb-4 items-center">
        <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="p-2 border rounded">
          <option value="daily">Daily Summary</option>
          <option value="department">Department Summary</option>
          <option value="history">Payment History</option>
          <option value="aggregated">Aggregated</option>
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded" />
        <button onClick={handleGenerateReport} className="p-2 bg-blue-600 text-white rounded">Generate</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {reportData && (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        {Object.keys(reportData[0] || {}).map(key => <th key={key} className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((row, i) => (
                        <tr key={i} className="border-b">
                            {Object.values(row).map((val, j) => <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{typeof val === 'number' ? val.toFixed(2) : String(val)}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default CanteenModuleScreen;
