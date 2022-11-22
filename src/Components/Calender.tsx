import { TextField } from '@mui/material';
import { FC, useState } from 'react';
import Header from './Header';
import { SlCalender } from 'react-icons/sl';
import Dates from './Dates';
import { useContext } from 'react';
import { CustomCalenderContext } from '../Context/CalenderContext';
const Calender: FC = () => {
	const [toggleCalender, setToggleCalender] = useState<boolean>(false);
	const calenderActions = useContext(CustomCalenderContext);
	const handleToggleCalender = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();

		setToggleCalender((state) => !state);
		calenderActions?.selectedDate &&
			calenderActions.calculateDate(new Date(calenderActions.selectedDate));
	};
	const handleOutSideClick = (e: React.MouseEvent<HTMLElement>) => {
		// setToggleCalender(false);
	};
	return (
		<div onClick={(e: React.MouseEvent<HTMLElement>) => handleOutSideClick(e)}>
			<Header />
			<div style={{ margin: '50px' }}>
				<h3>Custom Calender</h3>
				<div style={{ width: '300px' }}>
					<TextField
						fullWidth={true}
						id="filled-basic"
						label="Select a Date"
						variant="filled"
						color="warning"
						InputProps={{
							endAdornment: <SlCalender style={{ cursor: 'pointer' }} />,
							readOnly: true,
						}}
						value={calenderActions?.selectedDate}
						onClick={(e) => handleToggleCalender(e)}
					/>
					{toggleCalender && <Dates />}
				</div>
			</div>
		</div>
	);
};

export default Calender;
