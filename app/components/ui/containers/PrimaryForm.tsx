import React, { ReactNode } from 'react';

interface Props {
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const PrimaryForm: React.FC<Props> = ({ submit, children }) => {
  return (
    <form onSubmit={submit} className='space-y-4'>
      {children}
    </form>
  );
};

export default PrimaryForm;
