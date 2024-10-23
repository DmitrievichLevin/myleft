import { useLinkClickHandler } from 'react-router-dom';
import { PRIVACY_POLICY } from '../../../constants';

export default () => {
  const toPrivacy = useLinkClickHandler(PRIVACY_POLICY);
  return (
    <footer>
      <p className="copy-right">
        <span>
          Paid for by My Left. Not Authorized By Any Candidate Or Candidate's
          Committee.
        </span>
        <br />© Copyright 2024 All Rights Reserved -{' '}
        <a onClick={toPrivacy} href={PRIVACY_POLICY}>
          Privacy Policy
        </a>{' '}
        - <a>Contact Us</a>
      </p>
    </footer>
  );
};
