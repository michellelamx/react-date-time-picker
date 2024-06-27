import { DateTimePicker } from './DateTimePicker';
import { Controller, useForm } from 'react-hook-form';


interface FormValues {
  selectedDateTime: Date;
}

export const App = () => {

  const { control } = useForm<FormValues>({
    defaultValues: {
      selectedDateTime: new Date(),
    },
  });

  return (
		<div className='date-time-picker-container'>
			<h2>React Date &amp; Time Picker</h2>
			<div className='date-time-picker-wrapper'>
				<Controller
					name={'selectedDateTime'}
					control={control}
					render={({ field: { value, onChange } }) => {
						return (
							<DateTimePicker
								date={value ?? undefined}
								setDate={onChange}
							/>
						);
					}}
				/>
			</div>
		</div>
  )
}
