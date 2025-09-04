
import { useEffect, useMemo, useState } from 'react';
import { BarChart3, Users } from 'lucide-react';
import { useTeachers } from '../hooks/useTeachers';
import { useAttendance } from '../hooks/useAttendance';
import AttendanceTabs from '../components/attendance/AttendanceTabs';
import SearchAndFilters from '../components/attendance/SearchAndFilters';
import ActionButtons from '../components/attendance/ActionButtons';
import AttendanceForm from '../components/attendance/AttendanceForm';
import AttendanceList from '../components/attendance/AttendanceList';
import AnalyticsView from '../components/attendance/AnalyticsView';
import { generatePdf } from '../utils/pdfGenerator';

const AttendanceModuleScreen = () => {
  const { records, loading, error, loadByDate, saveRecord, stats, getWeekNumber } = useAttendance();
  const { teachers } = useTeachers();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ weekNum: '', teacherId: '', checkInTime: '', checkOutTime: '', status: 'present', remarks: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState('records'); // 'records' or 'analytics'

  useEffect(() => { 
    loadByDate(date); 
  }, [date, loadByDate]);

  const filtered = useMemo(() => {
    if (!search) return records;
    const q = search.toLowerCase();
    return records.filter(r => 
      (r.fullname || '').toLowerCase().includes(q) || 
      (r.department || '').toLowerCase().includes(q)
    );
  }, [records, search]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.teacherId) return;
    await saveRecord({ ...form, date });
    setForm({ teacherId: '', checkInTime: '', checkOutTime: '', status: 'present', remarks: '' });
    setShowAddForm(false);
  };

  const handleExport = async () => {
    const filters = { reportType: 'all', startDate: date, endDate: date };
    await generatePdf(filtered, filters);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50';
      case 'absent': return 'text-red-600 bg-red-50';
      case 'late': return 'text-yellow-600 bg-yellow-50';
      case 'half-day': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Attendance</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView(activeView === 'records' ? 'analytics' : 'records')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {activeView === 'records' ? <BarChart3 size={20} /> : <Users size={20} />}
              </button>
            </div>
          </div>
          
          <AttendanceTabs activeView={activeView} setActiveView={setActiveView} />
        </div>
      </div>

      <div className="p-4 pb-20">
        {activeView === 'records' && (
          <div className="space-y-4">
            <ActionButtons 
              showAddForm={showAddForm} 
              setShowAddForm={setShowAddForm} 
              handleExport={handleExport} 
            />

            {showAddForm && (
              <AttendanceForm 
                form={form} 
                setForm={setForm} 
                teachers={teachers} 
                handleAdd={handleAdd} 
              />
            )}

            <SearchAndFilters 
              date={date} 
              setDate={setDate} 
              search={search} 
              setSearch={setSearch} 
              showFilters={showFilters} 
              setShowFilters={setShowFilters} 
            />

            <AttendanceList 
              filtered={filtered} 
              loading={loading} 
              error={error} 
              getStatusColor={getStatusColor} 
            />
          </div>
        )}

        {activeView === 'analytics' && (
          <AnalyticsView 
            stats={stats} 
            getWeekNumber={getWeekNumber} 
            date={date} 
          />
        )}
      </div>
    </div>
  );
};

export default AttendanceModuleScreen;
