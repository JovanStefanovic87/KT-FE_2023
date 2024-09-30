'use client';

import type { RootState } from '../../globalRedux/store';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../../globalRedux/features/counter/counterSlice';
import { toJovan, toAdri, toAlen } from '../../globalRedux/features/name/nameSlice';
import { setFirstName, setLastName } from '../../globalRedux/features/form/formSlice';
import { useSession } from 'next-auth/react';
import { useCreateCompany, useCreateServiceProvider } from '@/app/helpers/api/company';
import {
  useCreateService,
  useUpdateService,
  useDeleteService,
  useGetService,
} from '@/app/helpers/api/service';
import {
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
  useGetEmployee,
  useGetEmployees,
} from '@/app/helpers/api/employee';
import { ServiceAPI } from '@/app/helpers/api/common/type';
import {
  useCreateWorkingHours,
  useDeleteWorkingHours,
  useGetAllWorkingHours,
  useGetWorkingHours,
  useUpdateWorkingHours,
} from '@/app/helpers/api/workTime';
import { set } from 'date-fns';

const Home = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const name = useSelector((state: RootState) => state.name.value);
  const firstName = useSelector((state: RootState) => state.form.firstName);
  const lastName = useSelector((state: RootState) => state.form.lastName);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  // Company ------------------------------------------------

  const createCompany = useCreateCompany();

  const handleCreateCompany = () => {
    createCompany.mutate('Barber Shop Central');
  };

  // ServiceProvider -----------------------------------------------------
  const createServiceProvider = useCreateServiceProvider();

  const serviceProviderMock = {
    name: 'Barber Shop Best',
    companyId: 1,
    serviceProviderTypeId: 1,
  };

  const handleCreateServiceProvider = () => {
    createServiceProvider.mutate(serviceProviderMock);
  };

  // Service -----------------------------------------------------
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const getService = useGetService(1); // Fetch service with ID 1

  const [service, setService] = useState<ServiceAPI>({
    id: 1,
    name: 'Haircut',
    price: 100,
    duration: 30,
    note: 'Cutting hair',
    serviceProviderId: 1,
  });

  const newServiceMock: ServiceAPI = {
    id: 1,
    name: 'Haircut',
    price: 100,
    duration: 30,
    note: 'Cutting hair',
    serviceProviderId: 1,
  };

  const handleCreateService = () => {
    createService.mutate(newServiceMock);
  };

  const handleUpdateService = () => {
    const updatedService = { ...service, name: 'New Haircut', price: 20000000, duration: 6000000 };
    updateService.mutate(updatedService);
    setService((service) => ({
      ...service,
      name: 'New Haircut',
      price: 20000000,
      duration: 6000000,
    }));
  };

  console.log('service: ', service);

  const handleDeleteService = () => {
    deleteService.mutate(1);
  };

  const handleGetService = () => {
    getService.refetch();
  };

  // Employee -----------------------------------------------------
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();
  const getEmployee = useGetEmployee(1);
  const getEmployees = useGetEmployees();

  const handleCreateEmployee = () => {
    createEmployee.mutate({
      name: 'John Doe',
      serviceProviderId: 1,
    });
  };

  const handleUpdateEmployee = () => {
    updateEmployee.mutate({
      id: 1,
      name: 'John Doe',
      serviceProviderId: 1,
    });
  };

  const handleDeleteEmployee = () => {
    deleteEmployee.mutate(1);
  };

  const handleGetEmployees = () => {
    getEmployees.refetch();
  };

  // Working hours-----------------------------------------------------

  const createWorkingHours = useCreateWorkingHours();
  const updateWorkingHours = useUpdateWorkingHours();
  const deleteWorkingHours = useDeleteWorkingHours();
  const getWorkingHours = useGetWorkingHours(1); // Fetch working hours with ID 1
  const getAllWorkingHours = useGetAllWorkingHours();

  // time is in minutes example: 540 = 9:00
  const [workingHours, setWorkingHours] = useState({
    date: '2024-09-30',
    startTime1: 540,
    endTime1: 600,
    startTime2: 660,
    endTime2: 720,
    absenceTypeId: 1,
    employeeId: 1,
  });

  const handleCreateWorkingHours = () => {
    createWorkingHours.mutate(workingHours);
  };

  const handleUpdateWorkingHours = () => {
    const updatedWorkingHours = { ...workingHours, startTime1: 600, endTime1: 660 };
    updateWorkingHours.mutate(updatedWorkingHours);
    setWorkingHours(updatedWorkingHours);
  };

  const handleDeleteWorkingHours = () => {
    deleteWorkingHours.mutate(1);
  };

  const handleGetWorkingHours = () => {
    getWorkingHours.refetch();
  };

  const handleGetAllWorkingHours = () => {
    getAllWorkingHours.refetch();
  };

  return (
    <main className='grid grid-flow-row p-10'>
      <span className='mb-1 pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>{count}</span>
      // Company ------------------------------------------------
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleCreateCompany}
      >
        Save new Company
      </button>
      <p>Barber Shop Central</p>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleCreateServiceProvider}
      >
        Save new ServiceProvider
      </button>
      <p>{JSON.stringify(serviceProviderMock)}</p>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
        onClick={handleCreateService}
      >
        Save new Service
      </button>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
        onClick={handleUpdateService}
      >
        Update Service
      </button>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
        onClick={handleDeleteService}
      >
        Delete Service
      </button>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
        onClick={handleGetService}
      >
        Get Service
      </button>
      <p>{JSON.stringify(getService.data)}</p>
      <br />
      <br />
      <br />
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleCreateEmployee}
      >
        Create Employee
      </button>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleUpdateEmployee}
      >
        Update Employee
      </button>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleDeleteEmployee}
      >
        Delete Employee
      </button>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleGetEmployees}
      >
        Get Employees
      </button>
      <p>{JSON.stringify(getEmployees.data)}</p>
      <br />
      <span className='mb-1 pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>{count}</span>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleCreateWorkingHours}
      >
        Save new Working Hours
      </button>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleUpdateWorkingHours}
      >
        Update Working Hours
      </button>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleDeleteWorkingHours}
      >
        Delete Working Hours
      </button>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleGetWorkingHours}
      >
        Get Working Hours
      </button>
      <button
        className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
        onClick={handleGetAllWorkingHours}
      >
        Get All Working Hours
      </button>
      <p>{JSON.stringify(getWorkingHours.data)}</p>
      <p>{JSON.stringify(getAllWorkingHours.data)}</p>
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
    </main>
  );
};

