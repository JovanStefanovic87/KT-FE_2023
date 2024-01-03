interface Props {
  children: React.ReactNode;
  dataLoaded: boolean;
}
const Container: React.FC<Props> = ({ children, dataLoaded }) => {
  const headerHeight = 68;

  return (
    <div
      className={`md:w-calendar-lg bg-ktBg ${
        dataLoaded ? 'flex' : 'hidden'
      } flex-1 flex-col py-4 overflow-auto`}
      style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
    >
      <div className='flex flex-col '>{children}</div>
    </div>
  );
};

export default Container;
