
import React, { useEffect } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AttendanceForm = ({ form, setForm, teachers, handleAdd, getWeekNumber }) => {
  const { userRole } = useAuth();

  // Auto-set today's date and week number when form opens
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const weekNum = getWeekNumber ? getWeekNumber(today) : '';
    
    if (!form.attendanceDate) {
      setForm(prev => ({ 
        ...prev, 
        attendanceDate: today,
        weekNum: weekNum || prev.weekNum
      }));
    }
  }, [form.attendanceDate, setForm, getWeekNumber]);

  const handleDateChange = (date) => {
    const weekNum = getWeekNumber ? getWeekNumber(date) : '';
    setForm(prev => ({ 
      ...prev, 
      attendanceDate: date,
      weekNum: weekNum || prev.weekNum
    }));
  };
  return (
    <div className="border-t border-gray-200 pt-4 mt-4 animate-in slide-in-from-top-2">
      <h3 className="text-md font-medium text-gray-800 mb-3">Mark Attendance</h3>
      <div className="space-y-3">
        {/* Date Selection - Always visible for teachers, auto-set to today */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <Calendar size={16} className="inline mr-1" />
            Attendance Date
          </label>
          <input
            type="date"
            value={form.attendanceDate || ''}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {/* Week Number - Auto-calculated but editable for teachers */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Week Number
            {form.weekNum && <span className="text-xs text-gray-500 ml-1">(Auto-calculated)</span>}
          </label>
          <input
            type="number"
            value={form.weekNum || ''}
            onChange={(e) => setForm({ ...form, weekNum: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Week Number (auto-calculated)"
            min={1}
            max={53}
            title="Week number is automatically calculated based on the selected date, but can be manually adjusted if needed"
          />
        </div>
        <select 
          value={form.teacherId} 
          onChange={(e) => setForm({ ...form, teacherId: e.target.value })} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        >
          <option value="">Select teacher</option>
          {teachers.map(t => <option key={t.id} value={t.id}>{t.fullname}</option>)}
        </select>
        
        <div className="grid grid-cols-2 gap-3">
          <input 
            type="time" 
            value={form.checkInTime} 
            onChange={(e) => setForm({ ...form, checkInTime: e.target.value })} 
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Check-in" 
          />
          <input 
            type="time" 
            value={form.checkOutTime} 
            onChange={(e) => setForm({ ...form, checkOutTime: e.target.value })} 
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Check-out" 
          />
        </div>
        
        <select 
          value={form.status} 
          onChange={(e) => setForm({ ...form, status: e.target.value })} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
          <option value="half-day">Half Day</option>
        </select>

        <input 
          type="text" 
          value={form.remarks} 
          onChange={(e) => setForm({ ...form, remarks: e.target.value })} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Remarks (optional)" 
        />
        
        <button 
          onClick={handleAdd} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Plus size={20} />
          <span>Save Attendance</span>
        </button>
      </div>
    </div>
  );
};

export default AttendanceForm;
