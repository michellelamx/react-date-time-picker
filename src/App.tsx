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
			<div className='built-with'>
				Built with:
				<ul>
					<li><a href='https://ui.shadcn.com/docs/components/date-picker' target='_blank'>shadcn Date Picker</a></li>
					<li><a href='https://react-hook-form.com/'>React Hook Form</a></li>
					<li><a href='https://zod.dev/'>Zod</a></li>
				</ul>
			</div>
		</div>
  )
}
