import React from 'react';

const WorkingHoursModal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-full md:w-2/3 rounded-lg shadow-lg z-50">
        <div className="modal-content p-6">{children}</div>
      </div>
    </div>
  );
};

export default WorkingHoursModal;
