import { Button } from '@mui/material';
import { FC, useState, useEffect, useRef, useContext } from 'react';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { weekData } from '../mockData/CalenderData';
import Styles from '../ComponentStyles/dates.module.css';
import { CustomCalenderContext } from '../Context/CalenderContext';

type CurrentFilterStateType = {
	month: boolean;
	year: boolean;
};
const Dates: FC = () => {
	const datePickerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState<number>(0);
	const [currentFilterState, setCurrentFilterState] =
		useState<CurrentFilterStateType>({
			month: false,
			year: false,
		});
	const { currentDate, dateArray, calculateDate, setSelectedDate } = useContext(
		CustomCalenderContext
	);

	useEffect(() => {
		setContainerWidth(
			datePickerRef.current?.clientWidth
				? datePickerRef.current.clientWidth - 10
				: 0
		);
	}, []);

	const incrementCurrentDate = () => {
		if (currentDate) {
			let newDate = {
				month: currentDate.month,
				year: currentDate.year,
			};
			if (currentFilterState.month) {
				newDate['year'] = newDate['year'] + 1;
			} else {
				if (newDate['month'] + 1 === 12) {
					newDate['month'] = 0;
					newDate['year'] = newDate['year'] + 1;
				} else {
					newDate['month'] = newDate['month'] + 1;
				}
			}
			calculateDate(new Date(newDate.year, newDate.month));
		}
	};
	const decrementCurrentDate = () => {
		if (currentDate) {
			let newDate = {
				month: currentDate.month,
				year: currentDate.year,
			};
			if (currentFilterState.month) {
				newDate['year'] = newDate['year'] - 1;
			} else {
				if (newDate['month'] - 1 === -1) {
					newDate['month'] = 11;
					newDate['year'] = newDate['year'] - 1;
				} else {
					newDate['month'] = newDate['month'] - 1;
				}
			}
			calculateDate(new Date(newDate.year, newDate.month));
		}
	};
	const currentDateStyles = {
		background:
			'radial-gradient(circle, rgba(237,108,2,1) 29%, rgba(253,239,239,0.6923144257703081) 66%)',
	};
	const selectUserDate = (date: Date) => {
		setSelectedDate(date.toLocaleDateString('en-US'));
		calculateDate(date, 'userClick');
	};
	return (
		<div className={Styles.datePickerContainer}>
			<>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '5px',
					}}
				>
					<Button variant="text" onClick={() => decrementCurrentDate()}>
						{' '}
						<MdArrowBackIos />
					</Button>

					<div>
						<div>{currentDate?.monthName}</div>
						<div>{currentDate?.year}</div>
					</div>
					<Button variant="text" onClick={() => incrementCurrentDate()}>
						{' '}
						<MdArrowForwardIos />
					</Button>
				</div>
				<div className={Styles.daysContainer} ref={datePickerRef}>
					{weekData.map((day) => {
						return (
							<div
								key={day.id}
								style={{
									width: `${containerWidth / 7}px`,
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<span>{day.shortValue}</span>
							</div>
						);
					})}
				</div>
				<div className={Styles.datesContainer}>
					{currentDate?.endDate &&
						dateArray.map((date, index) =>
							date.id && date.id <= currentDate.endDate ? (
								<div
									className={`${Styles.dateBox} ${Styles.dateHover}`}
									key={date.id}
									style={
										date.isSelected
											? {
													width: `${containerWidth / 7}px`,
													...currentDateStyles,
											  }
											: {
													width: `${containerWidth / 7}px`,
											  }
									}
									onClick={() => date?.date && selectUserDate(date.date)}
								>
									<span style={{ padding: '5px' }}>{date.id}</span>
								</div>
							) : (
								<div
									key={`${date.id}${index}`}
									className={Styles.dateBox}
									style={{
										width: `${containerWidth / 7}px`,
									}}
								>
									<span style={{ padding: '5px' }}></span>
								</div>
							)
						)}
				</div>
			</>
		</div>
	);
};

export default Dates;
