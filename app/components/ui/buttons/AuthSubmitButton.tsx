import React from 'react';

interface Props {
  value: string;
}

const AuthSubmitButton: React.FC<Props> = ({ value }) => {
  return (
    <button
      type='submit'
      className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition duration-300 ease-in-out'
    >
      {value}
    </button>
  );
};

export default AuthSubmitButton;
