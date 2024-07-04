import { Input } from './primitives/input';
import {
  Period,
  getArrowByType,
  getDateByType,
  setDateByType,
  TimePickerType,
} from './utils/DateTimeUtils';
import {
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface TimeInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  period?: Period;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      className,
      type = 'tel',
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      setDate,
      onChange,
      onKeyDown,
      picker,
      period,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref,
  ) => {
    const [flag, setFlag] = useState<boolean>(false);
    const [prevIntKey, setPrevIntKey] = useState<string>('0');

    /**
     * allow 2secs for the user to enter the second digit, otherwise start over at first digit
    */
    useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [flag]);

    const calculatedValue = useMemo(
      () => getDateByType(date, picker),
      [date, picker],
    );

    const calculateNewValue = (key: string) => {
      if (
        picker === '12hours' &&
        flag &&
        calculatedValue.startsWith('1') &&
        prevIntKey === '0'
      ) {
        return `0${key}`;
      }
      return !flag ? `0${key}` : `${calculatedValue[1]}${key}`;
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') return;
      e.preventDefault();
      if (e.key === 'ArrowRight') onRightFocus?.();
      if (e.key === 'ArrowLeft') onLeftFocus?.();
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        const step = e.key === 'ArrowUp' ? 1 : -1;
        const newValue = getArrowByType(calculatedValue, step, picker);
        if (flag) setFlag(false);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker, period));
      }
      if (e.key >= '0' && e.key <= '9') {
        if (picker === '12hours') setPrevIntKey(e.key);

        const newValue = calculateNewValue(e.key);
        if (flag) onRightFocus?.();
        setFlag((prev) => !prev);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker, period));
      }
    };

    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={className}
        value={value || calculatedValue}
        onChange={(e) => {
          e.preventDefault();
          onChange?.(e);
        }}
        type={type}
        inputMode='decimal'
        onKeyDown={(e) => {
          onKeyDown?.(e);
          handleKeyDown(e);
        }}
        {...props}
      />
    );
  },
);
TimeInput.displayName = 'TimeInput';
