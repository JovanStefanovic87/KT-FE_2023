interface BackdropProps {
  onClick: (event: React.FormEvent) => void;
  isVisible: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick, isVisible }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 ${
        isVisible ? 'flex' : 'hidden'
      } justify-center items-center z-20`}
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;
