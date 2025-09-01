// hooks/useCanteen.js
import { useState, useEffect, useCallback } from 'react';
import {
  // Fee Structure
  getCurrentFeeStructure,
  getAllFeeStructures,
  addFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
  // Daily Payments
  recordDailyPayment,
  getDailyPayments,
  getStudentPayments,
  updateDailyPayment,
  deleteDailyPayment,
  // Reports
  getDailySummary,
  getDepartmentSummary,
  getPaymentHistory,
  getAggregatedPayments,
  // Utils
  calculateStudentFee,
  hasStudentPaidToday
} from '../services/canteenService';

// ===========================================
// FEE STRUCTURE HOOKS
// ===========================================

// Hook for managing fee structures
export const useFeeStructures = () => {
  const [feeStructures, setFeeStructures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeeStructures = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const structures = await getAllFeeStructures();
      setFeeStructures(structures);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addNewFeeStructure = useCallback(async (feeData) => {
    try {
      setLoading(true);
      setError(null);
      const newId = await addFeeStructure(feeData);
      await fetchFeeStructures(); // Refresh list
      return newId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFeeStructures]);

  const updateExistingFeeStructure = useCallback(async (id, feeData) => {
    try {
      setLoading(true);
      setError(null);
      const success = await updateFeeStructure(id, feeData);
      if (success) {
        await fetchFeeStructures(); // Refresh list
      }
      return success;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFeeStructures]);

  const removeFeeStructure = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const success = await deleteFeeStructure(id);
      if (success) {
        await fetchFeeStructures(); // Refresh list
      }
      return success;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFeeStructures]);

  useEffect(() => {
    fetchFeeStructures();
  }, [fetchFeeStructures]);

  return {
    feeStructures,
    loading,
    error,
    refreshFeeStructures: fetchFeeStructures,
    addFeeStructure: addNewFeeStructure,
    updateFeeStructure: updateExistingFeeStructure,
    deleteFeeStructure: removeFeeStructure
  };
};

// Hook for getting current fee structure by department
export const useCurrentFeeStructure = (department) => {
  const [feeStructure, setFeeStructure] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrentFeeStructure = useCallback(async () => {
    if (!department) return;
    
    try {
      setLoading(true);
      setError(null);
      const structure = await getCurrentFeeStructure(department);
      setFeeStructure(structure);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [department]);

  useEffect(() => {
    fetchCurrentFeeStructure();
  }, [fetchCurrentFeeStructure]);

  return {
    feeStructure,
    loading,
    error,
    refreshFeeStructure: fetchCurrentFeeStructure
  };
};

// ===========================================
// DAILY PAYMENTS HOOKS
// ===========================================

// Hook for managing daily payments
export const useDailyPayments = (date = null) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDailyPayments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const dailyPayments = await getDailyPayments(date);
      setPayments(dailyPayments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [date]);

  const addPayment = useCallback(async (paymentData) => {
    try {
      setLoading(true);
      setError(null);
      const newId = await recordDailyPayment(paymentData);
      await fetchDailyPayments(); // Refresh list
      return newId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchDailyPayments]);

  const updatePayment = useCallback(async (id, paymentData) => {
    try {
      setLoading(true);
      setError(null);
      const success = await updateDailyPayment(id, paymentData);
      if (success) {
        await fetchDailyPayments(); // Refresh list
      }
      return success;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchDailyPayments]);

  const removePayment = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const success = await deleteDailyPayment(id);
      if (success) {
        await fetchDailyPayments(); // Refresh list
      }
      return success;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchDailyPayments]);

  useEffect(() => {
    fetchDailyPayments();
  }, [fetchDailyPayments]);

  return {
    payments,
    loading,
    error,
    refreshPayments: fetchDailyPayments,
    addPayment,
    updatePayment,
    deletePayment: removePayment
  };
};

// Hook for student payment history
export const useStudentPayments = (studentId, startDate = null, endDate = null) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudentPayments = useCallback(async () => {
    if (!studentId) return;
    
    try {
      setLoading(true);
      setError(null);
      const studentPayments = await getStudentPayments(studentId, startDate, endDate);
      setPayments(studentPayments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [studentId, startDate, endDate]);

  useEffect(() => {
    fetchStudentPayments();
  }, [fetchStudentPayments]);

  return {
    payments,
    loading,
    error,
    refreshPayments: fetchStudentPayments
  };
};

// ===========================================
// REPORTING HOOKS
// ===========================================

// Hook for daily summary
export const useDailySummary = (date = null) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDailySummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const dailySummary = await getDailySummary(date);
      setSummary(dailySummary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchDailySummary();
  }, [fetchDailySummary]);

  return {
    summary,
    loading,
    error,
    refreshSummary: fetchDailySummary
  };
};

// Hook for department summary
export const useDepartmentSummary = (date = null) => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDepartmentSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const departmentSummary = await getDepartmentSummary(date);
      setSummary(departmentSummary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchDepartmentSummary();
  }, [fetchDepartmentSummary]);

  return {
    summary,
    loading,
    error,
    refreshSummary: fetchDepartmentSummary
  };
};

