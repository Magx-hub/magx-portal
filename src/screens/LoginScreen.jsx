import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '', name: '' });
  const [error, setError] = useState('');
  const { login, teachers } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError('');
    setCredentials({ username: '', password: '', name: '' });
    setSelectedTeacher('');
  };

  const handleTeacherSelect = (teacherName) => {
    setSelectedTeacher(teacherName);
    setCredentials({ ...credentials, name: teacherName });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(selectedRole, credentials);
    if (!result.success) {
      setError(result.message || 'Login failed');
    } else {
      // Redirect to home page after successful login
      navigate('/', { replace: true });
    }
  };

  const handleInputChange = (field, value) => {
    setCredentials({ ...credentials, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            MagX Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            School Management System
          </p>
        </div>

        {!selectedRole ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 text-center">SELECT YOUR ROLE</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleRoleSelect('admin')}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Admin
              </button>
              <button
                onClick={() => handleRoleSelect('teacher')}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Teacher
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {selectedRole === 'admin' ? (
                <>
                  <div>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                      value={credentials.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Teacher
                    </label>
                    <select
                      value={selectedTeacher}
                      onChange={(e) => handleTeacherSelect(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">Choose a teacher...</option>
                      {teachers.map((teacher) => (
                        <option key={teacher} value={teacher}>
                          {teacher}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedTeacher && (
                    <div>
                      <label htmlFor="teacher-password" className="sr-only">Password</label>
                      <input
                        id="teacher-password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                        placeholder="Enter password"
                        value={credentials.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;