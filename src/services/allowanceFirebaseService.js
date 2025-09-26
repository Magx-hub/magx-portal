// // src/services/allowanceFirebaseService.js
// import {
//   collection,
//   doc,
//   setDoc,
//   getDoc,
//   getDocs,
//   deleteDoc,
//   updateDoc,
//   query,
//   orderBy,
//   serverTimestamp
// } from 'firebase/firestore';
// import { db } from '../firebase/config';

// const COLLECTION_NAME = 'weekly_payments';
// const weeklyPaymentsCollection = collection(db, COLLECTION_NAME);

// /**
//  * Saves or updates a week's allowance data in Firestore.
//  * Uses the week number as the document ID for idempotency.
//  * @param {number} week_number - The week number to save.
//  * @param {object} payload - The data to save for that week.
//  * @returns {object} The saved record with timestamps.
//  */
// export const saveWeek = async (week_number, payload) => {
//   const docRef = doc(db, COLLECTION_NAME, String(week_number));
//   const record = {
//     ...payload,
//     week_number: Number(week_number),
//     updatedAt: serverTimestamp()
//   };

//   // Use setDoc with merge to avoid overwriting createdAt on updates
//   await setDoc(docRef, record, { merge: true });
  
//   // Add createdAt timestamp only if the document is new
//   const docSnap = await getDoc(docRef);
//   if (!docSnap.data().createdAt) {
//     await updateDoc(docRef, { createdAt: serverTimestamp() });
//   }

//   return { ...record, id: docRef.id };
// };

// /**
//  * Loads a specific week's data from Firestore.
//  * @param {number} week_number - The week number to load.
//  * @returns {object|null} The data for the week, or null if not found.
//  */
// export const loadWeek = async (week_number) => {
//   const docRef = doc(db, COLLECTION_NAME, String(week_number));
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     return { id: docSnap.id, ...docSnap.data() };
//   }
//   return null;
// };

// /**
//  * Retrieves all weekly payment records from Firestore, ordered by week number.
//  * @returns {Array<object>} A sorted array of all weekly payment records.
//  */
// export const getAllWeeks = async () => {
//   const q = query(weeklyPaymentsCollection, orderBy("week_number", "asc"));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };

// /**
//  * Deletes a specific week's data from Firestore.
//  * @param {number} week_number - The week number to delete.
//  */
// export const deleteWeek = async (week_number) => {
//   const docRef = doc(db, COLLECTION_NAME, String(week_number));
//   await deleteDoc(docRef);
// };

// /**
//  * Generates and downloads a CSV file of all weekly payment records.
//  */
// export const exportCSV = async () => {
//   const rows = await getAllWeeks();
//   if (rows.length === 0) {
//     alert("No data to export.");
//     return;
//   }

//   const header = [
//     "Week", "Total Amount", "Welfare", "Office Percent", "Kitchen Percent",
//     "Num Teachers", "JHS Extra Classes", "Num JHS Teachers", "Per Teacher",
//     "Special Per JHS Teacher", "Total Deductions", "Created At", "Updated At"
//   ];

//   const csvContent = [
//     header.join(","),
//     ...rows.map(r => [
//       r.week_number,
//       r.total_amount,
//       r.welfare_amount,
//       r.office_percent,
//       r.kitchen_percent,
//       r.num_teachers,
//       r.jhs_extra_classes,
//       r.num_jhs_teachers,
//       r.per_teacher,
//       r.special_per_jhs_teacher,
//       r.total_deductions,
//       r.createdAt?.toDate ? r.createdAt.toDate().toISOString() : 'N/A',
//       r.updatedAt?.toDate ? r.updatedAt.toDate().toISOString() : 'N/A'
//     ].join(','))
//   ].join("\n");

//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `weekly_payments_${new Date().toISOString().slice(0, 10)}.csv`;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// };









// allowanceFirebaseService.js - Service layer for handling calculations

import { performCompleteCalculation, validateInputs } from '../utils/calculator';

class AllowanceFirebaseService {
  constructor() {
    this.calculations = new Map();
  }

