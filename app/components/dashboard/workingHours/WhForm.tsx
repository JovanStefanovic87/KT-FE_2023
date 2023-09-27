import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format, addDays } from 'date-fns';
import { generateWeekOptions } from '../../../helpers/universalFunctions';
import { WorkingHoursStateProps } from '../../../helpers/interfaces';
import { whInit } from './whInit';
import CloseBtn from '../../ui/buttons/CloseBtn';
import SubmitBtn from '../../ui/buttons/SubmitBtn';
import Backdrop from '../../ui/Backdrop';
import CustomTimeInput from '../../ui/input/CustomTimeInput';
import { postEmployeeWorkingHours, fetchEmployeeWorkingHours } from '../../../helpers/apiHandlers';

const WorkingHoursForm = ({ handleCloseWorkingHoursForm }: any) => {
  const employeeId = useSelector(
    (state: { employee: { employeeId: string } }) => state.employee.employeeId,
  );
  const weekOptions = generateWeekOptions();
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [workingHours, setWorkingHours] = useState<Record<string, WorkingHoursStateProps>>(whInit);
  const dayNames = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'];
  const dateRange: string[] = [];

  useEffect(() => {
    if (weekOptions[selectedWeek]) {
      const startOfWeekDate = weekOptions[selectedWeek].start;
      Object.keys(workingHours).forEach((day, index) => {
        const currentDate = addDays(startOfWeekDate, index);
        setWorkingHours((prevWorkingHours) => ({
          ...prevWorkingHours,
          [day]: {
            ...prevWorkingHours[day],
            date: format(currentDate, 'dd.MM.yy'),
          },
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWeek]);

  const generateDateRange = (startDate: Date, endDate: Date) => {
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateRange.push(format(currentDate, 'dd.MM.yy'));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Push the endDate after the loop exits
    dateRange.push(format(endDate, 'dd.MM.yy'));

    return dateRange;
  };

  const startOfWeekDate = new Date(weekOptions[selectedWeek].start);
  const endOfWeekDate = new Date(weekOptions[selectedWeek].end);

  const weekDates = generateDateRange(startOfWeekDate, endOfWeekDate);

  const fetchWorkingHours = async () => {
    try {
      const workingHoursData = await fetchEmployeeWorkingHours(
        setWorkingHours,
        employeeId,
        weekDates,
      );
      workingHoursData;
    } catch (error) {
      console.error('Error fetching working hours:', error);
    }
  };

  console.log(workingHours);

  useEffect(() => {
    workingHours.length ? fetchWorkingHours() : setWorkingHours(whInit);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWeek]);

  const handleInputChange = (day: string, field: keyof WorkingHoursStateProps, value: string) => {
    setWorkingHours((prevWorkingHours) => ({
      ...prevWorkingHours,
      [day]: {
        ...prevWorkingHours[day],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const workingHoursDataForWeek = Object.values(workingHours);
      await postEmployeeWorkingHours(employeeId, workingHoursDataForWeek);
      handleCloseWorkingHoursForm();
    } catch (error) {
      console.error('Error posting working hours:', error);
    }
  };

  return (
    <>
      <div className='p-4 bg-white relative h-full flex flex-col z-50'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>{`Podešavanje Radnog Vremena - ${employeeId}`}</h2>
        <div className='mb-4'>
          <label className='block text-lg font-semibold'>Izaberite Nedelju:</label>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(Number(e.target.value))}
            className='border border-gray-300 rounded p-2 w-full'
          >
            {weekOptions.map((week, index) => (
              <option key={index} value={index}>
                {week.label}
              </option>
            ))}
          </select>
        </div>
        <div className='h-workingHoursModalContent overflow-y-auto overflow-x-hidden rounded-lg flex-grow py-5 bg-zinc-50'>
          <div className='flex flex-wrap -mx-4 px-8 gap-1'>
            {Object.keys(workingHours).map((day, i) => {
              return (
                <div
                  key={day}
                  className='w-full xl:w-workingHoursSlotXl lg:w-workingHoursSlotLg p-4 border border-gray-300 rounded shadow-inner'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-lg font-semibold'>{dayNames[i]}</h3>
                    <p className='text-sm font-semibold'>{workingHours[day].date}</p>
                  </div>
                  <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Prva Smena</label>
                    <div className='flex flex-wrap -mx-2'>
                      <div className='w-1/2 px-2 mb-2'>
                        <label className='block text-xs font-medium'>Od:</label>
                        <CustomTimeInput
                          value={workingHours[day].morningFrom}
                          onChange={(value) => handleInputChange(day, 'morningFrom', value)}
                        />
                      </div>
                      <div className='w-1/2 px-2 mb-2'>
                        <label className='block text-xs font-medium'>Do:</label>
                        <CustomTimeInput
                          value={workingHours[day].morningTo}
                          onChange={(value) => handleInputChange(day, 'morningTo', value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Druga Smena</label>
                    <div className='flex flex-wrap -mx-2'>
                      <div className='w-1/2 px-2 mb-2'>
                        <label className='block text-xs font-medium'>Od:</label>
                        <CustomTimeInput
                          value={workingHours[day].afternoonFrom}
                          onChange={(value) => handleInputChange(day, 'afternoonFrom', value)}
                        />
                      </div>
                      <div className='w-1/2 px-2 mb-2'>
                        <label className='block text-xs font-medium'>Do:</label>
                        <CustomTimeInput
                          value={workingHours[day].afternoonTo}
                          onChange={(value) => handleInputChange(day, 'afternoonTo', value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-semibold mb-2'>Odsustvo</label>
                    <select
                      value={workingHours[day].absence}
                      onChange={(e) => handleInputChange(day, 'absence', e.target.value)}
                      className='border border-gray-300 rounded p-2 w-full'
                    >
                      <option value='nema odsustva'>Nema odsustva</option>
                      <option value='godišnji odmor'>Godišnji odmor</option>
                      <option value='praznik'>Praznik</option>
                      <option value='bolovanje'>Bolovanje</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='mt-4 flex justify-end'>
          <div className='flex-grow'></div>
          <SubmitBtn onClick={handleSubmit} isDisabled={false} buttonText='Sačuvaj' />
          <CloseBtn onClick={() => handleCloseWorkingHoursForm()} />
        </div>
      </div>
      <Backdrop onClick={() => handleCloseWorkingHoursForm()} isVisible />
    </>
  );
};

export default WorkingHoursForm;
