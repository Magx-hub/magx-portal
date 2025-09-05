import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    md: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 ${sizeClasses[size]}`}></div>
        <span className="mt-4 text-gray-600 font-medium">{text}</span>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.string,
  text: PropTypes.string,
};

export default LoadingSpinner;
