import React from 'react';

const Card = ({
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  border = true,
  hover = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-white transition-all duration-200';

  const variants = {
    default: '',
    elevated: 'transform hover:scale-[1.02]',
    interactive: 'cursor-pointer hover:shadow-lg',
    outlined: 'border-2',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };

  const borderClasses = border ? 'border border-gray-200' : '';
  const hoverClasses = hover ? 'hover:shadow-lg hover:border-gray-300' : '';

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${paddings[padding]}
    ${shadows[shadow]}
    ${roundedClasses[rounded]}
    ${borderClasses}
    ${hoverClasses}
    ${className}
  `.trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardBody, CardFooter };
export default Card;
