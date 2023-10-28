type ChildrenProps = {
  children: React.ReactNode;
};

const AppointmentServicesNameContainer: React.FC<ChildrenProps> = ({ children }) => (
  <ul className='list-disc'>{children}</ul>
);

export default AppointmentServicesNameContainer;
