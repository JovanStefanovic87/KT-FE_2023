interface Props {
  children: React.ReactNode;
}

const ListHeadContainer: React.FC<Props> = ({ children }) => {
  return <div className='flex justify-between items-center py-4'>{children}</div>;
};

export default ListHeadContainer;
