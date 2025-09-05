import { useState, useEffect, useCallback } from 'react';
import performanceService from '../services/performanceService';
import { useToast } from '../components/ui/Toast';

// Custom error classes for better error handling
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Initial dummy data for migration
const initialStudents = [
  { 
    id: 1, 
    name: 'Kwame Doku', 
    class: 'Basic 5', 
    attendance: 95,
    subjects: {
      math: { scores: [85, 92, 78, 88], assignments: [90, 85] },
      science: { scores: [92, 88, 95, 90], assignments: [94, 89] },
      english: { scores: [78, 85, 82, 88], assignments: [80, 85] }
    },
    behavior: {
      participation: 4,
      collaboration: 5,
      discipline: 4,
      criticalThinking: 3
    }
  },
  { 
    id: 2, 
    name: 'James Aboagye', 
    class: 'Basic 5', 
    attendance: 88,
    subjects: {
      math: { scores: [72, 68, 75, 70], assignments: [65, 70] },
      science: { scores: [85, 82, 88, 84], assignments: [80, 82] },
      english: { scores: [90, 92, 88, 94], assignments: [91, 89] }
    },
    behavior: {
      participation: 3,
      collaboration: 4,
      discipline: 3,
      criticalThinking: 5
    }
  },
  { 
    id: 3, 
    name: 'Sophia Anna', 
    class: 'Basic 6', 
    attendance: 92,
    subjects: {
      math: { scores: [95, 98, 92, 96], assignments: [97, 94] },
      science: { scores: [88, 92, 90, 94], assignments: [90, 92] },
      english: { scores: [85, 82, 88, 84], assignments: [86, 83] }
    },
    behavior: {
      participation: 5,
      collaboration: 4,
      discipline: 5,
      criticalThinking: 4
    }
  }
];

