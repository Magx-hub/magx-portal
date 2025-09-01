import { useState, useCallback, useEffect } from 'react';

// Mock data
const mockTeachers = [
  { id: 1, name: 'John Doe', department: 'Mathematics', experience: 10 },
  { id: 2, name: 'Jane Smith', department: 'Science', experience: 8 },
  { id: 3, name: 'Peter Jones', department: 'History', experience: 15 },
  { id: 4, name: 'Mary Williams', department: 'English', experience: 5 },
];

const mockStats = {
  totalTeachers: 4,
  totalDepartments: 4,
  departmentDistribution: [
    { name: 'Mathematics', value: 1 },
    { name: 'Science', value: 1 },
    { name: 'History', value: 1 },
    { name: 'English', value: 1 },
  ],
};

export const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalTeachers: 0, totalDepartments: 0, departmentDistribution: [] });

  const handleAsync = useCallback(async (asyncFunction) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate async operation
      return await new Promise(resolve => setTimeout(() => resolve(asyncFunction()), 500));
    } catch (err) {
      console.error('Operation error:', err);
      setError(err.message || 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTeachers = useCallback(async () => {
    const data = await handleAsync(() => mockTeachers);
    if (data) {
      setTeachers(data);
    }
  }, [handleAsync]);

  const addTeacher = useCallback(async (teacherData) => {
    const newTeacherId = await handleAsync(() => {
      const newTeacher = { ...teacherData, id: mockTeachers.length + 1 };
      mockTeachers.push(newTeacher);
      return newTeacher.id;
    });
    if (newTeacherId) {
      await fetchTeachers(); // Refresh the list
    }
    return newTeacherId;
  }, [handleAsync, fetchTeachers]);

  const updateTeacher = useCallback(async (id, teacherData) => {
    const success = await handleAsync(() => {
      const index = mockTeachers.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTeachers[index] = { ...mockTeachers[index], ...teacherData };
        return true;
      }
      return false;
    });
    if (success) {
      await fetchTeachers(); // Refresh the list
    }
    return success;
  }, [handleAsync, fetchTeachers]);

  const deleteTeacher = useCallback(async (id) => {
    const success = await handleAsync(() => {
      const index = mockTeachers.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTeachers.splice(index, 1);
        return true;
      }
      return false;
    });
    if (success) {
      setTeachers(prev => prev.filter(t => t.id !== id));
    }
    return success;
  }, [handleAsync]);

  const searchTeachers = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      await fetchTeachers();
      return;
    }
    
    const data = await handleAsync(() => 
      mockTeachers.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (data) {
      setTeachers(data);
    }
  }, [handleAsync, fetchTeachers]);

  const fetchTeacherStats = useCallback(async () => {
    const data = await handleAsync(() => mockStats);
    if (data) {
      setStats(data);
    }
  }, [handleAsync]);

  useEffect(() => {
    fetchTeachers();
    fetchTeacherStats();
  }, [fetchTeachers, fetchTeacherStats]);

  return {
    teachers,
    loading,
    error,
    stats,
    fetchTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    searchTeachers,
    fetchTeacherStats,
  };
};