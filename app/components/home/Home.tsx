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

const Home = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const name = useSelector((state: RootState) => state.name.value);
  const firstName = useSelector((state: RootState) => state.form.firstName);
  const lastName = useSelector((state: RootState) => state.form.lastName);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  console.log('session', session);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName(e.target.value));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastName(e.target.value));
  };

  return (
    <main className='grid grid-flow-row p-10'>
      <span className='mb-1 pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>{count}</span>
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
