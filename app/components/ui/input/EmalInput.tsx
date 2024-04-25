import React, { ChangeEvent, useState } from 'react';
import IconInput from '../Icons/IconInput';
import { IoIosMail } from 'react-icons/io';

interface Props {
  placeholder: string;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  submitted?: boolean;
}

const EmailInput: React.FC<Props> = ({ placeholder, value, setValue, submitted = false }) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setIsEmpty(inputValue.trim() === '');
    setIsTouched(true);
    setIsInvalid(!validateEmail(inputValue));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const shouldShowValidationError = (isEmpty || !isTouched || isInvalid) && submitted;

  return (
    <div>
      <div className='relative'>
        <IconInput icon={<IoIosMail />} />
        <input
          type='text'
          className={`bg-white pl-10 pr-4 border-2 border-neutral-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full ${
            shouldShowValidationError ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
      {shouldShowValidationError && (
        <p className='text-red-500 text-xs flex absolute'>Email adresa nije ispravna</p>
      )}
    </div>
  );
};

export default EmailInput;
