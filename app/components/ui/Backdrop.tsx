interface BackdropProps {
  onClick: () => void;
  isVisible: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick, isVisible }) => {
  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: isVisible ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  };

  return <div style={backdropStyle} onClick={onClick}></div>;
};

export default Backdrop;
