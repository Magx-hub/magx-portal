import { forwardRef } from "react";

const PrintView = forwardRef(({ result, week }, ref) => {
  if (!result) return <div ref={ref}>No data available to print</div>;

  return (
    <div ref={ref} className="p-6 text-black font-sans">
      <h2 className="text-2xl font-bold mb-4">Teacher Payment Report</h2>
      <p className="mb-2">Week: {week}</p>
      <p>Date: {new Date().toLocaleDateString()}</p>

      <hr className="my-4 border-gray-400" />

      <table className="w-full text-sm border border-gray-400">
        <tbody>
          <tr className="border-b">
            <td className="p-2 font-semibold">Total Amount</td>
            <td className="p-2">GHS {result.total_amount.toFixed(2)}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-semibold">Per Teacher</td>
            <td className="p-2">GHS {result.per_teacher.toFixed(2)}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-semibold">Special / JHS Teacher</td>
            <td className="p-2">GHS {result.special_per_jhs_teacher.toFixed(2)}</td>
          </tr>
          <tr className="border-b">
            <td className="p-2 font-semibold">Total Deductions</td>
            <td className="p-2">GHS {result.total_deductions.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <h3 className="mt-6 mb-2 font-semibold">Detailed Breakdown</h3>
      <pre className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">
Balance After Welfare: GHS {result.balance_after_welfare.toFixed(2)}
Office Deduction: GHS {result.office_deduction.toFixed(2)}
Balance After Office: GHS {result.balance_after_office.toFixed(2)}
Kitchen Deduction: GHS {result.kitchen_deduction.toFixed(2)}
Balance After Kitchen: GHS {result.balance_after_kitchen.toFixed(2)}
      </pre>
    </div>
  );
});

export default PrintView;
