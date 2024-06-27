import { DateTimeInput } from './DateTimeInput';
import { TimePeriodSelect } from './TimePeriodSelect';
import { useRef } from 'react';

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onPeriodChange: (newPeriod: string) => void;
}

export function TimePicker({ date, setDate, onPeriodChange }: TimePickerProps) {
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLButtonElement>(null);
  const period = date ? (date.getHours() >= 12 ? 'PM' : 'AM') : 'PM';

  return (
    <div className='time-picker-wrapper'>
      <div className='hours'>
        <DateTimeInput
          picker='12hours'
          date={date}
          setDate={setDate}
          period={period}
          ref={hourRef}
          className='hours-input'
          onRightFocus={() => minuteRef.current?.focus()}
        />
        <span>:</span>
      </div>
      <div className='minutes'>
        <DateTimeInput
          picker='minutes'
          id='minutes12'
          date={date}
          setDate={setDate}
          period={period}
          ref={minuteRef}
          className='minutes-input'
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div>
      <div className='am-pm'>
        <TimePeriodSelect
          period={period}
          onPeriodChange={onPeriodChange}
          ref={periodRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
    </div>
  );
}
