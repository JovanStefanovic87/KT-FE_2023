interface Props {
  children: React.ReactNode;
  list: {
    id: string;
    name: string;
  };
  selectedName: string[];
  onClick: () => void;
}

const NewAppointmentListContainer: React.FC<Props> = ({
  children,
  list,
  selectedName,
  onClick,
}) => {
  return (
    <li
      key={list.id}
      className={`border-2 p-2 rounded-md cursor-pointer ${
        selectedName.includes(list.id) ? 'bg-blue-100' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default NewAppointmentListContainer;
