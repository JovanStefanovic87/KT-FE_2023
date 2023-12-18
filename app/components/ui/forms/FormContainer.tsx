import Backdrop from '../Backdrop';

interface Props {
  displayForm: boolean;
  id: string;
  handleFormClose: (event: React.FormEvent) => void;
  children: React.ReactNode;
}

const FormContainer: React.FC<Props> = ({ displayForm, id, handleFormClose, children }) => {
  return (
    <form className='fixed mx-auto z-20' style={{ display: displayForm ? 'flex' : 'none' }} id={id}>
      <div className='flex flex-col items-center fixed  w-98dvw lg:w-form lg:max-w-form h-list left-0 md:left-1/2 md:-translate-x-1/2 mx-2 bg-white overflow-y-auto z-30'>
        {children}
      </div>
      <Backdrop onClick={(event) => handleFormClose(event)} isVisible={displayForm} />
    </form>
  );
};

export default FormContainer;
