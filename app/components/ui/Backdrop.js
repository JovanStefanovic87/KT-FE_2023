const Backdrop = ({Children}) => {
  
  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9, // Adjust as needed
  };

  return (
    <div style={backdropStyle}>{Children}</div>
  );
};

export default Backdrop;
