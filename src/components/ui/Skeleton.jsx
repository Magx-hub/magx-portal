import React from 'react';

const Skeleton = ({
  variant = 'text',
  width = '100%',
  height,
  rounded = 'md',
  animate = true,
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-gray-200';
  const animateClasses = animate ? 'animate-pulse' : '';
  
  const variants = {
    text: 'h-4',
    title: 'h-6',
    subtitle: 'h-5',
    button: 'h-10',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-32',
    image: 'h-48',
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const variantHeight = variants[variant] || '';
  const customHeight = height ? `h-[${height}]` : '';
  const customWidth = width !== '100%' ? `w-[${width}]` : 'w-full';

  const classes = `
    ${baseClasses}
    ${animateClasses}
    ${variantHeight}
    ${customHeight}
    ${customWidth}
    ${roundedClasses[rounded]}
    ${className}
  `.trim();

  return <div className={classes} style={{ width, height }} {...props} />;
};

// Skeleton components for common patterns
const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={index === lines - 1 ? '75%' : '100%'}
      />
    ))}
  </div>
);

const SkeletonCard = ({ className = '' }) => (
  <div className={`p-4 border border-gray-200 rounded-lg ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="avatar" />
      <div className="flex-1">
        <Skeleton variant="title" width="60%" className="mb-2" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <SkeletonText lines={2} />
  </div>
);

const SkeletonTable = ({ rows = 5, columns = 4, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {/* Header */}
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={`header-${index}`} variant="text" width="80%" />
      ))}
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={`cell-${rowIndex}-${colIndex}`}
            variant="text"
            width={colIndex === 0 ? '90%' : '70%'}
          />
        ))}
      </div>
    ))}
  </div>
);

const SkeletonStats = ({ count = 4, className = '' }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="p-4 border border-gray-200 rounded-lg">
        <Skeleton variant="text" width="60%" className="mb-2" />
        <Skeleton variant="title" width="40%" className="mb-1" />
        <Skeleton variant="text" width="80%" />
      </div>
    ))}
  </div>
);

export { Skeleton, SkeletonText, SkeletonCard, SkeletonTable, SkeletonStats };
export default Skeleton;
