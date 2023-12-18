interface Props {
  children: React.ReactNode;
  id: string;
}

const WorkinHoursFormContainer: React.FC<Props> = ({ children, id }) => {
  return (
    <div className='p-4 bg-white relative h-full flex flex-col z-5'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>{`Podešavanje Radnog Vremena - ${id}`}</h2>
      {children}
    </div>
  );
};

export default WorkinHoursFormContainer;
