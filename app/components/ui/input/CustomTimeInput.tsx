import React, { ChangeEvent } from 'react';

interface CustomTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomTimeInput: React.FC<CustomTimeInputProps> = ({ value, onChange }) => {
  // Function to format the time value as HH:MM
  const formatTime = (time: string): string => {
    if (time.length === 1 && parseInt(time, 10) > 2) {
      return `0${time}:`;
    }
    if (time.length === 2 && parseInt(time, 10) <= 24) {
      return `${time}:`;
    }
    if (time.length === 3 && time.charAt(2) !== ':') {
      return `${time.charAt(0)}${time.charAt(1)}:${time.charAt(2)}`;
    }
    if (time.length > 5) {
      return time.slice(0, 5);
    }
    return time;
  };

  // Function to handle input change and format the value
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    const formattedValue = formatTime(inputValue);
    onChange(formattedValue);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="border border-gray-300 rounded p-2 w-full min-w-time"
      placeholder="HH:MM"
      pattern="[0-9]{2}:[0-9]{2}"
    />
  );
};

export default CustomTimeInput;
