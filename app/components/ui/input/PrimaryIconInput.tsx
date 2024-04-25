import React, { ReactNode, useState } from 'react';
import PrimaryInput from './PrimaryInput';

interface Props {
  placeholder: string;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  type?: string;
  submitted?: boolean;
  erorrText?: string;
  children?: ReactNode; // Icon
}

const PrimaryIconInput: React.FC<Props> = ({
  placeholder,
  value,
  setValue,
  type = 'string',
  submitted,
  erorrText = 'Ovo je obavezno polje',
  children,
}) => {
  const [showValidationTextError, setShowValidationTextError] = useState<boolean>(false);
  return (
    <div>
      <div className='relative'>
        {children}
        <PrimaryInput
          type={type}
          placeholder={placeholder}
          value={value}
          setValue={setValue}
          submitted={submitted}
          setShowValidationTextError={setShowValidationTextError}
        />
      </div>
      {showValidationTextError && <p className='text-red-500 text-xs flex absolute'>{erorrText}</p>}
    </div>
  );
};

export default PrimaryIconInput;
