interface SideBarBtnProps {
  children: React.ReactNode;
  onClick: (event: React.FormEvent) => void;
}

const SideBarBtn: React.FC<SideBarBtnProps> = ({ onClick, children }) => {
  return (
    <div
      className='text-center text-white center  border border-white rounded-md transition duration-300 hover:bg-sideBarBgHover transform hover:translate-x-1 cursor-pointer'
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SideBarBtn;
