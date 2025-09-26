// # src/components/ResultsPanel.jsx
import React from "react";

export default function ResultsPanel({ result, week }) {
  if (!result) return (
    <div className="p-4 bg-white rounded shadow text-slate-500">No results yet</div>
  );

  return (
    <div className="p-4 bg-white rounded shadow space-y-3">
      <h2 className="font-semibold">Results — Week {week}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <div className="text-sm text-slate-600">Total Amount</div>
          <div className="text-lg font-bold">GHS {result.total_amount.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Per Teacher (Regular)</div>
          <div className="text-lg font-bold">GHS {result.per_teacher.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Special / JHS Teacher</div>
          <div className="text-lg font-bold">GHS {result.special_per_jhs_teacher.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Total Deductions</div>
          <div className="text-lg font-bold">GHS {result.total_deductions.toFixed(2)}</div>
        </div>
      </div>

      <pre className="bg-slate-50 p-3 rounded text-sm overflow-auto">
{`Balance After Welfare: GHS ${result.balance_after_welfare.toFixed(2)}
Office Deduction: GHS ${result.office_deduction.toFixed(2)}
Balance After Office: GHS ${result.balance_after_office.toFixed(2)}
Kitchen Deduction: GHS ${result.kitchen_deduction.toFixed(2)}
Balance After Kitchen: GHS ${result.balance_after_kitchen.toFixed(2)}`}
      </pre>
    </div>
  );
}
