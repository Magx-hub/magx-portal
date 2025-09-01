import React from 'react';

// Typography component with variant and color support
const Typography = ({ variant = 'p', color = 'black', className = '', children, ...props }) => {
  const Tag = variant === 'h5' ? 'h5' : 'p';
  
  const baseClasses = {
    h5: 'text-xl font-semibold leading-tight',
    p: 'text-base leading-relaxed'
  };
  
  const colorClasses = {
    'blue-gray': 'text-blue-gray-900',
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


// CardBody component
const CardBody = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};


// Main Card component
const Card = ({ 
  color = 'white', 
  shadow = true, 
  className = '', 
  children, 
  ...props 
}) => {
  const colorClasses = {
    transparent: 'bg-transparent',
    white: 'bg-white',
    gray: 'bg-gray-50'
  };
  
  const shadowClass = shadow ? 'shadow-lg' : '';
  
  const classes = `rounded-lg ${colorClasses[color]} ${shadowClass} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};


// Feature Card component that matches your specification
const FeatureCard = ({ icon, title, children, ...cardProps }) => {
  return (
    <Card color="transparent" shadow={false} {...cardProps}>
      <CardBody className="grid justify-start">
        <div className="mb-4 grid h-12 w-12 place-content-center rounded-lg bg-gray-900 p-2.5 text-left text-white">
          {icon}
        </div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className="font-normal !text-gray-500">
          {children}
        </Typography>
      </CardBody>
    </Card>
  );
};


export default { Typography, Card, CardBody, FeatureCard };