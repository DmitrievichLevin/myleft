import cntl from 'cntl';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import Image from '../Image/image';
import clockIcon from '../../res/Icons/clockIcon.svg';
import _ from 'lodash';
import { ToggleList } from '../Lists/toggleList';

type OpenDay = {
  active: boolean;
  hours: {
    start: number;
    end: number;
  };
};

const statusCN = (status: string) => cntl`
${status === 'Open' ? 'text-green-700' : 'text-errorRed'}
`;

export const OpenHours = ({ open }: { open: OpenDay[] }) => {
  const current_time = dayjs().get('hours') * 60 + dayjs().get('minutes');
  const current_day = dayjs().get('day');

  const status = useMemo(() => {
    const { active, hours } = open[current_day];
    return current_time >= hours.start && current_time <= hours.end && active
      ? 'Open'
      : 'Closed';
  }, [open, current_day, current_time]);

  const nextOpen = useCallback(() => {
    const _today_start = open[current_day].hours.start;
    if (current_time < _today_start) {
      return dayjs()
        .startOf('day')
        .add(_today_start, 'minutes')
        .format(_today_start % 60 ? 'ddd h:mma' : 'ddd hA');
    }
    var pointer = current_day + 1;

    while (!open?.[pointer]?.active) {
      if (pointer > 6) {
        pointer = 0;
      } else {
        pointer += 1;
      }
    }

    const _next_start = open[pointer]?.hours?.start;
    return dayjs()
      .day(pointer)
      .startOf('day')
      .add(open[pointer]?.hours?.start, 'minutes')
      .format(_next_start % 60 ? 'ddd h:mma' : 'ddd hA');
  }, [open, current_day, current_time]);

  const nextState = useMemo(() => {
    switch (status) {
      case 'Closed':
        return `Opens ${nextOpen()}`;
      default:
        const _close_mins = open[current_day]?.hours?.end;
        const _close_time = dayjs()
          .startOf('day')
          .add(_close_mins, 'minutes')
          .format(_close_mins % 60 ? 'h:mma' : 'hA');
        return `Closes ${_close_time}`;
    }
  }, [status]);

  const openList = useMemo(() => {
    return open.map(({ active, hours: { start, end } }, idx) => {
      const _st_format = start % 60 ? 'h:mma' : 'hA';
      const _en_format = end % 60 ? 'h:mma' : 'hA';

      return (
        <p className="inline-flex text-sm justify-between w-full px-3">
          <span className="inline-block">
            {dayjs().day(idx).format('dddd')}
          </span>
          <span className="inline-block">
            {active
              ? dayjs()
                  .day(idx)
                  .startOf('day')
                  .add(start, 'minutes')
                  .format(_st_format) +
                '-' +
                dayjs().startOf('day').add(end, 'minutes').format(_en_format)
              : ' Closed'}
          </span>
        </p>
      );
    });
  }, [open]);

  return (
    <ToggleList items={openList}>
      <p
        id="open-hours-title-status"
        className="flex gap-3 items-center my-0 text-[16px]"
      >
        <Image
          className="w-[12.5px] h-[15px] inline-block mx-[1.25px]"
          src={clockIcon}
          alt={'open-hours-icon'}
          inline
        />
        <span>
          <span className={statusCN(status)}>{status}</span>
          {' · '}
          <span className="text-textGray">{nextState}</span>
        </span>
      </p>
    </ToggleList>
  );
};
