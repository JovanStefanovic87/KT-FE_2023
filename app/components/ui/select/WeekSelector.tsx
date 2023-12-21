interface Props {
  value: number;
  onChange: (value: number) => void;
  weekOptions: {
    label: string;
    start: Date;
    end: Date;
  }[];
  selectStyle: string;
}

const WeekSelector: React.FC<Props> = ({ value, onChange, weekOptions, selectStyle }) => {
  return (
    <select
      id='selectedWeek'
      name='selectedWeek'
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
      className={selectStyle}
    >
      {weekOptions.map((week, index: number) => (
        <option key={index} value={index}>
          {week.label}
        </option>
      ))}
    </select>
  );
};

export default WeekSelector;
