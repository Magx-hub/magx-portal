import React from 'react';
import { designSystem } from '../../styles/designSystem';

const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 active:bg-gray-300',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2" style={{ fontSize: iconSizes[size] }}>
          {icon}
        </span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2" style={{ fontSize: iconSizes[size] }}>
          {icon}
        </span>
      )}
    </button>
  );
};

export { Button };
export default Button;
