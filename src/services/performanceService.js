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
  onSnapshot,
  writeBatch,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Collection names
const COLLECTIONS = {
  STUDENTS: 'performance_students',
  SCORES: 'performance_scores',
  BEHAVIOR: 'performance_behavior',
  ASSESSMENTS: 'performance_assessments'
};

// Validation utilities
const validateStudentData = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Student data must be a valid object');
  }
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    throw new Error('Student name is required and must be a non-empty string');
  }
  if (!data.class || typeof data.class !== 'string' || data.class.trim().length === 0) {
    throw new Error('Student class is required and must be a non-empty string');
  }
  if (data.attendance !== undefined && (typeof data.attendance !== 'number' || data.attendance < 0 || data.attendance > 100)) {
    throw new Error('Attendance must be a number between 0 and 100');
  }
};

const validateScoreData = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Score data must be a valid object');
  }
  if (!data.studentId || typeof data.studentId !== 'string') {
    throw new Error('Student ID is required');
  }
  if (!data.subject || typeof data.subject !== 'string' || !['math', 'science', 'english'].includes(data.subject)) {
    throw new Error('Subject must be one of: math, science, english');
  }
  if (typeof data.score !== 'number' || data.score < 0 || data.score > 100) {
    throw new Error('Score must be a number between 0 and 100');
  }
  if (data.type && !['test', 'assignment'].includes(data.type)) {
    throw new Error('Type must be either test or assignment');
  }
};

const validateBehaviorData = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Behavior data must be a valid object');
  }
  if (!data.studentId || typeof data.studentId !== 'string') {
    throw new Error('Student ID is required');
  }
  const metrics = ['participation', 'collaboration', 'discipline', 'criticalThinking'];
  metrics.forEach(metric => {
    if (data[metric] !== undefined && (typeof data[metric] !== 'number' || data[metric] < 1 || data[metric] > 5)) {
      throw new Error(`${metric} must be a number between 1 and 5`);
    }
  });
};

// Performance Service Class
class PerformanceService {
  // Students CRUD Operations
  async createStudent(studentData) {
    try {
      validateStudentData(studentData);
      const docRef = await addDoc(collection(db, COLLECTIONS.STUDENTS), {
        ...studentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...studentData };
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }

  async getStudents() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.STUDENTS), orderBy('name'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }

  async getStudent(studentId) {
    try {
      const docRef = doc(db, COLLECTIONS.STUDENTS, studentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Student not found');
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  }

  async updateStudent(studentId, updates) {
    try {
      validateStudentData({ ...updates, name: 'dummy', class: 'dummy' }); // Validate only provided fields
      const docRef = doc(db, COLLECTIONS.STUDENTS, studentId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { id: studentId, ...updates };
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }

  async deleteStudent(studentId) {
    try {
      // Delete student and all related data
      const batch = writeBatch(db);
      
      // Delete student document
      batch.delete(doc(db, COLLECTIONS.STUDENTS, studentId));
      
      // Delete related scores
      const scoresQuery = query(
        collection(db, COLLECTIONS.SCORES),
        where('studentId', '==', studentId)
      );
      const scoresSnapshot = await getDocs(scoresQuery);
      scoresSnapshot.docs.forEach(doc => batch.delete(doc.ref));
      
      // Delete related behavior records
      const behaviorQuery = query(
        collection(db, COLLECTIONS.BEHAVIOR),
        where('studentId', '==', studentId)
      );
      const behaviorSnapshot = await getDocs(behaviorQuery);
      behaviorSnapshot.docs.forEach(doc => batch.delete(doc.ref));
      
      await batch.commit();
      return studentId;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }

  // Academic Scores CRUD Operations
  async addScore(scoreData) {
    try {
      validateScoreData(scoreData);
      const docRef = await addDoc(collection(db, COLLECTIONS.SCORES), {
        ...scoreData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...scoreData };
    } catch (error) {
      console.error('Error adding score:', error);
      throw error;
    }
  }

  async getScoresByStudent(studentId) {
    try {
      const q = query(
        collection(db, COLLECTIONS.SCORES),
        where('studentId', '==', studentId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching scores:', error);
      throw error;
    }
  }

  async getScoresBySubject(subject) {
    try {
      const q = query(
        collection(db, COLLECTIONS.SCORES),
        where('subject', '==', subject),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching scores by subject:', error);
      throw error;
    }
  }

  async updateScore(scoreId, updates) {
    try {
      const docRef = doc(db, COLLECTIONS.SCORES, scoreId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { id: scoreId, ...updates };
    } catch (error) {
      console.error('Error updating score:', error);
      throw error;
    }
  }

  async deleteScore(scoreId) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.SCORES, scoreId));
      return scoreId;
    } catch (error) {
      console.error('Error deleting score:', error);
      throw error;
    }
  }

  // Behavioral Assessment CRUD Operations
  async addBehaviorAssessment(behaviorData) {
    try {
      validateBehaviorData(behaviorData);
      const docRef = await addDoc(collection(db, COLLECTIONS.BEHAVIOR), {
        ...behaviorData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...behaviorData };
    } catch (error) {
      console.error('Error adding behavior assessment:', error);
      throw error;
    }
  }

  async getBehaviorByStudent(studentId) {
    try {
      const q = query(
        collection(db, COLLECTIONS.BEHAVIOR),
        where('studentId', '==', studentId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching behavior assessments:', error);
      throw error;
    }
  }

  async updateBehaviorAssessment(behaviorId, updates) {
    try {
      const docRef = doc(db, COLLECTIONS.BEHAVIOR, behaviorId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { id: behaviorId, ...updates };
    } catch (error) {
      console.error('Error updating behavior assessment:', error);
      throw error;
    }
  }

  async deleteBehaviorAssessment(behaviorId) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.BEHAVIOR, behaviorId));
      return behaviorId;
    } catch (error) {
      console.error('Error deleting behavior assessment:', error);
      throw error;
    }
  }

  // Assessment Management
  async createAssessment(assessmentData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.ASSESSMENTS), {
        ...assessmentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...assessmentData };
    } catch (error) {
      console.error('Error creating assessment:', error);
      throw error;
    }
  }

  async getAssessments() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.ASSESSMENTS), orderBy('createdAt', 'desc'))
      );
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching assessments:', error);
      throw error;
    }
  }

