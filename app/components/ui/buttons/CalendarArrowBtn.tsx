type CalendarArrowBtn = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const CalendarArrowBtn: React.FC<CalendarArrowBtn> = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      className={`arrow-button mr-5 p-2.5 mx-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CalendarArrowBtn;