  // Simulate async calculation (as if calling Firebase)
  async calculateAllowances(inputs) {
    try {
      // Validate inputs first
      const validation = validateInputs(inputs);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${Object.values(validation.errors).join(', ')}`);
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Perform calculations
      const results = performCompleteCalculation(inputs);

      // Generate unique ID for this calculation
      const calculationId = Date.now().toString();

      // Store calculation (simulate Firebase storage)
      const calculationData = {
        id: calculationId,
        inputs,
        results,
        timestamp: new Date().toISOString(),
      };

      this.calculations.set(calculationId, calculationData);

      return {
        success: true,
        data: calculationData,
        message: 'Calculation completed successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  // Get stored calculation by ID
  async getCalculation(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      const calculation = this.calculations.get(id);
      if (!calculation) {
        throw new Error('Calculation not found');
      }

      return {
        success: true,
        data: calculation,
        message: 'Calculation retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  // Get all stored calculations
  async getAllCalculations() {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));

      const calculations = Array.from(this.calculations.values())
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      return {
        success: true,
        data: calculations,
        message: 'All calculations retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  }

  // Delete a calculation
  async deleteCalculation(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      const deleted = this.calculations.delete(id);
      if (!deleted) {
        throw new Error('Calculation not found');
      }

      return {
        success: true,
        message: 'Calculation deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Update calculation inputs and recalculate
  async updateCalculation(id, newInputs) {
    try {
      const existingCalculation = this.calculations.get(id);
      if (!existingCalculation) {
        throw new Error('Calculation not found');
      }

      // Merge old inputs with new inputs
      const updatedInputs = { ...existingCalculation.inputs, ...newInputs };

      // Validate updated inputs
      const validation = validateInputs(updatedInputs);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${Object.values(validation.errors).join(', ')}`);
      }

      await new Promise(resolve => setTimeout(resolve, 300));

      // Recalculate with updated inputs
      const results = performCompleteCalculation(updatedInputs);

      const updatedCalculation = {
        ...existingCalculation,
        inputs: updatedInputs,
        results,
        timestamp: new Date().toISOString(),
      };

      this.calculations.set(id, updatedCalculation);

