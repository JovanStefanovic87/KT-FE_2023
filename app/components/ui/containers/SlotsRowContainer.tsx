interface Props {
  children: React.ReactNode;
}

const SlotsRowContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className={`grid grid-cols-7 mt-0 z-2 w-full`}>
      <div className={`flex flex-row col-span-8`}>{children}</div>
    </div>
  );
};

export default SlotsRowContainer;
