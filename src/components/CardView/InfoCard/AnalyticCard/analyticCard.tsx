import { InfoCard } from '../infoCard';
import posIcon from '../../../../res/Icons/posIcon.svg';
import negIcon from '../../../../res/Icons/negIcon.svg';
import trendIcon from '../../../../res/Icons/trendIcon.svg';
import { useMemo } from 'react';

type AnalyticCardProps = {
  title: string;
  icon: string;
  pct: number;
  value: number | string;
};

export const AnalyticCard = ({
  title,
  icon,
  pct,
  value,
}: AnalyticCardProps) => {
  const trendDir = useMemo(() => {
    if (pct > 0) {
      return posIcon;
    } else if (pct < 0) {
      return negIcon;
    } else if (pct === 0) {
      return null;
    }
  }, [pct]);
  return (
    <InfoCard className="flex gap-2 self-start">
      <div
        id="analytic-icon-cn"
        className="flex border-solid border-gray-300 !border-[1px] rounded-md p-1 object-fit w-[30px] h-[30px] items-center"
      >
        <img
          id="analytic-icon"
          alt={`${title}-analytic-icon`}
          src={icon}
          className=""
        />
      </div>
      <div id="analytic-card-cn" className="flex gap-3 justify-center">
        <p className="m-0 flex flex-col gap-1">
          <span className="inline-block text-textGray font-semibold text-xs">
            {title}
          </span>
          <span className="inline-block text-black font-bold text-md">
            {value}
          </span>
        </p>
        <p className="flex gap-1 border-solid border-gray-300 !border-[1px] rounded-md px-[3px] m-0 self-end">
          <img
            id="trend-analytic-icon"
            alt={`trend-analytic-icon`}
            src={trendIcon}
            className="w-[10px]"
          />
          <span className="text-xs inline-flex items-start">
            {Math.abs(pct)}
            {'%'}
            {trendDir && (
              <img
                id="trend-analytic-icon"
                alt={`trend-analytic-icon`}
                src={trendDir}
                className="w-[7px] h-[7px] pt-[2px] inline"
              />
            )}
          </span>
        </p>
      </div>
    </InfoCard>
  );
};
