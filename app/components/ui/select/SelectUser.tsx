import { SelectUserProps } from '@/app/helpers/interfaces';

const SelectUser: React.FC<SelectUserProps> = ({ selectedUser, onSelectUser, id, data }) => {
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onSelectUser(selectedValue);
  };

  return (
    <select
      id={id}
      name={id}
      value={selectedUser}
      onChange={handleUserChange}
      className={
        'flex items-center gap-4 p-2.5 border text-sm lg:text-base rounded-lg bg-ktHeaderGray border-ktAppointmentBg placeholder-gray-400 text-ktOrange focus:ring-blue-500 focus:border-blue-500 cursor-pointer'
      }
    >
      {data.map((item) => (
        <option key={item.id} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectUser;
