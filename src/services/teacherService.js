import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// ===========================================
// TEACHER CRUD OPERATIONS
// ===========================================

export const addTeacher = async (teacherData) => {
  try {
    const docRef = await addDoc(collection(db, 'teachers'), {
      ...teacherData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding teacher:', error);
    throw error;
  }
};

export const getTeachers = async () => {
  try {
    const q = query(collection(db, 'teachers'), orderBy('fullname', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting teachers:', error);
    throw error;
  }
};


export const getAllTeachers = async () => {
  try {
    const q = query(collection(db, 'teachers'), orderBy('fullname', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting teachers:', error);
    throw error;
  }
};

export const getTeacherById = async (id) => {
  try {
    const docRef = doc(db, 'teachers', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Teacher not found');
    }
  } catch (error) {
    console.error('Error getting teacher by ID:', error);
    throw error;
  }
};

export const updateTeacher = async (id, teacherData) => {
  try {
    const docRef = doc(db, 'teachers', id);
    await updateDoc(docRef, {
      ...teacherData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating teacher:', error);
    throw error;
  }
};

export const deleteTeacher = async (id) => {
  try {
    // First delete related attendance records
    const attendanceQuery = query(collection(db, 'attendance'), where('teacherId', '==', id));
    const attendanceSnapshot = await getDocs(attendanceQuery);
    const deletePromises = attendanceSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Then delete the teacher
    await deleteDoc(doc(db, 'teachers', id));
    return true;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

export const searchTeachers = async (searchTerm) => {
  try {
    const q = query(
      collection(db, 'teachers'),
      where('fullname', '>=', searchTerm),
      where('fullname', '<=', searchTerm + '\uf8ff'),
      orderBy('fullname', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error searching teachers:', error);
    throw error;
  }
};

export const getTeacherStats = async () => {
  try {
    const teachersSnapshot = await getDocs(collection(db, 'teachers'));
    const teachers = teachersSnapshot.docs.map(doc => doc.data());
    
    const departments = [...new Set(teachers.map(teacher => teacher.department))];
    
    return {
      totalTeachers: teachers.length,
      totalDepartments: departments.length
    };
  } catch (error) {
    console.error('Error getting teacher statistics:', error);
    throw error;
  }
};
