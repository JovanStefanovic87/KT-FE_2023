interface FormItemDataProps {
  title: string;
  item: string | number;
}

const FormItemData: React.FC<FormItemDataProps> = ({ title, item }) => {
  return (
    <p className="mb-1">
      <b>
        <em>{`${title}:`}</em>
      </b>
      {` ${item}`}
    </p>
  );
};

export default FormItemData;
