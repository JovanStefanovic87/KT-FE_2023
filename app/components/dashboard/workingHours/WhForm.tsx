import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format, addDays } from 'date-fns';
import { generateWeekOptions } from '@/app/helpers/universalFunctions';
import { WorkingHoursStateProps } from '@/app/helpers/interfaces';
import {
  postEmployeeWorkingHours,
  fetchEmployeeWorkingHours,
  updateEmployeeWorkingHours,
} from '@/app/helpers/apiHandlers';
import { whInit } from './whInit';
import CloseIconBtn from '../../ui/buttons/CloseIconBtn';
import SubmitBtn from '../../ui/buttons/SubmitBtn';
import Backdrop from '../../ui/Backdrop';
import CustomTimeInput from '../../ui/input/CustomTimeInput';
import WeekSelector from '../../ui/select/WeekSelector';
import WeekSelectorContainer from '../../ui/containers/WeekSelectorContainer';

const WorkingHoursForm = ({ handleCloseWorkingHoursForm }: any) => {
  const employeeId = useSelector(
    (state: { employee: { employeeId: string } }) => state.employee.employeeId,
  );
  const weekOptions = generateWeekOptions();
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [workingHours, setWorkingHours] = useState<WorkingHoursStateProps[]>(whInit);
  const dayNames = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'];
  const startOfWeekDate = new Date(weekOptions[selectedWeek].start);
  const endOfWeekDate = new Date(weekOptions[selectedWeek].end);

  const generateDateRange = (startDate: Date, endDate: Date) => {
    const currentDate = new Date(startDate);
    const range: string[] = [];

    while (currentDate <= endDate) {
      range.push(format(currentDate, 'dd.MM.yy'));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Push the endDate after the loop exits
    range.push(format(endDate, 'dd.MM.yy'));

    return range;
  };

  const weekDates = generateDateRange(startOfWeekDate, endOfWeekDate);

  const updateDates = () => {
    const startOfWeekDate = weekOptions[selectedWeek].start;
    setWorkingHours((prevWorkingHours) => {
      const updatedWorkingHours = prevWorkingHours.map((wh, index) => {
        const currentDate = addDays(startOfWeekDate, index);
        return {
          ...wh,
          date: format(currentDate, 'dd.MM.yy'),
        };
      });
      return updatedWorkingHours;
    });
  };

  useEffect(() => {
    if (weekOptions[selectedWeek]) {
      fetchWorkingHours();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWeek]);

  const fetchWorkingHours = async () => {
    try {
      const workingHoursData = await fetchEmployeeWorkingHours(
        setWorkingHours,
        employeeId,
        weekDates,
      );
      workingHoursData;
      if (weekOptions[selectedWeek]) {
        const startOfWeekDate = weekOptions[selectedWeek].start;
        setWorkingHours((prevWorkingHours) => {
          const updatedWorkingHours = prevWorkingHours.map((wh, index) => {
            const currentDate = addDays(startOfWeekDate, index);
            return {
              ...wh,
              date: format(currentDate, 'dd.MM.yy'),
            };
          });
          return updatedWorkingHours;
        });
      }
    } catch (error) {
      console.error('Error fetching working hours:', error);
    }
  };

  useEffect(() => {
    if (workingHours.length === 0) {
      setWorkingHours(whInit);
      updateDates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingHours]);

  const handleInputChange = (day: number, field: keyof WorkingHoursStateProps, value: string) => {
    const dayIndex = day;
    setWorkingHours((prevWorkingHours) => {
      const updatedWorkingHours = [...prevWorkingHours];
      updatedWorkingHours[dayIndex] = {
        ...updatedWorkingHours[dayIndex],
        [field]: value,
      };
      return updatedWorkingHours;
    });
  };

  const handleSubmit = async () => {
    try {
      const hasEntriesToUpdate = workingHours.some((wh) => wh.id);

      if (hasEntriesToUpdate) {
        await updateEmployeeWorkingHours(employeeId, workingHours);
      } else {
        console.log(workingHours);
        await postEmployeeWorkingHours(employeeId, workingHours);
      }
      handleCloseWorkingHoursForm();
    } catch (error) {
      console.error('Error updating/posting working hours:', error);
    }
  };

  return (
    <>
      <div className='p-4 bg-white relative flex flex-col z-50'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>{`Podešavanje Radnog Vremena - ${employeeId}`}</h2>
        <WeekSelectorContainer>
          <WeekSelector
            value={selectedWeek}
            onChange={(value) => setSelectedWeek(value)}
            weekOptions={weekOptions}
            selectStyle='border border-gray-300 rounded p-2 w-full'
          />
        </WeekSelectorContainer>
        <div className='h-workingHoursModalContent overflow-y-auto overflow-x-hidden rounded-lg flex-grow py-5 bg-zinc-50'>
          <div className='flex flex-wrap -mx-4 px-8 gap-1'>
            {workingHours.map((wh, i) => {
              return (
                <div
                  key={`${wh.date}-${i}`}
                  className='w-full xl:w-workingHoursSlotXl lg:w-workingHoursSlotLg p-4 border border-gray-300 rounded shadow-inner'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-lg font-semibold'>{dayNames[i]}</h3>
                    <p className='text-sm font-semibold'>{wh.date}</p>
                  </div>
                  <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Prva Smena</label>
                    <div className='flex flex-wrap -mx-2'>
                      <div className='w-1/2 px-2 mb-2'>
                        <label className='block text-xs font-medium'>Od:</label>
                        <CustomTimeInput
                          value={wh.morningFrom}
                          onChange={(value) => handleInputChange(i, 'morningFrom', value)}
                        />
                      </div>
                      <div className='w-1/2 px-2 mb-2'>
                        <label className='block text-xs font-medium'>Do:</label>
                        <CustomTimeInput
                          value={wh.morningTo}
                          onChange={(value) => handleInputChange(i, 'morningTo', value)}
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
                          value={wh.afternoonFrom}
                          onChange={(value) => handleInputChange(i, 'afternoonFrom', value)}
                        />
                      </div>
                      <div className='w-1/2 px-2 mb-2'>
                        <label className='block text-xs font-medium'>Do:</label>
                        <CustomTimeInput
                          value={wh.afternoonTo}
                          onChange={(value) => handleInputChange(i, 'afternoonTo', value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-semibold mb-2'>Odsustvo</label>
                    <select
                      value={wh.absence}
                      onChange={(e) => handleInputChange(i, 'absence', e.target.value)}
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
          <CloseIconBtn onClick={() => handleCloseWorkingHoursForm()} />
        </div>
      </div>
      <Backdrop onClick={() => handleCloseWorkingHoursForm()} isVisible />
    </>
  );
};

export default WorkingHoursForm;
