import React, { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const CustomTimeInput: React.FC<Props> = ({ value, onChange }) => {
  // Function to handle input change and format the value to 24-hour format
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    const parts = inputValue.split(':');

    if (parts.length === 2) {
      // Ensure hours and minutes are two digits
      const hours = String(parts[0]).padStart(2, '0');
      const minutes = String(parts[1]).padStart(2, '0');

      // Create the formatted time string in 24-hour format
      const formattedTime = `${hours}:${minutes}`;
      onChange(formattedTime);
    } else {
      onChange('');
    }
  };

  return (
    <input
      type='time'
      value={value}
      onChange={handleChange}
      className='border border-gray-300 rounded p-2 w-full'
    />
  );
};

export default CustomTimeInput;