      return {
        success: true,
        data: updatedCalculation,
        message: 'Calculation updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  // Export calculation data (simulate export functionality)
  async exportCalculation(id, format = 'json') {
    try {
      const calculation = this.calculations.get(id);
      if (!calculation) {
        throw new Error('Calculation not found');
      }

      await new Promise(resolve => setTimeout(resolve, 200));

      let exportData;
      switch (format.toLowerCase()) {
        case 'json':
          exportData = JSON.stringify(calculation, null, 2);
          break;
        case 'csv':
          exportData = this.convertToCSV(calculation);
          break;
        default:
          throw new Error('Unsupported export format');
      }

      return {
        success: true,
        data: exportData,
        filename: `calculation_${id}.${format}`,
        message: 'Export completed successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  // Helper method to convert calculation to CSV format
  convertToCSV(calculation) {
    const { inputs, results } = calculation;
    const rows = [];

    // Headers
    rows.push('Category,Item,Amount');

    // Inputs
    rows.push('Input,Nursery Amount,' + (inputs.nurseryAmount || 0));
    rows.push('Input,KG1 Amount,' + (inputs.kg1Amount || 0));
    rows.push('Input,KG2 Amount,' + (inputs.kg2Amount || 0));
    rows.push('Input,Basic1 Amount,' + (inputs.basic1Amount || 0));
    rows.push('Input,Basic2 Amount,' + (inputs.basic2Amount || 0));
    rows.push('Input,Basic3 Amount,' + (inputs.basic3Amount || 0));
    rows.push('Input,Basic4 Amount,' + (inputs.basic4Amount || 0));
    rows.push('Input,Basic5 Amount,' + (inputs.basic5Amount || 0));
    rows.push('Input,Basic6 Amount,' + (inputs.basic6Amount || 0));
    rows.push('Input,Basic7-General Amount,' + (inputs.basic7GeneralAmount || 0));
    rows.push('Input,Basic7-JHS Amount,' + (inputs.basic7JHSAmount || 0));
    rows.push('Input,Basic8-General Amount,' + (inputs.basic8GeneralAmount || 0));
    rows.push('Input,Basic8-JHS Amount,' + (inputs.basic8JHSAmount || 0));
    rows.push('Input,Basic9-General Amount,' + (inputs.basic9GeneralAmount || 0));
    rows.push('Input,Basic9-JHS Amount,' + (inputs.basic9JHSAmount || 0));
    rows.push('Input,Welfare Amount,' + (inputs.welfareAmount || 0));
    rows.push('Input,Kitchen,' + (inputs.kitchen || 0));
    rows.push('Input,Number of Teachers,' + (inputs.numTeachers || 0));
    rows.push('Input,Number of JHS Teachers,' + (inputs.numJHSTeachers || 0));

    // Results
    rows.push('Result,Total General,' + results.totals.totalGeneral);
    rows.push('Result,Total JHS,' + results.totals.totalJHS);
    rows.push('Result,Total Sum,' + results.totals.totalSum);
    rows.push('Result,Welfare Deduction,' + results.deductions.welfare);
    rows.push('Result,Office Deduction,' + results.deductions.office);
    rows.push('Result,Kitchen Deduction,' + results.deductions.kitchen);
    rows.push('Result,Each Teacher Amount,' + results.teacherAmounts.eachTeacherAmount);
    rows.push('Result,Each JHS Teacher Amount,' + results.teacherAmounts.eachJHSTeacherAmount);

    return rows.join('\n');
  }

  // Bulk import calculations
  async importCalculations(calculationsData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      let imported = 0;
      const errors = [];

      for (const calcData of calculationsData) {
        try {
          // Validate the calculation data
          if (!calcData.inputs || !calcData.results) {
            throw new Error('Invalid calculation data structure');
          }

          const validation = validateInputs(calcData.inputs);
          if (!validation.isValid) {
            throw new Error(`Invalid inputs: ${Object.values(validation.errors).join(', ')}`);
          }

          // Generate new ID if not provided
          const id = calcData.id || Date.now().toString() + Math.random().toString(36).substr(2, 9);
          
          const calculationData = {
            ...calcData,
            id,
            timestamp: calcData.timestamp || new Date().toISOString(),
          };

          this.calculations.set(id, calculationData);
          imported++;
        } catch (error) {
          errors.push(`Failed to import calculation: ${error.message}`);
        }
      }

      return {
        success: true,
        message: `Successfully imported ${imported} calculations`,
        imported,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        imported: 0,
      };
    }
  }

  // Get calculation statistics
  async getCalculationStats() {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      const calculations = Array.from(this.calculations.values());
      
      if (calculations.length === 0) {
        return {
          success: true,
          data: {
            totalCalculations: 0,
            averageTotalSum: 0,
            averageTeacherAmount: 0,
            averageJHSTeacherAmount: 0,
          },
        };
      }

      const totalSum = calculations.reduce((sum, calc) => sum + calc.results.totals.totalSum, 0);
      const totalTeacherAmount = calculations.reduce((sum, calc) => sum + calc.results.teacherAmounts.eachTeacherAmount, 0);
      const totalJHSTeacherAmount = calculations.reduce((sum, calc) => sum + calc.results.teacherAmounts.eachJHSTeacherAmount, 0);

      return {
        success: true,
        data: {
          totalCalculations: calculations.length,
          averageTotalSum: totalSum / calculations.length,
          averageTeacherAmount: totalTeacherAmount / calculations.length,
          averageJHSTeacherAmount: totalJHSTeacherAmount / calculations.length,
          latestCalculation: calculations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0],
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  // Clear all calculations
  async clearAllCalculations() {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const count = this.calculations.size;
      this.calculations.clear();

      return {
        success: true,
        message: `Cleared ${count} calculations`,
        clearedCount: count,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

// Create singleton instance
const allowanceFirebaseService = new AllowanceFirebaseService();

export default allowanceFirebaseService;