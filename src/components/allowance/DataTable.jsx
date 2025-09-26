// DataTable component for allowance management
import React, { useEffect, useState } from "react";
import * as db from "../../services/allowanceFirebaseService";

export default function DataTable({ onSelectWeek }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const load = async () => {
    setLoading(true);
    try {
      const all = await db.getAllWeeks();
      // normalize percent values if saved as full percent numbers
      setRows(all);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    load(); 
    
    // Add responsive listener
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Columns to display on small screens
  const priorityColumns = ['week_number', 'total_amount', 'per_teacher'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-lg font-semibold text-neutral-800">Weekly Data</h3>
        <div className="flex gap-2">
          <button 
            onClick={load} 
            className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-md text-sm font-medium transition-colors"
          >
            Refresh
          </button>
          <button 
            onClick={() => db.exportCSV()} 
            className="px-3 py-1.5 bg-success-600 hover:bg-success-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : rows.length > 0 ? (
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-sm">
            <thead className="text-left text-neutral-600 border-b border-neutral-200">
              <tr>
                <th className="py-3 pr-4 font-medium">Week</th>
                <th className="py-3 pr-4 font-medium">Total</th>
                {!isSmallScreen && <th className="py-3 pr-4 font-medium">Welfare</th>}
                {!isSmallScreen && <th className="py-3 pr-4 font-medium">Office %</th>}
                {!isSmallScreen && <th className="py-3 pr-4 font-medium">Kitchen %</th>}
                {!isSmallScreen && <th className="py-3 pr-4 font-medium">Teachers</th>}
                <th className="py-3 pr-4 font-medium">Per Teacher</th>
                {!isSmallScreen && <th className="py-3 pr-4 font-medium">Created</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr 
                  key={r.week_number} 
                  className="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors" 
                  onDoubleClick={() => onSelectWeek(r.week_number)}
                >
                  <td className="py-3 pr-4 font-medium">{r.week_number}</td>
                  <td className="py-3 pr-4">GHS {Number(r.total_amount).toFixed(2)}</td>
                  {!isSmallScreen && <td className="py-3 pr-4">GHS {Number(r.welfare_amount).toFixed(2)}</td>}
                  {!isSmallScreen && <td className="py-3 pr-4">{Number(r.office_percent).toFixed(1)}%</td>}
                  {!isSmallScreen && <td className="py-3 pr-4">{Number(r.kitchen_percent).toFixed(1)}%</td>}
                  {!isSmallScreen && <td className="py-3 pr-4">{r.num_teachers}</td>}
                  <td className="py-3 pr-4">GHS {Number(r.per_teacher).toFixed(2)}</td>
                  {!isSmallScreen && <td className="py-3 pr-4">{r.created_at ? r.created_at.slice(0,10) : ""}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 text-center text-neutral-500">
          No data available
        </div>
      )}
    </div>
  );
}
