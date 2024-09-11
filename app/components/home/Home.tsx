'use client';

import type { RootState } from '../../globalRedux/store';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../../globalRedux/features/counter/counterSlice';
import { toJovan, toAdri, toAlen } from '../../globalRedux/features/name/nameSlice';
import { setFirstName, setLastName } from '../../globalRedux/features/form/formSlice';
import { useSession } from 'next-auth/react';
import { newCompany, newServiceProvider } from '@/app/helpers/api/company';
import { deleteService, getService, newService, updateService } from '@/app/helpers/api/service';

const Home = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const name = useSelector((state: RootState) => state.name.value);
  const firstName = useSelector((state: RootState) => state.form.firstName);
  const lastName = useSelector((state: RootState) => state.form.lastName);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  console.log('session: ', session);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName(e.target.value));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastName(e.target.value));
  };

  // TODO: DELETE EXAMPLE STATES AND MOCK CODE
  const serviceProviderMock = {
    name: 'Barber Shop Best',
    companyId: 1,
    serviceProviderTypeId: 1,
  };

  const newServiceMock = {
    id: 1,
    name: 'Haircut',
    price: 100,
    duration: 30,
    note: 'Cutting hair',
    serviceProviderId: 1,
  };

  const [service, setService] = React.useState(newServiceMock);

  const getServiceData = async (serviceId: number) => {
    const response = await getService(serviceId);
    setService((s) => ({ ...s, ...response }));
  };

  ///////////////////////////////////////////

  return (
    <main className='grid grid-flow-row p-10'>
      <span className='mb-1 pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>{count}</span>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={() => newCompany('Barber Shop Central')}
      >
        Save new Company
      </button>
      <p>Barber Shop Central</p>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={() => newServiceProvider(serviceProviderMock)}
      >
        Save new ServiceProvider
      </button>
      <p>{JSON.stringify(serviceProviderMock)}</p>

      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
        onClick={() => newService(newServiceMock)}
      >
        Save new Service
      </button>

      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
        onClick={() => updateService({ ...service, name: 'New Haircut', price: 200, duration: 60 })}
      >
        Update Service
      </button>

      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
        onClick={() => deleteService(1)}
      >
        Delete Service
      </button>

      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
        onClick={() => getServiceData(1)}
      >
        Get Service
      </button>

      <p>{JSON.stringify(service)}</p>

      <br />
      <br />
      <br />
      <br />

      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <button
        className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={() => dispatch(incrementByAmount(2))}
      >
        Increment by 2
      </button>
      <div>
        <button
          className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() => dispatch(toAlen())}
        >
          Alen
        </button>
        <button
          className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() => dispatch(toAdri())}
        >
          Adri
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={() => dispatch(toJovan())}
        >
          Jovan
        </button>
        <span className='mb-1 pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>{name}</span>
      </div>
      {/* <form className='flex flex-col'>
        <label htmlFor='first'>First name:</label>
        <input
          type='text'
          className='text-black'
          id='first'
          name='first'
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <label htmlFor='last'>Last name:</label>
        <input
          type='text'
          className='text-black'
          id='last'
          name='last'
          value={lastName}
          onChange={handleLastNameChange}
        />
        <button type='submit'>Submit</button>
      </form> */}
    </main>
  );
};

export default Home;
