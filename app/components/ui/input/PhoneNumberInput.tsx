import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FaMobileAlt, FaSignal } from 'react-icons/fa';
import PrimaryNumberIconInput from './PrimaryNumberIconInput';

interface Props {
  operator: string;
  setOperator: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: number | undefined;
  setPhoneNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
  submitted?: boolean;
}

const PhoneNumberInput: React.FC<Props> = ({
  operator,
  setOperator,
  phoneNumber,
  setPhoneNumber,
  submitted,
}) => {
  const [isValidOptionSelected, setIsValidOptionSelected] = useState(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const invalidSelect = (isValidOptionSelected || !isTouched) && submitted;
  const callNumbers = [
    '060',
    '061',
    '062',
    '063',
    '064',
    '065',
    '066',
    '0677',
    '0678',
    '068',
    '069',
  ];

  const longestOption = callNumbers.reduce((a, b) => (a.length > b.length ? a : b));

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setOperator(selectedValue);
    setIsValidOptionSelected(selectedValue === '');
    setIsTouched(true);
  };

  return (
    <div className='flex space-x-4'>
      <div>
        <div className='relative w-1/3'>
          <FaSignal className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <select
            className={`block appearance-none bg-white pl-10 pr-12 border-2 border-neutral-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm focus:border-indigo-500 transition duration-300 ease-in-out ${
              invalidSelect ? 'border-red-500' : ''
            }`}
            value={operator}
            onChange={handleOperatorChange}
            style={{ minWidth: `${longestOption.length}ch` }}
          >
            <option hidden disabled value=''>
              06*
            </option>
            {callNumbers.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-4'>
            <IoIosArrowDown className='text-gray-400' />
          </div>
        </div>
        {invalidSelect && <p className='text-red-500 text-xs flex absolute'>Izaberite operatera</p>}
      </div>
      <PrimaryNumberIconInput
        placeholder='Unesite broj telefona*'
        value={phoneNumber}
        setValue={setPhoneNumber}
        submitted={submitted}
      >
        <FaMobileAlt className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      </PrimaryNumberIconInput>
    </div>
  );
};

export default PhoneNumberInput;
