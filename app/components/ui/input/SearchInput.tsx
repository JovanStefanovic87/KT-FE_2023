import { SearchInputProps } from '@/app/helpers/interfaces';

const SearchInput: React.FC<SearchInputProps> = ({ dataSearchQuery, value, setState }) => (
  <input
    id={dataSearchQuery}
    name={dataSearchQuery}
    type='text'
    placeholder='Pretraga'
    className='p-2 border rounded-md mb-4'
    value={value}
    onChange={(e) => setState(e.target.value)}
  />
);

export default SearchInput;
