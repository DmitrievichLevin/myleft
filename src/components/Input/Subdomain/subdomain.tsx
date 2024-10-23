import React from 'react';
import { TextInput } from '../textInput';
import './subdomain.css';

export const SubDomain = ({ value = 'jhowar39' }: { value: string }) => {
  return (
    <TextInput
      className={'subdomain'}
      value={value}
      name="uname"
      disabled={true}
      readOnly
    />
  );
};
