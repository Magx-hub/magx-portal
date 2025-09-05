import PropTypes from 'prop-types';

// Typography component with variant and color support
const Typography = ({ variant = 'p', color = 'black', className = '', children, ...props }) => {
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

Typography.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};


// CardBody component
const CardBody = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
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

Card.propTypes = {
  color: PropTypes.string,
  shadow: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};


// Feature Card component that matches your specification
const FeatureCard = ({ icon, title, children, ...cardProps }) => {
  return (
    <Card color="white" shadow={true} {...cardProps}>
      <CardBody className="grid justify-start">
        <div className="mb-4 grid h-12 w-12 place-content-center rounded-lg bg-blue-600 p-2.5 text-left text-white">
          {icon}
        </div>
        <Typography variant="h5" color="black" className="mb-2">
          {title}
        </Typography>
        <Typography className="font-normal !text-black">
          {children}
        </Typography>
      </CardBody>
    </Card>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};


export { Typography, Card, CardBody, FeatureCard };