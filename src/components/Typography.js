import React from 'react';

// Typography component with variant and color support
export const Typography = ({ variant = 'p', color = 'black', className = '', children, ...props }) => {
  const Tag = variant === 'h5' ? 'h5' : 'p';
  
  const baseClasses = {
    h5: 'text-xl font-semibold leading-tight',
    p: 'text-base leading-relaxed'
  };
  
  const colorClasses = {
    'blue-gray': 'text-black',
    'black': 'text-black',
    'gray': 'text-gray-600'
  };
  
  const classes = `${baseClasses[variant]} ${colorClasses[color] || colorClasses.black} ${className}`;
  
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};
