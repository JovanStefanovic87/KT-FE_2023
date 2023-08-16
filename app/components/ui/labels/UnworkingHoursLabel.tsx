const UnworkingHoursLabel = () => {
  const labelHeight = '7rem';
  const slotsWidth = 200;

  const commonStyle: React.CSSProperties = {
    height: '7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const reservationButtonStyle: React.CSSProperties = {
    ...commonStyle,
    height: labelHeight,
    color: '#fff',
    background: 'linear-gradient(45deg, #4CAF50, #2E8B57)',
    backgroundSize: '100% 100%',
    backgroundClip: 'text',
  };
  const closedTime: React.CSSProperties = {
    ...reservationButtonStyle,
    background: 'black',
    color: '#6d6d6d',
    cursor: 'not-allowed',
    minWidth: slotsWidth,
    maxWidth: slotsWidth,
  };
  return (
    <div
      className="text-center font-bold bg-black text-white flex flex-col justify-center"
      style={{ ...closedTime, height: labelHeight }}
    >
      Zatvoreno
    </div>
  );
};

export default UnworkingHoursLabel;
