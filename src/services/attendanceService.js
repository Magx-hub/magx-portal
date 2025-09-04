import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  getDoc,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { calculateWorkHours, determineStatus, calculateAcademicWeek, sanitizeInput } from '../utils/attendanceUtils';
import { getTeacherById, getAllTeachers } from './teacherService';

// Collection reference
const COLLECTION_NAME = 'attendance';
const attendanceCollection = collection(db, COLLECTION_NAME);

// ===========================================
// CORE ATTENDANCE OPERATIONS
// ===========================================

export const submitAttendanceRecord = async ({ teacherId, date, checkInTime, checkOutTime, status, remarks, weekNum }) => {
  const safeTeacherId = sanitizeInput(String(teacherId || ''), 'text');
  const safeDate = sanitizeInput(date || '', 'date');
  const safeCheckIn = sanitizeInput(checkInTime || '', 'time');
  const safeCheckOut = sanitizeInput(checkOutTime || '', 'time');
  const computedStatus = status || determineStatus(safeCheckIn);
  const finalWeekNum = weekNum || calculateAcademicWeek(safeDate);
  const workHours = calculateWorkHours(safeCheckIn, safeCheckOut);
  
  const teacher = await getTeacherById(safeTeacherId);

  const payload = {
    teacherId: safeTeacherId,
    fullname: teacher.fullname,
    department: teacher.department,
    date: safeDate,
    weekNum: finalWeekNum,
    checkInTime: safeCheckIn || null,
    checkOutTime: safeCheckOut || null,
    workHours: Number.isFinite(workHours) ? workHours : 0,
    status: computedStatus,
    remarks: (remarks || '').trim(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const docRef = await addDoc(attendanceCollection, payload);
  return docRef.id;
};

export const updateAttendanceRecordById = async (id, updates) => {
  const safe = {
    ...(updates.checkInTime !== undefined ? { checkInTime: sanitizeInput(updates.checkInTime || '', 'time') || null } : {}),
    ...(updates.checkOutTime !== undefined ? { checkOutTime: sanitizeInput(updates.checkOutTime || '', 'time') || null } : {}),
    ...(updates.status !== undefined ? { status: updates.status } : {}),
    ...(updates.remarks !== undefined ? { remarks: (updates.remarks || '').trim() } : {}),
    ...(updates.weekNum !== undefined ? { weekNum: updates.weekNum } : {}),
  };

  if (safe.checkInTime !== undefined || safe.checkOutTime !== undefined) {
    const hours = calculateWorkHours(safe.checkInTime, safe.checkOutTime);
    safe.workHours = Number.isFinite(hours) ? hours : 0;
    if (!safe.status && safe.checkInTime) {
      safe.status = determineStatus(safe.checkInTime);
    }
  }

  safe.updatedAt = serverTimestamp();
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, safe);
  return true;
};

export const fetchAttendanceByDate = async (date) => {
  const safeDate = sanitizeInput(date || '', 'date');
  const q = query(attendanceCollection, where('date', '==', safeDate), orderBy('fullname', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => mapAttendanceRecord({ id: doc.id, ...doc.data() }));
};

export const fetchAttendanceByTeacherRange = async (teacherId, startDate, endDate) => {
  const q = query(
    attendanceCollection,
    where('teacherId', '==', teacherId),
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => mapAttendanceRecord({ id: doc.id, ...doc.data() }));
};

export const getAttendanceByDateRange = async (startDate, endDate, filters = {}) => {
  let q = query(
    attendanceCollection, 
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date', 'desc')
  );
  
  if (filters.teacherId) {
    q = query(q, where('teacherId', '==', filters.teacherId));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => mapAttendanceRecord({ id: doc.id, ...doc.data() }));
};

export const getAttendanceById = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return mapAttendanceRecord({ id: docSnap.id, ...docSnap.data() });
  }
  return null;
};

export const deleteAttendanceRecord = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
  return true;
};

// ===========================================
// ANALYTICS & REPORTING
// ===========================================

export const computeDailyStats = (records) => {
  const totals = {
    totalRecords: records.length,
    presentCount: 0,
    absentCount: 0,
    lateCount: 0,
    halfDayCount: 0,
    avgWorkHours: 0,
  };

  let sumHours = 0;
  records.forEach(r => {
    if (r.status === 'Present') totals.presentCount += 1;
    if (r.status === 'Absent') totals.absentCount += 1;
    if (r.status === 'Late' || r.status === 'Very Late') totals.lateCount += 1;
    if (r.status === 'Half Day') totals.halfDayCount += 1;
    sumHours += r.workHours || 0;
  });
  totals.avgWorkHours = records.length > 0 ? Number((sumHours / records.length).toFixed(2)) : 0;
  return totals;
};

export const computeWeeklyStats = (records) => {
  const byTeacher = new Map();
  for (const r of records) {
    const key = r.teacherId || 'unknown';
    if (!byTeacher.has(key)) {
      byTeacher.set(key, { 
        fullname: r.fullname || 'Unknown', 
        department: r.department || 'Unknown', 
        daysTracked: 0, 
        presentDays: 0, 
        totalWorkHours: 0, 
        avgWorkHours: 0 
      });
    }
    const agg = byTeacher.get(key);
    agg.daysTracked += 1;
    if (r.status === 'Present') agg.presentDays += 1;
    agg.totalWorkHours += r.workHours || 0;
  }
  byTeacher.forEach(agg => {
    agg.avgWorkHours = agg.daysTracked > 0 ? Number((agg.totalWorkHours / agg.daysTracked).toFixed(2)) : 0;
  });
  return Array.from(byTeacher.values()).sort((a, b) => a.fullname.localeCompare(b.fullname));
};

