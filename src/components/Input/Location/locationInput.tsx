import React from 'react';
import { TextInput } from '../textInput';
import locationIcon from '../../../res/Icons/locationIconGray.svg';
import { useLocationInputData } from './useLocationInputData';
import '../../Loaders/basic/basicLoader.css';

export const LocationInput = ({
  value = '',
  onChange,
  disabled = false,
  required = false,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  required?: boolean;
}) => {
  const { loading, getLocation } = useLocationInputData(onChange);

  return (
    <TextInput
      className={loading ? 'cs-loader-left' : ''}
      icon={locationIcon}
      onChange={(v) => onChange(v)}
      value={value}
      name="city-state-location-input"
      pattern={/^([A-Za-z\. ]+),[ ]?([A-Za-z]{2})$/}
      disabled={disabled || loading}
      required={required}
      onIconClick={() => getLocation()}
    />
  );
};
