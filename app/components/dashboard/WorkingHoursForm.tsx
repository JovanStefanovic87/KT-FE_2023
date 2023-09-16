import React, { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek, format, addWeeks } from 'date-fns';

const WorkingHoursForm = () => {
  const [workingHours, setWorkingHours] = useState({
    Monday: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
    },
    Tuesday: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
    },
    Wednesday: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
    },
    Thursday: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
    },
    Friday: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
    },
    Saturday: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
    },
    Sunday: {
      morningFrom: '',
      morningTo: '',
      afternoonFrom: '',
      afternoonTo: '',
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
      let currentDate = startOfWeek(today, { weekStartsOn: 1 }); // Start from the current week, with Monday as the starting day

      while (currentDate.getFullYear() <= nextYear) {
        const endOfWeekDate = endOfWeek(currentDate);

        weeks.push({
          label: `Nedelja ${format(currentDate, 'w')} (${format(
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

  return (
    <div className="working-hours-form">
      <div>
        <label>Select Week:</label>
        <select value={selectedWeek} onChange={e => setSelectedWeek(e.target.value)}>
          {weeks.map((week, index) => (
            <option key={index} value={index}>
              {week.label}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Morning From</th>
            <th>Morning To</th>
            <th>Afternoon From</th>
            <th>Afternoon To</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(workingHours).map(day => (
            <tr key={day}>
              <td>{day}</td>
              <td>
                <input
                  type="text"
                  value={workingHours[day].morningFrom}
                  onChange={e => handleInputChange(day, 'morningFrom', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={workingHours[day].morningTo}
                  onChange={e => handleInputChange(day, 'morningTo', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={workingHours[day].afternoonFrom}
                  onChange={e => handleInputChange(day, 'afternoonFrom', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={workingHours[day].afternoonTo}
                  onChange={e => handleInputChange(day, 'afternoonTo', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkingHoursForm;
