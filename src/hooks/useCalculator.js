// useCalculator.js - Custom hook for managing calculator state and logic

import { useState, useCallback, useEffect } from 'react';
import allowanceFirebaseService from '../services/allowanceFirebaseService';

export const useCalculator = () => {
  // Form inputs state
  const [inputs, setInputs] = useState({
    nurseryAmount: 0,
    kg1Amount: 0,
    kg2Amount: 0,
    basic1Amount: 0,
    basic2Amount: 0,
    basic3Amount: 0,
    basic4Amount: 0,
    basic5Amount: 0,
    basic6Amount: 0,
    basic7GeneralAmount: 0,
    basic7JHSAmount: 0,
    basic8GeneralAmount: 0,
    basic8JHSAmount: 0,
    basic9GeneralAmount: 0,
    basic9JHSAmount: 0,
    welfareAmount: 0,
    numTeachers: 1,
    numJHSTeachers: 1,
  });

  // Calculation results state
  const [results, setResults] = useState(null);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Current step for stepper form
  const [currentStep, setCurrentStep] = useState(0);
  
  // Calculation history
  const [calculationHistory, setCalculationHistory] = useState([]);

  // Statistics state
  const [stats, setStats] = useState(null);

  // Form steps configuration
  const formSteps = [
    {
      title: 'Early Years',
      fields: ['nurseryAmount', 'kg1Amount', 'kg2Amount'],
      description: 'Enter amounts for Nursery, KG1, and KG2 classes',
      icon: 'home',
    },
    {
      title: 'Basic 1-3',
      fields: ['basic1Amount', 'basic2Amount', 'basic3Amount'],
      description: 'Enter amounts for Basic 1, 2, and 3 classes',
      icon: 'book',
    },
    {
      title: 'Basic 4-6',
      fields: ['basic4Amount', 'basic5Amount', 'basic6Amount'],
      description: 'Enter amounts for Basic 4, 5, and 6 classes',
      icon: 'bookOpen',
    },
    {
      title: 'Basic 7-9 General',
      fields: ['basic7GeneralAmount', 'basic8GeneralAmount', 'basic9GeneralAmount'],
      description: 'Enter amounts for Basic 7, 8, and 9 General classes',
      icon: 'graduation',
    },
    {
      title: 'Basic 7-9 JHS',
      fields: ['basic7JHSAmount', 'basic8JHSAmount', 'basic9JHSAmount'],
      description: 'Enter amounts for Basic 7, 8, and 9 JHS classes',
      icon: 'award',
    },
    {
      title: 'Additional Info',
      fields: ['welfareAmount', 'numTeachers', 'numJHSTeachers'],
      description: 'Enter welfare, and teacher information',
      icon: 'users',
    },
  ];

  // Update input value
  const updateInput = useCallback((field, value) => {
    const numericValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numericValue,
    }));
    setError(null); // Clear errors when input changes
  }, []);

  // Update multiple inputs at once
  const updateInputs = useCallback((newInputs) => {
    setInputs(prev => ({
      ...prev,
      ...newInputs,
    }));
    setError(null);
  }, []);

  // Perform calculation
  const calculate = useCallback(async (forceCalculate = false) => {
    // Skip calculation if required fields are empty and not forced
    if (!forceCalculate && (inputs.numTeachers <= 0 || inputs.numJHSTeachers <= 0)) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await allowanceFirebaseService.calculateAllowances(inputs);
      
      if (response.success) {
        setResults(response.data.results);
        
        // Add to calculation history (keep last 10)
        setCalculationHistory(prev => [response.data, ...prev.slice(0, 9)]);
        
        // Update stats
        updateStats();
      } else {
        setError(response.error);
        setResults(null);
      }
    } catch (err) {
      setError('An unexpected error occurred during calculation');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [inputs]);

  // Reset all inputs
  const resetInputs = useCallback(() => {
    setInputs({
      nurseryAmount: 0,
      kg1Amount: 0,
      kg2Amount: 0,
      basic1Amount: 0,
      basic2Amount: 0,
      basic3Amount: 0,
      basic4Amount: 0,
      basic5Amount: 0,
      basic6Amount: 0,
      basic7GeneralAmount: 0,
      basic7JHSAmount: 0,
      basic8GeneralAmount: 0,
      basic8JHSAmount: 0,
      basic9GeneralAmount: 0,
      basic9JHSAmount: 0,
      welfareAmount: 0,
      numTeachers: 1,
      numJHSTeachers: 1,
    });
    setResults(null);
    setError(null);
    setCurrentStep(0);
  }, []);

  // Stepper navigation
  const nextStep = useCallback(() => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, formSteps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step) => {
    if (step >= 0 && step < formSteps.length) {
      setCurrentStep(step);
    }
  }, [formSteps.length]);

  // Load calculation from history
  const loadFromHistory = useCallback((calculation) => {
    setInputs(calculation.inputs);
    setResults(calculation.results);
    setError(null);
    setCurrentStep(formSteps.length - 1); // Go to last step to show results
  }, [formSteps.length]);

  // Delete calculation from history
  const deleteFromHistory = useCallback(async (calculationId) => {
    try {
      setIsLoading(true);
      const response = await allowanceFirebaseService.deleteCalculation(calculationId);
      
      if (response.success) {
        setCalculationHistory(prev => prev.filter(calc => calc.id !== calculationId));
        updateStats();
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to delete calculation');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Export functionality
  const exportCalculation = useCallback(async (calculationId, format = 'json') => {
    setIsLoading(true);
    try {
      const response = await allowanceFirebaseService.exportCalculation(calculationId, format);
      if (response.success) {
        // Create download link
        const blob = new Blob([response.data], { 
          type: format === 'json' ? 'application/json' : 'text/csv' 
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = response.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Export failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Export all calculations
  const exportAllCalculations = useCallback(async (format = 'json') => {
    setIsLoading(true);
    try {
      const response = await allowanceFirebaseService.getAllCalculations();
      if (response.success && response.data.length > 0) {
        let exportData;
        let filename;
        
        if (format === 'json') {
          exportData = JSON.stringify(response.data, null, 2);
          filename = `all_calculations_${new Date().getTime()}.json`;
        } else {
          // Convert all to CSV
          const csvRows = ['Category,Item,Amount,Calculation_ID,Timestamp'];
          
          response.data.forEach(calc => {
            const { inputs, results, id, timestamp } = calc;
            
            // Add inputs
            Object.entries(inputs).forEach(([key, value]) => {
              csvRows.push(`Input,${key},${value},${id},${timestamp}`);
            });
            
            // Add results
            csvRows.push(`Result,Total General,${results.totals.totalGeneral},${id},${timestamp}`);
            csvRows.push(`Result,Total JHS,${results.totals.totalJHS},${id},${timestamp}`);
            csvRows.push(`Result,Total Sum,${results.totals.totalSum},${id},${timestamp}`);
            csvRows.push(`Result,Each Teacher Amount,${results.teacherAmounts.eachTeacherAmount},${id},${timestamp}`);
            csvRows.push(`Result,Each JHS Teacher Amount,${results.teacherAmounts.eachJHSTeacherAmount},${id},${timestamp}`);
            csvRows.push(''); // Empty row between calculations
          });
          
          exportData = csvRows.join('\n');
          filename = `all_calculations_${new Date().getTime()}.csv`;
        }

        const blob = new Blob([exportData], { 
          type: format === 'json' ? 'application/json' : 'text/csv' 
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        setError('No calculations to export');
      }
    } catch (err) {
      setError('Export failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear all calculations
  const clearAllHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await allowanceFirebaseService.clearAllCalculations();
      
      if (response.success) {
        setCalculationHistory([]);
        setStats(null);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to clear history');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update statistics
  const updateStats = useCallback(async () => {
    try {
      const response = await allowanceFirebaseService.getCalculationStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to update stats:', err);
    }
  }, []);

  // Validation helpers
  const isCurrentStepValid = useCallback(() => {
    const currentStepFields = formSteps[currentStep]?.fields || [];
    
    // For the last step, check required fields
    if (currentStep === formSteps.length - 1) {
      return inputs.numTeachers > 0 && inputs.numJHSTeachers > 0;
    }
    
    return true; // Other steps are optional
  }, [currentStep, formSteps, inputs]);

  const canProceed = useCallback(() => {
    return isCurrentStepValid();
  }, [isCurrentStepValid]);

  const getTotalInputs = useCallback(() => {
    return Object.entries(inputs)
      .filter(([key]) => !key.includes('num') && !key.includes('Teachers'))
      .reduce((sum, [, value]) => sum + (parseFloat(value) || 0), 0);
  }, [inputs]);

  const hasAnyInput = useCallback(() => {
    return getTotalInputs() > 0 || inputs.numTeachers > 1 || inputs.numJHSTeachers > 1;
  }, [getTotalInputs, inputs]);

  // Auto-calculate when inputs change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputs.numTeachers > 0 && inputs.numJHSTeachers > 0 && hasAnyInput()) {
        calculate(false);
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeoutId);
  }, [inputs, calculate, hasAnyInput]);

  // Load calculation history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await allowanceFirebaseService.getAllCalculations();
        if (response.success) {
          setCalculationHistory(response.data);
        }
      } catch (err) {
        console.error('Failed to load calculation history:', err);
      }
    };

    loadHistory();
    updateStats();
  }, [updateStats]);

  return {
    // State
    inputs,
    results,
    isLoading,
    error,
    currentStep,
    calculationHistory,
    formSteps,
    stats,

    // Actions
    updateInput,
    updateInputs,
    calculate,
    resetInputs,
    
    // Stepper
    nextStep,
    prevStep,
    goToStep,
    
    // History
    loadFromHistory,
    deleteFromHistory,
    exportCalculation,
    exportAllCalculations,
    clearAllHistory,
    
    // Validation
    isCurrentStepValid,
    canProceed,
    getTotalInputs,
    hasAnyInput,

    // Computed properties
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === formSteps.length - 1,
    currentStepData: formSteps[currentStep],
    totalSteps: formSteps.length,
  };
};