// Hook for payment history
export const usePaymentHistory = (startDate, endDate) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPaymentHistory = useCallback(async () => {
    if (!startDate || !endDate) return;
    
    try {
      setLoading(true);
      setError(null);
      const paymentHistory = await getPaymentHistory(startDate, endDate);
      setHistory(paymentHistory);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchPaymentHistory();
  }, [fetchPaymentHistory]);

  return {
    history,
    loading,
    error,
    refreshHistory: fetchPaymentHistory
  };
};

// Hook for aggregated payments
export const useAggregatedPayments = (groupBy, startDate, endDate) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAggregatedPayments = useCallback(async () => {
    if (!groupBy || !startDate || !endDate) return;
    
    try {
      setLoading(true);
      setError(null);
      const aggregatedData = await getAggregatedPayments(groupBy, startDate, endDate);
      setData(aggregatedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [groupBy, startDate, endDate]);

  useEffect(() => {
    fetchAggregatedPayments();
  }, [fetchAggregatedPayments]);

  return {
    data,
    loading,
    error,
    refreshData: fetchAggregatedPayments
  };
};

// ===========================================
// UTILITY HOOKS
// ===========================================

// Hook for calculating student fee
export const useStudentFeeCalculation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateFee = useCallback(async (studentId, otherFee = 0) => {
    try {
      setLoading(true);
      setError(null);
      const feeCalculation = await calculateStudentFee(studentId, otherFee);
      return feeCalculation;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    calculateFee,
    loading,
    error
  };
};

// Hook for checking if student has paid
export const useStudentPaymentStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkPaymentStatus = useCallback(async (studentId, date = null) => {
    try {
      setLoading(true);
      setError(null);
      const hasPaid = await hasStudentPaidToday(studentId, date);
      return hasPaid;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    checkPaymentStatus,
    loading,
    error
  };
};

// Combined hook for canteen dashboard
export const useCanteenDashboard = (selectedDate = null) => {
  const currentDate = selectedDate || new Date().toISOString().split('T')[0];
  
  const {
    payments,
    loading: paymentsLoading,
    error: paymentsError,
    refreshPayments,
    addPayment,
    updatePayment,
    deletePayment
  } = useDailyPayments(currentDate);

  const {
    summary,
    loading: summaryLoading,
    error: summaryError,
    refreshSummary
  } = useDailySummary(currentDate);

  const {
    summary: departmentSummary,
    loading: departmentLoading,
    error: departmentError,
    refreshSummary: refreshDepartmentSummary
  } = useDepartmentSummary(currentDate);

  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshPayments(),
      refreshSummary(),
      refreshDepartmentSummary()
    ]);
  }, [refreshPayments, refreshSummary, refreshDepartmentSummary]);

  const isLoading = paymentsLoading || summaryLoading || departmentLoading;
  const error = paymentsError || summaryError || departmentError;

  return {
    // Data
    payments,
    summary,
    departmentSummary,
    
    // States
    loading: isLoading,
    error,
    
    // Actions
    addPayment: async (paymentData) => {
      const result = await addPayment(paymentData);
      await refreshAll();
      return result;
    },
    updatePayment: async (id, paymentData) => {
      const result = await updatePayment(id, paymentData);
      await refreshAll();
      return result;
    },
    deletePayment: async (id) => {
      const result = await deletePayment(id);
      await refreshAll();
      return result;
    },
    
    // Refresh functions
    refreshPayments,
    refreshSummary,
    refreshDepartmentSummary,
    refreshAll
  };
};

