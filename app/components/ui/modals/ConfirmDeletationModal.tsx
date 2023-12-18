import { animationClass } from '@/app/helpers/universalFunctions';
import ModalContainer from '../containers/ModalContainer';
import PrimaryButton from '../buttons/PrimaryButton';
import CommonText from '../text/CommonText';

interface ConfirmDeletationModalProps {
  subject: string;
  isVisible: boolean;
  SetState: React.Dispatch<
    React.SetStateAction<{ isVisible: boolean; delete: boolean; appointmentId: string }>
  >;
  submit: (event: React.FormEvent<Element>) => void;
}

const ConfirmDeletationModal: React.FC<ConfirmDeletationModalProps> = ({
  subject,
  SetState,
  isVisible,
  submit,
}) => {
  const onClose = () => {
    SetState((prevState: any) => ({ ...prevState, isVisible: false }));
  };

  return (
    <ModalContainer isVisible={isVisible} onClose={onClose}>
      <div
        className={`bg-white rounded-lg p-4 md:p-8 transition-all transform ${animationClass(
          isVisible,
        )} shadow-lg`}
        onClick={onClose}
      >
        <CommonText>{`Da li ste sigurni da želite obrisati ${subject}?`}</CommonText>
        <div className='flex justify-end'>
          <PrimaryButton onClick={onClose} buttonText='Zatvori' type='submit' />
          <PrimaryButton onClick={submit} buttonText='Obriši' type='delete' />
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmDeletationModal;
