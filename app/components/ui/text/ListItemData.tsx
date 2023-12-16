interface ListItemDataProps {
  title: string;
  item: string | number;
}

const ListItemData: React.FC<ListItemDataProps> = ({ title, item }) => {
  return (
    <p className='mb-1'>
      <b>
        <em>{`${title}:`}</em>
      </b>
      {` ${item}`}
    </p>
  );
};

export default ListItemData;