  // Analytics and Calculations
  async getClassAnalytics() {
    try {
      const [students, scores, behaviors] = await Promise.all([
        this.getStudents(),
        getDocs(collection(db, COLLECTIONS.SCORES)),
        getDocs(collection(db, COLLECTIONS.BEHAVIOR))
      ]);

      const scoresData = scores.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const behaviorData = behaviors.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Calculate subject averages
      const subjectAverages = {};
      const subjects = ['math', 'science', 'english'];
      
      subjects.forEach(subject => {
        const subjectScores = scoresData.filter(score => score.subject === subject);
        if (subjectScores.length > 0) {
          const average = subjectScores.reduce((sum, score) => sum + score.score, 0) / subjectScores.length;
          subjectAverages[subject] = Math.round(average);
        } else {
          subjectAverages[subject] = 0;
        }
      });

      // Calculate overall class average
      const overallAverage = Math.round(
        Object.values(subjectAverages).reduce((sum, avg) => sum + avg, 0) / subjects.length
      );

      // Calculate attendance average
      const attendanceAverage = students.length > 0 
        ? Math.round(students.reduce((sum, student) => sum + (student.attendance || 0), 0) / students.length)
        : 0;

      // Find top performer
      const studentAverages = students.map(student => {
        const studentScores = scoresData.filter(score => score.studentId === student.id);
        const average = studentScores.length > 0
          ? studentScores.reduce((sum, score) => sum + score.score, 0) / studentScores.length
          : 0;
        return { ...student, average };
      });

      const topPerformer = studentAverages.reduce((top, student) => 
        student.average > top.average ? student : top, 
        { name: 'N/A', average: 0 }
      );

      const needsImprovement = studentAverages.reduce((lowest, student) => 
        student.average < lowest.average ? student : lowest,
        { name: 'N/A', average: 100 }
      );

      return {
        subjectAverages,
        overallAverage,
        attendanceAverage,
        topPerformer,
        needsImprovement,
        totalStudents: students.length,
        totalAssessments: scoresData.length,
        studentAverages
      };
    } catch (error) {
      console.error('Error calculating class analytics:', error);
      throw error;
    }
  }

