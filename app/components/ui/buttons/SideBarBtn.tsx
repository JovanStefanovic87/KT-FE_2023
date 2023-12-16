interface SideBarBtnProps {
  value: string;
  isVisible?: boolean;
  onClick: (event: React.FormEvent) => void;
}

const SideBarBtn: React.FC<SideBarBtnProps> = ({ onClick, isVisible = true, value }) => {
  return (
    <div
      className={`${
        isVisible ? 'flex' : 'hidden'
      } text-white border border-sideBarBgHover cursor-pointer rounded-md transition duration-300 hover:bg-gray-700 hover:text-white hover:border-gray-600 active:border-white`}
      onClick={onClick}
    >
      <p className='py-2 px-4 w-full text-center'>{value}</p>
    </div>
  );
};

export default SideBarBtn;
