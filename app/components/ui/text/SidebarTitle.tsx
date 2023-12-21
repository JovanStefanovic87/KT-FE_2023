interface Props {
  value: string;
}

const SidebarTitle: React.FC<Props> = ({ value }) => {
  return <h2 className='text-white font-semibold mt-2 text-lg'>{value}</h2>;
};

export default SidebarTitle;
