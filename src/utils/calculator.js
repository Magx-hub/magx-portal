// calculator.js - Utility functions for fee calculations

export const calculateTotals = (inputs) => {
  const {
    nurseryAmount = 0,
    kg1Amount = 0,
    kg2Amount = 0,
    basic1Amount = 0,
    basic2Amount = 0,
    basic3Amount = 0,
    basic4Amount = 0,
    basic5Amount = 0,
    basic6Amount = 0,
    basic7GeneralAmount = 0,
    basic7JHSAmount = 0,
    basic8GeneralAmount = 0,
    basic8JHSAmount = 0,
    basic9GeneralAmount = 0,
    basic9JHSAmount = 0,
  } = inputs;

  // Total General calculation
  const totalGeneral = 
    nurseryAmount +
    kg1Amount +
    kg2Amount +
    basic1Amount +
    basic2Amount +
    basic3Amount +
    basic4Amount +
    basic5Amount +
    basic6Amount +
    basic7GeneralAmount +
    basic8GeneralAmount +
    basic9GeneralAmount;

  // Total JHS calculation
  const totalJHS = 
    basic7JHSAmount +
    basic8JHSAmount +
    basic9JHSAmount;

  // Total Sum calculation
  const totalSum = 
    basic1Amount +
    basic2Amount +
    basic3Amount +
    basic4Amount +
    basic5Amount +
    basic6Amount +
    basic7GeneralAmount +
    basic7JHSAmount +
    basic8GeneralAmount +
    basic8JHSAmount +
    basic9GeneralAmount +
    basic9JHSAmount;

  return {
    totalGeneral,
    totalJHS,
    totalSum,
  };
};

export const calculateDeductions = (totalGeneral, welfareAmount = 0) => {
  // Step 1: Welfare deduction
  const welfare = welfareAmount > 0 ? welfareAmount : 0;
  const balanceAfterWelfare = totalGeneral - welfare;

  // Step 2: Office deduction (5% of balance after welfare)
  const office = balanceAfterWelfare * 0.05;
  const balanceAfterOffice = balanceAfterWelfare - office;

  // Step 3: Kitchen deduction (5% of balance after office)
  const kitchen = balanceAfterOffice * 0.05;
  const balanceAfterKitchen = balanceAfterOffice - kitchen;

  return {
    welfare,
    office,
    kitchen,
    balanceAfterWelfare,
    balanceAfterOffice,
    balanceAfterKitchen,
  };
};

export const calculateTeacherAmounts = (balanceAfterKitchen, totalJHS, numTeachers = 1, numJHSTeachers = 1) => {
  // Each General Teacher amount
  const eachTeacherAmount = numTeachers > 0 ? balanceAfterKitchen / numTeachers : 0;

  // Each JHS Teacher amount
  const eachJHSTeacherAmount = numJHSTeachers > 0 ? totalJHS / numJHSTeachers : 0;

  return {
    eachTeacherAmount,
    eachJHSTeacherAmount,
  };
};

export const performCompleteCalculation = (inputs) => {
  // Calculate totals
  const totals = calculateTotals(inputs);

  // Calculate deductions
  const deductions = calculateDeductions(totals.totalGeneral, inputs.welfareAmount);

  // Calculate teacher amounts
  const teacherAmounts = calculateTeacherAmounts(
    deductions.balanceAfterKitchen,
    totals.totalJHS,
    inputs.numTeachers,
    inputs.numJHSTeachers
  );

  return {
    totals,
    deductions,
    teacherAmounts,
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount || 0);
};

export const validateInputs = (inputs) => {
  const errors = {};
  
  // Check if required numeric fields are valid
  const numericFields = [
    'numTeachers',
    'numJHSTeachers',
  ];

  numericFields.forEach(field => {
    if (!inputs[field] || inputs[field] <= 0) {
      errors[field] = `${field} must be greater than 0`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};