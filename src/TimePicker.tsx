import { TimeInput } from './TimeInput';
import { TimePeriodSelect } from './TimePeriodSelect';
import { useTimePickerRefs } from './hooks/useTimePickerRefs';

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onPeriodChange: (newPeriod: string) => void;
}

export function TimePicker({ date, setDate, onPeriodChange }: TimePickerProps) {
  const { refs, focusNext } = useTimePickerRefs();
  const period = date ? (date.getHours() >= 12 ? 'PM' : 'AM') : 'PM';

  return (
    <div className='time-picker-wrapper'>
      <div className='hours'>
        <TimeInput
          picker='12hours'
          date={date}
          setDate={setDate}
          period={period}
          ref={refs.hourRef}
          className='hours-input'
          onRightFocus={() => focusNext('hour', 'right')}
        />
        <span>:</span>
      </div>
      <div className='minutes'>
        <TimeInput
          picker='minutes'
          id='minutes12'
          date={date}
          setDate={setDate}
          period={period}
          ref={refs.minuteRef}
          className='minutes-input'
          onLeftFocus={() => focusNext('minute', 'left')}
          onRightFocus={() => focusNext('minute', 'right')}
        />
      </div>
      <div className='am-pm'>
        <TimePeriodSelect
          period={period}
          onPeriodChange={onPeriodChange}
          ref={refs.periodRef}
          onLeftFocus={() => focusNext('period', 'left')}
        />
      </div>
    </div>
  );
}
