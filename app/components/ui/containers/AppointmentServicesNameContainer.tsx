type Props = {
  children: React.ReactNode;
};

const AppointmentServicesNameContainer: React.FC<Props> = ({ children }) => (
  <ul className='list-disc'>{children}</ul>
);

export default AppointmentServicesNameContainer;