export default Home;

// 'use client';

// import type { RootState } from '../../globalRedux/store';
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   increment,
//   decrement,
//   incrementByAmount,
// } from '../../globalRedux/features/counter/counterSlice';
// import { toJovan, toAdri, toAlen } from '../../globalRedux/features/name/nameSlice';
// import { setFirstName, setLastName } from '../../globalRedux/features/form/formSlice';
// import { useSession } from 'next-auth/react';
// import { newCompany, newServiceProvider } from '@/app/helpers/api/company';
// import {
//   deleteService,
//   getService,
//   newService,
//   updateService,
//   useCreateService,
// } from '@/app/helpers/api/service';

// const Home = () => {
//   const count = useSelector((state: RootState) => state.counter.value);
//   const name = useSelector((state: RootState) => state.name.value);
//   const firstName = useSelector((state: RootState) => state.form.firstName);
//   const lastName = useSelector((state: RootState) => state.form.lastName);
//   const dispatch = useDispatch();
//   const { data: session, status } = useSession();
//   console.log('session: ', session);

//   const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setFirstName(e.target.value));
//   };

//   const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setLastName(e.target.value));
//   };

//   // TODO: DELETE EXAMPLE STATES AND MOCK CODE
//   const serviceProviderMock = {
//     name: 'Barber Shop Best',
//     companyId: 1,
//     serviceProviderTypeId: 1,
//   };

//   const newServiceMock = {
//     id: 1,
//     name: 'Haircut',
//     price: 100,
//     duration: 30,
//     note: 'Cutting hair',
//     serviceProviderId: 1,
//   };

//   const [service, setService] = React.useState(newServiceMock);

//   const getServiceData = async (serviceId: number) => {
//     const response = await getService(serviceId);
//     setService((s) => ({ ...s, ...response }));
//   };

//   ///////////////////////////////////////////

//   return (
//     <main className='grid grid-flow-row p-10'>
//       <span className='mb-1 pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>{count}</span>
//       <button
//         className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
//         onClick={() => newCompany('Barber Shop Central')}
//       >
//         Save new Company
//       </button>
//       <p>Barber Shop Central</p>
//       <button
//         className='bg-orange-primary rounded px-4 py-2 font-bold text-black hover:bg-blue-700'
//         onClick={() => newServiceProvider(serviceProviderMock)}
//       >
//         Save new ServiceProvider
//       </button>
//       <p>{JSON.stringify(serviceProviderMock)}</p>

//       <button
//         className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
//         onClick={() => newService(newServiceMock)}
//       >
//         Save new Service
//       </button>

//       <button
//         className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
//         onClick={() => updateService({ ...service, name: 'New Haircut', price: 200, duration: 60 })}
//       >
//         Update Service
//       </button>

//       <button
//         className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
//         onClick={() => deleteService(1)}
//       >
//         Delete Service
//       </button>

//       <button
//         className='bg-orange-primary rounded px-4 py-2 font-bold hover:bg-blue-700 text-black'
//         onClick={() => getServiceData(1)}
//       >
//         Get Service
//       </button>

//       <p>{JSON.stringify(service)}</p>

//       <br />
//       <br />
//       <br />
//       <br />

//       <button
//         className='bg-orange-primary rounded px-4 py-2 font-bold text-white hover:bg-blue-700'
//         onClick={() => dispatch(increment())}
//       >
//         Increment
//       </button>
//       <button
//         className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
//         onClick={() => dispatch(decrement())}
//       >
//         Decrement
//       </button>
//       <button
//         className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
//         onClick={() => dispatch(incrementByAmount(2))}
//       >
//         Increment by 2
//       </button>
//       <div>
//         <button
//           className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
//           onClick={() => dispatch(toAlen())}
//         >
//           Alen
//         </button>
//         <button
//           className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
//           onClick={() => dispatch(toAdri())}
//         >
//           Adri
//         </button>
//         <button
//           className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
//           onClick={() => dispatch(toJovan())}
//         >
//           Jovan
//         </button>
//         <span className='mb-1 pr-4 font-bold text-gray-500 md:mb-0 md:text-right'>{name}</span>
//       </div>
//       {/* <form className='flex flex-col'>
//         <label htmlFor='first'>First name:</label>
//         <input
//           type='text'
//           className='text-black'
//           id='first'
//           name='first'
//           value={firstName}
//           onChange={handleFirstNameChange}
//         />
//         <label htmlFor='last'>Last name:</label>
//         <input
//           type='text'
//           className='text-black'
//           id='last'
//           name='last'
//           value={lastName}
//           onChange={handleLastNameChange}
//         />
//         <button type='submit'>Submit</button>
//       </form> */}
//     </main>
//   );
// };

// export default Home;
