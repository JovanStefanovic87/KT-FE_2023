import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, format, addWeeks } from 'date-fns';
import { srLatn } from 'date-fns/locale'; // Import the Serbian Latin locale
import CloseBtn from '../ui/buttons/CloseBtn';
import SubmitBtn from '../ui/buttons/SubmitBtn';

const WorkingHoursForm = ({ handleCloseWorkingHoursForm }) => {
  const [workingHours, setWorkingHours] = useState({
    Ponedeljak: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Utorak: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Sreda: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Četvrtak: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Petak: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Subota: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
    Nedelja: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
      status: 'Nema odsustva',
    },
  });

  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(0);

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

  const employeeName = 'Stevan Poljakovic'; // Replace with the actual employee name

  // Function to handle form submission
  const handleSubmit = () => {
    setWorkingHours({
      Ponedeljak: {
        morningFrom: '',
        morningTo: '',
        afternoonFrom: '',
        afternoonTo: '',
        status: 'Nema odsustva',
      },
      // Repeat for all days...
    });

    // Close the form
    handleCloseWorkingHoursForm();
  };

  return (
    <div className="mx-auto p-4 bg-white shadow-md rounded-lg relative">
      <h2 className="text-2xl font-semibold mb-4 text-center">{`Podešavanje Radnog Vremena - ${employeeName}`}</h2>
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
      <div className="h-calHeight overflow-y-auto overflow-x-hidden">
        <div className="flex flex-wrap -mx-4 p-8 gap-1">
          {Object.keys(workingHours).map(day => (
            <div
              key={day}
              className="w-full xl:w-workingHoursSlotXl lg:w-workingHoursSlotLg p-4 border border-gray-300 rounded"
            >
              <h3 className="text-lg font-semibold mb-2">{day}</h3>
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
        <SubmitBtn onClick={handleSubmit} isDisabled={false} buttonText="Sačuvaj" />
        <CloseBtn onClick={() => handleCloseWorkingHoursForm()} />
      </div>
    </div>
  );
};

export default WorkingHoursForm;
