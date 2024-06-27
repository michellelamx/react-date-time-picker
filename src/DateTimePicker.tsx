import { Button } from './primitives/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './primitives/popover';
import { TimePicker } from './TimePicker';
import { Calendar } from './calendar';
import './styles/main.css';
import CalendarIcon from './assets/calendar-icon.svg';
import { format } from 'date-fns';
import { useState } from 'react';

export function DateTimePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  const [period, setPeriod] = useState<string>('PM');

  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      // Set the new date with the selected period
      const hours = period === 'PM' ? 23 : 11;
      newDay.setHours(hours, 59, 0, 0); // Default to 11:59 PM or AM based on period
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
            <Calendar
              mode='single'
              selected={date}
              onSelect={(d) => handleSelect(d)}
              initialFocus
              showOutsideDays={false}
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
