import { useState } from 'react';
import { Calculator, BarChart3 } from 'lucide-react';
import { useAllowance } from '../hooks/useAllowance';
import AllowanceDashboard from '../components/allowance/AllowanceDashboard';
import AllowanceCalculator from '../components/allowance/AllowanceCalculator';
import AllowanceHistory from '../components/allowance/AllowanceHistory';
import AllowanceReports from '../components/allowance/AllowanceReports';
import { generatePdfReport } from '../components/allowance/AllowancePDF';

const AllowanceModuleScreen = () => {
  const {
    allowances,
    loading,
    summary,
    addAllowance,
    checkWeekExists
  } = useAllowance();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'calculator', 'history', 'reports'
  const [showCalculator, setShowCalculator] = useState(false);

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
        {activeTab === 'dashboard' && (
          <AllowanceDashboard
            summary={summary}
            allowances={allowances}
            loading={loading}
            showCalculator={showCalculator}
            setShowCalculator={setShowCalculator}
            generatePdfReport={() => generatePdfReport(() => { })}
          />
        )}

        {activeTab === 'calculator' && (
          <AllowanceCalculator
            addAllowance={addAllowance}
            checkWeekExists={checkWeekExists}
          />
        )}

        {activeTab === 'history' && (
          <AllowanceHistory
            allowances={allowances}
            loading={loading}
          />
        )}

        {activeTab === 'reports' && (
          <AllowanceReports
            allowances={allowances}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default AllowanceModuleScreen;