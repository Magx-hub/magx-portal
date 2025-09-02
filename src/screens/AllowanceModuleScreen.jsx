import React, { useEffect, useMemo, useState } from 'react';
import { Calculator, History, FileText, BarChart3, Users, TrendingUp, Plus, Download, Search, Menu, X, ChevronDown, Filter } from 'lucide-react';
import { useAllowance } from '../hooks/useAllowance';
import { getAllowanceRecords, getWelfareRecords, getAllowanceRecordByWeek } from '../services/allowanceService';
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

  // Report states
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [reportView, setReportView] = useState('overview'); // 'overview', 'detail', 'weekly'
  const [weekNumber, setWeekNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('week'); // 'week', 'range'

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
      // Get all calculations
      const { records: calculations } = await getAllowanceRecords();

      // Get welfare payments
      const { records: welfarePayments } = await getWelfareRecords();

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
              <p>Total Amount: GHS ${calculations.reduce((sum, calc) => sum + (calc.totalSum || 0), 0).toFixed(2)}</p>
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
                    <td>${calc.createdAt ? new Date(calc.createdAt.toDate ? calc.createdAt.toDate() : calc.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td>GHS ${(calc.totalSum || 0).toFixed(2)}</td>
                    <td>GHS ${(calc.eachTeacher || 0).toFixed(2)}</td>
                    <td>GHS ${(calc.eachJHSTeacher || 0).toFixed(2)}</td>
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
                    <td>GHS ${(payment.welfare || 0).toFixed(2)}</td>
                    <td>${payment.datePaid || 'N/A'}</td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td colspan="2">Total Welfare Payments</td>
                  <td>GHS ${welfarePayments.reduce((sum, payment) => sum + (payment.welfare || 0), 0).toFixed(2)}</td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `;

      // For web environment, we'll use a different approach since Print and shareAsync are for React Native
      // Create a blob and download it
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `allowance-report-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Report downloaded successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setLoadingState(false);
    }
  };




  // Generate weekly report PDF
  const generateWeeklyPdf = async () => {
    if (!weekNumber) {
      toast.error('Please enter a week number');
      return;
    }

    setLoadingState(true);

    try {
      const record = await getAllowanceRecordByWeek(parseInt(weekNumber, 10));

      if (!record) {
        toast.error('No data found for the specified week');
        return;
      }

      const htmlContent = `
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
            </style>
          </head>
          <body>
            <h1>Weekly Allowance Report</h1>
            <h2>Week ${record.weekNumber}</h2>

            <table>
              <tr>
                <th>Description</th>
                <th>Amount (GHS)</th>
              </tr>
              <tr>
                <td>Total Sum</td>
                <td>${(record.totalSum || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Welfare</td>
                <td>${(record.welfare || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Office (5%)</td>
                <td>${(record.office || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Kitchen (5%)</td>
                <td>${(record.kitchen || 0).toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td>Balance After Deductions</td>
                <td>${(record.balanceAfterKitchen || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Each Teacher (${record.numberOfTeachers || 0})</td>
                <td>${(record.eachTeacher || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Each JHS Teacher (${record.numberOfJHSTeachers || 0})</td>
                <td>${(record.eachJHSTeacher || 0).toFixed(2)}</td>
              </tr>
            </table>
          </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `weekly-report-week-${weekNumber}-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Weekly report downloaded successfully!');
    } catch (error) {
      console.error('Error generating weekly report:', error);
      toast.error('Failed to generate weekly report');
    } finally {
      setLoadingState(false);
    }
  };

  // Generate date range report PDF
  const generateDateRangePdf = async () => {
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    setLoadingState(true);

    try {
      const allRecords = await getAllowanceRecords();
      const records = allRecords.records.filter(record => {
        if (!record.createdAt) return false;
        const recordDate = record.createdAt.toDate ? record.createdAt.toDate() : new Date(record.createdAt);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return recordDate >= start && recordDate <= end;
      });

      if (!records || records.length === 0) {
        toast.error('No data found for the specified date range');
        return;
      }

      const totalSum = records.reduce((sum, record) => sum + (record.totalSum || 0), 0);
      const totalWelfare = records.reduce((sum, record) => sum + (record.welfare || 0), 0);
      const totalOffice = records.reduce((sum, record) => sum + (record.office || 0), 0);
      const totalKitchen = records.reduce((sum, record) => sum + (record.kitchen || 0), 0);
      const totalBalance = records.reduce((sum, record) => sum + (record.balanceAfterKitchen || 0), 0);

      const htmlContent = `
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
            </style>
          </head>
          <body>
            <h1>Date Range Allowance Report</h1>
            <h2>${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}</h2>

            <table>
              <tr>
                <th>Week</th>
                <th>Date</th>
                <th>Total Sum</th>
                <th>Each Teacher</th>
                <th>Each JHS Teacher</th>
              </tr>
              ${records.map(record => `
                <tr>
                  <td>${record.weekNumber}</td>
                  <td>${record.createdAt ? (record.createdAt.toDate ? record.createdAt.toDate() : new Date(record.createdAt)).toLocaleDateString() : 'N/A'}</td>
                  <td>${(record.totalSum || 0).toFixed(2)}</td>
                  <td>${(record.eachTeacher || 0).toFixed(2)}</td>
                  <td>${(record.eachJHSTeacher || 0).toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="2">Totals</td>
                <td>${totalSum.toFixed(2)}</td>
                <td colspan="2"></td>
              </tr>
            </table>
          </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `date-range-report-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Date range report downloaded successfully!');
    } catch (error) {
      console.error('Error generating date range report:', error);
      toast.error('Failed to generate date range report');
    } finally {
      setLoadingState(false);
    }
  };

  // Generate detailed report PDF for individual record
  const generateDetailPdf = async (record) => {
    if (!record) return;

    setLoadingState(true);

    try {
      const htmlContent = `
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
            <h2>Week ${record.weekNumber} - ${record.createdAt ? (record.createdAt.toDate ? record.createdAt.toDate() : new Date(record.createdAt)).toLocaleDateString() : 'N/A'}</h2>

            <div class="section">
              <h3>Class Contributions</h3>
              <table>
                <tr>
                  <th>Class</th>
                  <th>Amount (GHS)</th>
                </tr>
                <tr><td>Creche</td><td>${(record.creche || 0).toFixed(2)}</td></tr>
                <tr><td>Nursery 1</td><td>${(record.nursery1 || 0).toFixed(2)}</td></tr>
                <tr><td>Nursery 2</td><td>${(record.nursery2 || 0).toFixed(2)}</td></tr>
                <tr><td>KG 1</td><td>${(record.kg1 || 0).toFixed(2)}</td></tr>
                <tr><td>KG 2</td><td>${(record.kg2 || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 1</td><td>${(record.basic1 || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 2</td><td>${(record.basic2 || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 3</td><td>${(record.basic3 || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 4</td><td>${(record.basic4 || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 5</td><td>${(record.basic5 || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 6</td><td>${(record.basic6 || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 7 (General)</td><td>${(record.basic7General || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 7 (JHS)</td><td>${(record.basic7JHS || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 8 (General)</td><td>${(record.basic8General || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 8 (JHS)</td><td>${(record.basic8JHS || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 9 (General)</td><td>${(record.basic9General || 0).toFixed(2)}</td></tr>
                <tr><td>Basic 9 (JHS)</td><td>${(record.basic9JHS || 0).toFixed(2)}</td></tr>
                <tr class="total-row">
                  <td>Total Sum</td>
                  <td>${(record.totalSum || 0).toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <div class="section">
              <h3>Deductions</h3>
              <table>
                <tr>
                  <th>Item</th>
                  <th>Amount (GHS)</th>
                  <th>Balance After</th>
                </tr>
                <tr>
                  <td>Welfare</td>
                  <td>${(record.welfare || 0).toFixed(2)}</td>
                  <td>${(record.balanceAfterWelfare || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Office (5%)</td>
                  <td>${(record.office || 0).toFixed(2)}</td>
                  <td>${(record.balanceAfterOffice || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Kitchen (5%)</td>
                  <td>${(record.kitchen || 0).toFixed(2)}</td>
                  <td>${(record.balanceAfterKitchen || 0).toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <div class="section">
              <h3>Teacher Payments</h3>
              <table>
                <tr>
                  <th>Description</th>
                  <th>Amount (GHS)</th>
                </tr>
                <tr>
                  <td>Regular Teachers (${record.numberOfTeachers || 0})</td>
                  <td>${(record.eachTeacher || 0).toFixed(2)} each</td>
                </tr>
                <tr>
                  <td>JHS Teachers (${record.numberOfJHSTeachers || 0})</td>
                  <td>${(record.eachJHSTeacher || 0).toFixed(2)} each</td>
                </tr>
              </table>
            </div>
          </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `detail-report-week-${record.weekNumber}-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Detailed report downloaded successfully!');
    } catch (error) {
      console.error('Error generating detailed report:', error);
      toast.error('Failed to generate detailed report');
    } finally {
      setLoadingState(false);
    }
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
            {/* Report Type Selection */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Reports</h2>

              <div className="grid grid-cols-1 gap-4">
                {/* Full Report */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={24} className="text-blue-500" />
                      <div>
                        <p className="text-blue-700 font-medium">Full Report</p>
                        <p className="text-blue-600 text-sm">All calculations and welfare payments</p>
                      </div>
                    </div>
                    <button
                      onClick={generatePdfReport}
                      disabled={loadingState}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                    >
                      {loadingState ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          <span>Generate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Weekly Report */}
                <div className="bg-white border border-gray-200 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <BarChart3 size={24} className="text-green-500" />
                      <div>
                        <p className="text-gray-900 font-medium">Weekly Report</p>
                        <p className="text-gray-600 text-sm">Generate report for specific week</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Week number (1-52)"
                      value={weekNumber}
                      onChange={(e) => setWeekNumber(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    />
                    <button
                      onClick={generateWeeklyPdf}
                      disabled={loadingState || !weekNumber}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                    >
                      <Download size={16} />
                      <span>Generate</span>
                    </button>
                  </div>
                </div>

                {/* Date Range Report */}
                <div className="bg-white border border-gray-200 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <TrendingUp size={24} className="text-purple-500" />
                      <div>
                        <p className="text-gray-900 font-medium">Date Range Report</p>
                        <p className="text-gray-600 text-sm">Generate report for date range</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    onClick={generateDateRangePdf}
                    disabled={loadingState || !startDate || !endDate}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                  >
                    <Download size={16} />
                    <span>Generate Date Range Report</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Calculations with Detail View */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Calculations</h2>

              {loading ? (
                <div className="text-gray-500 text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2">Loading...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allowances.slice(0, 10).map(record => (
                    <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">Week {record.weekNumber}</h3>
                          <p className="text-sm text-gray-600">{new Date(record.createdAt?.toDate?.() || record.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button
                          onClick={() => generateDetailPdf(record)}
                          disabled={loadingState}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-1 rounded-lg flex items-center gap-1 font-medium transition-colors text-sm"
                        >
                          <Download size={14} />
                          <span>Detail PDF</span>
                        </button>
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
                      <FileText size={32} className="mx-auto mb-2 text-gray-400" />
                      <p>No calculations found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllowanceModuleScreen;
