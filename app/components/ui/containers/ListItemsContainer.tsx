interface Props {
  children: React.ReactNode;
}

const ListItemsContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex overflow-y-auto h-list list-none'>
      <div className='grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-4'>{children}</div>
    </div>
  );
};

export default ListItemsContainer;
