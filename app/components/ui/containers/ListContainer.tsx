interface Props {
  children: React.ReactNode;
}

const ListContainer: React.FC<Props> = ({ children }) => {
  return <div className='container mx-auto mt-8 w-full'>{children}</div>;
};

export default ListContainer;
