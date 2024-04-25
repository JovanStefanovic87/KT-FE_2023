interface AuthFormTitleProps {
  mainTitle: string;
  description: string;
}

const AuthFormTitle: React.FC<AuthFormTitleProps> = ({ mainTitle, description }) => {
  return (
    <h2 className='text-3xl font-extrabold text-ktHeaderGray text-center mb-6'>
      <span className='block'>{mainTitle}</span>
      <span className='block text-sm text-ktBlueGray'>{description}</span>
    </h2>
  );
};

export default AuthFormTitle;
