import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => (
  <div className={`bg-white rounded-lg shadow-sm border-l-4 border-${color}-500 p-4`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <Icon className={`h-8 w-8 text-${color}-500`} />
    </div>
  </div>
);

export default StatCard;
