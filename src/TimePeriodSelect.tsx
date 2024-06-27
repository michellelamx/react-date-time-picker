import { Period } from './utils/DateTimeUtils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './primitives/select';
import ChevronIcon from './assets/chevron-down.svg';
import { forwardRef, KeyboardEvent } from 'react';

export interface PeriodSelectorProps {
  period: string;
  onPeriodChange: (period: string) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

export const TimePeriodSelect = forwardRef<
  HTMLButtonElement,
  PeriodSelectorProps
>(({ period, onPeriodChange, onLeftFocus, onRightFocus }, ref) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight') onRightFocus?.();
    if (e.key === 'ArrowLeft') onLeftFocus?.();
  };

  const handlePeriodChange = (newPeriod: string) => {
    if (onPeriodChange) {
      onPeriodChange(newPeriod);
    }
  };

  return (
    <div className='am-pm-picker'>
      <Select
        defaultValue={period}
        onValueChange={(value: Period) => handlePeriodChange(value)}
      >
        <SelectTrigger
          ref={ref}
          className='trigger-button'
          onKeyDown={handleKeyDown}
        >
          <SelectValue />
          <span className='chevron-icon'>
            <img src={ChevronIcon} alt='chevron' />
          </span>
        </SelectTrigger>
        <SelectContent className='am-pm-dropdown'>
          <SelectItem className='am-pm-option' value='AM'>
            AM
          </SelectItem>
          <SelectItem className='am-pm-option' value='PM'>
            PM
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});
TimePeriodSelect.displayName = 'TimePeriodSelect';
