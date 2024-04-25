import React, { ChangeEvent, useState } from 'react';

interface Props {
  placeholder: string;
  value: number | undefined;
  setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  submitted?: boolean;
}

const PrimaryNumberInput: React.FC<Props> = ({
  placeholder,
  value,
  setValue,
  submitted = false,
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setValue(parseInt(inputValue, 10));
    }
    setIsEmpty(inputValue === '');
    setIsTouched(true);
  };

  const inputValue = isNaN(value as number) ? '' : String(value);

  return (
    <input
      type='number'
      className={`bg-white pl-10 pr-4 border-2 border-neutral-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full ${
        (isEmpty || !isTouched) && submitted ? 'border-red-500' : ''
      }`}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default PrimaryNumberInput;
