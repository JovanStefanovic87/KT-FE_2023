import React, { useState, useEffect } from 'react';
import { confirmationInit } from './initStates';
import SlotsRowContainer from '../ui/containers/SlotsRowContainer';
import { GenerateSlotsRowProps, InfoModalType, ShowConfirmation } from '@/app/helpers/interfaces';
import { handleAppointmentDelete } from '@/app/helpers/apiHandlers';
import ConfirmDeletationModal from '../ui/modals/ConfirmDeletationModal';
import InfoModal from '../ui/modals/InfoModal';
import Slot from './Slot';

const GenerateSlotsRow: React.FC<GenerateSlotsRowProps> = ({
  weekDays,
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
  const [showConfirmation, setShowConfirmation] = useState<ShowConfirmation>(confirmationInit);
  const [showInfoModal, setShowInfoModal] = useState<InfoModalType>({ isVisible: false, text: '' });

  useEffect(() => {
    showConfirmation.delete
      ? handleAppointmentDelete(
          showConfirmation.appointmentId,
          setAppointments,
          setShowInfoModal,
          setErrorModal,
        )
      : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConfirmation.delete]);

  return (
    <div key={index} className='flex'>
      <ConfirmDeletationModal
        subject='termin'
        isVisible={showConfirmation.isVisible}
        SetState={setShowConfirmation}
        submit={() => setShowConfirmation({ ...showConfirmation, delete: true, isVisible: false })}
      />
      <InfoModal showInfoModal={showInfoModal} setShowInfoModal={setShowInfoModal} />
      {showRow && (
        <SlotsRowContainer>
          <Slot
            time={time}
            workingHours={workingHours}
            appointments={appointments}
            handleAppointmentButton={handleAppointmentButton}
            setDisplayForm={setDisplayForm}
            services={services}
            clients={clients ? clients : []}
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
