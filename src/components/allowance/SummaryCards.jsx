// # src/components/SummaryCards.jsx

export default function SummaryCards({ result }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-white p-3 rounded shadow">
        <div className="text-sm text-slate-500">Total Amount</div>
        <div className="text-lg font-bold">GHS {(result?.total_amount ?? 0).toFixed(2)}</div>
      </div>
      <div className="bg-white p-3 rounded shadow">
        <div className="text-sm text-slate-500">Per Teacher</div>
        <div className="text-lg font-bold">GHS {(result?.per_teacher ?? 0).toFixed(2)}</div>
      </div>
      <div className="bg-white p-3 rounded shadow">
        <div className="text-sm text-slate-500">JHS Extra / Teacher</div>
        <div className="text-lg font-bold">GHS {(result?.special_per_jhs_teacher ?? 0).toFixed(2)}</div>
      </div>
      <div className="bg-white p-3 rounded shadow">
        <div className="text-sm text-slate-500">Total Deductions</div>
        <div className="text-lg font-bold">GHS {(result?.total_deductions ?? 0).toFixed(2)}</div>
      </div>
    </div>
  );
}