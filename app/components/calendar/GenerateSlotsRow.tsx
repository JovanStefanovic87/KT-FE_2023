import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SlotsRowContainer from './SlotsRowContainer';
import { GenerateSlotsRowProps, InfoModalType, ShowConfirmation } from '../../helpers/interfaces';
import ConfirmationModal from '../ui/modals/ConfirmationModal';
import InfoModal from '../ui/modals/InfoModal';
import Slot from './Slot';

const GenerateSlotsRow: React.FC<GenerateSlotsRowProps> = ({
  weekDays,
  dataLoaded,
  workingHours,
  appointments,
  time,
  handleAppointmentButton,
  setDisplayForm,
  services,
  clients,
  slotDuration,
  showRow,
  index,
  setAppointments,
  setErrorModal,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<ShowConfirmation>({
    isVisible: false,
    delete: false,
    appointmentId: '',
  });
  const [showInfoModal, setShowInfoModal] = useState<InfoModalType>({ isVisible: false, text: '' });

  const handleAppointmentDelete = useCallback(
    async (appointmentId: string) => {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_DATABASE_URL}/appointments/${appointmentId}`);
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== appointmentId),
        );

        setShowInfoModal({ isVisible: true, text: 'Termin je uspešno obrisan.' });
      } catch (error) {
        console.error('An error occurred while deleting the appointment:', error);
        setErrorModal({ isVisible: true, text: 'Došlo je do greške, termin nije obrisan.' });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    showConfirmation.delete ? handleAppointmentDelete(showConfirmation.appointmentId) : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConfirmation.delete]);

  return (
    <div key={index}>
      <ConfirmationModal
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        text='Da li ste sigurni da želite obrisati termin?'
      />
      <InfoModal showInfoModal={showInfoModal} setShowInfoModal={setShowInfoModal} />
      {showRow && (
        <SlotsRowContainer>
          <Slot
            time={time}
            dataLoaded={dataLoaded}
            workingHours={workingHours}
            appointments={appointments}
            handleAppointmentButton={handleAppointmentButton}
            setDisplayForm={setDisplayForm}
            services={services}
            clients={clients}
            slotDuration={slotDuration}
            setShowConfirmation={setShowConfirmation}
            weekDays={weekDays}
          />
        </SlotsRowContainer>
      )}
    </div>
  );
};

export default GenerateSlotsRow;
