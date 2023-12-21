interface Props {
  index: number;
  title: string;
}

const ListItemName: React.FC<Props> = ({ index, title }) => {
  return <h2 className='font-bold text-ktListItemName mb-1'>{`${index + 1}. ${title}`}</h2>;
};

export default ListItemName;