// Hook for payment processing workflow
export const usePaymentProcessor = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { calculateFee } = useStudentFeeCalculation();
  const { checkPaymentStatus } = useStudentPaymentStatus();

  const processPayment = useCallback(async (studentId, paymentOptions = {}) => {
    try {
      setProcessing(true);
      setError(null);

      const {
        otherFee = 0,
        paymentMethod = 'cash',
        notes = '',
        paymentDate = new Date().toISOString().split('T')[0]
      } = paymentOptions;

      // Check if student has already paid for this date
      const hasPaid = await checkPaymentStatus(studentId, paymentDate);
      if (hasPaid) {
        throw new Error(`Student has already paid for ${paymentDate}`);
      }

      // Calculate fee
      const feeCalculation = await calculateFee(studentId, otherFee);

      // Record payment
      const paymentData = {
        studentId,
        classesFee: feeCalculation.classesFee,
        breakfastFee: feeCalculation.breakfastFee,
        otherFee: feeCalculation.otherFee,
        paymentMethod,
        notes,
        paymentDate
      };

      const paymentId = await recordDailyPayment(paymentData);

      return {
        paymentId,
        feeCalculation,
        paymentData: { ...paymentData, totalFee: feeCalculation.totalFee }
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setProcessing(false);
    }
  }, [calculateFee, checkPaymentStatus]);

  return {
    processPayment,
    processing,
    error,
    clearError: () => setError(null)
  };
};

// Hook for reports and analytics
export const useCanteenReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReport = useCallback(async (reportType, params) => {
    try {
      setLoading(true);
      setError(null);

      switch (reportType) {
        case 'daily':
          return await getDailySummary(params.date);
        case 'department':
          return await getDepartmentSummary(params.date);
        case 'history':
          return await getPaymentHistory(params.startDate, params.endDate);
        case 'aggregated':
          return await getAggregatedPayments(params.groupBy, params.startDate, params.endDate);
        default:
          throw new Error(`Unknown report type: ${reportType}`);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    generateReport,
    loading,
    error,
    clearError: () => setError(null)
  };
};

// Hook for real-time payment validation
export const usePaymentValidation = () => {
  const [validationResults, setValidationResults] = useState({});
  const [loading, setLoading] = useState(false);
  const { checkPaymentStatus } = useStudentPaymentStatus();

  const validateStudentPayment = useCallback(async (studentId, date = null) => {
    try {
      setLoading(true);
      const targetDate = date || new Date().toISOString().split('T')[0];
      const hasPaid = await checkPaymentStatus(studentId, targetDate);
      
      setValidationResults(prev => ({
        ...prev,
        [`${studentId}-${targetDate}`]: {
          studentId,
          date: targetDate,
          hasPaid,
          checkedAt: new Date()
        }
      }));
      
      return hasPaid;
    } catch (err) {
      console.error('Error validating payment:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [checkPaymentStatus]);

  const getValidationResult = useCallback((studentId, date = null) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return validationResults[`${studentId}-${targetDate}`];
  }, [validationResults]);

  const clearValidationResults = useCallback(() => {
    setValidationResults({});
  }, []);

  return {
    validateStudentPayment,
    getValidationResult,
    clearValidationResults,
    loading,
    validationResults
  };
};

// Export individual service functions for direct use
export {
  // Fee Structure
  getCurrentFeeStructure,
  getAllFeeStructures,
  addFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
  // Daily Payments
  recordDailyPayment,
  getDailyPayments,
  getStudentPayments,
  updateDailyPayment,
  deleteDailyPayment,
  // Reports
  getDailySummary,
  getDepartmentSummary,
  getPaymentHistory,
  getAggregatedPayments,
  // Utils
  calculateStudentFee,
  hasStudentPaidToday
};