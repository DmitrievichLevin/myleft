import dayjs from 'dayjs';
import myleft from '../../../res/Icons/myleftlogo.svg';
import rnc from '../../../res/Icons/rncLogo.svg';
import { CountDown } from '../../../components/Countdown/countdown';
import { useMemo } from 'react';
import './banner.css';

export const Banner = ({}) => {
  const countdownEnd = useMemo(
    () => dayjs('2024-11-05').startOf('day').format(),
    []
  );
  return (
    <div
      id="myleft-actions-banner"
      className="w-full flex flex-col items-center"
    >
      <div className="banner-vote-wrapper">
        <a
          className="banner-vote"
          href="https://iwillvote.com/?state=natl&utm_source=hfp_organizing&utm_campaign=w_khc_iwv_do_dvc_ve_20241012_hfp_natl_na_na_na&utm_medium=web"
          target="_blank"
          title="Vote4Trump"
        >
          <span>
            Make your plan to vote. Check out voting options in your state here{' '}
            {'>>>'}
          </span>
        </a>
      </div>
      {/* <p className='election-year'>
        <span>2024</span>
      </p> */}
      <div className="w-full flex flex-col items-center relative myleft-actions-banner">
        <a
          className="flex absolute left-[2rem] top-0 items-center justify-center w-fit h-full object-fit cursor-pointer banner-logo-link"
          href="/"
        >
          <img alt="myleft.org" src={myleft} className="h-[4rem] banner-logo" />
        </a>

        <CountDown />
        <a
          className="flex absolute left-[2rem] top-0 items-center justify-center w-fit h-full object-fit cursor-pointer banner-logo-link"
          href="https://www.gop.com"
        >
          <img
            alt="myleft.org"
            src={rnc}
            className="h-[4rem] banner-logo rnc-logo"
          />
        </a>
      </div>
    </div>
  );
};
