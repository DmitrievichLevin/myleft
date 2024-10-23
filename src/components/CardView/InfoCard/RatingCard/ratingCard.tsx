import { InfoCard } from '../infoCard';
import ratingIcon from '../../../../res/Icons/ratingIcon.svg';

type VendorRating = {
  rating?: number;
  count?: number;
};
export const RatingCard = ({ rating = 4.2, count = 128 }: VendorRating) => {
  return (
    <InfoCard className="flex gap-2 self-start">
      <img src={ratingIcon} className="w-[40px] h-[40px]" />
      <div
        id="vendor-rating-stats"
        className="flex flex-col gap-[2px] justify-center"
      >
        <span
          className="font-bold text-black inline-flex items-end gap-[2px] font-mono text-[0.875rem] whitespace-nowrap"
          style={{ letterSpacing: '-0.15rem' }}
        >
          {rating}
          <span
            className="text-[0.65rem] whitespace-nowrap"
            style={{ letterSpacing: '0.025rem' }}
          >
            {'/5'}
          </span>
        </span>
        <span className="underline text-textGray inline-block text-[0.65rem] font-semibold whitespace-nowrap">
          {count} Ratings
        </span>
      </div>
    </InfoCard>
  );
};
