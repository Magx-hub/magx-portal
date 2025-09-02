// services/canteenService.js
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAt, 
  endAt,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// ===========================================
// FEE STRUCTURE MANAGEMENT
// ===========================================

// Get current fee structure for a department
export const getCurrentFeeStructure = async (department) => {
  try {
    const feeStructuresRef = collection(db, 'feeStructures');
    const q = query(
      feeStructuresRef,
      where('department', '==', department),
      orderBy('effectiveDate', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      effectiveDate: doc.data().effectiveDate?.toDate?.() || doc.data().effectiveDate
    };
  } catch (error) {
    console.error('Error getting fee structure:', error);
    throw error;
  }
};

// Get all fee structures
export const getAllFeeStructures = async () => {
  try {
    const feeStructuresRef = collection(db, 'feeStructures');
    const q = query(feeStructuresRef, orderBy('department', 'asc'), orderBy('effectiveDate', 'desc'));
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      effectiveDate: doc.data().effectiveDate?.toDate?.() || doc.data().effectiveDate
    }));
  } catch (error) {
    console.error('Error getting all fee structures:', error);
    throw error;
  }
};

// Add new fee structure
export const addFeeStructure = async (feeData) => {
  try {
    const feeStructuresRef = collection(db, 'feeStructures');
    
    const { department, classesFee, breakfastFee, effectiveDate } = feeData;
    
    const docData = {
      department,
      classesFee: Number(classesFee),
      breakfastFee: Number(breakfastFee),
      effectiveDate: effectiveDate instanceof Date ? Timestamp.fromDate(effectiveDate) : Timestamp.fromDate(new Date(effectiveDate)),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(feeStructuresRef, docData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding fee structure:', error);
    throw error;
  }
};

// Update fee structure
export const updateFeeStructure = async (id, feeData) => {
  try {
    const feeStructureRef = doc(db, 'feeStructures', id);
    
    const { department, classesFee, breakfastFee, effectiveDate } = feeData;
    
    const updateData = {
      department,
      classesFee: Number(classesFee),
      breakfastFee: Number(breakfastFee),
      effectiveDate: effectiveDate instanceof Date ? Timestamp.fromDate(effectiveDate) : Timestamp.fromDate(new Date(effectiveDate)),
      updatedAt: Timestamp.now()
    };
    
    await updateDoc(feeStructureRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating fee structure:', error);
    throw error;
  }
};

// Delete fee structure
export const deleteFeeStructure = async (id) => {
  try {
    const feeStructureRef = doc(db, 'feeStructures', id);
    await deleteDoc(feeStructureRef);
    return true;
  } catch (error) {
    console.error('Error deleting fee structure:', error);
    throw error;
  }
};

// ===========================================
// DAILY PAYMENTS MANAGEMENT
// ===========================================

// Record a daily payment
export const recordDailyPayment = async (paymentData) => {
  try {
    const dailyPaymentsRef = collection(db, 'dailyPayments');
    
    const { 
      studentId, 
      classesFee, 
      breakfastFee, 
      otherFee = 0, 
      paymentMethod, 
      notes,
      paymentDate = new Date().toISOString().split('T')[0]
    } = paymentData;
    
    // Check if payment already exists for this student on this date
    const existingPaymentQuery = query(
      dailyPaymentsRef,
      where('studentId', '==', studentId),
      where('paymentDate', '==', paymentDate)
    );
    
    const existingPaymentSnapshot = await getDocs(existingPaymentQuery);
    
    if (!existingPaymentSnapshot.empty) {
      throw new Error(`Payment already exists for student on ${paymentDate}`);
    }
    
    const totalFee = Number(classesFee) + Number(breakfastFee) + Number(otherFee);
    
    const docData = {
      studentId,
      paymentDate,
      classesFee: Number(classesFee),
      breakfastFee: Number(breakfastFee),
      otherFee: Number(otherFee),
      totalFee,
      paymentMethod,
      notes: notes || '',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(dailyPaymentsRef, docData);
    return docRef.id;
  } catch (error) {
    console.error('Error recording daily payment:', error);
    throw error;
  }
};

// Get daily payments for a specific date
export const getDailyPayments = async (date = null) => {
  try {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const dailyPaymentsRef = collection(db, 'dailyPayments');
    const paymentsQuery = query(
      dailyPaymentsRef,
      where('paymentDate', '==', targetDate)
    );
    
    const paymentsSnapshot = await getDocs(paymentsQuery);
    
    // Get student details for each payment
    const payments = await Promise.all(
      paymentsSnapshot.docs.map(async (paymentDoc) => {
        const paymentData = paymentDoc.data();
        
        // Get student data
        const studentRef = doc(db, 'students', paymentData.studentId);
        const studentDoc = await getDoc(studentRef);
        
        if (studentDoc.exists()) {
          const studentData = studentDoc.data();
          return {
            id: paymentDoc.id,
            ...paymentData,
            studentName: studentData.fullname,
            studentDepartment: studentData.department,
            createdAt: paymentData.createdAt?.toDate?.() || paymentData.createdAt,
            updatedAt: paymentData.updatedAt?.toDate?.() || paymentData.updatedAt
          };
        }
        
        return {
          id: paymentDoc.id,
          ...paymentData,
          studentName: 'Unknown Student',
          studentDepartment: 'Unknown Department',
          createdAt: paymentData.createdAt?.toDate?.() || paymentData.createdAt,
          updatedAt: paymentData.updatedAt?.toDate?.() || paymentData.updatedAt
        };
      })
    );
    
    // Sort by student name
    return payments.sort((a, b) => a.studentName.localeCompare(b.studentName));
  } catch (error) {
    console.error('Error getting daily payments:', error);
    throw error;
  }
};

// Get payments for a specific student
export const getStudentPayments = async (studentId, startDate = null, endDate = null) => {
  try {
    const dailyPaymentsRef = collection(db, 'dailyPayments');
    let q;
    
    if (startDate && endDate) {
      q = query(
        dailyPaymentsRef,
        where('studentId', '==', studentId),
        where('paymentDate', '>=', startDate),
        where('paymentDate', '<=', endDate),
        orderBy('paymentDate', 'desc')
      );
    } else {
      q = query(
        dailyPaymentsRef,
        where('studentId', '==', studentId),
        orderBy('paymentDate', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    
    // Get student data
    const studentRef = doc(db, 'students', studentId);
    const studentDoc = await getDoc(studentRef);
    const studentData = studentDoc.exists() ? studentDoc.data() : null;
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      studentName: studentData?.fullname || 'Unknown Student',
      studentDepartment: studentData?.department || 'Unknown Department',
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt
    }));
  } catch (error) {
    console.error('Error getting student payments:', error);
    throw error;
  }
};

// Update a daily payment
export const updateDailyPayment = async (id, paymentData) => {
  try {
    const paymentRef = doc(db, 'dailyPayments', id);
    
    const { classesFee, breakfastFee, otherFee, paymentMethod, notes } = paymentData;
    
    const totalFee = Number(classesFee) + Number(breakfastFee) + Number(otherFee);
    
    const updateData = {
      classesFee: Number(classesFee),
      breakfastFee: Number(breakfastFee),
      otherFee: Number(otherFee),
      totalFee,
      paymentMethod,
      notes: notes || '',
      updatedAt: Timestamp.now()
    };
    
    await updateDoc(paymentRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating daily payment:', error);
    throw error;
  }
};

// Delete a daily payment
export const deleteDailyPayment = async (id) => {
  try {
    const paymentRef = doc(db, 'dailyPayments', id);
    await deleteDoc(paymentRef);
    return true;
  } catch (error) {
    console.error('Error deleting daily payment:', error);
    throw error;
  }
};

// ===========================================
// REPORTING AND ANALYTICS
// ===========================================

// Get daily summary
export const getDailySummary = async (date = null) => {
  try {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const dailyPaymentsRef = collection(db, 'dailyPayments');
    const q = query(dailyPaymentsRef, where('paymentDate', '==', targetDate));
    
    const querySnapshot = await getDocs(q);
    
    let totalPayments = 0;
    let totalClassesFee = 0;
    let totalBreakfastFee = 0;
    let totalOtherFee = 0;
    let totalAmount = 0;
    const uniqueStudents = new Set();
    
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      totalPayments++;
      totalClassesFee += Number(data.classesFee || 0);
      totalBreakfastFee += Number(data.breakfastFee || 0);
      totalOtherFee += Number(data.otherFee || 0);
      totalAmount += Number(data.totalFee || 0);
      uniqueStudents.add(data.studentId);
    });
    
    return {
      totalPayments,
      totalClassesFee,
      totalBreakfastFee,
      totalOtherFee,
      totalAmount,
      uniqueStudents: uniqueStudents.size
    };
  } catch (error) {
    console.error('Error getting daily summary:', error);
    throw error;
  }
};

// Get department-wise summary for a date
export const getDepartmentSummary = async (date = null) => {
  try {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const dailyPaymentsRef = collection(db, 'dailyPayments');
    const q = query(dailyPaymentsRef, where('paymentDate', '==', targetDate));
    
    const paymentsSnapshot = await getDocs(q);
    
    // Get all students to map departments
    const studentsRef = collection(db, 'students');
    const studentsSnapshot = await getDocs(studentsRef);
    const studentsMap = {};
    
    studentsSnapshot.docs.forEach(doc => {
      studentsMap[doc.id] = doc.data();
    });
    
    // Group payments by department
    const departmentSummary = {};
    
    paymentsSnapshot.docs.forEach(doc => {
      const paymentData = doc.data();
      const student = studentsMap[paymentData.studentId];
      const department = student?.department || 'Unknown';
      
      if (!departmentSummary[department]) {
        departmentSummary[department] = {
          department,
          totalPayments: 0,
          totalClassesFee: 0,
          totalBreakfastFee: 0,
          totalOtherFee: 0,
          totalAmount: 0
        };
      }
      
      departmentSummary[department].totalPayments++;
      departmentSummary[department].totalClassesFee += Number(paymentData.classesFee || 0);
      departmentSummary[department].totalBreakfastFee += Number(paymentData.breakfastFee || 0);
      departmentSummary[department].totalOtherFee += Number(paymentData.otherFee || 0);
      departmentSummary[department].totalAmount += Number(paymentData.totalFee || 0);
    });
    
    // Convert to array and sort
    return Object.values(departmentSummary).sort((a, b) => a.department.localeCompare(b.department));
  } catch (error) {
    console.error('Error getting department summary:', error);
    throw error;
  }
};

// Get payment history for date range
export const getPaymentHistory = async (startDate, endDate) => {
  try {
    const dailyPaymentsRef = collection(db, 'dailyPayments');
    const q = query(
      dailyPaymentsRef,
      where('paymentDate', '>=', startDate),
      where('paymentDate', '<=', endDate),
      orderBy('paymentDate', 'desc')
    );
    
    const paymentsSnapshot = await getDocs(q);
    
    // Get all students to map student details
    const studentsRef = collection(db, 'students');
    const studentsSnapshot = await getDocs(studentsRef);
    const studentsMap = {};
    
    studentsSnapshot.docs.forEach(doc => {
      studentsMap[doc.id] = doc.data();
    });
    
    const payments = paymentsSnapshot.docs.map(doc => {
      const paymentData = doc.data();
      const student = studentsMap[paymentData.studentId];
      
      return {
        id: doc.id,
        ...paymentData,
        studentName: student?.fullname || 'Unknown Student',
        studentDepartment: student?.department || 'Unknown Department',
        createdAt: paymentData.createdAt?.toDate?.() || paymentData.createdAt,
        updatedAt: paymentData.updatedAt?.toDate?.() || paymentData.updatedAt
      };
    });
    
    // Sort by payment date (desc) then student name
    return payments.sort((a, b) => {
      const dateCompare = b.paymentDate.localeCompare(a.paymentDate);
      if (dateCompare === 0) {
        return a.studentName.localeCompare(b.studentName);
      }
      return dateCompare;
    });
  } catch (error) {
    console.error('Error getting payment history:', error);
    throw error;
  }
};

// Get aggregated payment reports
export const getAggregatedPayments = async (groupBy, startDate, endDate) => {
  try {
    const dailyPaymentsRef = collection(db, 'dailyPayments');
    const q = query(
      dailyPaymentsRef,
      where('paymentDate', '>=', startDate),
      where('paymentDate', '<=', endDate)
    );
    
    const paymentsSnapshot = await getDocs(q);
    
    if (groupBy === 'department') {
      // Get all students to map departments
      const studentsRef = collection(db, 'students');
      const studentsSnapshot = await getDocs(studentsRef);
      const studentsMap = {};
      
      studentsSnapshot.docs.forEach(doc => {
        studentsMap[doc.id] = doc.data();
      });
      
      const departmentAggregation = {};
      
      paymentsSnapshot.docs.forEach(doc => {
        const paymentData = doc.data();
        const student = studentsMap[paymentData.studentId];
        const department = student?.department || 'Unknown';
        
        if (!departmentAggregation[department]) {
          departmentAggregation[department] = {
            department,
            totalAmount: 0,
            totalPayments: 0
          };
        }
        
        departmentAggregation[department].totalAmount += Number(paymentData.totalFee || 0);
        departmentAggregation[department].totalPayments++;
      });
      
      return Object.values(departmentAggregation).sort((a, b) => 
        a.department.localeCompare(b.department)
      );
    } else if (groupBy === 'day') {
      const dayAggregation = {};
      
      paymentsSnapshot.docs.forEach(doc => {
        const paymentData = doc.data();
        const date = paymentData.paymentDate;
        
        if (!dayAggregation[date]) {
          dayAggregation[date] = {
            paymentDate: date,
            totalAmount: 0,
            totalPayments: 0
          };
        }
        
        dayAggregation[date].totalAmount += Number(paymentData.totalFee || 0);
        dayAggregation[date].totalPayments++;
      });
      
      return Object.values(dayAggregation).sort((a, b) => 
        a.paymentDate.localeCompare(b.paymentDate)
      );
    } else if (groupBy === 'week') {
      const weekAggregation = {};
      
      paymentsSnapshot.docs.forEach(doc => {
        const paymentData = doc.data();
        const date = new Date(paymentData.paymentDate);
        
        // Get ISO week
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - startOfYear) / 86400000;
        const week = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
        const weekKey = `${date.getFullYear()}-W${week.toString().padStart(2, '0')}`;
        
        if (!weekAggregation[weekKey]) {
          weekAggregation[weekKey] = {
            week: weekKey,
            totalAmount: 0,
            totalPayments: 0
          };
        }
        
        weekAggregation[weekKey].totalAmount += Number(paymentData.totalFee || 0);
        weekAggregation[weekKey].totalPayments++;
      });
      
      return Object.values(weekAggregation).sort((a, b) => 
        a.week.localeCompare(b.week)
      );
    } else {
      throw new Error('Invalid groupBy parameter. Use "department", "day", or "week".');
    }
  } catch (error) {
    console.error(`Error getting aggregated payments by ${groupBy}:`, error);
    throw error;
  }
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Calculate total fee for a student based on current fee structure
export const calculateStudentFee = async (studentId, otherFee = 0) => {
  try {
    // Get student's department
    const studentRef = doc(db, 'students', studentId);
    const studentDoc = await getDoc(studentRef);
    
    if (!studentDoc.exists()) {
      throw new Error('Student not found');
    }
    
    const student = studentDoc.data();
    
    // Get current fee structure for the department
    const feeStructure = await getCurrentFeeStructure(student.department);
    
    if (!feeStructure) {
      throw new Error(`No fee structure found for department: ${student.department}`);
    }
    
    const totalFee = Number(feeStructure.classesFee) + Number(feeStructure.breakfastFee) + Number(otherFee);
    
    return {
      studentId,
      department: student.department,
      classesFee: feeStructure.classesFee,
      breakfastFee: feeStructure.breakfastFee,
      otherFee: Number(otherFee),
      totalFee
    };
  } catch (error) {
    console.error('Error calculating student fee:', error);
    throw error;
  }
};

// Check if student has paid for today
export const hasStudentPaidToday = async (studentId, date = null) => {
  try {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const dailyPaymentsRef = collection(db, 'dailyPayments');
    const q = query(
      dailyPaymentsRef,
      where('studentId', '==', studentId),
      where('paymentDate', '==', targetDate),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking if student has paid:', error);
    throw error;
  }
};