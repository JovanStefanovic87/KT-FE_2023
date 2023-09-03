import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 opacity-75">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export default Spinner;
