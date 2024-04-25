import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import IconInput from '../ui/Icons/IconInput';
import AuthFormTitle from '../ui/text/AuthFormTitle';
import HydratationAuthInput from '../ui/input/HydratationAuthInput';
import AuthSubmitButton from '../ui/buttons/AuthSubmitButton';
import AuthGreenButton from '../ui/buttons/AuthGreenButton';
import PrimaryForm from '../ui/containers/PrimaryForm';
import PrimaryFormContainer from '../ui/containers/PrimaryFormContainer';
import FormInputsContainer from '../ui/containers/FormInputsContainer';

const PasswordRecovery = () => {
  const [email, setEmail] = useState<string | undefined>('');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();
  const shouldShowValidationError = email === '' && phoneNumber === '' && submitted;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClick = () => {
    router.push('/prijava');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-ktBg px-2'>
      {/* This will be in layout*/}
      <PrimaryFormContainer>
        <AuthFormTitle mainTitle='Zaboravljena lozinka' description='Započnite obnovu lozinke' />

        <PrimaryForm submit={handleSubmit}>
          <FormInputsContainer>
            <HydratationAuthInput
              placeholder='Email'
              value={email}
              type='email'
              setValue={setEmail}
              submitted={submitted}
              erorrText=''
            >
              <IconInput icon={<FaEnvelope />} />
            </HydratationAuthInput>
            <HydratationAuthInput
              placeholder='Phone Number'
              value={phoneNumber}
              type='number'
              setValue={setPhoneNumber}
              submitted={submitted}
              erorrText=''
            >
              <IconInput icon={<FaPhone />} />
            </HydratationAuthInput>
            {shouldShowValidationError && (
              <p className='text-red-500 text-sm flex'>Popunite barem jedno polje</p>
            )}
            <AuthSubmitButton value='Obnovite lozinku' />
            <AuthGreenButton value='Prijava' onClick={handleClick} />
          </FormInputsContainer>
        </PrimaryForm>
      </PrimaryFormContainer>
    </div>
  );
};

export default PasswordRecovery;
