import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { generateWeekOptions } from '../../helpers/universalFunctions';
import CloseBtn from '../ui/buttons/CloseBtn';
import SubmitBtn from '../ui/buttons/SubmitBtn';
import Backdrop from '../ui/Backdrop';
import CustomTimeInput from '../ui/input/CustomTimeInput';
import { postEmployeeWorkingHours } from '../../helpers/apiHandlers';

// Define the type for the workingHours object
interface WorkingHoursState {
  date: string;
  day: string;
  morningFrom: string;
  morningTo: string;
  afternoonFrom: string;
  afternoonTo: string;
  status: string;
}

const WorkingHoursForm = ({ handleCloseWorkingHoursForm }: any) => {
  const [employeeId, setEmployeeId] = useState('Stevan Poljakovic');
  const weekOptions = generateWeekOptions();
  const [selectedWeek, setSelectedWeek] = useState<number>(0);

  const [workingHours, setWorkingHours] = useState<Record<string, WorkingHoursState>>({
    Ponedeljak: {
      date: '',
      day: 'Mon',
      morningFrom: 'nn:nn',
      morningTo: 'nn:nn',
      afternoonFrom: 'nn:nn',
      afternoonTo: 'nn:nn',
      status: 'Nema odsustva',
    },
    Utorak: {
      date: '',
      day: 'Tue',
      morningFrom: 'nn:nn',
      morningTo: 'nn:nn',
      afternoonFrom: 'nn:nn',
      afternoonTo: 'nn:nn',
      status: 'Nema odsustva',
    },
    Sreda: {
      date: '',
      day: 'Wed',
      morningFrom: 'nn:nn',
      morningTo: 'nn:nn',
      afternoonFrom: 'nn:nn',
      afternoonTo: 'nn:nn',
      status: 'Nema odsustva',
    },
    Četvrtak: {
      date: '',
      day: 'Thr',
      morningFrom: 'nn:nn',
      morningTo: 'nn:nn',
      afternoonFrom: 'nn:nn',
      afternoonTo: 'nn:nn',
      status: 'Nema odsustva',
    },
    Petak: {
      date: '',
      day: 'Fri',
      morningFrom: 'nn:nn',
      morningTo: 'nn:nn',
      afternoonFrom: 'nn:nn',
      afternoonTo: 'nn:nn',
      status: 'Nema odsustva',
    },
    Subota: {
      date: '',
      day: 'Sat',
      morningFrom: 'nn:nn',
      morningTo: 'nn:nn',
      afternoonFrom: 'nn:nn',
      afternoonTo: 'nn:nn',
      status: 'Nema odsustva',
    },
    Nedelja: {
      date: '',
      day: 'Sun',
      morningFrom: 'nn:nn',
      morningTo: 'nn:nn',
      afternoonFrom: 'nn:nn',
      afternoonTo: 'nn:nn',
      status: 'Nema odsustva',
    },
  });

  useEffect(() => {
    if (weekOptions[selectedWeek]) {
      const startOfWeekDate = weekOptions[selectedWeek].start;
      Object.keys(workingHours).forEach((day, index) => {
        const currentDate = addDays(startOfWeekDate, index);
        setWorkingHours(prevWorkingHours => ({
          ...prevWorkingHours,
          [day]: {
            ...prevWorkingHours[day],
            date: format(currentDate, 'dd.MM.yy'),
          },
        }));
      });
    }
  }, [selectedWeek]);

  const handleInputChange = (day: string, field: keyof WorkingHoursState, value: string) => {
    setWorkingHours(prevWorkingHours => ({
      ...prevWorkingHours,
      [day]: {
        ...prevWorkingHours[day],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      // Get the array of working hours data for the selected week
      const workingHoursDataForWeek = Object.values(workingHours);

      // Send a POST request to save the working hours for the employee
      await postEmployeeWorkingHours(employeeId, workingHoursDataForWeek);

      // Close the working hours form or perform any other necessary actions
      handleCloseWorkingHoursForm();
    } catch (error) {
      // Handle any errors that may occur during the POST request
      console.error('Error posting working hours:', error);
    }
  };

  return (
    <>
      <div className="p-4 bg-white relative h-full flex flex-col z-50">
        <h2 className="text-2xl font-semibold mb-4 text-center">{`Podešavanje Radnog Vremena - ${employeeId}`}</h2>
        <div className="mb-4">
          <label className="block text-lg font-semibold">Izaberite Nedelju:</label>
          <select
            value={selectedWeek}
            onChange={e => setSelectedWeek(Number(e.target.value))}
            className="border border-gray-300 rounded p-2 w-full"
          >
            {weekOptions.map((week, index) => (
              <option key={index} value={index}>
                {week.label}
              </option>
            ))}
          </select>
        </div>
        <div className="h-workingHoursModalContent overflow-y-auto overflow-x-hidden rounded-lg flex-grow py-5 bg-zinc-50">
          <div className="flex flex-wrap -mx-4 px-8 gap-1">
            {Object.keys(workingHours).map(day => (
              <div
                key={day}
                className="w-full xl:w-workingHoursSlotXl lg:w-workingHoursSlotLg p-4 border border-gray-300 rounded shadow-inner"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{day}</h3>
                  <p className="text-sm font-semibold">{workingHours[day].date}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Prva Smena</label>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-1/2 px-2 mb-2">
                      <label className="block text-xs font-medium">Od:</label>
                      <CustomTimeInput
                        value={workingHours[day].morningFrom}
                        onChange={value => handleInputChange(day, 'morningFrom', value)}
                      />
                    </div>
                    <div className="w-1/2 px-2 mb-2">
                      <label className="block text-xs font-medium">Do:</label>
                      <CustomTimeInput
                        value={workingHours[day].morningTo}
                        onChange={value => handleInputChange(day, 'morningTo', value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Druga Smena</label>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-1/2 px-2 mb-2">
                      <label className="block text-xs font-medium">Od:</label>
                      <CustomTimeInput
                        value={workingHours[day].afternoonFrom}
                        onChange={value => handleInputChange(day, 'afternoonFrom', value)}
                      />
                    </div>
                    <div className="w-1/2 px-2 mb-2">
                      <label className="block text-xs font-medium">Do:</label>
                      <CustomTimeInput
                        value={workingHours[day].afternoonTo}
                        onChange={value => handleInputChange(day, 'afternoonTo', value)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Odsustvo</label>
                  <select
                    value={workingHours[day].status}
                    onChange={e => handleInputChange(day, 'status', e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full"
                  >
                    <option value="Nema odsustva">Nema odsustva</option>
                    <option value="Godišnji odmor">Godišnji odmor</option>
                    <option value="Praznik">Praznik</option>
                    <option value="Bolovanje">Bolovanje</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <div className="flex-grow"></div>
          <SubmitBtn onClick={handleSubmit} isDisabled={false} buttonText="Sačuvaj" />
          <CloseBtn onClick={() => handleCloseWorkingHoursForm()} />
        </div>
      </div>
      <Backdrop onClick={() => handleCloseWorkingHoursForm()} isVisible />
    </>
  );
};

export default WorkingHoursForm;
