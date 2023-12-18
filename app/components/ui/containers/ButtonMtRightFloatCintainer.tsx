interface Props {
  children: React.ReactNode;
}

const ButtonMtRightFloatCintainer: React.FC<Props> = ({ children }) => {
  return <div className='mt-4 float-right'>{children}</div>;
};

export default ButtonMtRightFloatCintainer;
