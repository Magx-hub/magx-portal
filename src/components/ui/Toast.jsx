import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  position = 'top-right',
  showIcon = true,
  closable = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const types = {
    success: {
      icon: <CheckCircle size={20} />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600',
    },
    error: {
      icon: <AlertCircle size={20} />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600',
    },
    warning: {
      icon: <AlertTriangle size={20} />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600',
    },
    info: {
      icon: <Info size={20} />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600',
    },
  };

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  const typeConfig = types[type];

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed z-50 max-w-sm w-full shadow-lg rounded-lg border pointer-events-auto
        ${typeConfig.bgColor} ${typeConfig.borderColor} ${positions[position]}
        transform transition-all duration-300 ease-in-out
        ${isLeaving ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
      `}
    >
      <div className="p-4">
        <div className="flex items-start">
          {showIcon && (
            <div className={`flex-shrink-0 ${typeConfig.iconColor}`}>
              {typeConfig.icon}
            </div>
          )}
          
          <div className={`ml-3 w-0 flex-1 ${typeConfig.textColor}`}>
            {title && (
              <p className="text-sm font-medium">{title}</p>
            )}
            {message && (
              <p className={`text-sm ${title ? 'mt-1' : ''}`}>{message}</p>
            )}
          </div>
          
          {closable && (
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className={`rounded-md inline-flex ${typeConfig.textColor} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                onClick={handleClose}
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Toast Container for managing multiple toasts
const ToastContainer = ({ toasts = [], removeToast }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
          style={{ top: `${4 + index * 80}px` }}
        />
      ))}
    </div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const toast = {
    success: (message, options = {}) => addToast({ type: 'success', message, ...options }),
    error: (message, options = {}) => addToast({ type: 'error', message, ...options }),
    warning: (message, options = {}) => addToast({ type: 'warning', message, ...options }),
    info: (message, options = {}) => addToast({ type: 'info', message, ...options }),
  };

  return { toasts, removeToast, toast };
};

export { Toast, ToastContainer };
export default Toast;
