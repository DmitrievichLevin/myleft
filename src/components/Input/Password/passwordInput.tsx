import React from 'react';
import { TextInput } from '../textInput';
import './passwordInput.css';
import { PrimaryButton } from '../../Buttons/Primary/primaryButton';

export const Password = ({
  value,
  onChange,
  onButtonClick,
}: {
  value: string;
  onChange: (val: string) => void;
  onButtonClick?: () => void;
}) => {
  return (
    <div className="flex flex-col password-input-cn gap-4 items-center">
      <TextInput
        value={value}
        onChange={onChange}
        className="password-input"
        name="pword"
        type="password"
        pattern={
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        }
        required
      />

      {onButtonClick && (
        <PrimaryButton
          title="Update Password"
          onClick={() => alert('TODO: POST Password')}
        />
      )}
    </div>
  );
};
