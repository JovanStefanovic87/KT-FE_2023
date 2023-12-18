interface Props {
  children: React.ReactNode;
}

const CommonText: React.FC<Props> = ({ children }) => (
  <p className='font-sans text-sm md:text-base text-gray-700 leading-6 tracking-wide mb-4'>
    {children}
  </p>
);

export default CommonText;
