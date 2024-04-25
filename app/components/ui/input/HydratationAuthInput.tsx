import React, { ReactNode, useEffect, useState } from 'react';
import SpinnerInput from '../SpinnerInput';
import PrimaryInput from './PrimaryInput';

interface Props {
  placeholder: string;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  type?: string;
  children?: ReactNode; // Icon
  erorrText?: string;
  submitted?: boolean;
}

const HydratationAuthInput: React.FC<Props> = ({
  placeholder,
  value,
  setValue,
  type = 'string',
  submitted,
  children,
  erorrText = 'Ovo je obavezno polje',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showValidationTextError, setShowValidationTextError] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <div>
      <div className='relative'>
        {isMounted ? (
          <>
            {children}
            <PrimaryInput
              type={type}
              placeholder={placeholder}
              value={value}
              setValue={setValue}
              submitted={submitted}
              setShowValidationTextError={setShowValidationTextError}
            />
          </>
        ) : (
          <SpinnerInput />
        )}
      </div>
      {showValidationTextError && <p className='text-red-500 text-xs flex absolute'>{erorrText}</p>}
    </div>
  );
};

export default HydratationAuthInput;
