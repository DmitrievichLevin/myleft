import { AnalyticCard } from '../analyticCard';
import viewsIcon from '../../../../../res/Icons/viewsIcon.svg';

export const ViewsCard = ({
  value,
  change,
}: {
  value: number;
  change: number;
}) => {
  return (
    <AnalyticCard title="Views" value={value} pct={change} icon={viewsIcon} />
  );
};