export const usePerformance = () => {
  // State management (normalized data structure)
  const [students, setStudents] = useState({});
  const [scores, setScores] = useState({});
  const [behaviors, setBehaviors] = useState({});
  const [assessments, setAssessments] = useState({});
  const [analytics, setAnalytics] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Loading and error states
  const [loading, setLoading] = useState({
    students: false,
    scores: false,
    behaviors: false,
    analytics: false,
    migration: false
  });
  
  const [error, setError] = useState(null); // { message: string, type: string }
  const { toast } = useToast();

  // Real-time subscriptions
  const [subscriptions, setSubscriptions] = useState([]);

  // Utility function to update loading state
  const updateLoading = useCallback((key, value) => {
    setLoading(prev => ({ ...prev, [key]: value }));
  }, []);

  // Enhanced error handling utility
  const handleError = useCallback((error, message) => {
    console.error(message, error);

    let userMessage = message;
    let errorType = 'general';

    if (error.name === 'ValidationError') {
      userMessage = `Validation Error: ${error.message}`;
      errorType = 'validation';
    } else if (error.name === 'NetworkError') {
      userMessage = `Network Error: ${error.message}. Please check your connection.`;
      errorType = 'network';
    } else if (error.name === 'NotFoundError') {
      userMessage = `Not Found: ${error.message}`;
      errorType = 'notFound';
    } else if (error.message) {
      userMessage = error.message;
    }

    setError({ message: userMessage, type: errorType });
    toast.error(userMessage);
  }, [toast]);

  // Students Management
  const loadStudents = useCallback(async () => {
    updateLoading('students', true);
    try {
      const studentsData = await performanceService.getStudents();
      const studentsObj = studentsData.reduce((acc, student) => {
        acc[student.id] = student;
        return acc;
      }, {});
      setStudents(studentsObj);
      const studentList = Object.values(studentsObj);
      if (studentList.length > 0 && !selectedStudent) {
        setSelectedStudent(studentList[0]);
      }
    } catch (error) {
      handleError(error, 'Failed to load students');
    } finally {
      updateLoading('students', false);
    }
  }, [updateLoading, handleError, selectedStudent]);

  const addStudent = useCallback(async (studentData) => {
    try {
      const newStudent = await performanceService.createStudent(studentData);
      setStudents(prev => ({ ...prev, [newStudent.id]: newStudent }));
      toast.success('Student added successfully');
      return newStudent;
    } catch (error) {
      handleError(error, 'Failed to add student');
      throw error;
    }
  }, [handleError, toast]);

  const updateStudent = useCallback(async (studentId, updates) => {
    try {
      const updatedStudent = await performanceService.updateStudent(studentId, updates);
      setStudents(prev => ({ ...prev, [studentId]: { ...prev[studentId], ...updates } }));
      if (selectedStudent?.id === studentId) {
        setSelectedStudent(prev => ({ ...prev, ...updates }));
      }
      toast.success('Student updated successfully');
      return updatedStudent;
    } catch (error) {
      handleError(error, 'Failed to update student');
      throw error;
    }
  }, [handleError, toast, selectedStudent]);

  const deleteStudent = useCallback(async (studentId) => {
    try {
      await performanceService.deleteStudent(studentId);
      setStudents(prev => {
        const newStudents = { ...prev };
        delete newStudents[studentId];
        return newStudents;
      });
      if (selectedStudent?.id === studentId) {
        const remainingStudents = Object.values(students).filter(s => s.id !== studentId);
        setSelectedStudent(remainingStudents[0] || null);
      }
      toast.success('Student deleted successfully');
    } catch (error) {
      handleError(error, 'Failed to delete student');
      throw error;
    }
  }, [handleError, toast, selectedStudent, students]);

  // Scores Management
  const addScore = useCallback(async (scoreData) => {
    try {
      const newScore = await performanceService.addScore(scoreData);
      setScores(prev => ({ ...prev, [newScore.id]: newScore }));
      toast.success('Score added successfully');
      return newScore;
    } catch (error) {
      handleError(error, 'Failed to add score');
      throw error;
    }
  }, [handleError, toast]);

  const updateScore = useCallback(async (scoreId, updates) => {
    try {
      const updatedScore = await performanceService.updateScore(scoreId, updates);
      setScores(prev => ({ ...prev, [scoreId]: { ...prev[scoreId], ...updates } }));
      toast.success('Score updated successfully');
      return updatedScore;
    } catch (error) {
      handleError(error, 'Failed to update score');
      throw error;
    }
  }, [handleError, toast]);

  const deleteScore = useCallback(async (scoreId) => {
    try {
      await performanceService.deleteScore(scoreId);
      setScores(prev => {
        const newScores = { ...prev };
        delete newScores[scoreId];
        return newScores;
      });
      toast.success('Score deleted successfully');
    } catch (error) {
      handleError(error, 'Failed to delete score');
      throw error;
    }
  }, [handleError, toast]);

  // Behavior Management
  const addBehavior = useCallback(async (behaviorData) => {
    try {
      const newBehavior = await performanceService.addBehaviorAssessment(behaviorData);
      setBehaviors(prev => ({ ...prev, [newBehavior.id]: newBehavior }));
      toast.success('Behavior assessment added successfully');
      return newBehavior;
    } catch (error) {
      handleError(error, 'Failed to add behavior assessment');
      throw error;
    }
  }, [handleError, toast]);

  const updateBehavior = useCallback(async (behaviorId, updates) => {
    try {
      const updatedBehavior = await performanceService.updateBehaviorAssessment(behaviorId, updates);
      setBehaviors(prev => ({ ...prev, [behaviorId]: { ...prev[behaviorId], ...updates } }));
      toast.success('Behavior assessment updated successfully');
      return updatedBehavior;
    } catch (error) {
      handleError(error, 'Failed to update behavior assessment');
      throw error;
    }
  }, [handleError, toast]);

  const deleteBehavior = useCallback(async (behaviorId) => {
    try {
      await performanceService.deleteBehaviorAssessment(behaviorId);
      setBehaviors(prev => {
        const newBehaviors = { ...prev };
        delete newBehaviors[behaviorId];
        return newBehaviors;
      });
      toast.success('Behavior assessment deleted successfully');
    } catch (error) {
      handleError(error, 'Failed to delete behavior assessment');
      throw error;
    }
  }, [handleError, toast]);

  // Analytics
  const loadClassAnalytics = useCallback(async () => {
    updateLoading('analytics', true);
    try {
      const analyticsData = await performanceService.getClassAnalytics();
      setAnalytics(analyticsData);
    } catch (error) {
      handleError(error, 'Failed to load class analytics');
    } finally {
      updateLoading('analytics', false);
    }
  }, [updateLoading, handleError]);

  const loadStudentAnalytics = useCallback(async (studentId) => {
    updateLoading('analytics', true);
    try {
      const studentAnalytics = await performanceService.getStudentAnalytics(studentId);
      return studentAnalytics;
    } catch (error) {
      handleError(error, 'Failed to load student analytics');
      return null;
    } finally {
      updateLoading('analytics', false);
    }
  }, [updateLoading, handleError]);

  // Data Migration
  const migrateDummyData = useCallback(async () => {
    updateLoading('migration', true);
    try {
      const results = await performanceService.migrateDummyData(initialStudents);
      toast.success(`Migration completed: ${results.students} students, ${results.scores} scores, ${results.behaviors} behaviors`);
      // Reload data after migration
      await loadStudents();
      await loadClassAnalytics();
      return results;
    } catch (error) {
      handleError(error, 'Failed to migrate dummy data');
      throw error;
    } finally {
      updateLoading('migration', false);
    }
  }, [updateLoading, handleError, toast, loadStudents, loadClassAnalytics]);

  // Real-time subscriptions
  const subscribeToStudents = useCallback(() => {
    const unsubscribe = performanceService.subscribeToStudents((studentsData) => {
      setStudents(studentsData);
      if (studentsData.length > 0 && !selectedStudent) {
        setSelectedStudent(studentsData[0]);
      }
    });
    setSubscriptions(prev => [...prev, unsubscribe]);
    return unsubscribe;
  }, [selectedStudent]);

  const subscribeToScores = useCallback(() => {
    const unsubscribe = performanceService.subscribeToScores((scoresData) => {
      setScores(scoresData);
    });
    setSubscriptions(prev => [...prev, unsubscribe]);
    return unsubscribe;
  }, []);

  const subscribeToStudentScores = useCallback((studentId) => {
    const unsubscribe = performanceService.subscribeToStudentScores(studentId, (scoresData) => {
      setScores(scoresData);
    });
    setSubscriptions(prev => [...prev, unsubscribe]);
    return unsubscribe;
  }, []);

  // Utility functions for charts and calculations
  const calculateAverages = useCallback((student) => {
    if (!student || !Object.keys(scores).length) return {};

    const studentScores = Object.values(scores).filter(score => score.studentId === student.id);
    const averages = {};
    const subjects = ['math', 'science', 'english'];

    subjects.forEach(subject => {
      const subjectScores = studentScores.filter(score => score.subject === subject);
      if (subjectScores.length > 0) {
        const average = subjectScores.reduce((sum, score) => sum + score.score, 0) / subjectScores.length;
        averages[subject] = Math.round(average);
      } else {
        averages[subject] = 0;
      }
    });

    return averages;
  }, [scores]);

  const getAcademicData = useCallback((student) => {
    const averages = calculateAverages(student);
    return ['math', 'science', 'english'].map(subject => ({
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      score: averages[subject] || 0,
      max: 100
    }));
  }, [calculateAverages]);

  const getBehaviorData = useCallback((student) => {
    if (!student || !Object.keys(behaviors).length) return [];

    const studentBehaviors = Object.values(behaviors).filter(behavior => behavior.studentId === student.id);
    const latestBehavior = studentBehaviors[0];

    if (!latestBehavior) return [];

    const behaviorMetrics = ['participation', 'collaboration', 'discipline', 'criticalThinking'];
    return behaviorMetrics.map(metric => ({
      metric: metric.charAt(0).toUpperCase() + metric.slice(1).replace(/([A-Z])/g, ' $1').trim(),
      score: latestBehavior[metric] || 0,
      max: 5
    }));
  }, [behaviors]);

  const getProgressData = useCallback((student) => {
    if (!student || !Object.keys(scores).length) return [];

    const studentScores = Object.values(scores)
      .filter(score => score.studentId === student.id)
      .sort((a, b) => new Date(a.createdAt?.toDate?.() || a.createdAt) - new Date(b.createdAt?.toDate?.() || b.createdAt));

    const progressMap = new Map();

    studentScores.forEach((score, index) => {
      const key = `Assessment ${index + 1}`;
      if (!progressMap.has(key)) {
        progressMap.set(key, { name: key });
      }
      progressMap.get(key)[score.subject] = score.score;
    });

    return Array.from(progressMap.values());
  }, [scores]);

  const getClassAverages = useCallback(() => {
    if (!analytics) return {};
    return analytics.subjectAverages || {};
  }, [analytics]);

  const getStudentComparison = useCallback(() => {
    if (!Object.keys(students).length || !Object.keys(scores).length) return [];

    return Object.values(students).map(student => {
      const averages = calculateAverages(student);
      const overallAverage = Object.values(averages).length > 0
        ? Math.round(Object.values(averages).reduce((sum, avg) => sum + avg, 0) / Object.values(averages).length)
        : 0;

      return {
        name: student.name.split(' ')[0],
        average: overallAverage
      };
    });
  }, [students, scores, calculateAverages]);

  // Initialize data and subscriptions
  useEffect(() => {
    loadStudents();
    loadClassAnalytics();
    
    // Set up real-time subscriptions
    const studentsUnsub = subscribeToStudents();
    const scoresUnsub = subscribeToScores();
    
    return () => {
      // Clean up subscriptions
      subscriptions.forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
      studentsUnsub();
      scoresUnsub();
    };
  }, []); // Empty dependency array for initial load only

  // Clean up subscriptions on unmount
  useEffect(() => {
    return () => {
      subscriptions.forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
    };
  }, [subscriptions]);

  return {
    // State (converted to arrays for compatibility)
    students: Object.values(students),
    scores: Object.values(scores),
    behaviors: Object.values(behaviors),
    assessments: Object.values(assessments),
    analytics,
    selectedStudent,
    loading,
    error,
    
    // Student management
    addStudent,
    updateStudent,
    deleteStudent,
    setSelectedStudent,

    // Score management
    addScore,
    updateScore,
    deleteScore,

    // Behavior management
    addBehavior,
    updateBehavior,
    deleteBehavior,
    
    // Analytics
    loadClassAnalytics,
    loadStudentAnalytics,
    
    // Data migration
    migrateDummyData,
    
    // Subscriptions
    subscribeToStudents,
    subscribeToScores,
    subscribeToStudentScores,
    
    // Utility functions
    calculateAverages,
    getAcademicData,
    getBehaviorData,
    getProgressData,
    getClassAverages,
    getStudentComparison,
    
    // Data refresh
    loadStudents,
    
    // Clear error
    clearError: () => setError(null)
  };
};
