import React, { ReactNode, InputHTMLAttributes } from 'react';

interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
}

const IconInput: React.FC<IconInputProps> = ({ icon }) => {
  return (
    <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>{icon}</div>
  );
};

export default IconInput;
