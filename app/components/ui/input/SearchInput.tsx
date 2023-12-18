interface Props {
  dataSearchQuery: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const SearchInput: React.FC<Props> = ({ dataSearchQuery, value, setState }) => (
  <input
    id={dataSearchQuery}
    name={dataSearchQuery}
    type='text'
    placeholder='Pretraga'
    className='p-2 border rounded-md'
    value={value}
    onChange={(e) => setState(e.target.value)}
  />
);

export default SearchInput;
