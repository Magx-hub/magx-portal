// hooks/useCanteen.js
import { useState, useCallback, useEffect } from 'react';
import {
  // Fee Structure Management
  getCurrentFeeStructure,
  getAllFeeStructures,
  addFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
  
  // Daily Payments Management
  recordDailyPayment,
  getDailyPayments,
  getStudentsNotPaidToday,
  getStudentPayments,
  updateDailyPayment,
  deleteDailyPayment,
  
  // Reporting and Analytics
  getDailySummary,
  getDepartmentSummary,
  getPaymentHistory,
  getAggregatedPayments,
  
  // Utility Functions
  calculateStudentFee,
  hasStudentPaidToday
} from '../services/canteenService';

export const useCanteen = () => {
  // Global loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Data states
  const [feeStructures, setFeeStructures] = useState([]);
  const [dailyPayments, setDailyPayments] = useState([]);
  const [unpaidStudents, setUnpaidStudents] = useState([]);
  const [dailySummary, setDailySummary] = useState(null);
  const [departmentSummary, setDepartmentSummary] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Helper function to handle async operations
  const handleAsync = useCallback(async (asyncFn, setData = null, showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      
      const result = await asyncFn();
      
      if (setData) {
        setData(result);
      }
      
      return result;
    } catch (err) {
      console.error('Canteen operation error:', err);
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);


  // ===========================================
  // DATA FETCHERS USED BY OTHER HOOKS
  // ===========================================

  const fetchDailySummary = useCallback(async (date = null, refresh = false) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    if (!dailySummary || refresh) {
      return handleAsync(
        () => getDailySummary(targetDate),
        setDailySummary
      );
    }
    return dailySummary;
  }, [dailySummary, handleAsync]);

  const fetchDailyPayments = useCallback(async (date = null, refresh = false) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    if (dailyPayments.length === 0 || refresh) {
      return handleAsync(
        () => getDailyPayments(targetDate),
        setDailyPayments
      );
    }
    return dailyPayments;
  }, [dailyPayments, handleAsync]);

  const fetchUnpaidStudents = useCallback(async (date = null, refresh = false) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    if (unpaidStudents.length === 0 || refresh) {
      return handleAsync(
        () => getStudentsNotPaidToday(targetDate),
        setUnpaidStudents
      );
    }
    return unpaidStudents;
  }, [unpaidStudents, handleAsync]);

  // ===========================================
  // FEE STRUCTURE OPERATIONS
  // ===========================================

  const fetchCurrentFeeStructure = useCallback(async (department) => {
    return handleAsync(() => getCurrentFeeStructure(department));
  }, [handleAsync]);

  const fetchAllFeeStructures = useCallback(async (refresh = false) => {
    if (feeStructures.length === 0 || refresh) {
      return handleAsync(
        () => getAllFeeStructures(),
        setFeeStructures
      );
    }
    return feeStructures;
  }, [feeStructures, handleAsync]);

  const createFeeStructure = useCallback(async (feeData) => {
    const result = await handleAsync(() => addFeeStructure(feeData));
    // Refresh fee structures after creating
    await fetchAllFeeStructures(true);
    return result;
  }, [handleAsync, fetchAllFeeStructures]);

  const modifyFeeStructure = useCallback(async (id, feeData) => {
    const result = await handleAsync(() => updateFeeStructure(id, feeData));
    // Refresh fee structures after updating
    await fetchAllFeeStructures(true);
    return result;
  }, [handleAsync, fetchAllFeeStructures]);

  const removeFeeStructure = useCallback(async (id) => {
    const result = await handleAsync(() => deleteFeeStructure(id));
    // Refresh fee structures after deleting
    await fetchAllFeeStructures(true);
    return result;
  }, [handleAsync, fetchAllFeeStructures]);


  // ===========================================
  // REPORTING AND ANALYTICS OPERATIONS
  // ===========================================

  const fetchDepartmentSummary = useCallback(async (date = null, refresh = false) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    if (departmentSummary.length === 0 || refresh) {
      return handleAsync(
        () => getDepartmentSummary(targetDate),
        setDepartmentSummary
      );
    }
    return departmentSummary;
  }, [departmentSummary, handleAsync]);

  const fetchPaymentHistory = useCallback(async (startDate, endDate, refresh = false) => {
    if (paymentHistory.length === 0 || refresh) {
      return handleAsync(
        () => getPaymentHistory(startDate, endDate),
        setPaymentHistory
      );
    }
    return paymentHistory;
  }, [paymentHistory, handleAsync]);

  const fetchAggregatedPayments = useCallback(async (groupBy, startDate, endDate) => {
    return handleAsync(() => getAggregatedPayments(groupBy, startDate, endDate));
  }, [handleAsync]);


  // ===========================================
  // DAILY PAYMENTS OPERATIONS
  // ===========================================

  const recordPayment = useCallback(async (paymentData) => {
    const result = await handleAsync(() => recordDailyPayment(paymentData));
    // Refresh related data after recording payment
    const date = paymentData.paymentDate || new Date().toISOString().split('T')[0];
    await Promise.all([
      fetchDailyPayments(date, true),
      fetchUnpaidStudents(date, true),
      fetchDailySummary(date, true)
    ]);
    return result;
  }, [handleAsync, fetchDailyPayments, fetchUnpaidStudents, fetchDailySummary]);

  const fetchStudentPayments = useCallback(async (studentId, startDate = null, endDate = null) => {
    return handleAsync(() => getStudentPayments(studentId, startDate, endDate));
  }, [handleAsync]);

  const modifyDailyPayment = useCallback(async (id, paymentData) => {
    const result = await handleAsync(() => updateDailyPayment(id, paymentData));
    // Refresh related data after updating payment
    await Promise.all([
      fetchDailyPayments(null, true),
      fetchDailySummary(null, true)
    ]);
    return result;
  }, [handleAsync, fetchDailyPayments, fetchDailySummary]);

  const removeDailyPayment = useCallback(async (id) => {
    const result = await handleAsync(() => deleteDailyPayment(id));
    // Refresh related data after deleting payment
    await Promise.all([
      fetchDailyPayments(null, true),
      fetchUnpaidStudents(null, true),
      fetchDailySummary(null, true)
    ]);
    return result;
  }, [handleAsync, fetchDailyPayments, fetchUnpaidStudents, fetchDailySummary]);

  // ===========================================
  // UTILITY OPERATIONS
  // ===========================================

  const calculateFee = useCallback(async (studentId, otherFee = 0, customBreakfastFee = null) => {
    return handleAsync(() => calculateStudentFee(studentId, otherFee, customBreakfastFee), null, false);
  }, [handleAsync]);

  const checkStudentPaymentStatus = useCallback(async (studentId, date = null) => {
    return handleAsync(() => hasStudentPaidToday(studentId, date), null, false);
  }, [handleAsync]);

  // ===========================================
  // BULK OPERATIONS
  // ===========================================

  const bulkRecordPayments = useCallback(async (paymentsData, onProgress = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = [];
      const errors = [];
      
      for (let i = 0; i < paymentsData.length; i++) {
        try {
          const result = await recordDailyPayment(paymentsData[i]);
          results.push({ index: i, id: result, success: true });
          
          if (onProgress) {
            onProgress({
              completed: i + 1,
              total: paymentsData.length,
              currentStudent: paymentsData[i].studentId,
              success: true
            });
          }
        } catch (err) {
          console.error(`Error recording payment for index ${i}:`, err);
          errors.push({ index: i, error: err.message, studentId: paymentsData[i].studentId });
          
          if (onProgress) {
            onProgress({
              completed: i + 1,
              total: paymentsData.length,
              currentStudent: paymentsData[i].studentId,
              success: false,
              error: err.message
            });
          }
        }
      }
      
      // Refresh data after bulk operation
      const date = paymentsData[0]?.paymentDate || new Date().toISOString().split('T')[0];
      await Promise.all([
        fetchDailyPayments(date, true),
        fetchUnpaidStudents(date, true),
        fetchDailySummary(date, true)
      ]);
      
      return {
        successful: results,
        failed: errors,
        totalProcessed: paymentsData.length,
        successCount: results.length,
        errorCount: errors.length
      };
    } catch (err) {
      console.error('Bulk payment operation failed:', err);
      setError(err.message || 'Bulk payment operation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [recordDailyPayment, fetchDailyPayments, fetchUnpaidStudents, fetchDailySummary]);

  // ===========================================
  // INITIALIZATION AND CLEANUP
  // ===========================================

  const initializeCanteenData = useCallback(async (date = null) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    try {
      setLoading(true);
      setError(null);
      
      await Promise.all([
        fetchAllFeeStructures(true),
        fetchDailyPayments(targetDate, true),
        fetchUnpaidStudents(targetDate, true),
        fetchDailySummary(targetDate, true),
        fetchDepartmentSummary(targetDate, true)
      ]);
    } catch (err) {
      console.error('Failed to initialize canteen data:', err);
      setError('Failed to load canteen data');
    } finally {
      setLoading(false);
    }
  }, [
    fetchAllFeeStructures,
    fetchDailyPayments,
    fetchUnpaidStudents,
    fetchDailySummary,
    fetchDepartmentSummary
  ]);

  const clearCanteenData = useCallback(() => {
    setFeeStructures([]);
    setDailyPayments([]);
    setUnpaidStudents([]);
    setDailySummary(null);
    setDepartmentSummary([]);
    setPaymentHistory([]);
    setError(null);
    setLoading(false);
  }, []);

  const refreshAllData = useCallback(async (date = null) => {
    await initializeCanteenData(date);
  }, [initializeCanteenData]);

  // ===========================================
  // COMPUTED VALUES
  // ===========================================

  const canteenStats = {
    totalFeeStructures: feeStructures.length,
    totalDailyPayments: dailyPayments.length,
    totalUnpaidStudents: unpaidStudents.length,
    hasDailyData: dailyPayments.length > 0 || unpaidStudents.length > 0,
    dailyRevenue: dailySummary?.totalAmount || 0,
    paymentRate: dailySummary ? 
      ((dailySummary.uniqueStudents / dailySummary.totalStudents) * 100).toFixed(1) : 0
  };

  return {
    // State
    loading,
    error,
    feeStructures,
    dailyPayments,
    unpaidStudents,
    dailySummary,
    departmentSummary,
    paymentHistory,
    canteenStats,

    // Fee Structure Operations
    fetchCurrentFeeStructure,
    fetchAllFeeStructures,
    createFeeStructure,
    modifyFeeStructure,
    removeFeeStructure,

    // Daily Payment Operations
    recordPayment,
    fetchDailyPayments,
    fetchUnpaidStudents,
    fetchStudentPayments,
    modifyDailyPayment,
    removeDailyPayment,

    // Reporting Operations
    fetchDailySummary,
    fetchDepartmentSummary,
    fetchPaymentHistory,
    fetchAggregatedPayments,

    // Utility Operations
    calculateFee,
    checkStudentPaymentStatus,

    // Bulk Operations
    bulkRecordPayments,

    // Data Management
    initializeCanteenData,
    clearCanteenData,
    refreshAllData,

    // Helper function to clear only error
    clearError: () => setError(null)
  };
};