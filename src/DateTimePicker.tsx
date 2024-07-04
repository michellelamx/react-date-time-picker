import CalendarIcon from '@/assets/calendar-icon.svg';
import { Calendar } from './calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './primitives/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './primitives/popover';
import '@/styles/main.css';
import { TimePicker } from './TimePicker';
import { format } from 'date-fns';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

const dateTimeNotPast = z.date().refine((date: Date) => {
  const now = new Date();
  return date >= now;
}, {
  message: 'Date cannot be in the past',
});

type FormData = {
  date: Date | undefined;
};

export function DateTimePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  const [period, setPeriod] = useState<string>('PM');

  const { control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(z.object({ date: dateTimeNotPast })),
    defaultValues: { date },
  })

  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      // Set the new date with the selected period
      const hours = period === 'PM' ? 24 : 12;
      newDay.setHours(hours, 0, 0, 0);
      setDate(newDay);
      return;
    }
    // Preserve the time part of the current date, considering the period
    const hours =
      period === 'PM' && date.getHours() < 12
        ? date.getHours() + 12
        : date.getHours();
    newDay.setHours(hours, date.getMinutes());
    setDate(newDay);
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    if (date) {
      const tempDate = new Date(date);
      const hours = tempDate.getHours();
      const isPM = hours >= 12;
      let newHours = hours;
      if (newPeriod === 'PM' && !isPM) {
        newHours += 12;
      } else if (newPeriod === 'AM' && isPM) {
        newHours -= 12;
      }
      tempDate.setHours(newHours);
      setDate(tempDate);
    }
  };

  return (
    <div className='date-time-picker'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className='button-trigger'>
            <div className='date-label'>
              {date ? (
                format(date, 'PPP p')
              ) : (
                <span className='placeholder-text'>Expiration (Optional)</span>
              )}
            </div>
            <div className='icon'>
              <img src={CalendarIcon} alt='calendar' />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='picker-popover'>
          <div className='date-picker-container'>
            <Controller
              name='date'
              control={control}
              render={({ field }) => (
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={(d) => {
                    field.onChange(d)
                    handleSelect(d)
                  }}
                  initialFocus
                  showOutsideDays={false}
                />
              )}
            />
          </div>
          <div className='time-picker-container'>
            <div className='section-header'>Time</div>
            <TimePicker
              setDate={setDate}
              date={date}
              onPeriodChange={handlePeriodChange}
            />
          </div>
          {errors.date && <p style={{ color: 'red' }}>{errors.date.message}</p>}
        </PopoverContent>
      </Popover>
    </div>
  );
}
