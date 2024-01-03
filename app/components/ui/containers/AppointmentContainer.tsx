import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../globalRedux/store';

type Props = {
  children: ReactNode;
};

const AppointmentContainer: React.FC<Props> = ({ children }) => {
  const calendarMode = useSelector((state: RootState) => state.calendarMode);
  const isWeekMode = calendarMode.mode === 'week';
  return (
    <div
      className={`flex justify-center relative ${
        isWeekMode ? 'w-slotsWidth' : 'w-full'
      } rounded-lg h-appointmentSlot`}
    >
      {children}
    </div>
  );
};

export default AppointmentContainer;
