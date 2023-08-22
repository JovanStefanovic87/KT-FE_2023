interface FormItemNameProps {
  index: number;
  title: string;
}

const FormItemName: React.FC<FormItemNameProps> = ({ index, title }) => {
  return <h2 className="font-bold text-ktFormItemName mb-1">{`${index + 1}. ${title}`}</h2>;
};

export default FormItemName;
