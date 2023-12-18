interface Props {
  children: React.ReactNode;
}

const GreenText: React.FC<Props> = ({ children }) => (
  <p className='text-lg md:text-xl font-bold text-green-600 mb-2'>{children}</p>
);

export default GreenText;
