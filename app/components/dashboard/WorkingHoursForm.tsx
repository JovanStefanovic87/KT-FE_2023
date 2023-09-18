import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, format, addWeeks, getDay, addDays } from 'date-fns';
import { srLatn } from 'date-fns/locale'; // Import the Serbian Latin locale
import CloseBtn from '../ui/buttons/CloseBtn';
import SubmitBtn from '../ui/buttons/SubmitBtn';
import Backdrop from '../ui/Backdrop';

const WorkingHoursForm = ({ handleCloseWorkingHoursForm }) => {
  const [employeeId, setEmployeeId] = useState('Stevan Poljakovic'); // Replace with the actual employee ID
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(0);

  const [workingHours, setWorkingHours] = useState({
    Ponedeljak: {
      date: '',
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Utorak: {
      date: '',
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Sreda: {
      date: '',
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Četvrtak: {
      date: '',
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Petak: {
      date: '',
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Subota: {
      date: '',
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Nedelja: {
      date: '',
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
  });

  useEffect(() => {
    const generateWeekOptions = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const nextYear = currentYear + 1;

      const weeks = [];
      let currentDate = startOfWeek(today, { weekStartsOn: 1, locale: srLatn }); // Start from the current week, with Monday as the starting day

      while (currentDate.getFullYear() <= nextYear) {
        const endOfWeekDate = endOfWeek(currentDate);

        weeks.push({
          label: `Nedelja ${format(currentDate, 'w', { locale: srLatn })} (${format(
            currentDate,
            'dd.MM.yy.'
          )} - ${format(endOfWeekDate, 'dd.MM.yy.')})`,
          start: currentDate,
          end: endOfWeekDate,
        });

        currentDate = addWeeks(currentDate, 1);
      }
      return weeks;
    };

    const weeksArray = generateWeekOptions();
    setWeeks(weeksArray);

    // Select the current week by default
    setSelectedWeek(0);
  }, []);

  useEffect(() => {
    // Update dates for each day when the selected week changes
    if (weeks[selectedWeek]) {
      const startOfWeekDate = weeks[selectedWeek].start;
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

  const handleInputChange = (day, field, value) => {
    // Update the workingHours state when input values change
    setWorkingHours(prevWorkingHours => ({
      ...prevWorkingHours,
      [day]: {
        ...prevWorkingHours[day],
        [field]: value,
      },
    }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // You can save the workingHours data to your database here.
    // The data structure is updated to include specific dates for each day.
    // You can access the workingHours data using the `employeeId` state.

    // Clear the form or perform any other necessary actions.

    // Close the form
    handleCloseWorkingHoursForm();
  };

  return (
    <>
      <div className="p-4 bg-white relative h-full flex flex-col z-50">
        <h2 className="text-2xl font-semibold mb-4 text-center">{`Podešavanje Radnog Vremena - ${employeeId}`}</h2>
        <div className="mb-4">
          <label className="block text-lg font-semibold">Izaberite Nedelju:</label>
          <select
            value={selectedWeek}
            onChange={e => setSelectedWeek(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            {weeks.map((week, index) => (
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
                      <input
                        type="time"
                        value={workingHours[day].morningFrom}
                        onChange={e => handleInputChange(day, 'morningFrom', e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full min-w-time"
                      />
                    </div>
                    <div className="w-1/2 px-2 mb-2">
                      <label className="block text-xs font-medium">Do:</label>
                      <input
                        type="time"
                        value={workingHours[day].morningTo}
                        onChange={e => handleInputChange(day, 'morningTo', e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full min-w-time"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Druga Smena</label>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-1/2 px-2 mb-2">
                      <label className="block text-xs font-medium">Od:</label>
                      <input
                        type="time"
                        value={workingHours[day].afternoonFrom}
                        onChange={e => handleInputChange(day, 'afternoonFrom', e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full min-w-time"
                      />
                    </div>
                    <div className="w-1/2 px-2 mb-2">
                      <label className="block text-xs font-medium">Do:</label>
                      <input
                        type="time"
                        value={workingHours[day].afternoonTo}
                        onChange={e => handleInputChange(day, 'afternoonTo', e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full min-w-time"
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
          <div className="flex-grow"></div> {/* This will push the SubmitBtn to the bottom */}
          <SubmitBtn onClick={handleSubmit} isDisabled={false} buttonText="Sačuvaj" />
          <CloseBtn onClick={() => handleCloseWorkingHoursForm()} />
        </div>
      </div>
      <Backdrop onClick={() => handleCloseWorkingHoursForm()} isVisible />
    </>
  );
};

export default WorkingHoursForm;
