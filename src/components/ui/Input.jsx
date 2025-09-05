import React, { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  size = 'md',
  variant = 'default',
  error = false,
  disabled = false,
  fullWidth = false,
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  placeholder,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'block border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    filled: 'bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500',
    flushed: 'border-0 border-b-2 rounded-none border-gray-300 focus:border-blue-500 focus:ring-0 px-0',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-2.5 text-base min-h-[44px]',
    lg: 'px-4 py-3 text-lg min-h-[52px]',
  };

  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : variants[variant];

  const widthClasses = fullWidth ? 'w-full' : '';

  const inputClasses = `
    ${baseClasses}
    ${errorClasses}
    ${sizes[size]}
    ${widthClasses}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${className}
  `.trim();

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {(helperText || errorText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error ? errorText : helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
export default Input;