  async getStudentAnalytics(studentId) {
    try {
      const [student, scores, behaviors] = await Promise.all([
        this.getStudent(studentId),
        this.getScoresByStudent(studentId),
        this.getBehaviorByStudent(studentId)
      ]);

      // Calculate subject averages for the student
      const subjectAverages = {};
      const subjects = ['math', 'science', 'english'];
      
      subjects.forEach(subject => {
        const subjectScores = scores.filter(score => score.subject === subject);
        if (subjectScores.length > 0) {
          const average = subjectScores.reduce((sum, score) => sum + score.score, 0) / subjectScores.length;
          subjectAverages[subject] = Math.round(average);
        } else {
          subjectAverages[subject] = 0;
        }
      });

      // Calculate overall average
      const overallAverage = Math.round(
        Object.values(subjectAverages).reduce((sum, avg) => sum + avg, 0) / subjects.length
      );

      // Get latest behavior assessment
      const latestBehavior = behaviors.length > 0 ? behaviors[0] : null;

      // Prepare progress data for charts
      const progressData = scores
        .sort((a, b) => new Date(a.createdAt?.toDate?.() || a.createdAt) - new Date(b.createdAt?.toDate?.() || b.createdAt))
        .map((score, index) => ({
          name: `Assessment ${index + 1}`,
          [score.subject]: score.score,
          date: score.createdAt?.toDate?.() || new Date(score.createdAt)
        }));

      return {
        student,
        subjectAverages,
        overallAverage,
        scores,
        behaviors,
        latestBehavior,
        progressData
      };
    } catch (error) {
      console.error('Error calculating student analytics:', error);
      throw error;
    }
  }

  // Real-time Subscriptions
  subscribeToStudents(callback) {
    const q = query(collection(db, COLLECTIONS.STUDENTS), orderBy('name'));
    return onSnapshot(q, (querySnapshot) => {
      const students = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(students);
    }, (error) => {
      console.error('Error in students subscription:', error);
    });
  }

  subscribeToScores(callback) {
    const q = query(collection(db, COLLECTIONS.SCORES), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const scores = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(scores);
    }, (error) => {
      console.error('Error in scores subscription:', error);
    });
  }

  subscribeToStudentScores(studentId, callback) {
    const q = query(
      collection(db, COLLECTIONS.SCORES),
      where('studentId', '==', studentId),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (querySnapshot) => {
      const scores = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(scores);
    }, (error) => {
      console.error('Error in student scores subscription:', error);
    });
  }

  // Batch Migration from Dummy Data
  async migrateDummyData(dummyStudents) {
    try {
      const batch = writeBatch(db);
      const migrationResults = {
        students: 0,
        scores: 0,
        behaviors: 0
      };

      for (const dummyStudent of dummyStudents) {
        // Create student document
        const studentRef = doc(collection(db, COLLECTIONS.STUDENTS));
        batch.set(studentRef, {
          name: dummyStudent.name,
          class: dummyStudent.class,
          attendance: dummyStudent.attendance,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        migrationResults.students++;

        // Create scores for each subject
        for (const [subject, data] of Object.entries(dummyStudent.subjects)) {
          // Add test scores
          data.scores.forEach((score, index) => {
            const scoreRef = doc(collection(db, COLLECTIONS.SCORES));
            batch.set(scoreRef, {
              studentId: studentRef.id,
              subject,
              score,
              type: 'test',
              assessmentName: `Test ${index + 1}`,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
            migrationResults.scores++;
          });

          // Add assignment scores
          data.assignments.forEach((score, index) => {
            const scoreRef = doc(collection(db, COLLECTIONS.SCORES));
            batch.set(scoreRef, {
              studentId: studentRef.id,
              subject,
              score,
              type: 'assignment',
              assessmentName: `Assignment ${index + 1}`,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
            migrationResults.scores++;
          });
        }

        // Create behavior assessment
        const behaviorRef = doc(collection(db, COLLECTIONS.BEHAVIOR));
        batch.set(behaviorRef, {
          studentId: studentRef.id,
          participation: dummyStudent.behavior.participation,
          collaboration: dummyStudent.behavior.collaboration,
          discipline: dummyStudent.behavior.discipline,
          criticalThinking: dummyStudent.behavior.criticalThinking,
          notes: 'Migrated from dummy data',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        migrationResults.behaviors++;
      }

      await batch.commit();
      console.log('Migration completed:', migrationResults);
      return migrationResults;
    } catch (error) {
      console.error('Error migrating dummy data:', error);
      throw error;
    }
  }

  // Utility Methods
  async clearAllData() {
    try {
      const batch = writeBatch(db);
      
      const collections = [COLLECTIONS.STUDENTS, COLLECTIONS.SCORES, COLLECTIONS.BEHAVIOR, COLLECTIONS.ASSESSMENTS];
      
      for (const collectionName of collections) {
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.docs.forEach(doc => batch.delete(doc.ref));
      }
      
      await batch.commit();
      console.log('All performance data cleared');
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const performanceService = new PerformanceService();
export default performanceService;
