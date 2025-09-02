import React, { useEffect, useMemo, useState } from 'react';
import { Calculator, History, FileText, BarChart3, Users, TrendingUp, Plus, Download, Search, Menu, X, ChevronDown, Filter } from 'lucide-react';
import { useAllowance } from '../hooks/useAllowance';
import toast from 'react-hot-toast';

const AllowanceModuleScreen = () => {
  const {
    allowances,
    loading,
    error,
    summary,
    addAllowance,
    updateAllowance,
    deleteAllowance,
    getByWeek,
    refreshAllowances,
    checkWeekExists
  } = useAllowance();

  const [loadingState, setLoadingState] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'calculator', 'history', 'reports'
  const [search, setSearch] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  // Calculator form state
  const [calcForm, setCalcForm] = useState({
    weekNumber: '',
    numberOfTeachers: '',
    numberOfJHSTeachers: '',
    welfareAmount: '',
    classAmounts: {
      creche: '',
      nursery1: '',
      nursery2: '',
      kg1: '',
      kg2: '',
      basic1: '',
      basic2: '',
      basic3: '',
      basic4: '',
      basic5: '',
      basic6: '',
      basic7General: '',
      basic7JHS: '',
      basic8General: '',
      basic8JHS: '',
      basic9General: '',
      basic9JHS: '',
    }
  });

  const [calculation, setCalculation] = useState(null);

  // Filtered allowances for search
  const filteredAllowances = useMemo(() => {
    if (!search) return allowances;
    const q = search.toLowerCase();
    return allowances.filter(allowance =>
      allowance.weekNumber.toString().includes(q) ||
      allowance.totalSum.toString().includes(q)
    );
  }, [allowances, search]);

  // Calculate allowance
  const calculateAllowance = () => {
    const amounts = Object.fromEntries(
      Object.entries(calcForm.classAmounts).map(([key, value]) => [key, parseFloat(value) || 0])
    );

    const teachers = parseInt(calcForm.numberOfTeachers) || 0;
    const jhsTeachers = parseInt(calcForm.numberOfJHSTeachers) || 0;
    const welfare = parseFloat(calcForm.welfareAmount) || 0;

    if (!calcForm.weekNumber || teachers === 0) {
      toast.error('Week number and number of teachers are required');
      return;
    }

    // Calculate total sum
    const totalSum = Object.values(amounts).reduce((sum, amount) => sum + amount, 0);

    // Calculate deductions
    const balanceAfterWelfare = totalSum - welfare;
    const office = balanceAfterWelfare * 0.05;
    const balanceAfterOffice = balanceAfterWelfare - office;
    const kitchen = balanceAfterOffice * 0.05;
    const balanceAfterKitchen = balanceAfterOffice - kitchen;

    // Calculate JHS classes
    const jhsClasses = amounts.basic7JHS + amounts.basic8JHS + amounts.basic9JHS;

    // Calculate per teacher amounts
    const eachTeacher = teachers > 0 ? balanceAfterKitchen / teachers : 0;
    const eachJHSTeacher = jhsTeachers > 0 ? jhsClasses / jhsTeachers : 0;

    setCalculation({
      weekNumber: parseInt(calcForm.weekNumber),
      totalSum,
      welfare,
      balanceAfterWelfare,
      office,
      balanceAfterOffice,
      kitchen,
      balanceAfterKitchen,
      eachTeacher,
      jhsClasses,
      eachJHSTeacher,
      amounts,
      numberOfTeachers: teachers,
      numberOfJHSTeachers: jhsTeachers,
    });
  };

  // Save calculation
  const saveCalculation = async () => {
    if (!calculation) return;

    try {
      const exists = await checkWeekExists(calculation.weekNumber);
      if (exists) {
        toast.error('Calculation for this week already exists');
        return;
      }

      const data = {
        ...calculation,
        createdAt: new Date(),
      };

      await addAllowance(data);
      toast.success('Calculation saved successfully');

      // Reset form
      setCalcForm({
        weekNumber: '',
        numberOfTeachers: '',
        numberOfJHSTeachers: '',
        welfareAmount: '',
        classAmounts: {
          creche: '', nursery1: '', nursery2: '', kg1: '', kg2: '',
          basic1: '', basic2: '', basic3: '', basic4: '', basic5: '', basic6: '',
          basic7General: '', basic7JHS: '', basic8General: '', basic8JHS: '',
          basic9General: '', basic9JHS: '',
        }
      });
      setCalculation(null);
      setShowCalculator(false);
    } catch (error) {
      toast.error('Failed to save calculation');
    }
  };




  // ===================== PDF Generation Logic =======================
  // ===================== PDF Generation Logic =======================
  // ===================== PDF Generation Logic =======================
  // ===================== PDF Generation Logic =======================
  // ===================== PDF Generation Logic =======================
  // ===================== PDF Generation Logic =======================
  // ===================== PDF Generation Logic =======================
  // ===================== PDF Generation Logic =======================

  const generatePdfReport = async () => {
    setLoadingState(true);
    
    try {
      // Get all calculations via database.js
      const calculations = await getCalculations();

      // Get welfare payments via database.js
      const welfarePayments = await getWelfarePayments();
      
      // Create HTML content for the PDF
      let htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #2c3e50; text-align: center; }
              h2 { color: #34495e; border-bottom: 1px solid #eee; padding-bottom: 8px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total-row { font-weight: bold; }
              .section { margin-bottom: 30px; }
            </style>
          </head>
          <body>
            <h1>Friday Allowance Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            
            <div class="section">
              <h2>Summary</h2>
              <p>Total Calculations: ${calculations.length}</p>
              <p>Total Amount: GHS ${calculations.reduce((sum, calc) => sum + calc.totalSum, 0).toFixed(2)}</p>
            </div>
            
            <div class="section">
              <h2>Recent Calculations</h2>
              <table>
                <tr>
                  <th>Week</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Each Teacher</th>
                  <th>Each JHS Teacher</th>
                </tr>
                ${calculations.slice(0, 5).map(calc => `
                  <tr>
                    <td>${calc.weekNumber}</td>
                    <td>${new Date(calc.createdAt).toLocaleDateString()}</td>
                    <td>GHS ${calc.totalSum.toFixed(2)}</td>
                    <td>GHS ${calc.eachTeacher.toFixed(2)}</td>
                    <td>GHS ${calc.eachJHSTeacher.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
            
            <div class="section">
              <h2>Welfare Payments</h2>
              <table>
                <tr>
                  <th>Week</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
                ${welfarePayments.slice(0, 5).map(payment => `
                  <tr>
                    <td>${payment.weekNumber}</td>
                    <td>GHS ${payment.amount.toFixed(2)}</td>
                    <td>${new Date(payment.createdAt).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td colspan="2">Total Welfare Payments</td>
                  <td>GHS ${welfarePayments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}</td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `;
      
      // Generate PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      // Share the PDF
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF report');
    } finally {
      setLoadingState(false);
    }
  };




  // Export to PDF (placeholder) // showSucces
  const handleExport = () => {
    toast.success('PDF export feature coming soon');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Allowance Calculator</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab(activeTab === 'dashboard' ? 'calculator' : 'dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {activeTab === 'dashboard' ? <Calculator size={20} /> : <BarChart3 size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Tabs */}
          <div className="flex mt-3 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'reports'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Reports
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            {/* Stats Overview */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600">{summary?.totalRecords || 0}</div>
                  <div className="text-sm text-blue-600 font-medium">Total Records</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
                  <div className="text-2xl font-bold text-green-600">GHS {(summary?.totalAmount || 0).toFixed(2)}</div>
                  <div className="text-sm text-green-600 font-medium">Total Amount</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className={`p-2 rounded-lg transition-colors ${
                    showCalculator
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {showCalculator ? <X size={20} /> : <Plus size={20} />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setShowCalculator(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Calculator size={18} />
                  <span className="text-sm font-medium">New Calculation</span>
                </button>
                <button
                  onClick={generatePdfReport}
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={18} />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>
            </div>

            {/* Recent Calculations */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Calculations</h2>
              {loading ? (
                <div className="text-gray-500 text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2">Loading...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allowances.slice(0, 5).map(record => (
                    <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">Week {record.weekNumber}</h3>
                          <p className="text-sm text-gray-600">{new Date(record.createdAt?.toDate?.() || record.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Total</p>
                          <p className="font-medium text-gray-900">GHS {record.totalSum?.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Each Teacher</p>
                          <p className="font-medium text-gray-900">GHS {record.eachTeacher?.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {allowances.length === 0 && (
                    <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                      <Calculator size={32} className="mx-auto mb-2 text-gray-400" />
                      <p>No calculations found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">New Calculation</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="number"
                    placeholder="Week Number (1-16)"
                    value={calcForm.weekNumber}
                    onChange={(e) => setCalcForm({...calcForm, weekNumber: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <input
                    type="number"
                    placeholder="Number of Teachers"
                    value={calcForm.numberOfTeachers}
                    onChange={(e) => setCalcForm({...calcForm, numberOfTeachers: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <input
                    type="number"
                    placeholder="Number of JHS Teachers"
                    value={calcForm.numberOfJHSTeachers}
                    onChange={(e) => setCalcForm({...calcForm, numberOfJHSTeachers: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <input
                    type="number"
                    placeholder="Welfare Amount"
                    value={calcForm.welfareAmount}
                    onChange={(e) => setCalcForm({...calcForm, welfareAmount: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <h3 className="text-md font-medium text-gray-800">Class Amounts (GHS)</h3>

                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(calcForm.classAmounts).map((key) => (
                    <input
                      key={key}
                      type="number"
                      placeholder={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      value={calcForm.classAmounts[key]}
                      onChange={(e) => setCalcForm({
                        ...calcForm,
                        classAmounts: {...calcForm.classAmounts, [key]: e.target.value}
                      })}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  ))}
                </div>

                <button
                  onClick={calculateAllowance}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                >
                  <Calculator size={20} />
                  <span>Calculate</span>
                </button>
              </div>

              {calculation && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Week {calculation.weekNumber} Results</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Sum:</span>
                      <span className="font-medium">GHS {calculation.totalSum.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Welfare:</span>
                      <span className="font-medium">GHS {calculation.welfare.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Office (5%):</span>
                      <span className="font-medium">GHS {calculation.office.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kitchen (5%):</span>
                      <span className="font-medium">GHS {calculation.kitchen.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Each Teacher:</span>
                      <span className="font-bold text-green-600">GHS {calculation.eachTeacher.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Each JHS Teacher:</span>
                      <span className="font-bold text-blue-600">GHS {calculation.eachJHSTeacher.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={saveCalculation}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                  >
                    <Plus size={20} />
                    <span>Save Calculation</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Calculation History</h2>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 ml-4 max-w-xs">
                  <Search size={16} className="text-gray-500 mr-2" />
                  <input
                    placeholder="Search by week..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-sm text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {loading ? (
                <div className="text-gray-500 text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2">Loading...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAllowances.map(record => (
                    <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">Week {record.weekNumber}</h3>
                          <p className="text-sm text-gray-600">{new Date(record.createdAt?.toDate?.() || record.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Total</p>
                          <p className="font-medium text-gray-900">GHS {record.totalSum?.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Each Teacher</p>
                          <p className="font-medium text-gray-900">GHS {record.eachTeacher?.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Each JHS</p>
                          <p className="font-medium text-gray-900">GHS {record.eachJHSTeacher?.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredAllowances.length === 0 && (
                    <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                      <History size={32} className="mx-auto mb-2 text-gray-400" />
                      <p>No calculations found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Reports</h2>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-32 rounded-xl flex items-center justify-center border border-blue-200">
                  <div className="text-center">
                    <FileText size={32} className="mx-auto mb-2 text-blue-500" />
                    <p className="text-blue-700 font-medium">Generate Full Report</p>
                    <p className="text-blue-600 text-sm">PDF export coming soon</p>
                  </div>
                </div>

                <button
                  onClick={handleExport}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                >
                  <Download size={20} />
                  <span>Generate PDF Report</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllowanceModuleScreen;
