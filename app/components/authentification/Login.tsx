import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';
import IconInput from '../ui/Icons/IconInput';
import AuthFormTitle from '../ui/text/AuthFormTitle';
import HydratationAuthInput from '../ui/input/HydratationAuthInput';
import AuthSubmitButton from '../ui/buttons/AuthSubmitButton';
import AuthGreenButton from '../ui/buttons/AuthGreenButton';
import PasswordRecoveryButton from '../ui/buttons/PasswordRecoveryButton';
import PrimaryForm from '../ui/containers/PrimaryForm';
import PrimaryFormContainer from '../ui/containers/PrimaryFormContainer';
import FormInputsContainer from '../ui/containers/FormInputsContainer';

const Login = () => {
  const [username, setUsername] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const isServiceProvider = true;
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClick = () => {
    router.push('/registracija');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-ktBg pt-20 px-2'>
      {/* This will be in layout*/}
      <PrimaryFormContainer>
        <AuthFormTitle mainTitle='Dobro nam došli!' description='Prijavite se na svoj nalog' />

        <PrimaryForm submit={handleSubmit}>
          <FormInputsContainer>
            <HydratationAuthInput
              placeholder='Korisničko ime*'
              value={username}
              setValue={setUsername}
              submitted={submitted}
            >
              <IconInput icon={<FaUser />} />
            </HydratationAuthInput>
            <HydratationAuthInput
              placeholder='Lozinka*'
              value={password}
              setValue={setPassword}
              type='password'
              submitted={submitted}
            >
              <IconInput icon={<FaLock />} />
            </HydratationAuthInput>
          </FormInputsContainer>
          <AuthSubmitButton value='Prijavite se' />
          {isServiceProvider && (
            <AuthGreenButton value='Registrujte svoj biznis nalog' onClick={handleClick} />
          )}
          <PasswordRecoveryButton />
        </PrimaryForm>
      </PrimaryFormContainer>
    </div>
  );
};

export default Login;
