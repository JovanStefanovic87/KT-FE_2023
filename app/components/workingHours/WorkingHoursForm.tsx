import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format, addDays } from 'date-fns';
import { generateWeekOptions } from '@/app/helpers/universalFunctions';
import { WorkingHoursProps } from '@/app/helpers/interfaces';
import {
  postEmployeeWorkingHours,
  fetchEmployeeWorkingHours,
  updateEmployeeWorkingHours,
} from '@/app/helpers/apiHandlers';
import { WorkingHoursInit } from './WorkingHoursInit';
import CloseIconBtn from '../ui/buttons/CloseIconBtn';
import Backdrop from '../ui/Backdrop';
import WeekSelector from '../ui/select/WeekSelector';
import WeekSelectorContainer from '../ui/containers/WeekSelectorContainer';
import PrimaryButton from '../ui/buttons/PrimaryButton';
import WorkinHoursFormContainer from '../ui/containers/WorkinHoursFormContainer';
import WorkingHoursBlockContainer from '../ui/containers/WorkingHoursBlockContainer';
import WorkingHoursBlock from './WorkingHourBlock/WorkingHoursBlock';

const WorkingHoursForm = ({ handleCloseWorkingHoursForm }: any) => {
  const employeeId = useSelector(
    (state: { employee: { employeeId: string } }) => state.employee.employeeId,
  );
  const weekOptions = generateWeekOptions();
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [workingHours, setWorkingHours] = useState<WorkingHoursProps[]>(WorkingHoursInit);
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
      setWorkingHours(WorkingHoursInit);
      updateDates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workingHours]);

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
      <WorkinHoursFormContainer id={employeeId}>
        <WeekSelectorContainer>
          <WeekSelector
            value={selectedWeek}
            onChange={(value) => setSelectedWeek(value)}
            weekOptions={weekOptions}
            selectStyle='border border-gray-300 rounded p-2 w-full'
          />
        </WeekSelectorContainer>
        <div className='overflow-y-auto overflow-x-hidden rounded-lg flex-grow py-5 bg-zinc-50'>
          <div className='flex flex-wrap -mx-4 px-8 gap-1'>
            {workingHours.map((wh, i) => {
              return (
                <WorkingHoursBlockContainer obj={wh} index={i} key={wh.id}>
                  <WorkingHoursBlock
                    dayNames={dayNames}
                    obj={wh}
                    index={i}
                    setWorkingHours={setWorkingHours}
                  />
                </WorkingHoursBlockContainer>
              );
            })}
          </div>
        </div>
        <div className='mt-4 flex justify-end'>
          <div className='flex-grow'></div>
          <PrimaryButton
            onClick={handleSubmit}
            isDisabled={false}
            buttonText='Sačuvaj'
            type='submit'
          />
          <CloseIconBtn onClick={() => handleCloseWorkingHoursForm()} />
        </div>
      </WorkinHoursFormContainer>
      <Backdrop onClick={() => handleCloseWorkingHoursForm()} isVisible />
    </>
  );
};

export default WorkingHoursForm;
