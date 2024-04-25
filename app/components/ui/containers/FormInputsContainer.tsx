import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const FormInputsContainer = ({ children }: Props) => {
  return <div className='flex flex-col gap-5 mb-3'>{children}</div>;
};

export default FormInputsContainer;
