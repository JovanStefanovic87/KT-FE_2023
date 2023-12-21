interface Props {
  value: string;
}

const PrimaryTitle: React.FC<Props> = ({ value }) => (
  <h1 className='text-2xl font-bold mb-4 text-white'>{value}</h1>
);

export default PrimaryTitle;
