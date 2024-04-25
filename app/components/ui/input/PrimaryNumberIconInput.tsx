import React, { ReactNode, ChangeEvent, useState } from 'react';

interface Props {
  placeholder: string;
  value: number | undefined;
  setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  children?: ReactNode; // Icon
  setValidationTextError?: React.Dispatch<React.SetStateAction<boolean>>;
  submitted?: boolean;
}

const PrimaryNumberIconInput: React.FC<Props> = ({
  placeholder,
  value,
  setValue,
  children,
  submitted = false,
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const shouldShowValidationError = (isEmpty || !isTouched) && submitted;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setValue(parseInt(inputValue, 10));
    }
    setIsEmpty(inputValue.trim() === '');
    setIsTouched(true);
  };

  const inputValue = isNaN(value as number) ? '' : String(value);

  return (
    <div>
      <div className='relative'>
        {children}
        <input
          placeholder={placeholder}
          value={inputValue}
          className={`bg-white pl-10 pr-4 border-2 border-neutral-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full ${
            shouldShowValidationError ? 'border-red-500' : ''
          }`}
          onChange={handleChange}
        />
      </div>
      {shouldShowValidationError && (
        <p className='text-red-500 text-xs flex absolute'>Ovo je obavezno polje</p>
      )}
    </div>
  );
};

export default PrimaryNumberIconInput;
