import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, Search, Plus, Download, Clock, Users, TrendingUp, BarChart3, PieChart, Menu, X, ChevronDown, Filter } from 'lucide-react';
import { useTeachers } from '../hooks/useTeachers';
import { useAttendance } from '../hooks/useAttendance';


const Attendance = () => {
  const { records, loading, error, loadByDate, saveRecord, updateRecord, stats, getWeekNumber } = useAttendance();
  const { teachers } = useTeachers();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ teacherId: '', checkInTime: '', checkOutTime: '', status: 'present', remarks: '' });
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
          
          {/* Mobile Navigation Tabs */}
          <div className="flex mt-3 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('records')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeView === 'records' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Records
            </button>
            <button
              onClick={() => setActiveView('analytics')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeView === 'analytics' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* Records View */}
        {activeView === 'records' && (
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className={`p-2 rounded-lg transition-colors ${
                    showAddForm 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {showAddForm ? <X size={20} /> : <Plus size={20} />}
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus size={18} />
                  <span className="text-sm font-medium">Mark Attendance</span>
                </button>
                <button
                  onClick={handleExport}
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={18} />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>

              {/* Add Form (Collapsible) */}
              {showAddForm && (
                <div className="border-t border-gray-200 pt-4 mt-4 animate-in slide-in-from-top-2">
                  <h3 className="text-md font-medium text-gray-800 mb-3">Mark Attendance</h3>
                  <div className="space-y-3">
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
              )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronDown size={20} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              <div className={`space-y-3 ${!showFilters ? 'hidden' : ''}`}>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <Calendar size={18} className="text-gray-500 mr-2" />
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="bg-transparent border-none outline-none w-full text-gray-900" 
                  />
                </div>
                
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <Search size={18} className="text-gray-500 mr-2" />
                  <input 
                    placeholder="Search by name or department" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-500" 
                  />
                </div>
              </div>

              {/* Always visible date and search on mobile */}
              <div className={`space-y-3 ${showFilters ? 'hidden' : ''}`}>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                    <Calendar size={18} className="text-gray-500 mr-2" />
                    <input 
                      type="date" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                      className="bg-transparent border-none outline-none w-full text-gray-900" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Records List */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Today's Records</h2>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 ml-4 max-w-xs">
                  <Search size={16} className="text-gray-500 mr-2" />
                  <input 
                    placeholder="Search..." 
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
              ) : error ? (
                <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg">
                  <p>Error: {error}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map(record => (
                    <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{record.fullname}</h3>
                          <p className="text-sm text-gray-600">{record.department}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status || 'Unknown'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Check-in</p>
                          <p className="font-medium text-gray-900">{record.checkInTime || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Check-out</p>
                          <p className="font-medium text-gray-900">{record.checkOutTime || '-'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Hours</p>
                          <p className="font-medium text-gray-900">{(record.workHours || 0).toFixed(1)}h</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                      <Users size={32} className="mx-auto mb-2 text-gray-400" />
                      <p>No records found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics View */}
        {activeView === 'analytics' && (
          <div className="space-y-4">
            {/* Stats Overview */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600">{stats.daily.totalRecords}</div>
                  <div className="text-sm text-blue-600 font-medium">Total</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
                  <div className="text-2xl font-bold text-green-600">{stats.daily.presentCount}</div>
                  <div className="text-sm text-green-600 font-medium">Present</div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl text-center border border-red-100">
                  <div className="text-2xl font-bold text-red-600">{stats.daily.absentCount}</div>
                  <div className="text-sm text-red-600 font-medium">Absent</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100">
                  <div className="text-2xl font-bold text-yellow-600">{stats.daily.lateCount}</div>
                  <div className="text-sm text-yellow-600 font-medium">Late</div>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-purple-600" />
                    <span className="font-medium text-purple-900">Average Hours</span>
                  </div>
                  <span className="text-xl font-bold text-purple-600">{stats.daily.avgWorkHours}h</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-100">
                  <div className="flex items-center gap-3">
                    <TrendingUp size={20} className="text-cyan-600" />
                    <span className="font-medium text-cyan-900">Half Days</span>
                  </div>
                  <span className="text-xl font-bold text-cyan-600">{stats.daily.halfDayCount}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-indigo-600" />
                    <span className="font-medium text-indigo-900">Week Number</span>
                  </div>
                  <span className="text-xl font-bold text-indigo-600">{getWeekNumber(date)}</span>
                </div>
              </div>
            </div>

            {/* Chart Placeholders */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h2>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-48 rounded-xl flex items-center justify-center border border-blue-200">
                <div className="text-center">
                  <TrendingUp size={32} className="mx-auto mb-2 text-blue-500" />
                  <p className="text-blue-700 font-medium">Line Chart Visualization</p>
                  <p className="text-blue-600 text-sm">Coming Soon</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h2>
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 h-48 rounded-xl flex items-center justify-center border border-green-200">
                <div className="text-center">
                  <PieChart size={32} className="mx-auto mb-2 text-green-500" />
                  <p className="text-green-700 font-medium">Pie Chart Visualization</p>
                  <p className="text-green-600 text-sm">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;