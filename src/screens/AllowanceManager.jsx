import React from 'react';
import { 
  Calculator, 
  DollarSign, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Download,
  Check,
  AlertCircle,
  TrendingUp,
  School,
  Home
} from 'lucide-react';
import { useCalculator } from '../hooks/useCalculator.js';
import { formatCurrency } from '../utils/calculator.js';

const AllowanceManager = () => {
  const {
    inputs,
    results,
    isLoading,
    error,
    currentStep,
    calculationHistory,
    formSteps,
    updateInput,
    calculate,
    resetInputs,
    nextStep,
    prevStep,
    goToStep,
    loadFromHistory,
    exportCalculation,
    isCurrentStepValid,
    canProceed,
    isFirstStep,
    isLastStep,
    currentStepData,
  } = useCalculator();

  const getFieldLabel = (fieldName) => {
    const labels = {
      nurseryAmount: 'Nursery Amount',
      kg1Amount: 'KG1 Amount',
      kg2Amount: 'KG2 Amount',
      basic1Amount: 'Basic 1 Amount',
      basic2Amount: 'Basic 2 Amount',
      basic3Amount: 'Basic 3 Amount',
      basic4Amount: 'Basic 4 Amount',
      basic5Amount: 'Basic 5 Amount',
      basic6Amount: 'Basic 6 Amount',
      basic7GeneralAmount: 'Basic 7 General Amount',
      basic7JHSAmount: 'Basic 7 JHS Amount',
      basic8GeneralAmount: 'Basic 8 General Amount',
      basic8JHSAmount: 'Basic 8 JHS Amount',
      basic9GeneralAmount: 'Basic 9 General Amount',
      basic9JHSAmount: 'Basic 9 JHS Amount',
      welfareAmount: 'Welfare Amount',
      kitchen: 'Kitchen Amount',
      numTeachers: 'Number of Teachers',
      numJHSTeachers: 'Number of JHS Teachers',
    };
    return labels[fieldName] || fieldName;
  };

  const renderInput = (fieldName) => {
    const isNumber = fieldName.includes('num') || fieldName.includes('Teachers');
    
    return (
      <div key={fieldName} className="mb-4">
        <label 
          htmlFor={fieldName} 
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          {getFieldLabel(fieldName)}
        </label>
        <input
          id={fieldName}
          type="number"
          min="0"
          step={isNumber ? "1" : "0.01"}
          value={inputs[fieldName]}
          onChange={(e) => updateInput(fieldName, e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder={isNumber ? "0" : "0.00"}
        />
      </div>
    );
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {formSteps.map((_, index) => (
        <React.Fragment key={index}>
          <div
            onClick={() => goToStep(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-all ${
              index === currentStep
                ? 'bg-blue-600 text-white'
                : index < currentStep
                ? 'bg-green-600 text-white'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
          >
            {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
          </div>
          {index < formSteps.length - 1 && (
            <div 
              className={`w-12 h-1 mx-2 rounded ${
                index < currentStep ? 'bg-green-600' : 'bg-slate-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderResults = () => {
    if (!results) return null;

    return (
      <div className="bg-slate-50 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Calculation Results
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Totals */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-blue-800 font-semibold mb-2">Total General</div>
            <div className="text-2xl font-bold text-blue-900">
              {formatCurrency(results.totals.totalGeneral)}
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-green-800 font-semibold mb-2">Total JHS</div>
            <div className="text-2xl font-bold text-green-900">
              {formatCurrency(results.totals.totalJHS)}
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-purple-800 font-semibold mb-2">Total Sum</div>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrency(results.totals.totalSum)}
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-slate-700 mb-3">Deductions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <div className="text-red-700 text-sm">Welfare</div>
              <div className="text-lg font-bold text-red-800">
                {formatCurrency(results.deductions.welfare)}
              </div>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <div className="text-orange-700 text-sm">Office (5%)</div>
              <div className="text-lg font-bold text-orange-800">
                {formatCurrency(results.deductions.office)}
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="text-yellow-700 text-sm">Kitchen (5%)</div>
              <div className="text-lg font-bold text-yellow-800">
                {formatCurrency(results.deductions.kitchen)}
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Amounts */}
        <div>
          <h4 className="text-lg font-semibold text-slate-700 mb-3">Teacher Allocations</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <div className="text-indigo-700 text-sm mb-1">Each General Teacher</div>
              <div className="text-xl font-bold text-indigo-900">
                {formatCurrency(results.teacherAmounts.eachTeacherAmount)}
              </div>
              <div className="text-xs text-indigo-600 mt-1">
                {inputs.numTeachers} teachers
              </div>
            </div>
            
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
              <div className="text-teal-700 text-sm mb-1">Each JHS Teacher</div>
              <div className="text-xl font-bold text-teal-900">
                {formatCurrency(results.teacherAmounts.eachJHSTeacherAmount)}
              </div>
              <div className="text-xs text-teal-600 mt-1">
                {inputs.numJHSTeachers} JHS teachers
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCalculationHistory = () => {
    if (calculationHistory.length === 0) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Calculations</h3>
        <div className="space-y-3">
          {calculationHistory.slice(0, 5).map((calc) => (
            <div 
              key={calc.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              onClick={() => loadFromHistory(calc)}
            >
              <div>
                <div className="text-sm font-medium text-slate-700">
                  Total: {formatCurrency(calc.results.totals.totalSum)}
                </div>
                <div className="text-xs text-slate-500">
                  {new Date(calc.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    exportCalculation(calc.id, 'json');
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Export as JSON"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <School className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-slate-800">Classes Fees Distribution Calculator</h1>
          </div>
          <p className="text-slate-600">Calculate teacher allowances based on class fees</p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Current Step Content */}
          <div className="mb-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                {currentStepData?.title}
              </h2>
              <p className="text-slate-600 text-sm">
                {currentStepData?.description}
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentStepData?.fields.map(renderInput)}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevStep}
              disabled={isFirstStep}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                isFirstStep
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={resetInputs}
                className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                title="Reset All"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </button>

              {isLastStep ? (
                <button
                  onClick={calculate}
                  disabled={!canProceed || isLoading}
                  className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
                    !canProceed || isLoading
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  {isLoading ? 'Calculating...' : 'Calculate'}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={!canProceed}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                    !canProceed
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300 ease-out"
                style={{ 
                  width: `${((currentStep + 1) / formSteps.length) * 100}%` 
                }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-1 text-center">
              Step {currentStep + 1} of {formSteps.length}
            </div>
          </div>

          {/* Quick Summary */}
          {(inputs.numTeachers > 0 || inputs.numJHSTeachers > 0) && (
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-slate-700 mb-2">Quick Summary</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-slate-500">General Teachers</div>
                  <div className="font-semibold">{inputs.numTeachers}</div>
                </div>
                <div>
                  <div className="text-slate-500">JHS Teachers</div>
                  <div className="font-semibold">{inputs.numJHSTeachers}</div>
                </div>
                <div>
                  <div className="text-slate-500">Welfare</div>
                  <div className="font-semibold">{formatCurrency(inputs.welfareAmount)}</div>
                </div>
                <div>
                  <div className="text-slate-500">Kitchen</div>
                  <div className="font-semibold">{formatCurrency(inputs.kitchen)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {renderResults()}

        {/* Calculation History */}
        {renderCalculationHistory()}

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>© 2024 Classes Fees Distribution Calculator</p>
        </div>
      </div>
    </div>
  );
};

export default AllowanceManager;









// // import Header from "../components/allowance/Header";
// import WeekSelector from "../components/allowance/WeekSelector";
// import InputGrid from "../components/allowance/InputGrid";
// import ResultsPanel from "../components/allowance/ResultsPanel";
// import SummaryCards from "../components/allowance/SummaryCards";
// import DataTable from "../components/allowance/DataTable";
// import useWeeklyCalculator from "../hooks/useWeeklyCalculator";

// export default function AllowanceManager() {
//   const {
//     week, setWeek, form, setForm, result, message,
//     calculate, save, deleteWeek, refreshAll, exportCSV
//   } = useWeeklyCalculator(1);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* <Header /> */}
//       <main className="max-w-5xl mx-auto p-4 space-y-4">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//           <WeekSelector week={week} setWeek={setWeek} />
//           <div className="text-sm text-slate-600">{message}</div>
//         </div>

//         <InputGrid
//           form={form}
//           setForm={setForm}
//           onCalculate={() => { try { calculate(); } catch(e){} }}
//           onSave={() => save()}
//         />

//         <SummaryCards result={result} />

//         <ResultsPanel result={result} week={week} />

//         <DataTable onSelectWeek={(w) => setWeek(Number(w))} />
//       </main>
//       <footer className="py-4 text-center text-xs text-slate-500">
//         Built with React • IndexedDB (Dexie) • Tailwind CSS
//       </footer>
//     </div>
//   );
// }


