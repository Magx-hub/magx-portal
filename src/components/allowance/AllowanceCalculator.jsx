
import { useState } from 'react';
import { Calculator, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const AllowanceCalculator = ({ addAllowance, checkWeekExists }) => {
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
    } catch (error) {
      toast.error('Failed to save calculation');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">New Calculation</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="number"
              placeholder="Week Number (1-16)"
              value={calcForm.weekNumber}
              onChange={(e) => setCalcForm({ ...calcForm, weekNumber: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Number of Teachers"
              value={calcForm.numberOfTeachers}
              onChange={(e) => setCalcForm({ ...calcForm, numberOfTeachers: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Number of JHS Teachers"
              value={calcForm.numberOfJHSTeachers}
              onChange={(e) => setCalcForm({ ...calcForm, numberOfJHSTeachers: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Welfare Amount"
              value={calcForm.welfareAmount}
              onChange={(e) => setCalcForm({ ...calcForm, welfareAmount: e.target.value })}
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
                  classAmounts: { ...calcForm.classAmounts, [key]: e.target.value }
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
  );
};

export default AllowanceCalculator;
