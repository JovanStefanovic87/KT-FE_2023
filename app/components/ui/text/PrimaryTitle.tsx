interface PrimaryTitleProps {
  value: string;
}

const PrimaryTitle: React.FC<PrimaryTitleProps> = ({ value }) => (
  <h1 className='text-2xl font-bold mb-4 text-white'>{value}</h1>
);

export default PrimaryTitle;
