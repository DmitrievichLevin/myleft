import { AnalyticCard } from '../analyticCard';
import salesIcon from '../../../../../res/Icons/currencyIcon.svg';
import { formatCurrencyNumber } from '../../../../Input/helpers';

export const SalesCard = ({
  value,
  change,
}: {
  value: number;
  change: number;
}) => {
  return (
    <AnalyticCard
      title="Sales"
      value={formatCurrencyNumber(value)}
      pct={change}
      icon={salesIcon}
    />
  );
};
