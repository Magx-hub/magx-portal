import React, { useState, useEffect } from 'react';
import { Save, X, Clock, User, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { Button, Input, Card, Modal, useToast } from '../ui';

const EnhancedAttendanceForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingRecord = null, 
  teachers = [], 
  loading = false 
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    teacherId: '',
    date: new Date().toISOString().split('T')[0],
    checkInTime: '',
    checkOutTime: '',
    status: 'Present',
    weekNum: 1,
    remarks: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when editing
  useEffect(() => {
    if (editingRecord) {
      setFormData({
        teacherId: editingRecord.teacherId || '',
        date: editingRecord.date || new Date().toISOString().split('T')[0],
        checkInTime: editingRecord.checkInTime || '',
        checkOutTime: editingRecord.checkOutTime || '',
        status: editingRecord.status || 'Present',
        weekNum: editingRecord.weekNum || 1,
        remarks: editingRecord.remarks || ''
      });
    } else {
      // Reset form for new record
      setFormData({
        teacherId: '',
        date: new Date().toISOString().split('T')[0],
        checkInTime: '',
        checkOutTime: '',
        status: 'Present',
        weekNum: 1,
        remarks: ''
      });
    }
    setErrors({});
  }, [editingRecord, isOpen]);

  // Real-time validation
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'teacherId':
        if (!value) {
          newErrors.teacherId = 'Please select a teacher';
        } else {
          delete newErrors.teacherId;
        }
        break;
      
      case 'date':
        if (!value) {
          newErrors.date = 'Date is required';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          if (selectedDate > today) {
            newErrors.date = 'Cannot select future dates';
          } else {
            delete newErrors.date;
          }
        }
        break;
      
      case 'checkInTime':
        if (value && formData.checkOutTime) {
          const checkIn = new Date(`2000-01-01T${value}`);
          const checkOut = new Date(`2000-01-01T${formData.checkOutTime}`);
          if (checkIn >= checkOut) {
            newErrors.checkInTime = 'Check-in must be before check-out';
          } else {
            delete newErrors.checkInTime;
            delete newErrors.checkOutTime;
          }
        } else {
          delete newErrors.checkInTime;
        }
        break;
      
      case 'checkOutTime':
        if (value && formData.checkInTime) {
          const checkIn = new Date(`2000-01-01T${formData.checkInTime}`);
          const checkOut = new Date(`2000-01-01T${value}`);
          if (checkOut <= checkIn) {
            newErrors.checkOutTime = 'Check-out must be after check-in';
          } else {
            delete newErrors.checkInTime;
            delete newErrors.checkOutTime;
          }
        } else {
          delete newErrors.checkOutTime;
        }
        break;
      
      case 'weekNum':
        const weekNumber = parseInt(value);
        if (!weekNumber || weekNumber < 1 || weekNumber > 16) {
          newErrors.weekNum = 'Week number must be between 1 and 16';
        } else {
          delete newErrors.weekNum;
        }
        break;
      
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const calculateWorkHours = () => {
    if (formData.checkInTime && formData.checkOutTime) {
      const checkIn = new Date(`2000-01-01T${formData.checkInTime}`);
      const checkOut = new Date(`2000-01-01T${formData.checkOutTime}`);
      const diffMs = checkOut - checkIn;
      const hours = diffMs / (1000 * 60 * 60);
      return hours > 0 ? hours.toFixed(2) : '0.00';
    }
    return '0.00';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = Object.keys(formData).every(key => validateField(key, formData[key]));
    
    if (!isValid || Object.keys(errors).length > 0) {
      showToast('Please fix the errors before submitting', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const workHours = parseFloat(calculateWorkHours());
      const submissionData = {
        ...formData,
        workHours,
        weekNum: parseInt(formData.weekNum),
        updatedAt: new Date().toISOString()
      };

      await onSubmit(submissionData);
      showToast(
        editingRecord ? 'Attendance updated successfully' : 'Attendance recorded successfully', 
        'success'
      );
      onClose();
    } catch (error) {
      showToast(error.message || 'Failed to save attendance', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedTeacher = () => {
    return teachers.find(t => t.id === formData.teacherId);
  };

  const statusOptions = [
    { value: 'Present', label: 'Present', color: 'text-green-600' },
    { value: 'Absent', label: 'Absent', color: 'text-red-600' },
    { value: 'Late', label: 'Late', color: 'text-yellow-600' },
    { value: 'Half Day', label: 'Half Day', color: 'text-purple-600' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Header>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingRecord ? 'Edit Attendance' : 'Record Attendance'}
            </h2>
            <p className="text-sm text-gray-500">
              {editingRecord ? 'Update attendance record' : 'Add new attendance record'}
            </p>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Teacher Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="inline mr-1" />
              Teacher *
            </label>
            <select
              name="teacherId"
              value={formData.teacherId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.teacherId ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              disabled={loading}
              aria-describedby={errors.teacherId ? 'teacherId-error' : undefined}
            >
              <option value="">Select a teacher...</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.fullname} - {teacher.department}
                </option>
              ))}
            </select>
            {errors.teacherId && (
              <p id="teacherId-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.teacherId}
              </p>
            )}
          </div>

          {/* Date and Week Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Date *
              </label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                error={errors.date}
                disabled={loading}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Week *
              </label>
              <select
                name="weekNum"
                value={formData.weekNum}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.weekNum ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                disabled={loading}
                aria-describedby={errors.weekNum ? 'weekNum-error' : undefined}
              >
                {Array.from({ length: 16 }, (_, i) => i + 1).map(week => (
                  <option key={week} value={week}>
                    Week {week}
                  </option>
                ))}
              </select>
              {errors.weekNum && (
                <p id="weekNum-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.weekNum}
                </p>
              )}
            </div>
          </div>

          {/* Time Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in Time
              </label>
              <Input
                type="time"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleInputChange}
                error={errors.checkInTime}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out Time
              </label>
              <Input
                type="time"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleInputChange}
                error={errors.checkOutTime}
                disabled={loading}
              />
            </div>
          </div>

          {/* Work Hours Display */}
          {formData.checkInTime && formData.checkOutTime && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Calculated Work Hours</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{calculateWorkHours()} hours</p>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {statusOptions.map(option => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.status === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={formData.status === option.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className={`text-sm font-medium ${
                    formData.status === option.value ? 'text-blue-700' : option.color
                  }`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remarks (Optional)
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Add any additional notes..."
              disabled={loading}
            />
          </div>

          {/* Selected Teacher Info */}
          {getSelectedTeacher() && (
            <Card className="p-4 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{getSelectedTeacher().fullname}</h4>
                  <p className="text-sm text-gray-600">{getSelectedTeacher().department}</p>
                </div>
              </div>
            </Card>
          )}
        </form>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={Object.keys(errors).length > 0 || !formData.teacherId}
          >
            <Save size={16} className="mr-2" />
            {editingRecord ? 'Update Record' : 'Save Record'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EnhancedAttendanceForm;