export const getTeacherAttendanceSummary = async (teacherId, month, year) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const q = query(
    attendanceCollection, 
    where('teacherId', '==', teacherId),
    where('date', '>=', startDate.toISOString().slice(0,10)),
    where('date', '<=', endDate.toISOString().slice(0,10))
  );

  const querySnapshot = await getDocs(q);
  const records = querySnapshot.docs.map(doc => doc.data());

  const totalDays = records.length;
  const presentDays = records.filter(r => r.status === 'Present').length;
  const absentDays = records.filter(r => r.status === 'Absent').length;
  const lateDays = records.filter(r => r.status === 'Late' || r.status === 'Very Late').length;
  const halfDays = records.filter(r => r.status === 'Half Day').length;
  const totalWorkHours = records.reduce((sum, r) => sum + (r.workHours || 0), 0);
  const avgWorkHours = totalDays > 0 ? totalWorkHours / totalDays : 0;
  const attendanceRating = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  return {
    totalDays,
    presentDays,
    absentDays,
    lateDays,
    halfDays,
    avgWorkHours,
    totalWorkHours,
    attendanceRating,
    lateCount: lateDays,
    absentCount: absentDays,
    halfDayCount: halfDays
  };
};

export const getAllTeachersAttendanceSummary = async (month = null, year = null) => {
  try {
    const now = new Date();
    const targetMonth = month || (now.getMonth() + 1);
    const targetYear = year || now.getFullYear();
    
    const teachers = await getAllTeachers();
    
    if (!teachers || teachers.length === 0) {
      return [];
    }
    
    const summaries = await Promise.all(
      teachers.map(async (teacher) => {
        const summary = await getTeacherAttendanceSummary(teacher.id, targetMonth, targetYear);
        return {
          id: teacher.id,
          fullname: teacher.fullname || teacher.name || 'Unknown',
          department: teacher.department || 'Unknown',
          ...summary
        };
      })
    );
    
    return summaries.filter(summary => summary.totalDays > 0);
  } catch (error) {
    console.error('Error getting all teachers attendance summary:', error);
    return [];
  }
};

export const getDailyAttendanceStats = async (date) => {
  const q = query(attendanceCollection, where('date', '==', date));
  const querySnapshot = await getDocs(q);
  const records = querySnapshot.docs.map(doc => doc.data());

  const totalRecords = records.length;
  const presentCount = records.filter(r => r.status === 'Present').length;
  const absentCount = records.filter(r => r.status === 'Absent').length;
  const lateCount = records.filter(r => r.status === 'Late' || r.status === 'Very Late').length;
  const halfDayCount = records.filter(r => r.status === 'Half Day').length;
  const totalWorkHours = records.reduce((sum, r) => sum + (r.workHours || 0), 0);
  const avgWorkHours = totalRecords > 0 ? totalWorkHours / totalRecords : 0;

  return {
    totalRecords,
    presentCount,
    absentCount,
    lateCount,
    halfDayCount,
    avgWorkHours
  };
};

export const getWeeklyAttendanceStats = async (weekNum) => {
  const q = query(attendanceCollection, where('weekNum', '==', weekNum));
  const querySnapshot = await getDocs(q);
  const records = querySnapshot.docs.map(doc => doc.data());

  const statsByTeacher = records.reduce((acc, record) => {
    if (!acc[record.teacherId]) {
      acc[record.teacherId] = {
        daysTracked: 0,
        presentDays: 0,
        totalWorkHours: 0
      };
    }
    acc[record.teacherId].daysTracked++;
    if (record.status === 'Present') {
      acc[record.teacherId].presentDays++;
    }
    acc[record.teacherId].totalWorkHours += record.workHours || 0;
    return acc;
  }, {});

  return Object.entries(statsByTeacher).map(([teacherId, stats]) => ({
    teacherId,
    ...stats,
    avgWorkHours: stats.daysTracked > 0 ? stats.totalWorkHours / stats.daysTracked : 0
  }));
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

export const checkDuplicateAttendance = async (teacherId, date) => {
  const q = query(
    attendanceCollection, 
    where('teacherId', '==', teacherId),
    where('date', '==', date)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const bulkAddAttendance = async (records) => {
  const batch = writeBatch(db);
  records.forEach(record => {
    const { teacherId, checkInTime, checkOutTime, date, weekNum, status, remarks } = record;
    let workHours = calculateWorkHours(checkInTime, checkOutTime);
    const docRef = doc(attendanceCollection);
    batch.set(docRef, {
      teacherId,
      checkInTime,
      checkOutTime,
      workHours,
      date,
      weekNum,
      status,
      remarks,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  });
  await batch.commit();
  return true;
};

// Data mapping helper
const mapAttendanceRecord = (row) => ({
  id: row.id,
  teacherId: row.teacherId,
  fullname: row.fullname,
  department: row.department,
  date: row.date,
  weekNum: row.weekNum,
  checkInTime: row.checkInTime || null,
  checkOutTime: row.checkOutTime || null,
  workHours: row.workHours || 0,
  status: row.status,
  remarks: row.remarks || '',
});
