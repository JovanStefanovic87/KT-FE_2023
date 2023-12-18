interface Props {
  title: string;
}

const BlueTitle: React.FC<Props> = ({ title }) => {
  return <h2 className='text-xl md:text-3xl font-bold text-blue-600 mb-4'>{title}</h2>;
};

export default BlueTitle;
