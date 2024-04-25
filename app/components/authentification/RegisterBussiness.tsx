import { useState } from 'react';
import PrimaryIconInput from '../ui/input/PrimaryIconInput';
import { useRouter } from 'next/navigation';
import { IoIosPerson, IoIosLock } from 'react-icons/io';
import IconInput from '../ui/Icons/IconInput';
import PhoneNumberInput from '../ui/input/PhoneNumberInput';
import AuthGreenButton from '../ui/buttons/AuthGreenButton';
import AuthFormTitle from '../ui/text/AuthFormTitle';
import AuthSubmitButton from '../ui/buttons/AuthSubmitButton';
import PrimaryFormContainer from '../ui/containers/PrimaryFormContainer';
import PrimaryForm from '../ui/containers/PrimaryForm';
import EmailInput from '../ui/input/EmalInput';
import FormInputsContainer from '../ui/containers/FormInputsContainer';

const RegisterBussiness = () => {
  const [name, setName] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [operator, setOperator] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>(undefined);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const loginClick = () => {
    router.push('/prijava');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-ktBg pt-20 px-2'>
      {/* This will be in layout*/}
      <PrimaryFormContainer>
        <AuthFormTitle mainTitle='Dobro nam došli!' description='Kreirajte svoj biznis nalog' />

        <PrimaryForm submit={handleSubmit}>
          <FormInputsContainer>
            <PrimaryIconInput
              placeholder='Ime i prezime*'
              value={name}
              setValue={setName}
              submitted={submitted}
            >
              <IconInput icon={<IoIosPerson />} />
            </PrimaryIconInput>
            <PrimaryIconInput
              placeholder='Korisničko ime*'
              value={username}
              setValue={setUsername}
              submitted={submitted}
            >
              <IconInput icon={<IoIosPerson />} />
            </PrimaryIconInput>

            <EmailInput
              placeholder='Email adresa*'
              value={email}
              setValue={setEmail}
              submitted={submitted}
            />
            <PhoneNumberInput
              operator={operator}
              setOperator={setOperator}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              submitted={submitted}
            />
            <PrimaryIconInput
              placeholder='Lozinka'
              value={password}
              setValue={setPassword}
              type='password'
              submitted={submitted}
            >
              <IconInput icon={<IoIosLock />} />
            </PrimaryIconInput>
            <PrimaryIconInput
              placeholder='Potvrda lozinke'
              value={password}
              setValue={setPassword}
              type='password'
              submitted={submitted}
            >
              <IconInput icon={<IoIosLock />} />
            </PrimaryIconInput>
          </FormInputsContainer>
          <AuthSubmitButton value='Registracija' />
          <AuthGreenButton value='Imate nalog? Prijavite se' onClick={loginClick} />
        </PrimaryForm>
      </PrimaryFormContainer>
    </div>
  );
};

export default RegisterBussiness;
