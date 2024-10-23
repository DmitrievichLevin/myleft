import React, { useCallback, useState } from 'react';
import { TextInput } from '../textInput';
import locationIcon from '../../../res/Icons/locationIconGray.svg';
import '../../Loaders/basic/basicLoader.css';
import cntl from 'cntl';
import './searchBar.css';

const inputCN = (loading: boolean, className: string) => cntl`
bg-white
search-bar-input
transition-all
text-input-lg
text-input-rounded
${loading ? 'cs-loader-left' : ''}
${className}
`;

export const SearchBar = ({
  onChange = (v) => {},
  className = '',
}: {
  onChange?: (v: string) => void;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const enter = useCallback(
    (val: string) => {
      setValue(val);
    },
    [setValue]
  );
  return (
    <TextInput
      className={inputCN(loading, className)}
      icon={locationIcon}
      onChange={(v) => enter(v)}
      value={value}
      name="service-search"
      disabled={loading}
      onIconClick={() => {}}
    />
  );
};
