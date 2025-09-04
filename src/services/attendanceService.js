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
  limit, 
  startAfter,
  getDoc,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { calculateWorkHours } from '../utils/helpers';
import { getAllTeachers } from './teacherService';

// Collection reference
const COLLECTION_NAME = 'attendance';
const attendanceCollection = collection(db, COLLECTION_NAME);

// ===========================================
// ATTENDANCE CRUD OPERATIONS
// ===========================================

export const addAttendanceRecord = async (record) => {
  try {
    const { teacherId, checkInTime, checkOutTime, date, weekNum, status, remarks } = record;
    
    // Calculate work hours if both times are present
    let workHours = calculateWorkHours(checkInTime, checkOutTime);

    const recordData = {
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
    };

    const docRef = await addDoc(attendanceCollection, recordData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding attendance record:', error);
    throw error;
  }
};

export const getAttendanceRecords = async (filters = {}) => {
  try {
    let q = query(attendanceCollection, orderBy('date', 'desc'));

    if (filters.teacherId) {
      q = query(q, where('teacherId', '==', filters.teacherId));
    }
    if (filters.date) {
      q = query(q, where('date', '==', filters.date));
    }
    if (filters.weekNum) {
      q = query(q, where('weekNum', '==', filters.weekNum));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    
    const querySnapshot = await getDocs(q);
    const records = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    return records;
  } catch (error) {
    console.error('Error getting attendance records:', error);
    throw error;
  }
};

export const getAttendanceById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting attendance record by ID:', error);
    throw error;
  }
};

export const updateAttendanceRecord = async (id, updates) => {
  try {
    const { checkInTime, checkOutTime, status, remarks } = updates;
    
    // Calculate work hours if both times are present
    let workHours = calculateWorkHours(checkInTime, checkOutTime);
    
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData = {
      checkInTime,
      checkOutTime,
      workHours,
      status,
      remarks,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(docRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating attendance record:', error);
    throw error;
  }
};

export const deleteAttendanceRecord = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    throw error;
  }
};

// ===========================================
// ATTENDANCE BUSINESS LOGIC & UTILITIES
// ===========================================

export const getAttendanceByDateRange = async (startDate, endDate, filters = {}) => {
  try {
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
    const records = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    return records;
  } catch (error) {
    console.error('Error getting attendance by date range:', error);
    throw error;
  }
};

export const getTeacherAttendanceSummary = async (teacherId, month, year) => {
  try {
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
    const presentDays = records.filter(r => r.status === 'present').length;
    const absentDays = records.filter(r => r.status === 'absent').length;
    const lateDays = records.filter(r => r.status === 'late').length;
    const halfDays = records.filter(r => r.status === 'half-day').length;
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
  } catch (error) {
    console.error('Error getting teacher attendance summary:', error);
    throw error;
  }
};

export const getAllTeachersAttendanceSummary = async (month = null, year = null) => {
  try {
    // Use current month/year if not provided
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
    
    return summaries.filter(summary => summary.totalDays > 0); // Only return teachers with attendance data
  } catch (error) {
    console.error('Error getting all teachers attendance summary:', error);
    return []; // Return empty array instead of throwing
  }
};

export const getDailyAttendanceStats = async (date) => {
  try {
    const q = query(attendanceCollection, where('date', '==', date));
    const querySnapshot = await getDocs(q);
    const records = querySnapshot.docs.map(doc => doc.data());

    const totalRecords = records.length;
    const presentCount = records.filter(r => r.status === 'present').length;
    const absentCount = records.filter(r => r.status === 'absent').length;
    const lateCount = records.filter(r => r.status === 'late').length;
    const halfDayCount = records.filter(r => r.status === 'half-day').length;
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
  } catch (error) {
    console.error('Error getting daily attendance stats:', error);
    throw error;
  }
};

export const getWeeklyAttendanceStats = async (weekNum) => {
  try {
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
      if (record.status === 'present') {
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
  } catch (error) {
    console.error('Error getting weekly attendance stats:', error);
    throw error;
  }
};

export const checkDuplicateAttendance = async (teacherId, date) => {
  try {
    const q = query(
      attendanceCollection, 
      where('teacherId', '==', teacherId),
      where('date', '==', date)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking duplicate attendance:', error);
    throw error;
  }
};

export const bulkAddAttendance = async (records) => {
  try {
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
  } catch (error) {
    console.error('Error bulk adding attendance records:', error);
    throw error;
  }
};
